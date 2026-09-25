import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

/**
 * Editorial revision notice (docs/seri/SOZLESME.md §12). The notice is read-only
 * metadata: it tells a returning reader that an article changed since they read it,
 * and it must never move, reset or rewrite their saved progress.
 */

type CatalogArticle = {
  articleId: string;
  slug: string;
  readingOrder: number;
  revisedAt?: string;
  revisionNote?: string;
};

function load(dir: string): CatalogArticle[] {
  const file = path.join(process.cwd(), "content", dir, "catalog.json");
  const catalog = JSON.parse(readFileSync(file, "utf8")) as { articles: CatalogArticle[] };
  return [...catalog.articles].sort((a, b) => a.readingOrder - b.readingOrder);
}

const aiArticles = load("series");
const revised = aiArticles.find((a) => a.revisedAt && a.revisionNote);
const untouched = aiArticles.find((a) => !a.revisedAt);

const READER_DATA_KEY = "anil-lib:reader-data:v2:owner";
const PREFERENCES_KEY = "anil-lib:reader-preferences:v1";
const DEVICE = "11111111-1111-4111-8111-111111111111";
const COMPILE_TIMEOUT = 30_000;
const PREFERENCES = {
  version: 1,
  theme: "light",
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
  await page.goto("/login?next=%2Fseri");
  await page.locator('input[name="username"]').fill("anil");
  await page.locator('input[name="password"]').fill("test-reader-pass");
  await page.locator('button[type="submit"]').click();
  await page.waitForURL((url) => !url.pathname.startsWith("/login"));
}

async function seedPreferences(page: Page, overrides: Record<string, unknown> = {}) {
  await page.addInitScript(
    ([key, value]) => {
      try {
        window.localStorage.setItem(key as string, value as string);
      } catch {
        /* ignore */
      }
    },
    [PREFERENCES_KEY, JSON.stringify({ ...PREFERENCES, ...overrides })],
  );
}

/** A reader who got halfway through the article a week before it was revised. */
async function seedEarlierReading(page: Page, articleId: string, revisedAt: string) {
  const before = new Date(`${revisedAt}T12:00:00Z`);
  before.setUTCDate(before.getUTCDate() - 7);
  await page.addInitScript(
    ([key, id, at, device]) => {
      if (window.sessionStorage.getItem("revision-seeded")) return;
      window.sessionStorage.setItem("revision-seeded", "1");
      window.localStorage.setItem(
        key!,
        JSON.stringify({
          version: 2,
          workspaceId: "owner",
          deviceId: device,
          cursor: 0,
          currentArticleId: id,
          progress: {
            [id!]: {
              articleId: id,
              headingId: null,
              scrollRatio: 0.5,
              completed: true,
              lastReadAt: at,
              clientUpdatedAt: at,
              deviceId: device,
              changeVersion: 0,
            },
          },
          savedPlaces: {},
          highlights: {},
          outbox: [],
          lastSyncAt: null,
        }),
      );
    },
    [READER_DATA_KEY, articleId, before.toISOString(), DEVICE],
  );
}

test.describe("editorial revision notice", () => {
  test.skip(!revised, "no revised article in the AI series catalog");

  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test("a fresh reader sees a calm dated note and no personal mark", async ({ page }) => {
    await seedPreferences(page);
    await page.goto(`/seri/${revised!.slug}`);
    const notice = page.locator("aside.revision-notice");
    await expect(notice).toBeVisible({ timeout: COMPILE_TIMEOUT });
    await expect(notice).toContainText("Gözden geçirildi");
    await expect(notice).not.toContainText("Sen okuduktan sonra");
    await expect(notice).toContainText(revised!.revisionNote!);
    await expect(notice.locator("time")).toHaveAttribute("datetime", revised!.revisedAt!);
    // The notice sits outside the text the reader highlights and anchors to.
    expect(await page.locator(".prose-reader .revision-notice").count()).toBe(0);
  });

  test("a reader who read it before the revision is told, and keeps their progress", async ({
    page,
  }) => {
    await seedPreferences(page);
    await seedEarlierReading(page, revised!.articleId, revised!.revisedAt!);
    await page.goto(`/seri/${revised!.slug}`);

    const notice = page.locator("aside.revision-notice");
    await expect(notice).toContainText("Sen okuduktan sonra gözden geçirildi", {
      timeout: COMPILE_TIMEOUT,
    });
    await expect(notice).toHaveAttribute("data-since-read", "true");

    // The reader is put back mid-article, past the line above the text, so the resume
    // pill carries the same news.
    await expect(page.locator('[role="status"][data-revised-since-read="true"]')).toContainText(
      "Sen okuduktan sonra gözden geçirildi",
    );

    // Reading on refreshes lastReadAt; the wording must not flip mid-article.
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1500);
    await expect(notice).toHaveAttribute("data-since-read", "true");

    // The notice never writes: the finished state survives the visit.
    const entry = await page.evaluate(
      ([key, id]) => JSON.parse(window.localStorage.getItem(key!) ?? "{}")?.progress?.[id!],
      [READER_DATA_KEY, revised!.articleId],
    );
    expect(entry?.completed).toBe(true);
  });

  test("the series landing marks the changed article for that reader only", async ({ page }) => {
    await seedPreferences(page);
    await seedEarlierReading(page, revised!.articleId, revised!.revisedAt!);
    await page.goto("/seri");
    const link = page.locator(`main a[href="/seri/${revised!.slug}"]`).first();
    await expect(link).toContainText("yenilendi", { timeout: COMPILE_TIMEOUT });
    // Everything else stays unmarked.
    expect(await page.locator("main a", { hasText: "yenilendi" }).count()).toBe(1);
  });

  test("a never-revised article shows no notice", async ({ page }) => {
    test.skip(!untouched, "every article is revised");
    await seedPreferences(page);
    await page.goto(`/seri/${untouched!.slug}`);
    await expect(page.locator(".prose-reader h2").first()).toBeVisible({
      timeout: COMPILE_TIMEOUT,
    });
    expect(await page.locator("aside.revision-notice").count()).toBe(0);
  });
});
