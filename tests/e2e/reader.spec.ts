import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

type CatalogArticle = {
  articleId: string;
  slug: string;
  title: string;
  readingOrder: number;
  classificationBatch: number;
};

const catalog = JSON.parse(
  readFileSync(path.join(process.cwd(), "content", "catalog.json"), "utf8"),
) as { articles: CatalogArticle[] };

const ordered = [...catalog.articles].sort((a, b) => a.readingOrder - b.readingOrder);
const first = ordered[0];
const second = ordered[1];
const firstBatchBoundary = ordered.findIndex(
  (article, index) =>
    index > 0 && article.classificationBatch !== ordered[index - 1].classificationBatch,
);

const PROGRESS_KEY = "anil-lib:reader-progress:v1";
const PREFERENCES_KEY = "anil-lib:reader-preferences:v1";
// Reader state is namespaced per account; the owner's workspace keeps its literal key.
const READER_DATA_KEY = "anil-lib:reader-data:v2:owner";
const TEST_PASSWORD = "test-reader-pass";
const TEST_USERNAME = "anil";

async function authenticate(page: Page) {
  await page.goto(`/login?next=/read/${first.slug}`);
  await page.locator('input[name="username"]').fill(TEST_USERNAME);
  await page.locator('input[name="password"]').fill(TEST_PASSWORD);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL((url) => url.pathname.startsWith("/read/"));
}

async function gotoFirst(page: Page) {
  await page.goto(`/read/${first.slug}`);
  await expect(page.locator("main h1")).toBeVisible();
}

/** The chapter links, wherever this viewport puts them. */
function chapterNavigation(page: Page) {
  return page.getByRole("navigation", { name: "Bölümler arası gezinme" });
}

const PAGED_PREFERENCES = {
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
  readingMode: "paged",
  letterSpacing: "normal",
  fontWeight: "regular",
  lineGuide: false,
};

/**
 * Seeds the paged layout before the first paint. Writing preferences after load
 * races the provider's throttled save, which would put the reader back in flow.
 */
async function usePagedMode(page: Page) {
  await page.addInitScript(
    ([key, value]) => {
      try {
        window.localStorage.setItem(key as string, value as string);
      } catch {
        /* ignore */
      }
    },
    [PREFERENCES_KEY, JSON.stringify(PAGED_PREFERENCES)],
  );
}

function pagerPosition(page: Page) {
  return page
    .getByRole("navigation", { name: "Sayfa gezintisi" })
    .locator("span[aria-live]")
    .innerText();
}

/** A trackpad flick: one push, then a long tail of decaying momentum events. */
async function flick(page: Page, deltaY: number, events = 24) {
  await page.evaluate(
    ([total, count]) => {
      const target = document.querySelector(".prose-reader");
      if (!target) throw new Error("no reading area");
      for (let index = 0; index < (count as number); index += 1) {
        const decay = 1 - index / (count as number);
        target.dispatchEvent(
          new WheelEvent("wheel", {
            deltaY: ((total as number) / (count as number)) * 2 * decay,
            bubbles: true,
            cancelable: true,
          }),
        );
      }
    },
    [deltaY, events],
  );
}

