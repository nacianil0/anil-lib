import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

type CatalogArticle = {
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
const TEST_PASSWORD = "test-reader-pass";

async function authenticate(page: Page) {
  await page.goto("/login");
  await page.locator('input[name="password"]').fill(TEST_PASSWORD);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(/\/read\//);
}

async function gotoFirst(page: Page) {
  await page.goto(`/read/${first.slug}`);
  await expect(page.locator("main h1")).toBeVisible();
}

test.describe("desktop reader", () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test("redirects the root to the first article on a fresh visit", async ({ page }) => {
    await page.goto("/");
    await page.waitForURL(/\/read\/.+/);
    expect(new URL(page.url()).pathname).toBe(`/read/${first.slug}`);
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

    const footerNav = page.getByRole("navigation", { name: "Bölümler arası gezinme" });
    await expect(footerNav.locator('[aria-disabled="true"]')).toBeVisible();

    await footerNav.locator('a[rel="next"]').click();
    await page.waitForURL(`**/read/${second.slug}`);

    await page
      .getByRole("navigation", { name: "Bölümler arası gezinme" })
      .locator('a[rel="prev"]')
      .click();
    await page.waitForURL(`**/read/${first.slug}`);
  });

  test("next navigation crosses a classification batch boundary", async ({ page }) => {
    test.skip(firstBatchBoundary < 1, "The fixture has no post-baseline batch yet");
    const beforeBoundary = ordered[firstBatchBoundary - 1];
    const afterBoundary = ordered[firstBatchBoundary];

    await page.goto(`/read/${beforeBoundary.slug}`);
    await expect(page.locator("main h1")).toBeVisible();
    await page
      .getByRole("navigation", { name: "Bölümler arası gezinme" })
      .locator('a[rel="next"]')
      .click();
    await page.waitForURL(`**/read/${afterBoundary.slug}`);
  });

  test("restores the article and scroll position after reload", async ({ page }) => {
    await gotoFirst(page);
    await page.evaluate(() => window.scrollTo(0, 1600));
    await page.waitForTimeout(600);

    await page.reload();
    await expect(page.locator("main h1")).toBeVisible();
    await page.waitForTimeout(1000);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(600);
  });

  test("persists completion across reload and reflects it in the sidebar", async ({ page }) => {
    await gotoFirst(page);

    const completeButton = page.getByRole("button", { name: /Tamamlandı olarak işaretle/ });
    const pressed = page.locator('main button[aria-pressed="true"]');
    // Retry the toggle until React has hydrated the handler; click only while
    // it is still unpressed so a retry never flips completion back off.
    await expect(async () => {
      if ((await pressed.count()) === 0) {
        await completeButton.click();
      }
      await expect(pressed).toBeVisible({ timeout: 800 });
    }).toPass({ timeout: 10_000 });

    await page.reload();
    await expect(page.locator('main button[aria-pressed="true"]')).toBeVisible();
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

    await dialog
      .getByRole("group", { name: "Metin hizası" })
      .getByRole("button", { name: "İki yana" })
      .click();
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

    const paragraph = page.locator(".prose-reader p").first();
    await expect(paragraph).toHaveCSS("text-align", "justify");
    await expect(paragraph).toHaveCSS("hyphens", "auto");

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
          (key) => JSON.parse(window.localStorage.getItem(key) ?? "{}")?.textAlign,
          PREFERENCES_KEY,
        ),
      )
      .toBe("justify");

    await page.reload();
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".prose-reader p").first()).toHaveCSS("text-align", "justify");
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
});
