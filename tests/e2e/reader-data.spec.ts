import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type BrowserContext, type Page } from "@playwright/test";

const catalog = JSON.parse(
  readFileSync(path.join(process.cwd(), "content", "catalog.json"), "utf8"),
) as { articles: Array<{ slug: string; title: string }> };
const first = catalog.articles[0];
const second = catalog.articles[1];
const TEST_PASSWORD = "test-reader-pass";
const QUOTE = "Modern yapay zekâ, tek bir mucizevi buluşun ürünü değildir";

async function authenticate(page: Page, next = `/read/${first.slug}`) {
  await page.goto(`/login?next=${encodeURIComponent(next)}`);
  await page.locator('input[name="password"]').fill(TEST_PASSWORD);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL((url) => url.pathname === next.split("?")[0]);
}

async function waitForSync(page: Page) {
  await expect(page.getByRole("button", { name: "Senkronize" })).toBeVisible({ timeout: 15_000 });
}

async function savePlace(page: Page) {
  const save = page.getByRole("button", { name: "Burada kaldım" });
  const update = page.getByRole("button", { name: "Kaldığım yeri güncelle" });
  if (await save.isVisible()) await save.click();
  else await update.click();
}

test.describe("synced reader data", () => {
  test("saves an explicit place and exposes it on the dashboard", async ({ page }) => {
    await authenticate(page);
    await page.evaluate(() => window.scrollTo(0, 1200));
    await savePlace(page);

    await page.goto("/");
    await expect(page.locator(`a[href="/read/${first.slug}?place=1"]`)).toBeVisible();
  });

  test("creates a text highlight and deep-links back to it", async ({ page }) => {
    await authenticate(page);
    const paragraph = page.locator(".prose-reader p").first();
    await paragraph.evaluate((element, quote) => {
      const text = element.firstChild;
      if (!text) throw new Error("Paragraph has no text node");
      const source = text.textContent ?? "";
      const start = source.indexOf(quote);
      const range = document.createRange();
      range.setStart(text, start);
      range.setEnd(text, start + quote.length);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    }, QUOTE);

    await page.getByRole("button", { name: "İşaretle", exact: true }).click();
    const highlightId = await page.evaluate((quote) => {
      const data = JSON.parse(window.localStorage.getItem("anil-lib:reader-data:v2") ?? "{}");
      const matches = Object.values(data.highlights ?? {}) as Array<{
        id: string;
        exactText: string;
        createdAt: string;
      }>;
      return matches
        .filter((item) => item.exactText === quote)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0]?.id;
    }, QUOTE);
    expect(highlightId).toBeTruthy();
    await page.getByRole("button", { name: "İşaretler" }).click();
    await expect(page.getByRole("dialog", { name: "İşaretler" })).toContainText(QUOTE);

    await page.goto("/");
    const highlightLink = page.locator(`a[href="/read/${first.slug}?highlight=${highlightId}"]`);
    await expect(highlightLink).toBeVisible();
    await highlightLink.click();
    await expect(page).toHaveURL(/\?highlight=/);
    await expect(page.locator(".prose-reader p").first()).toBeVisible();
  });

  test("synchronizes a saved place between isolated devices", async ({ browser }) => {
    const contextA: BrowserContext = await browser.newContext();
    const contextB: BrowserContext = await browser.newContext();
    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();
    try {
      await authenticate(pageA, `/read/${second.slug}`);
      await savePlace(pageA);
      await waitForSync(pageA);

      await authenticate(pageB, `/read/${second.slug}`);
      await waitForSync(pageB);
      await pageB.getByRole("button", { name: "İşaretler" }).click();
      await expect(pageB.getByRole("dialog", { name: "İşaretler" })).toContainText("Kaldığım yer");
    } finally {
      await contextA.close();
      await contextB.close();
    }
  });

  test("keeps marking available offline and syncs after reconnect", async ({ page }) => {
    await authenticate(page);
    await page.context().setOffline(true);
    await savePlace(page);

    await page.getByRole("button", { name: "İşaretler" }).click();
    await expect(page.getByRole("dialog", { name: "İşaretler" })).toContainText("Kaldığım yer");
    await expect(page.getByRole("button", { name: "Çevrimdışı" })).toBeVisible();

    await page.context().setOffline(false);
    await waitForSync(page);
  });
});
