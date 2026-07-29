/*
 * Browser check for the three interactive pieces: the quiz, the persisted
 * checklist, and select-a-word definitions. `npm run build` cannot catch any of
 * these — they only exist once a browser has run the page.
 *
 * Usage: npm run check   (builds first, serves dist, drives a real browser)
 * If Playwright's own browser is not installed, either run
 * `npx playwright install chromium` or point CHROMIUM_PATH at a system one.
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';

const ORIGIN = 'http://localhost:4321';
const LESSON = `${ORIGIN}/ares_materials_estudi/start-here/how-to-use-this-site/`;

const server = spawn('npx', ['astro', 'preview'], { stdio: 'ignore' });
const stop = () => server.kill();
process.on('exit', stop);

/** Select a word in the lesson body the way a double-click would. */
const selectWord = (page, word) =>
	page.evaluate((target) => {
		const nodes = document.evaluate(
			'//div[contains(@class,"sl-markdown-content")]//text()',
			document,
			null,
			6,
			null,
		);
		for (let i = 0; i < nodes.snapshotLength; i++) {
			const node = nodes.snapshotItem(i);
			const at = node.textContent.indexOf(target);
			if (at === -1) continue;
			const range = document.createRange();
			range.setStart(node, at);
			range.setEnd(node, at + target.length);
			const selection = getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
			document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
			return true;
		}
		return false;
	}, word);

try {
	// Wait for the preview server to answer.
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
	// Lessons deliberately ship broken snippets — const reassignment, a wrong selector,
	// string + number — so errors raised inside a LiveCode sandbox are teaching material,
	// not defects. Only errors from the page itself count.
	const errors = [];
	const sandboxErrors = [];
	page.on('pageerror', (error) => {
		const where = String(error.stack || '');
		(where.includes('about:srcdoc') ? sandboxErrors : errors).push(String(error));
	});

	// The dictionary is a third-party service; never let the check depend on it.
	await page.route('**/api.dictionaryapi.dev/**', (route) =>
		route.fulfill({
			json: [{ meanings: [{ partOfSpeech: 'noun', definitions: [{ definition: 'A stub.' }] }] }],
		}),
	);

	await page.goto(LESSON, { waitUntil: 'networkidle' });

	// --- checklist: markdown renders these disabled, and ticks must survive ---
	const box = page.locator('.sl-markdown-content input[type=checkbox]').first();
	assert.equal(await box.isDisabled(), false, 'checkbox still disabled');
	await box.check();
	await page.reload({ waitUntil: 'networkidle' });
	assert.equal(await box.isChecked(), true, 'tick did not persist across reload');

	// --- quiz ---
	// Options are shuffled at build time, so the test cannot assume a fixed index.
	// Read the block's key the same way the component does.
	const answers = await page
		.locator('quiz-block')
		.first()
		.evaluate((el) =>
			atob(el.dataset.k)
				.split(',')
				.map(Number),
		);

	const first = page.locator('.quiz-q').first();
	assert.equal(await page.locator('.quiz-score').isVisible(), false, 'score shown before any answer');
	const wrongIndex = [0, 1, 2].find((i) => i !== answers[0]);
	await first.locator('.quiz-option').nth(wrongIndex).click(); // deliberately wrong
	assert.equal(await first.locator('.is-wrong').count(), 1, 'wrong answer not flagged');
	assert.equal(await first.locator('.is-correct').count(), 1, 'correct answer not revealed');
	await first.locator('.quiz-explanation').waitFor({ state: 'visible' });

	await first.locator('.quiz-option').nth(answers[0]).click({ force: true });
	assert.equal(await first.locator('.is-wrong').count(), 1, 'answered question still takes clicks');

	assert.equal(await page.locator('.quiz-score').isVisible(), false, 'score shown too early');
	await page.locator('.quiz-q').nth(1).locator('.quiz-option').nth(answers[1]).click(); // correct
	assert.match(await page.locator('.quiz-score').textContent(), /1 of 2 correct/);

	// --- select-a-word definitions ---
	const panel = page.locator('.ind-define');

	assert.ok(await selectWord(page, 'terminal'), 'no "terminal" in the lesson body');
	await panel.waitFor({ state: 'visible' });
	assert.match(
		await panel.textContent(),
		/type commands/,
		'glossary lost to the dictionary — the local entry must win',
	);
	assert.match(await panel.textContent(), /Glossary/, 'glossary hit not attributed');

	await page.keyboard.press('Escape');
	assert.equal(await panel.isVisible(), false, 'Escape did not dismiss the panel');

	// A word we do not define falls through to the dictionary.
	assert.ok(await selectWord(page, 'preparation'), 'no "preparation" in the lesson body');
	await panel.waitFor({ state: 'visible' });
	await page.waitForFunction(() => !document.querySelector('.ind-define').textContent.includes('Looking up'));
	assert.match(await panel.textContent(), /A stub\./, 'dictionary fallback did not render');

	// Multi-word selections have no dictionary entry and must not query one.
	await page.keyboard.press('Escape');
	assert.ok(await selectWord(page, 'design bachelor'), 'no "design bachelor" in the lesson body');
	assert.equal(await panel.isVisible(), false, 'panel opened for a multi-word selection');

	// --- LiveCode: the editable snippet runs, and Run re-runs what was edited ---
	const lesson = page.locator('live-code').first();
	await page.goto(`${ORIGIN}/ares_materials_estudi/javascript/variables/`, {
		waitUntil: 'networkidle',
	});
	await lesson.waitFor();
	const sandbox = page.frameLocator('live-code iframe').first();
	// The snippet ran on load: something was written into the frame.
	await sandbox.locator('body').waitFor();
	assert.notEqual(
		(await sandbox.locator('body').textContent()).trim(),
		'',
		'LiveCode rendered nothing on load',
	);

	const editor = page.locator('live-code textarea').first();
	await editor.fill('<p id="marker">edited-and-run</p>');
	await page.locator('live-code [data-run]').first().click();
	await sandbox.locator('#marker').waitFor();
	assert.match(await sandbox.locator('#marker').textContent(), /edited-and-run/);

	await page.locator('live-code [data-reset]').first().click();
	assert.equal(
		await page.locator('live-code #marker').count(),
		0,
		'Reset did not restore the original snippet',
	);

	assert.deepEqual(errors, [], 'page threw JS errors');
	await browser.close();
	if (sandboxErrors.length) {
		console.log(`(${sandboxErrors.length} deliberate error(s) raised inside LiveCode sandboxes)`);
	}
	console.log('OK — quiz, checklist, glossary and LiveCode all behave');
} finally {
	stop();
}
