import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/usr/bin/chromium-browser' });
const p = await b.newPage({ viewport: { width: 1440, height: 700 } });
await p.goto('http://localhost:4321/ares_materials_estudi/physical-computing/blink/', { waitUntil: 'domcontentloaded' });
const list = p.locator('.sl-markdown-content ul:has(input[type=checkbox])').first();
await list.scrollIntoViewIfNeeded();
await p.waitForTimeout(1200);
await list.screenshot({ path: '/home/massagno/.claude/jobs/b9bcc5ff/tmp/checklist.png' });
await b.close(); console.log('ok');
