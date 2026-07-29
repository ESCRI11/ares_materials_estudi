// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeMermaid from 'rehype-mermaid';

// Markdown renders `- [ ]` task lists as *disabled* checkboxes, which makes the
// self-check lists unusable. Re-enable them and remember ticks per page.
// ponytail: 8 lines of inline script beats a rehype plugin + a state library.
const checklistScript = `
addEventListener('DOMContentLoaded', () => {
  const key = 'checks:' + location.pathname;
  const done = new Set(JSON.parse(localStorage.getItem(key) || '[]'));
  document.querySelectorAll('.sl-markdown-content input[type=checkbox]').forEach((box, i) => {
    box.disabled = false;
    box.checked = done.has(i);
    box.addEventListener('change', () => {
      box.checked ? done.add(i) : done.delete(i);
      localStorage.setItem(key, JSON.stringify([...done]));
    });
  });
});
`;

// Project page deploy: both `site` and `base` are required, or assets 404 in
// production while working fine on localhost.
const base = '/ares_materials_estudi';

// https://astro.build/config
export default defineConfig({
	site: 'https://escri11.github.io',
	base,
	markdown: {
		// ```mermaid fences become inline SVG at build time, so diagrams cost the reader
		// no JavaScript and still show up with scripts disabled. Rendering needs a real
		// browser: CI installs Playwright's chromium, and CHROMIUM_PATH points at a
		// system one locally.
		rehypePlugins: [
			[
				rehypeMermaid,
				{
					strategy: 'inline-svg',
					launchOptions: process.env.CHROMIUM_PATH
						? { executablePath: process.env.CHROMIUM_PATH }
						: undefined,
					mermaidConfig: {
						theme: 'base',
						fontFamily: "'Helvetica Neue', Arial, sans-serif",
						themeVariables: {
							// Deliberately mid-tone: one baked SVG has to read on both the
							// light and the dark theme. custom.css nudges the rest.
							primaryColor: '#ffffff00',
							primaryTextColor: '#767676',
							primaryBorderColor: '#767676',
							lineColor: '#767676',
							secondaryColor: '#ffffff00',
							tertiaryColor: '#ffffff00',
							background: '#ffffff00',
						},
					},
				},
			],
		],
	},
	integrations: [
		starlight({
			title: 'InD Prep',
			description:
				'Get up to speed with the technical requirements of the MA SUPSI in Interaction Design.',
			customCss: ['./src/styles/custom.css'],
			head: [
				// Helvetica Neue is a system font (Arial is the fallback everywhere else), so
				// only the mono face has to be fetched. Same pairing as maind.supsi.ch.
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{
					tag: 'link',
					attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap',
					},
				},
				{ tag: 'script', content: checklistScript },
				// Select-a-word definitions. Lives in public/ because it has to run on
				// every page and Starlight has no global component slot.
				{ tag: 'script', attrs: { src: `${base}/glossary.js`, defer: true } },
			],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/ESCRI11/ares_materials_estudi',
				},
			],
			// Adding a LESSON needs no change here — drop a file in the section folder.
			// Adding a SECTION is one line: create src/content/docs/<dir>/ and list it below.
			// Order here is the order the reader learns in, so it is deliberate, not alphabetical.
			// Learning order, not alphabetical. Design Methods sits second on purpose:
			// it is the one area this reader already has, so it is an anchor before the
			// technical sections rather than a reward after them.
			sidebar: [
				{ label: 'Start Here', items: [{ autogenerate: { directory: 'start-here' } }] },
				{ label: 'Design Methods', items: [{ autogenerate: { directory: 'design-methods' } }] },
				{ label: 'Your Machine', items: [{ autogenerate: { directory: 'your-machine' } }] },
				{ label: 'Git & GitHub', items: [{ autogenerate: { directory: 'git-and-github' } }] },
				{ label: 'HTML & CSS', items: [{ autogenerate: { directory: 'html-and-css' } }] },
				{ label: 'JavaScript', items: [{ autogenerate: { directory: 'javascript' } }] },
				{
					label: 'Physical Computing',
					items: [{ autogenerate: { directory: 'physical-computing' } }],
				},
				{
					label: 'Digital Fabrication',
					items: [{ autogenerate: { directory: 'digital-fabrication' } }],
				},
				{ label: 'Documenting Work', items: [{ autogenerate: { directory: 'documentation' } }] },
				{ label: 'Data', items: [{ autogenerate: { directory: 'data' } }] },
				{ label: 'Python & SQL', items: [{ autogenerate: { directory: 'python-and-sql' } }] },
				{
					label: 'AI as a Material',
					items: [{ autogenerate: { directory: 'ai-as-a-material' } }],
				},
				{ label: 'Claude Code', items: [{ autogenerate: { directory: 'claude-code' } }] },
			],
		}),
	],
});