test.describe("desktop reader", () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test("renders the private reading dashboard at the root", async ({ page }) => {
    await page.goto("/");
    expect(new URL(page.url()).pathname).toBe("/");
    await expect(page.getByRole("heading", { name: "Kaldığım yerler" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "İşaretlediklerim" })).toBeVisible();
  });

  test("sidebar lists the catalog order and navigates on click", async ({ page }) => {
    await gotoFirst(page);

    await expect(
      page.locator("aside").getByRole("heading", { name: "Sınıflandırma 00 · 18 makale" }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Sınıflandırılmış okuma listesi" }),
    ).toBeVisible();

    const activeLink = page.locator('aside a[aria-current="page"]');
    await expect(activeLink).toContainText(first.title);

    await page.locator(`aside a[href="/read/${second.slug}"]`).click();
    await page.waitForURL(`**/read/${second.slug}`);
    await expect(page.locator('aside a[aria-current="page"]')).toContainText(second.title);
  });

  test("previous/next controls follow the catalog order", async ({ page }) => {
    await gotoFirst(page);

    // From `md` up the chapter controls live in the toolbar; the article footer
    // carries them only on the narrow screens where the toolbar has no room.
    await expect(page.locator("main footer")).toBeHidden();
    const chapterNav = chapterNavigation(page);
    await expect(chapterNav.locator('[aria-disabled="true"]')).toBeVisible();

    await chapterNav.locator('a[rel="next"]').click();
    await page.waitForURL(`**/read/${second.slug}`);

    await chapterNavigation(page).locator('a[rel="prev"]').click();
    await page.waitForURL(`**/read/${first.slug}`);
  });

  test("next navigation crosses a classification batch boundary", async ({ page }) => {
    test.skip(firstBatchBoundary < 1, "The fixture has no post-baseline batch yet");
    const beforeBoundary = ordered[firstBatchBoundary - 1];
    const afterBoundary = ordered[firstBatchBoundary];

    await page.goto(`/read/${beforeBoundary.slug}`);
    await expect(page.locator("main h1")).toBeVisible();
    await chapterNavigation(page).locator('a[rel="next"]').click();
    await page.waitForURL(`**/read/${afterBoundary.slug}`);
  });

  test("restores the article and scroll position after reload", async ({ page }) => {
    await gotoFirst(page);
    await page.evaluate(() => window.scrollTo(0, 1600));
    await expect
      .poll(() =>
        page.evaluate(
          ([key, articleId]) =>
            JSON.parse(window.localStorage.getItem(key) ?? "{}")?.progress?.[articleId]
              ?.scrollRatio ?? 0,
          [READER_DATA_KEY, first.articleId],
        ),
      )
      .toBeGreaterThan(0.05);

    await page.reload();
    await expect(page.locator("main h1")).toBeVisible();
    await page.waitForTimeout(1000);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(600);
  });

  test("persists completion across reload and reflects it in the sidebar", async ({ page }) => {
    await gotoFirst(page);

    const completeButton = page.getByRole("button", { name: /Tamamlandı olarak işaretle/ });
    const pressed = page.locator('header button[aria-pressed="true"]');
    // Retry the toggle until React has hydrated the handler; click only while
    // it is still unpressed so a retry never flips completion back off.
    await expect(async () => {
      if ((await pressed.count()) === 0) {
        await completeButton.click();
      }
      await expect(pressed).toBeVisible({ timeout: 800 });
    }).toPass({ timeout: 10_000 });

    await page.reload();
    await expect(page.locator('header button[aria-pressed="true"]')).toBeVisible();
    await expect(page.locator(`aside a[href="/read/${first.slug}"]`)).toContainText("Tamamlandı");
  });

  test("survives corrupt localStorage without crashing", async ({ page }) => {
    await page.addInitScript(
      ([key]) => {
        try {
          window.localStorage.setItem(key, "{ this is : not json");
        } catch {
          /* ignore */
        }
      },
      [PROGRESS_KEY],
    );

    await page.goto(`/read/${first.slug}`);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("aside")).toBeVisible();
  });

  test("applies and persists typography preferences", async ({ page }) => {
    await gotoFirst(page);

    await page.getByRole("button", { name: "Okuma ayarları" }).click();
    const dialog = page.getByRole("dialog", { name: "Okuma ayarları" });
    await expect(dialog).toBeVisible();

    const dialogBox = await dialog.boundingBox();
    const viewport = page.viewportSize();
    expect(dialogBox).not.toBeNull();
    expect(viewport).not.toBeNull();
    expect(dialogBox!.x).toBeGreaterThanOrEqual(0);
    expect(dialogBox!.x + dialogBox!.width).toBeLessThanOrEqual(viewport!.width);
    expect(dialogBox!.width).toBeGreaterThan(560);
    expect(dialogBox!.height).toBeLessThan(650);

    // Alignment is fixed to justified for everyone; the control is gone.
    await expect(dialog.getByRole("group", { name: "Metin hizası" })).toHaveCount(0);
    await dialog
      .getByRole("group", { name: "Paragraf aralığı" })
      .getByRole("button", { name: "Ferah" })
      .click();
    await dialog
      .getByRole("group", { name: "İlk satır girintisi" })
      .getByRole("button", { name: "Klasik" })
      .click();
    await dialog
      .getByRole("group", { name: "Heceleme" })
      .getByRole("button", { name: "Otomatik" })
      .click();
    await dialog
      .getByRole("group", { name: "Harf aralığı" })
      .getByRole("button", { name: "Ferah" })
      .click();
    await dialog
      .getByRole("group", { name: "Tema" })
      .getByRole("button", { name: "Sepya" })
      .click();

    const paragraph = page.locator(".prose-reader p").first();
    await expect(paragraph).toHaveCSS("text-align", "justify");
    await expect(paragraph).toHaveCSS("hyphens", "auto");
    await expect(page.locator("html")).toHaveClass(/sepia/);

    const spacing = await paragraph.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        marginBottom: Number.parseFloat(style.marginBottom),
        textIndent: Number.parseFloat(style.textIndent),
      };
    });
    expect(spacing.marginBottom).toBeGreaterThan(20);
    expect(spacing.textIndent).toBeGreaterThan(20);

    await expect
      .poll(() =>
        page.evaluate(
          (key) => JSON.parse(window.localStorage.getItem(key) ?? "{}")?.hyphenation,
          PREFERENCES_KEY,
        ),
      )
      .toBe("auto");

    await page.reload();
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".prose-reader p").first()).toHaveCSS("text-align", "justify");
    await expect(page.locator("html")).toHaveClass(/sepia/);
  });

  test("expands the real reading area and navigates a two-column paged layout", async ({
    page,
  }) => {
    await gotoFirst(page);

    const article = page.locator("article.reader-area");
    const standardWidth = await article.evaluate(
      (element) => element.getBoundingClientRect().width,
    );
    await page.getByRole("button", { name: "Okuma ayarları" }).click();
    const dialog = page.getByRole("dialog", { name: "Okuma ayarları" });

    await dialog
      .getByRole("group", { name: "Okuma alanı" })
      // "Geniş" is a substring of "Ekstra Geniş": the role name match must be exact.
      .getByRole("button", { name: "Geniş", exact: true })
      .click();
    await expect
      .poll(() => article.evaluate((element) => element.getBoundingClientRect().width))
      .toBeGreaterThan(standardWidth + 60);

    const wideWidth = await article.evaluate((element) => element.getBoundingClientRect().width);
    await dialog
      .getByRole("group", { name: "Okuma alanı" })
      .getByRole("button", { name: "Tam" })
      .click();
    // At this viewport the sidebar leaves ~960px, which the `ch`-based steps already
    // saturate, so "Tam" cannot be pixel-wider than "Geniş" here. Assert the setting
    // itself took effect and that the column really fills the space it is given.
    await expect
      .poll(() =>
        page.evaluate(() => document.documentElement.style.getPropertyValue("--reader-flow-width")),
      )
      .toBe("100%");
    const filled = await page.evaluate(() => ({
      article: Math.round(
        document.querySelector("article.reader-area")!.getBoundingClientRect().width,
      ),
      available: Math.round(document.querySelector("main")!.getBoundingClientRect().width),
    }));
    expect(filled.article).toBe(filled.available);
    expect(filled.article).toBeGreaterThanOrEqual(wideWidth);

    await dialog
      .getByRole("group", { name: "Okuma düzeni" })
      .getByRole("button", { name: "Sayfalı" })
      .click();
    await expect(page.locator(".reader-shell")).toHaveAttribute("data-reading-mode", "paged");
    await expect(page.locator(".prose-reader")).toHaveCSS("column-count", "2");

    await page.getByRole("button", { name: "Okuma ayarları" }).click();
    const pager = page.getByRole("navigation", { name: "Sayfa gezintisi" });
    await expect(pager).toBeVisible();
    const nextPage = pager.getByRole("button", { name: "Sonraki sayfa" });
    await expect(nextPage).toBeEnabled();

    const before = await page.locator(".prose-reader").evaluate((element) => element.scrollLeft);
    await nextPage.click();
    await expect
      .poll(() => page.locator(".prose-reader").evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(before);
    await expect(pager).toContainText("Sayfa 2 /");
    await expect
      .poll(() =>
        page.evaluate(
          ([key, articleId]) =>
            JSON.parse(window.localStorage.getItem(key) ?? "{}")?.progress?.[articleId]
              ?.scrollRatio ?? 0,
          [READER_DATA_KEY, first.articleId],
        ),
      )
      .toBeGreaterThan(0.15);

    await expect
      .poll(() =>
        page.evaluate(
          (key) => JSON.parse(window.localStorage.getItem(key) ?? "{}")?.readingMode,
          PREFERENCES_KEY,
        ),
      )
      .toBe("paged");

    await page.reload();
    await expect(page.locator(".reader-shell")).toHaveAttribute("data-reading-mode", "paged");
    const restoredPager = page.getByRole("navigation", { name: "Sayfa gezintisi" });
    await expect(restoredPager).toBeVisible();
    await expect(restoredPager).toContainText("Sayfa 2 /");
    await expect
      .poll(() => page.locator(".prose-reader").evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0);
  });

  test("holds the paged reader inside one viewport, with the chapter controls at hand", async ({
    page,
  }) => {
    await usePagedMode(page);
    await gotoFirst(page);
    await expect(page.locator(".reader-shell")).toHaveAttribute("data-reading-mode", "paged");
    const pager = page.getByRole("navigation", { name: "Sayfa gezintisi" });
    await expect(pager).toBeVisible();

    const frame = await page.evaluate(() => {
      const prose = document.querySelector(".prose-reader") as HTMLElement;
      return {
        documentOverflow: document.documentElement.scrollHeight - window.innerHeight,
        proseOverflowY: window.getComputedStyle(prose).overflowY,
        proseVerticalOverflow: prose.scrollHeight - prose.clientHeight,
        pagerBottom: Math.round(
          document.querySelector(".reader-pager")!.getBoundingClientRect().bottom,
        ),
        viewport: window.innerHeight,
      };
    });
    expect(frame.documentOverflow).toBeLessThanOrEqual(1);
    expect(frame.proseOverflowY).toBe("hidden");
    expect(frame.proseVerticalOverflow).toBeLessThanOrEqual(1);
    // The pager is the last thing in the frame: if it fits, everything above it does.
    expect(frame.pagerBottom).toBeLessThanOrEqual(frame.viewport);

    // Both controls that used to sit under the article are reachable without scrolling.
    await expect(page.locator("main footer")).toBeHidden();
    await expect(chapterNavigation(page).locator('a[rel="next"]')).toBeVisible();
    const completion = page.locator('header button[aria-label="Tamamlandı olarak işaretle"]');
    await expect(completion).toBeVisible();
    await completion.click();
    await expect(page.locator('header button[aria-label="Tamamlandı"]')).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  test("turns exactly one page per scroll gesture and stops at the covers", async ({ page }) => {
    await usePagedMode(page);
    await gotoFirst(page);
    const pager = page.getByRole("navigation", { name: "Sayfa gezintisi" });
    await expect(pager).toBeVisible();
    const total = Number((await pagerPosition(page)).split("/")[1].trim());
    expect(total).toBeGreaterThan(2);

    // A trackpad flick and its momentum: one page, not a handful.
    await flick(page, 300);
    await expect(pager).toContainText("Sayfa 2 /");
    await page.waitForTimeout(500);
    await flick(page, 300);
    await expect(pager).toContainText("Sayfa 3 /");

    // A classic mouse wheel over the text, through the real input pipeline.
    const box = (await page.locator(".prose-reader").boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(400);
    await page.mouse.wheel(0, 120);
    await expect(pager).toContainText("Sayfa 4 /");

    await page.waitForTimeout(500);
    await flick(page, -300);
    await expect(pager).toContainText("Sayfa 3 /");

    // The first page is a wall, and scrolling into it may not scroll the window either.
    await page.getByRole("button", { name: "Önceki sayfa" }).click();
    await page.getByRole("button", { name: "Önceki sayfa" }).click();
    await expect(pager).toContainText("Sayfa 1 /");
    await page.waitForTimeout(500);
    await flick(page, -300);
    await page.waitForTimeout(300);
    await expect(pager).toContainText("Sayfa 1 /");
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    await expect
      .poll(() => page.locator(".prose-reader").evaluate((element) => element.scrollLeft))
      .toBe(0);

    // Keyboard: the keys that would scroll a flowing article turn pages instead.
    await page.locator("main").click({ position: { x: 5, y: 5 } });
    await page.keyboard.press("ArrowDown");
    await expect(pager).toContainText("Sayfa 2 /");
    await page.keyboard.press("ArrowUp");
    await expect(pager).toContainText("Sayfa 1 /");

    // The last page is the other wall.
    const nextPage = page.getByRole("button", { name: "Sonraki sayfa" });
    for (let index = 0; index < total + 2 && (await nextPage.isEnabled()); index += 1) {
      await nextPage.click();
    }
    await expect(pager).toContainText(`Sayfa ${total} / ${total}`);
    await page.waitForTimeout(500);
    await flick(page, 300);
    await page.waitForTimeout(300);
    await expect(pager).toContainText(`Sayfa ${total} / ${total}`);
  });

  test("leaves the reading list's own scrolling alone", async ({ page }) => {
    await usePagedMode(page);
    await gotoFirst(page);
    const pager = page.getByRole("navigation", { name: "Sayfa gezintisi" });
    await expect(pager).toBeVisible();
    const list = page.locator("aside div.overflow-y-auto");
    await list.evaluate((element) => {
      element.scrollTop = 0;
    });

    const box = (await list.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.wheel(0, 240);
    await page.waitForTimeout(300);

    expect(await list.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
    await expect(pager).toContainText("Sayfa 1 /");

    // A wide element inside the article — a table, a diagram — keeps the sideways
    // gesture it can absorb, and gives up the one it cannot.
    await page.evaluate(() => {
      const host = document.createElement("div");
      host.id = "probe-scroller";
      host.style.cssText = "overflow-x:auto;width:200px;height:48px";
      host.innerHTML = '<div style="width:2000px;height:40px"></div>';
      document.querySelector(".prose-reader")!.prepend(host);
    });
    const scroller = page.locator("#probe-scroller");
    const scrollerBox = (await scroller.boundingBox())!;
    await page.mouse.move(scrollerBox.x + scrollerBox.width / 2, scrollerBox.y + 8);
    await page.mouse.wheel(150, 0);
    await expect.poll(() => scroller.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
    await expect(pager).toContainText("Sayfa 1 /");

    await page.waitForTimeout(400);
    await page.mouse.wheel(0, 150);
    await expect(pager).toContainText("Sayfa 2 /");
  });

  test("returns a real 404 for an unknown slug", async ({ page }) => {
    const response = await page.goto("/read/bilinmeyen-bir-slug");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Bölüm bulunamadı")).toBeVisible();
  });
});

test.describe("mobile reader", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test("opens the drawer, selects a chapter, and closes", async ({ page }) => {
    await gotoFirst(page);

    await expect(page.locator("aside")).toBeHidden();
    await page.getByRole("button", { name: "Okuma listesini aç" }).click();

    const dialog = page.getByRole("dialog", { name: "Okuma listesi" });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "Sınıflandırma 00 · 18 makale" }),
    ).toBeVisible();

    const focusedInDialog = await page.evaluate(
      () => !!document.activeElement?.closest('[role="dialog"]'),
    );
    expect(focusedInDialog).toBe(true);

    await dialog.locator(`a[href="/read/${second.slug}"]`).click();
    await page.waitForURL(`**/read/${second.slug}`);
    await expect(page.getByRole("dialog", { name: "Okuma listesi" })).toBeHidden();
  });

  test("closes the drawer on Escape and returns focus to the trigger", async ({ page }) => {
    await gotoFirst(page);

    const trigger = page.getByRole("button", { name: "Okuma listesini aç" });
    await trigger.click();
    await expect(page.getByRole("dialog", { name: "Okuma listesi" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Okuma listesi" })).toBeHidden();

    const triggerFocused = await page.evaluate(
      () => document.activeElement?.getAttribute("aria-label") === "Okuma listesini aç",
    );
    expect(triggerFocused).toBe(true);
  });

  test("keeps the chapter controls under the article, where the toolbar has no room", async ({
    page,
  }) => {
    await gotoFirst(page);

    const footer = page.locator("main footer");
    await expect(footer).toBeVisible();
    await expect(footer.getByRole("button", { name: "Tamamlandı olarak işaretle" })).toBeVisible();
    await expect(chapterNavigation(page).locator('a[rel="next"]')).toBeVisible();

    const fit = await page.evaluate(() => {
      const header = document.querySelector("header .reader-area") as HTMLElement;
      const chapter = header.querySelector("p") as HTMLElement;
      return {
        headerOverflow: header.scrollWidth - header.clientWidth,
        documentOverflow:
          document.documentElement.scrollWidth - document.documentElement.clientWidth,
        chapterClipped: chapter.scrollWidth - chapter.clientWidth,
      };
    });
    expect(fit.headerOverflow).toBe(0);
    expect(fit.documentOverflow).toBe(0);
    expect(fit.chapterClipped).toBe(0);
  });

  test("preserves paged preference while using the mobile flow fallback", async ({ page }) => {
    await gotoFirst(page);
    await page.getByRole("button", { name: "Okuma ayarları" }).click();
    const dialog = page.getByRole("dialog", { name: "Okuma ayarları" });
    await dialog
      .getByRole("group", { name: "Okuma düzeni" })
      .getByRole("button", { name: "Sayfalı" })
      .click();

    await expect(page.locator(".reader-shell")).toHaveAttribute("data-reading-mode", "flow");
    await expect(page.getByRole("navigation", { name: "Sayfa gezintisi" })).toHaveCount(0);
    await expect
      .poll(() =>
        page.evaluate(
          (key) => JSON.parse(window.localStorage.getItem(key) ?? "{}")?.readingMode,
          PREFERENCES_KEY,
        ),
      )
      .toBe("paged");
  });
});
