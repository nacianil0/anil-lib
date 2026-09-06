import { expect, test, type Page } from "@playwright/test";

const PREFERENCES_KEY = "anil-lib:reader-preferences:v1";
const READER_PREFERENCES = {
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

/**
 * Chapters carrying the widest figures and the widest tables. Both series render
 * through the same pipeline and the same shell, so the second one is here to keep
 * the other consumer of that pipeline honest.
 */
const ILLUSTRATED = [
  "/seri/arac-kullanimi-islev-cagrisi",
  "/seri/getirme-aramanin-modern-hali",
  "/boun/yinelemeler-ve-master-teoremi",
];

async function authenticate(page: Page) {
  await page.goto("/login?next=%2F");
  await page.locator('input[name="username"]').fill("anil");
  await page.locator('input[name="password"]').fill("test-reader-pass");
  await page.locator('button[type="submit"]').click();
  await page.waitForURL((url) => !url.pathname.startsWith("/login"));
}

async function seedPreferences(page: Page, overrides: Record<string, unknown>) {
  await page.addInitScript(
    ([key, value]) => {
      try {
        window.localStorage.setItem(key as string, value as string);
      } catch {
        /* ignore */
      }
    },
    [PREFERENCES_KEY, JSON.stringify({ ...READER_PREFERENCES, ...overrides })],
  );
}

/**
 * Everything that has its own idea of how wide it wants to be: the inline SVG
 * diagrams and the tables. Reports how far each one reaches past the box it was
 * given, so a scrollbar shows up as a number rather than as a screenshot.
 */
async function measureWideBlocks(page: Page) {
  return page.evaluate(() => {
    const root = document.querySelector(".prose-reader") as HTMLElement;
    const figures = [...root.querySelectorAll("figure.series-figure")].map((figure) => {
      const box = figure.querySelector(".series-figure-scroll") as HTMLElement;
      const svg = figure.querySelector("svg") as SVGSVGElement;
      const canvas = Number((svg.getAttribute("viewBox") ?? "0 0 720 300").split(" ")[2]);
      const width = svg.getBoundingClientRect().width;
      return {
        overflow: Math.round(box.scrollWidth - box.clientWidth),
        // The series canvas is 720 units wide and its labels are 13 units.
        label: Math.round((width / canvas) * 13 * 10) / 10,
      };
    });
    const tables = [...root.querySelectorAll(".table-scroll")].map((box) => ({
      overflow: Math.round(box.scrollWidth - box.clientWidth),
      columns: box.querySelector("tr")?.children.length ?? 0,
    }));
    return {
      figures,
      tables,
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
}

test.describe("series reader", () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test("opens a chapter of the series with its diagrams inlined", async ({ page }) => {
    const chapter = ILLUSTRATED[0];
    await page.goto(chapter);
    // Series chapters carry their title in the toolbar, not in the body: the
    // first thing the article itself renders is an `h2`.
    await expect(page.locator(".prose-reader h2").first()).toBeVisible();
    await expect(page.locator(`aside a[href="${chapter}"]`)).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(page.locator("figure.series-figure svg").first()).toBeVisible();
  });

  test("fits diagrams and tables into the column they are given", async ({ page }) => {
    test.setTimeout(180_000);
    const cases = [
      { name: "desktop flow", viewport: { width: 1280, height: 900 }, mode: "flow" },
      { name: "paged columns", viewport: { width: 1280, height: 900 }, mode: "paged" },
      { name: "tablet", viewport: { width: 768, height: 1024 }, mode: "flow" },
      { name: "phone", viewport: { width: 390, height: 844 }, mode: "flow" },
    ] as const;

    for (const { name, viewport, mode } of cases) {
      await page.setViewportSize(viewport);
      await seedPreferences(page, { readingMode: mode });
      for (const chapter of ILLUSTRATED) {
        await page.goto(chapter);
        await page.waitForSelector(".prose-reader p", { timeout: 60_000 });
        await page.waitForTimeout(700);
        const { figures, tables, documentOverflow } = await measureWideBlocks(page);
        const where = `${chapter} — ${name}`;

        expect(figures.length, where).toBeGreaterThan(0);
        // A diagram scales with its canvas, so it always has room to fit.
        expect(
          figures.filter((figure) => figure.overflow > 1),
          where,
        ).toEqual([]);
        // Fitting must not mean vanishing: the labels stay above hairline size.
        expect(Math.min(...figures.map((figure) => figure.label)), where).toBeGreaterThan(5);

        // Text cannot be scaled, so a table gives up padding and header lines
        // instead — enough for everything but the widest sheets of figures, which
        // keep their own scroll on a phone.
        const stubborn = tables.filter((table) => table.overflow > 1);
        if (name === "phone") {
          expect(
            stubborn.filter((table) => table.columns <= 4),
            where,
          ).toEqual([]);
        } else {
          expect(stubborn, where).toEqual([]);
        }

        expect(documentOverflow, where).toBeLessThanOrEqual(0);
      }
    }
  });
});
