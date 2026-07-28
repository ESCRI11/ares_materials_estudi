// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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

// https://astro.build/config
export default defineConfig({
	// Project page deploy: both of these are required, or assets 404 in production
	// while working fine on localhost.
	site: 'https://escri11.github.io',
	base: '/ares_materials_estudi',
	integrations: [
		starlight({
			title: 'InD Prep',
			description:
				'Get up to speed with the technical requirements of the MA SUPSI in Interaction Design.',
			customCss: ['./src/styles/custom.css'],
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{
					tag: 'link',
					attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=Instrument+Serif&display=swap',
					},
				},
				{ tag: 'script', content: checklistScript },
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
			sidebar: [
				{ label: 'Start Here', items: [{ autogenerate: { directory: 'start-here' } }] },
			],
		}),
	],
});
