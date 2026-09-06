import { readFileSync } from "node:fs";
import path from "node:path";
import { test, type Page } from "@playwright/test";

const seriesCatalog = JSON.parse(
  readFileSync(path.join(process.cwd(), "content", "series", "catalog.json"), "utf8"),
) as { articles: Array<{ slug: string; readingOrder: number }> };
const slugs = [...seriesCatalog.articles]
  .sort((a, b) => a.readingOrder - b.readingOrder)
  .map((article) => article.slug);

const PREFERENCES_KEY = "anil-lib:reader-preferences:v1";
const prefs = {
  version: 1,
  theme: "system",
  fontScale: "standard",
  lineSpacing: "balanced",
  measure: "standard",
  fontFamily: "editorial",
  focusMode: false,
  paragraphSpacing: "balanced",
  firstLineIndent: "none",
  hyphenation: "auto",
  readingMode: "flow",
  letterSpacing: "normal",
  fontWeight: "regular",
  lineGuide: false,
};

async function authenticate(page: Page) {
  await page.goto("/login?next=%2F");
  await page.locator('input[name="username"]').fill("anil");
  await page.locator('input[name="password"]').fill("test-reader-pass");
  await page.locator('button[type="submit"]').click();
  await page.waitForURL((url) => !url.pathname.startsWith("/login"));
}

const MEASURE = `(() => {
  const round = (n) => Math.round(n);
  const root = document.querySelector('.prose-reader');
  if (!root) return null;
  const figures = [...root.querySelectorAll('figure.series-figure')].map((figure) => {
    const box = figure.querySelector('.series-figure-scroll');
    const svg = figure.querySelector('svg');
    const vb = (svg.getAttribute('viewBox') || '0 0 720 300').split(' ').map(Number);
    const width = svg.getBoundingClientRect().width;
    return { overflow: round(box.scrollWidth - box.clientWidth), label: Math.round(width / vb[2] * 13 * 10) / 10 };
  });
  const tables = [...root.querySelectorAll('.table-scroll')].map((box) => ({
    overflow: round(box.scrollWidth - box.clientWidth),
    cols: box.querySelector('tr') ? box.querySelector('tr').children.length : 0,
  }));
  const pres = [...root.querySelectorAll('pre')].map((el) => ({ overflow: round(el.scrollWidth - el.clientWidth) }));
  return {
    figures: figures.length,
    figureOverflow: figures.filter((f) => f.overflow > 1).length,
    smallestLabel: figures.reduce((min, f) => Math.min(min, f.label), 99),
    tables: tables.length,
    tableOverflow: tables.filter((t) => t.overflow > 1).length,
    worstTable: tables.reduce((worst, t) => Math.max(worst, t.overflow), 0),
    widestCols: tables.reduce((max, t) => Math.max(max, t.cols), 0),
    pres: pres.length,
    preOverflow: pres.filter((p) => p.overflow > 1).length,
    worstPre: pres.reduce((worst, p) => Math.max(worst, p.overflow), 0),
    docOverflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
})`;

const SAMPLE = [
  "arac-kullanimi-islev-cagrisi",
  "getirme-aramanin-modern-hali",
  "embeddinglerin-donusu-anlamsal-arama",
  "sinir-aglari-katmanlarin-icinde-ne-oluyor",
  "ajan-degerlendirmesi-basariyi-olcmek",
  slugs[0],
  slugs[slugs.length - 1],
];

for (const [name, viewport, mode] of [
  ["desktop-flow", { width: 1280, height: 900 }, "flow"],
  ["desktop-paged", { width: 1280, height: 900 }, "paged"],
  ["tablet", { width: 768, height: 1024 }, "flow"],
  ["phone", { width: 390, height: 844 }, "flow"],
] as const) {
  test(`overflow sweep — ${name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await authenticate(page);
    await page.addInitScript(
      ([k, v]) => window.localStorage.setItem(k as string, v as string),
      [PREFERENCES_KEY, JSON.stringify({ ...prefs, readingMode: mode })],
    );
    const totals = {
      figures: 0,
      figureOverflow: 0,
      tables: 0,
      tableOverflow: 0,
      pres: 0,
      preOverflow: 0,
      worstTable: 0,
      worstPre: 0,
      smallestLabel: 99,
      docOverflow: 0,
    };
    const notes: string[] = [];
    for (const slug of SAMPLE) {
      await page.goto(`/seri/${slug}`);
      await page.waitForSelector(".prose-reader p", { timeout: 60_000 });
      await page.waitForTimeout(900);
      const report = await page.evaluate((code) => eval(code)(), MEASURE);
      if (!report) continue;
      totals.figures += report.figures;
      totals.figureOverflow += report.figureOverflow;
      totals.tables += report.tables;
      totals.tableOverflow += report.tableOverflow;
      totals.pres += report.pres;
      totals.preOverflow += report.preOverflow;
      totals.worstTable = Math.max(totals.worstTable, report.worstTable);
      totals.worstPre = Math.max(totals.worstPre, report.worstPre);
      totals.smallestLabel = Math.min(totals.smallestLabel, report.smallestLabel);
      totals.docOverflow = Math.max(totals.docOverflow, report.docOverflowX);
      if (report.figureOverflow || report.tableOverflow || report.preOverflow) {
        notes.push(`${slug}:${JSON.stringify(report)}`);
      }
    }
    console.log(`SWEEP ${name}`, JSON.stringify(totals), notes.join(" | "));
  });
}
