import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

/**
 * What a visitor without an account gets: the front page and the whole AI series,
 * by direct link and in server-rendered HTML; nothing else. Runs against the plain
 * e2e server (no database), so only the anonymous side and the owner are covered
 * here; the database-backed account matrix is exercised separately.
 */
const catalog = JSON.parse(
  readFileSync(path.join(process.cwd(), "content", "series", "catalog.json"), "utf8"),
) as { articles: Array<{ slug: string; title: string; readingOrder: number }> };
const ordered = [...catalog.articles].sort((a, b) => a.readingOrder - b.readingOrder);
const FIRST = ordered[0];
const SECOND = ordered[1];
const LOCAL_KEY = "anil-lib:reader-data:v2:local";

function sameOriginOnly(page: Page, origin: string): string[] {
  const foreign: string[] = [];
  page.on("request", (request) => {
    const url = request.url();
    if (url.startsWith("data:") || url.startsWith("blob:")) return;
    if (new URL(url).origin !== origin) foreign.push(url);
  });
  return foreign;
}

/**
 * A wheel event goes to whatever is under the pointer; at (0, 0) that is the sidebar's
 * own scrolling list. Put the pointer over the article column first.
 */
async function scrollArticle(page: Page, pixels: number) {
  const viewport = page.viewportSize() ?? { width: 1280, height: 900 };
  await page.mouse.move(Math.round(viewport.width * 0.65), Math.round(viewport.height / 2));
  await page.mouse.wheel(0, pixels);
}

/**
 * The reader marks the open article as current once it has hydrated; scrolling before
 * that moment is lost when it restores the start position. Wait for the mark.
 */
async function waitForReader(page: Page) {
  await expect
    .poll(() =>
      page.evaluate((key) => {
        const raw = window.localStorage.getItem(key);
        return raw
          ? ((JSON.parse(raw) as { currentArticleId: string | null }).currentArticleId ?? null)
          : null;
      }, LOCAL_KEY),
    )
    .not.toBeNull();
}

