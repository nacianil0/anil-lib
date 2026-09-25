import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

const PREFERENCES_KEY = "anil-lib:reader-preferences:v1";
const READER_DATA_KEY = "anil-lib:reader-data:v2:owner";
const SERIES = (
  JSON.parse(
    readFileSync(path.join(process.cwd(), "content", "series", "catalog.json"), "utf8"),
  ) as { articles: Array<{ articleId: string; slug: string; title: string; readingOrder: number }> }
).articles.sort((a, b) => a.readingOrder - b.readingOrder);
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
    // Series chapters keep their title in frontmatter and the body opens on an
    // `h2`; the shell sets the title above the text, outside the prose element
    // whose text the highlights and reading anchor are measured against.
    await expect(page.locator(".prose-reader h2").first()).toBeVisible();
    const title = page.locator("main .chapter-header h1");
    await expect(title).toBeVisible();
    await expect(page.locator(".prose-reader h1")).toHaveCount(0);
    await expect(page).toHaveTitle(new RegExp((await title.innerText()).slice(0, 12)));
    await expect(page.locator(`aside a[href="${chapter}"]`)).toHaveAttribute(
      "aria-current",
      "page",
    );
    // The reading list follows the roadmap's phases, not production batches.
    await expect(
      page.getByRole("navigation", { name: "Fazlara göre okuma listesi" }),
    ).toBeVisible();
    await expect(
      page.locator("aside").getByRole("heading", { name: /^Sınıflandırma/ }),
    ).toHaveCount(0);
    await expect(page.locator("figure.series-figure svg").first()).toBeVisible();
  });

  test("names the chapter in the toolbar once its title has scrolled away", async ({ page }) => {
    await page.goto(ILLUSTRATED[0]);
    const title = await page.locator("main .chapter-header h1").innerText();
    const toolbar = page.locator("header .reader-area p.truncate");
    await expect(toolbar).not.toContainText(title);
    await page.locator(".prose-reader h2").nth(2).scrollIntoViewIfNeeded();
    await expect(toolbar).toContainText(title);
  });

  test("keeps the chapter number whole in a phone toolbar", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(ILLUSTRATED[0]);
    const label = page.locator("header .reader-area p.truncate");
    await expect(label).toBeVisible();
    const clipped = await label.evaluate((element) => element.scrollWidth > element.clientWidth);
    expect(clipped).toBe(false);
  });

  test("opens a diagram full-screen and returns focus to it", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(ILLUSTRATED[0]);
    const figure = page.locator("figure.series-figure").first();
    const enlarge = figure.getByRole("button", { name: "Şekli büyüt" });
    await enlarge.scrollIntoViewIfNeeded();
    await enlarge.click();

    const caption = (await figure.locator("figcaption").innerText()).trim();
    const viewer = page.getByRole("dialog", { name: caption });
    await expect(viewer).toBeVisible();
    // A phone column leaves labels at ~6px, so the viewer opens enlarged and
    // scrollable: the whole drawing stays one tap ("Sığdır") away.
    const drawing = viewer.locator(".figure-viewer-drawing svg");
    await expect(drawing).toBeVisible();
    const width = await drawing.evaluate((svg) => svg.getBoundingClientRect().width);
    expect(width).toBeGreaterThan(700);
    await viewer.getByRole("button", { name: "Sığdır" }).click();
    await expect
      .poll(() => drawing.evaluate((svg) => svg.getBoundingClientRect().width))
      .toBeLessThan(400);
    // Nothing behind the viewer may scroll sideways.
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(0);

    await page.keyboard.press("Escape");
    await expect(viewer).toHaveCount(0);
    await expect(enlarge).toBeFocused();
  });

  test("offers the next chapter when the last one read is finished", async ({ page }) => {
    const [first, second] = SERIES;
    const at = "2026-09-20T10:00:00.000Z";
    const device = "11111111-1111-4111-8111-111111111111";
    await page.addInitScript(
      ([key, value]) => {
        if (sessionStorage.getItem("__seeded")) return;
        window.localStorage.setItem(key, value);
        sessionStorage.setItem("__seeded", "1");
      },
      [
        READER_DATA_KEY,
        JSON.stringify({
          version: 2,
          workspaceId: "owner",
          deviceId: device,
          currentArticleId: first.articleId,
          progress: {
            [first.articleId]: {
              articleId: first.articleId,
              scrollRatio: 1,
              completed: true,
              lastReadAt: at,
              clientUpdatedAt: at,
              deviceId: device,
            },
          },
        }),
      ],
    );
    await page.goto("/");
    const hero = page.locator("section[aria-labelledby='continue-title']");
    // A finished chapter has nothing to return to; the page leads with what follows.
    await expect(hero.getByText("Sıradaki bölüm")).toBeVisible();
    await expect(hero.getByRole("heading", { level: 1 })).toHaveText(second.title);
    await expect(hero.getByRole("link", { name: "Okumaya başla" })).toHaveAttribute(
      "href",
      `/seri/${second.slug}`,
    );
    // The series row says the same, with the phase it sits in.
    await expect(page.getByRole("link", { name: new RegExp(second.title) }).first()).toBeVisible();
    await expect(page.getByText(/Faz 1 \/ \d+/).first()).toBeVisible();
  });

  test("keeps the sepia theme free of a page-wide filter", async ({ page }) => {
    await seedPreferences(page, { theme: "sepia" });
    await page.goto(ILLUSTRATED[0]);
    await expect(page.locator("html")).toHaveClass(/sepia/);
    // Tailwind's `sepia` utility shares the theme's class name; it must not ship.
    await expect(page.locator("html")).toHaveCSS("filter", "none");
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
