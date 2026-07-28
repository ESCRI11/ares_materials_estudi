/*
 * Renders /cheatsheet to dist/cheatsheet.pdf.
 *
 * Runs after `astro build`, and writes into dist/ rather than public/ for two reasons:
 * public/ is copied by Astro *during* the build, so a file generated afterwards would
 * never be picked up — and .gitignore has `*.pdf`, so a PDF in public/ would be silently
 * uncommitted and 404 in production while working perfectly on this machine.
 *
 * Every assertion runs before the file is written, so a bad PDF is never produced rather
 * than produced and noticed later.
 *
 * Usage: npm run build   (or node scripts/make-cheatsheet.mjs against an existing dist/)
 * Needs a browser: CHROMIUM_PATH, or Playwright's own chromium.
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { writeFileSync, existsSync, readdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const ORIGIN = 'http://localhost:4321';
const PAGE = `${ORIGIN}/ares_materials_estudi/cheatsheet/`;
const OUT = 'dist/cheatsheet.pdf';

if (!existsSync('dist/cheatsheet/index.html')) {
	console.error('no dist/cheatsheet/index.html — run `astro build` first');
	process.exit(1);
}

// Same preview-spawn pattern as scripts/check-interactive.mjs. If `astro dev` is already
// running on 4321 this will attach to it instead, which is harmless but worth knowing.
const server = spawn('npx', ['astro', 'preview'], { stdio: 'ignore' });
const stop = () => server.kill();
process.on('exit', stop);

try {
	for (let i = 0; ; i++) {
		try {
			await fetch(ORIGIN);
			break;
		} catch {
			if (i > 40) throw new Error('preview server never came up');
			await new Promise((r) => setTimeout(r, 250));
		}
	}

	const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
	const page = await browser.newPage();

	// A failed webfont must be fatal. This machine resolves "IBM Plex Mono" to Noto Sans —
	// a proportional face — so a silent substitution looks subtly wrong rather than broken.
	// requestfailed covers network-level failures only — a 404 is a *successful* request
	// with an error status, so watch responses too. A missing font file 404s silently and
	// the page then falls back to whatever fontconfig offers.
	const failed = [];
	page.on('requestfailed', (r) => failed.push(`${r.url()} (no response)`));
	page.on('response', (r) => {
		if (r.status() >= 400) failed.push(`${r.url()} (HTTP ${r.status()})`);
	});

	await page.goto(PAGE, { waitUntil: 'networkidle' });
	await page.evaluate(() => document.fonts.ready);

	assert.deepEqual(failed, [], 'a request failed while rendering — fonts may be substituted');

	// Do NOT use document.fonts.check() here: it returned true on a CI runner where the
	// font had not loaded at all and Liberation Sans was rendering instead. Measure what is
	// actually being drawn — if a family renders at the same width as a nonsense family, the
	// browser fell back and the check has caught it.
	const sameAsFallback = await page.evaluate(() => {
		const measure = (family) => {
			const el = document.createElement('span');
			el.style.cssText = `position:absolute;visibility:hidden;white-space:pre;font:40px ${family}`;
			el.textContent = 'Handgloves 0123456789';
			document.body.append(el);
			const w = el.getBoundingClientRect().width;
			el.remove();
			return w;
		};
		const base = measure('"no-such-family-xyz", monospace');
		return {
			arimo: measure('Arimo, "no-such-family-xyz", monospace') === base,
			mono: measure('"IBM Plex Mono", "no-such-family-xyz", monospace') === base,
		};
	});
	assert.ok(!sameAsFallback.arimo, 'Arimo is not rendering — the browser fell back');
	assert.ok(!sameAsFallback.mono, 'IBM Plex Mono is not rendering — the browser fell back');

	// Content that does not fit spills out of the fixed-height sheet. Catch it here and say
	// which page to cut, rather than shipping a card with a line sliced off the bottom.
	const overflow = await page.evaluate(() =>
		[...document.querySelectorAll('.sheet')]
			.map((s, i) => ({ page: i + 1, over: s.scrollHeight - s.clientHeight }))
			.filter((s) => s.over > 1),
	);
	assert.deepEqual(
		overflow,
		[],
		`sheet overflows — move a block to the other side: ${JSON.stringify(overflow)}`,
	);

	// Adding a section to the site should force a decision about the card, not be forgotten.
	const covered = await page.evaluate(() => [
		...new Set([...document.querySelectorAll('[data-section]')].map((e) => e.dataset.section)),
	]);
	const sections = readdirSync('src/content/docs', { withFileTypes: true })
		.filter((e) => e.isDirectory() && e.name !== 'start-here')
		.map((e) => e.name);
	const missing = sections.filter((s) => !covered.includes(s));
	assert.deepEqual(missing, [], `sections missing from the cheatsheet: ${missing.join(', ')}`);

	const sheets = await page.locator('.sheet').count();
	const pdf = await page.pdf({
		format: 'A4',
		printBackground: true,
		preferCSSPageSize: true,
		margin: { top: 0, right: 0, bottom: 0, left: 0 },
	});
	await browser.close();

	// Page geometry is specified three ways above; check which one actually won.
	const raw = pdf.toString('latin1');
	const pages = (raw.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
	assert.equal(pages, sheets, `expected ${sheets} pages, got ${pages} — check the sheet height`);

	// Proof the fonts were embedded rather than substituted at print time — and, just as
	// importantly, that nothing ELSE was. A glyph missing from a subset (Ω, →, ≈ are all
	// absent from Plex Mono's latin set) makes Chromium quietly embed a third font and set
	// that one character in it, which reads as a typographic mistake rather than a bug.
	// Match on the family prefix, not the exact PostScript name: Google Fonts serves a
	// different file depending on the browser's User-Agent, so the same request embeds
	// "Arimo" here and "Arimo-Regular" on a CI runner. The prefix still fails loudly on a
	// genuine stranger like DejaVuSansMono, which is the case that matters.
	const ALLOWED = ['Arimo', 'IBMPlexMono'];
	const embedded = [
		...new Set(
			[...raw.matchAll(/\/BaseFont\s*\/(?:[A-Z]{6}\+)?([A-Za-z0-9-]+)/g)].map((m) => m[1]),
		),
	];
	for (const want of ALLOWED) {
		assert.ok(
			embedded.some((f) => f.startsWith(want)),
			`${want} is not embedded in the PDF — embedded: ${embedded.join(', ')}`,
		);
	}
	const unexpected = embedded.filter((f) => !ALLOWED.some((a) => f.startsWith(a)));
	assert.deepEqual(
		unexpected,
		[],
		`unexpected font embedded: ${unexpected.join(', ')} — a glyph is missing from the subsets`,
	);

	assert.ok(pdf.length > 40_000, `suspiciously small (${pdf.length} bytes) — blank render?`);
	assert.ok(pdf.length < 2_000_000, `suspiciously large (${pdf.length} bytes) — rasterised?`);

	writeFileSync(OUT, pdf);
	console.log(
		`${OUT} — ${pages} pages, ${(pdf.length / 1024).toFixed(0)} kB, fonts: ${embedded.join(', ')}`,
	);
} finally {
	stop();
}