test.describe("anonymous visitor", () => {
  test("reads the front page, the series index and an article without signing in", async ({
    page,
    baseURL,
  }) => {
    const foreign = sameOriginOnly(page, new URL(baseURL!).origin);

    await page.goto("/");
    expect(new URL(page.url()).pathname).toBe("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("kaynağıyla okumak");
    await expect(page.getByRole("link", { name: "Seriye baştan başla" })).toHaveAttribute(
      "href",
      `/seri/${FIRST.slug}`,
    );

    await page.goto("/seri");
    expect(new URL(page.url()).pathname).toBe("/seri");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Sıfırdan Yüze");

    await page.goto(`/seri/${SECOND.slug}`);
    expect(new URL(page.url()).pathname).toBe(`/seri/${SECOND.slug}`);
    await expect(page.locator("main h1")).toContainText(SECOND.title);
    // The sign-in shortcut replaces the lock for a visitor without an account.
    await expect(page.locator('aside a[aria-label="Giriş yap"]')).toBeVisible();

    // No cookie is written while reading without an account, and nothing loads from elsewhere.
    expect(await page.context().cookies()).toEqual([]);
    expect(foreign).toEqual([]);
  });

  test("gets the article's full text, canonical and structured data in the HTML itself", async ({
    request,
  }) => {
    const response = await request.get(`/seri/${FIRST.slug}`, { maxRedirects: 0 });
    expect(response.status()).toBe(200);
    expect(response.headers()["cache-control"]).toMatch(/private|no-store/);
    const html = await response.text();
    expect(html).toContain(FIRST.title);
    expect(html).toContain("Kaynakça");
    expect(html).toMatch(/<link rel="canonical" href="[^"]*\/seri\/[^"]+"/);
    expect(html).toMatch(/<meta name="robots" content="index, follow"/);
    expect(html).toContain('"@type":"Article"');
  });

  test.describe("everything else stays behind the gate", () => {
    for (const target of [
      "/guvenlik",
      "/guvenlik/owasp-top-10-2025-i-okumak",
      "/boun",
      "/read",
      "/yonetim",
      "/hesap",
    ]) {
      test(`${target} redirects to login`, async ({ request }) => {
        const response = await request.get(target, { maxRedirects: 0 });
        expect([302, 307]).toContain(response.status());
        const location = new URL(response.headers().location, "http://x");
        expect(location.pathname).toBe("/login");
        expect(location.searchParams.get("next")).toBe(target);
      });
    }

    test("the reader APIs refuse an anonymous request", async ({ request }) => {
      for (const api of ["/api/reader-sync", "/api/reader-reset"]) {
        const response = await request.post(api, { data: {}, maxRedirects: 0 });
        expect([302, 307, 401], api).toContain(response.status());
        expect(await response.text(), api).not.toContain("progress");
      }
    });

    test("an unknown series path is not public", async ({ request }) => {
      const response = await request.get("/seri/var-olmayan-bir-yazi", { maxRedirects: 0 });
      expect(response.status()).toBe(404);
    });
  });

  test("robots.txt and the sitemap name only public pages", async ({ request }) => {
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toMatch(/Allow: \//);
    expect(robots).toMatch(/Disallow: \/yonetim/);
    expect(robots).toMatch(/Sitemap: .*\/sitemap\.xml/);

    const sitemap = await (await request.get("/sitemap.xml")).text();
    const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => new URL(match[1]).pathname,
    );
    expect(urls.filter((url) => url.startsWith("/seri/"))).toHaveLength(catalog.articles.length);
    expect(urls).toContain("/");
    expect(urls).toContain("/gizlilik");
    for (const url of urls) {
      expect(url).not.toMatch(/^\/(guvenlik|boun|read|yonetim|hesap|api|login|kayit)/);
    }
  });
});

test.describe("reading memory without an account", () => {
  test("remembers the article and place across a reload and a browser restart", async ({
    page,
    browser,
  }) => {
    await page.goto(`/seri/${SECOND.slug}`);
    await expect(page.locator("main h1")).toContainText(SECOND.title);
    await waitForReader(page);
    await scrollArticle(page, 2400);
    await expect
      .poll(async () =>
        page.evaluate((key) => {
          const raw = window.localStorage.getItem(key);
          if (!raw) return 0;
          const data = JSON.parse(raw) as {
            progress: Record<string, { scrollRatio: number }>;
          };
          return Object.values(data.progress)[0]?.scrollRatio ?? 0;
        }, LOCAL_KEY),
      )
      .toBeGreaterThan(0.02);

    await page.reload();
    await expect(page.locator("main h1")).toContainText(SECOND.title);

    // A new browser context restored from the same storage: what a closed and
    // reopened browser keeps.
    const state = await page.context().storageState();
    const reopened = await browser.newContext({ storageState: state });
    const again = await reopened.newPage();
    await again.goto("/");
    const card = again.getByRole("region", { name: "Bu tarayıcıda kaldığın yer" });
    await expect(card).toBeVisible();
    await expect(card).toContainText(SECOND.title);
    await expect(card.getByRole("link")).toHaveAttribute("href", `/seri/${SECOND.slug}`);
    await reopened.close();
  });

  test("a first visit shows no resume card", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("region", { name: "Bu tarayıcıda kaldığın yer" })).toHaveCount(0);
  });

  test("still renders every page when the browser blocks storage", async ({ page }) => {
    await page.addInitScript(() => {
      const blocked = () => {
        throw new DOMException("The operation is insecure.", "SecurityError");
      };
      Object.defineProperty(window, "localStorage", { get: blocked, configurable: true });
    });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    for (const target of ["/", "/seri", `/seri/${FIRST.slug}`, "/gizlilik"]) {
      await page.goto(target);
      await expect(page.locator("h1").first(), target).toBeVisible();
    }
    await expect(page.getByText("Bu tarayıcı yerel depolamayı engelliyor")).toBeVisible();
    expect(errors).toEqual([]);
  });

  test("the privacy page can turn local memory off and clear it", async ({ page }) => {
    await page.goto(`/seri/${FIRST.slug}`);
    await expect
      .poll(() => page.evaluate((key) => window.localStorage.getItem(key), LOCAL_KEY))
      .not.toBeNull();

    await page.goto("/gizlilik");
    const toggle = page.getByLabel(/kaldığım yeri bu tarayıcıda sakla/);
    await expect(toggle).toBeChecked();
    await toggle.uncheck();
    await expect(page.getByRole("status").filter({ hasText: "Kapatıldı" })).toBeVisible();
    expect(await page.evaluate((key) => window.localStorage.getItem(key), LOCAL_KEY)).toBeNull();

    // Reading on keeps nothing now.
    await page.goto(`/seri/${FIRST.slug}`);
    await scrollArticle(page, 1600);
    await page.waitForTimeout(600);
    expect(await page.evaluate((key) => window.localStorage.getItem(key), LOCAL_KEY)).toBeNull();
  });

  test("the series page resets local progress without a server", async ({ page }) => {
    await page.goto(`/seri/${FIRST.slug}`);
    await waitForReader(page);
    await scrollArticle(page, 2400);
    await expect
      .poll(() => page.evaluate((key) => window.localStorage.getItem(key), LOCAL_KEY))
      .not.toBeNull();

    await page.goto("/seri");
    await expect(
      page.getByRole("link", { name: /Kaldığın yerden devam et|Sonraki bölüm/ }),
    ).toBeVisible();
    await page.getByRole("button", { name: "İlerlemeyi sıfırla" }).click();
    await page.waitForTimeout(600);
    await page.getByRole("button", { name: "Evet, bu seriyi sıfırla" }).click();
    await expect(page.getByText("İlerlemen sıfırlandı.")).toBeVisible();
    await expect(page.getByRole("link", { name: /Seriye başla/ })).toBeVisible();
  });
});

test.describe("front page on a phone", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("has no horizontal overflow", async ({ page }) => {
    for (const target of ["/", "/gizlilik", "/kayit", "/hesap-kurtar", "/login"]) {
      await page.goto(target);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, target).toBeLessThanOrEqual(0);
    }
  });
});
