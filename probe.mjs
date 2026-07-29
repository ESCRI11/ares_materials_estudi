import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/usr/bin/chromium-browser' });
const p = await b.newPage();
await p.goto('http://localhost:4321/ares_materials_estudi/cheatsheet/', { waitUntil: 'networkidle' });
console.log(await p.evaluate(() => [...document.querySelectorAll('.sheet')].map((s, i) => {
  const cols = s.querySelector('.cols');
  const blocks = [...s.querySelectorAll('.block')];
  const tallest = blocks.reduce((a, b) => b.offsetHeight > a.offsetHeight ? b : a);
  return {
    page: i + 1,
    sheetScroll: s.scrollHeight, sheetClient: s.clientHeight,
    colsHeight: cols.offsetHeight, colsScrollW: cols.scrollWidth, colsClientW: cols.clientWidth,
    blocks: blocks.length,
    tallest: tallest.querySelector('h2')?.textContent + ' = ' + tallest.offsetHeight + 'px',
  };
})));
await b.close();
