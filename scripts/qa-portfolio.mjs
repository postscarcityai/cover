import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const outDir = path.resolve('docs/qa');
await fs.mkdir(outDir, { recursive: true });

const pages = [
  {
    slug: 'work-page',
    url: 'http://localhost:3000/work',
    checks: ['AMC Defense Law', 'Finesse Plastic Surgery', 'Vibe Jam', 'Heathos Pulse'],
  },
  {
    slug: 'amc-defense-law',
    url: 'http://localhost:3000/work/amc-defense-law',
    checks: ['Justice Watch', 'Morning Intelligence Report', 'By the numbers'],
  },
  {
    slug: 'finesse',
    url: 'http://localhost:3000/work/finesse',
    checks: ['motion', 'Treatment Planner', 'HIPAA'],
  },
  {
    slug: 'vibe-jam',
    url: 'http://localhost:3000/work/vibe-jam',
    checks: ['The Blog', 'Knowledge Base', 'Events & Community'],
  },
  {
    slug: 'heathos-pulse',
    url: 'http://localhost:3000/work/heathos-pulse',
    checks: ['Volume showcase', 'Design system', 'same-day turnaround'],
  },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1400 }, deviceScaleFactor: 1.5 });
const results = [];

for (const item of pages) {
  await page.goto(item.url, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  const imageCheck = await page.evaluate(() => {
    const imgs = Array.from(document.images).map((img) => ({
      src: img.currentSrc || img.src,
      alt: img.alt,
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    }));
    const broken = imgs.filter((img) => img.complete && img.naturalWidth === 0);
    return { total: imgs.length, broken, withAlt: imgs.filter((img) => img.alt && img.alt.trim()).length };
  });

  const textResults = {};
  for (const check of item.checks) {
    textResults[check] = await page.getByText(check, { exact: false }).first().isVisible().catch(() => false);
  }

  const screenshotPath = path.join(outDir, `${item.slug}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  results.push({ slug: item.slug, url: item.url, screenshotPath, imageCheck, textResults });
}

await browser.close();
await fs.writeFile(path.join(outDir, 'qa-results.json'), JSON.stringify(results, null, 2) + '\n');
console.log(JSON.stringify(results, null, 2));
