/*
 * Every internal link must carry the /ares_materials_estudi base prefix and point at a page
 * that actually got built. Astro does not add the prefix for you, and a link without it
 * works perfectly on localhost and 404s in production — which is exactly the kind of bug
 * nobody finds until a reader hits it.
 *
 * Usage: npm run check:links   (expects dist/ from a prior build)
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BASE = '/ares_materials_estudi';
const ASSET = /\.(css|js|png|svg|jpe?g|xml|webmanifest|ico|json|txt|woff2?)$/;

const walk = (dir) =>
	readdirSync(dir).flatMap((entry) => {
		const path = join(dir, entry);
		return statSync(path).isDirectory() ? walk(path) : path.endsWith('.html') ? [path] : [];
	});

if (!existsSync('dist')) {
	console.error('no dist/ — run `npm run build` first');
	process.exit(1);
}

const problems = [];
let checked = 0;

for (const file of walk('dist')) {
	const html = readFileSync(file, 'utf8');
	for (const [, href] of html.matchAll(/href="([^"#?]+)/g)) {
		if (!href.startsWith('/') || ASSET.test(href)) continue;
		checked++;
		const page = file.replace(/^dist\//, '');
		if (href !== BASE && !href.startsWith(`${BASE}/`)) {
			problems.push([href, 'missing base prefix', page]);
			continue;
		}
		const rest = href.slice(BASE.length).replace(/^\/|\/$/g, '');
		if (rest.startsWith('ares_materials_estudi')) {
			problems.push([href, 'base prefix twice', page]);
			continue;
		}
		const target = rest ? join('dist', rest) : 'dist';
		if (!existsSync(join(target, 'index.html')) && !existsSync(target)) {
			problems.push([href, 'no such page', page]);
		}
	}
}

console.log(`checked ${checked} internal links across ${walk('dist').length} pages`);
const seen = new Set();
for (const [href, why, page] of problems) {
	if (seen.has(href + why)) continue;
	seen.add(href + why);
	console.error(`  ${why.padEnd(18)} ${href}   (in ${page})`);
}
if (problems.length) {
	console.error(`${problems.length} broken link(s)`);
	process.exit(1);
}
console.log('OK — every internal link is prefixed and resolves');
