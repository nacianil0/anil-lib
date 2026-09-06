import { expect, test, type Page } from "@playwright/test";
import path from "node:path";

const OUT =
  "C:/Users/ANIL~1.AKM/AppData/Local/Temp/claude/D--dev-anil-lib/522e37d9-4ffd-482b-8b8c-534fe85ea064/scratchpad";
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

async function shot(
  page: Page,
  name: string,
  {
    slug = "arac-kullanimi-islev-cagrisi",
    width = 1280,
    height = 900,
    mode = "flow",
    target = "figure.series-figure",
    theme = "system",
  } = {},
) {
  await page.addInitScript(
    ([k, v]) => window.localStorage.setItem(k as string, v as string),
    [PREFERENCES_KEY, JSON.stringify({ ...prefs, readingMode: mode, theme })],
  );
  await page.setViewportSize({ width, height });
  await page.goto(`/seri/${slug}`);
  await page.waitForSelector(".prose-reader p", { timeout: 60_000 });
  await page.waitForTimeout(1200);
  if (mode === "flow") {
    await page.evaluate((selector) => {
      document.querySelector(selector)?.scrollIntoView({ block: "center" });
    }, target);
  } else {
    // Paged: walk pages until the target is inside the visible frame.
    await page.evaluate((selector) => {
      const prose = document.querySelector(".prose-reader") as HTMLElement;
      const node = document.querySelector(selector) as HTMLElement | null;
      if (!node) return;
      const gap = Number.parseFloat(getComputedStyle(prose).columnGap) || 0;
      const step = prose.clientWidth + gap;
      const left = node.getBoundingClientRect().left - prose.getBoundingClientRect().left + prose.scrollLeft;
      prose.scrollLeft = Math.floor(left / step) * step;
    }, target);
  }
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, `${name}.png`), scale: "css" });
}

test("capture", async ({ page }) => {
  test.setTimeout(180_000);
  await authenticate(page);
  await shot(page, "fit-figure-1280-flow");
  await shot(page, "fit-figure-1280-paged", { mode: "paged" });
  await shot(page, "fit-figure-390", { width: 390, height: 844 });
  await shot(page, "fit-table-1280-flow", { target: ".table-scroll" });
  await shot(page, "fit-table-768", { width: 768, height: 1024, target: ".table-scroll" });
  await shot(page, "fit-table-390", { width: 390, height: 844, target: ".table-scroll" });
  await shot(page, "fit-table-1280-paged", { mode: "paged", target: ".table-scroll" });
});
