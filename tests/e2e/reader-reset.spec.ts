import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page, type Route } from "@playwright/test";

/**
 * An owner can reset an account's reading progress (/yonetim). Each device learns it
 * on its next sync. A device that has already put the reader back at a place stored
 * before the reset must not write that place — or the completion it implies — back.
 *
 * The sync endpoint is answered here, so no database is needed.
 */

type CatalogArticle = { articleId: string; slug: string; readingOrder: number; revisedAt?: string };

const catalog = JSON.parse(
  readFileSync(path.join(process.cwd(), "content", "series", "catalog.json"), "utf8"),
) as { articles: CatalogArticle[] };
// A long, never-revised chapter, so only the resume pill sits above the text.
const article = [...catalog.articles]
  .sort((a, b) => a.readingOrder - b.readingOrder)
  .find((entry) => !entry.revisedAt && entry.readingOrder >= 20)!;

const READER_DATA_KEY = "anil-lib:reader-data:v2:owner";
const PREFERENCES_KEY = "anil-lib:reader-preferences:v1";
const DEVICE = "11111111-1111-4111-8111-111111111111";
const COMPILE_TIMEOUT = 30_000;
const EARLIER = "2026-09-01T10:00:00.000Z";

type SyncBody = {
  cursor: number;
  resetVersion: number | null;
  operations: Array<{ operationId: string; entityId: string; payload: { completed?: boolean } }>;
};

async function authenticate(page: Page) {
  await page.goto("/login?next=%2Fseri");
  await page.locator('input[name="username"]').fill("anil");
  await page.locator('input[name="password"]').fill("test-reader-pass");
  await page.locator('button[type="submit"]').click();
  await page.waitForURL((url) => !url.pathname.startsWith("/login"));
}

/** A reader who finished the chapter halfway down the page, on this device, before the reset. */
async function seedFinishedChapter(page: Page) {
  await page.addInitScript(
    ([dataKey, prefsKey, id, at, device]) => {
      if (window.sessionStorage.getItem("reset-seeded")) return;
      window.sessionStorage.setItem("reset-seeded", "1");
      window.localStorage.setItem(
        prefsKey!,
        JSON.stringify({ version: 1, theme: "light", readingMode: "flow", lineGuide: false }),
      );
      window.localStorage.setItem(
        dataKey!,
        JSON.stringify({
          version: 2,
          workspaceId: "owner",
          deviceId: device,
          cursor: 40,
          resetVersion: 0,
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
              changeVersion: 30,
            },
          },
          savedPlaces: {},
          highlights: {},
          outbox: [],
          lastSyncAt: at,
        }),
      );
    },
    [READER_DATA_KEY, PREFERENCES_KEY, article.articleId, EARLIER, DEVICE],
  );
}

/**
 * Answers every sync with `resetVersion`, none before `gate` opens — including one
 * still coming from the page the login landed on.
 */
async function answerSync(page: Page, resetVersion: number, gate: Promise<void>) {
  const requests: SyncBody[] = [];
  await page.route("**/api/reader-sync", async (route: Route) => {
    const body = route.request().postDataJSON() as SyncBody;
    requests.push(body);
    await gate;
    await route.fulfill({
      json: {
        cursor: 70 + requests.length,
        resetVersion,
        acknowledged: body.operations.map((operation) => operation.operationId),
        errors: [],
        changes: { progress: [], savedPlaces: [], highlights: [] },
        serverTime: new Date().toISOString(),
      },
    });
  });
  return requests;
}

async function storedEntry(page: Page) {
  return page.evaluate(
    ([key, id]) => JSON.parse(window.localStorage.getItem(key!) ?? "{}")?.progress?.[id!] ?? null,
    [READER_DATA_KEY, article.articleId],
  );
}

test.describe("progress reset reaching a device mid-visit", () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test("a place restored from before the reset is left, and not saved back", async ({ page }) => {
    await seedFinishedChapter(page);
    let release!: () => void;
    const requests = await answerSync(page, 5, new Promise<void>((resolve) => (release = resolve)));

    await page.goto(`/seri/${article.slug}`);
    // The stale place is restored before the device hears about the reset.
    await expect(page.getByRole("button", { name: "Baştan başla" })).toBeVisible({
      timeout: COMPILE_TIMEOUT,
    });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(400);

    const sentBeforeReset = requests.length;
    release();

    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 10_000 }).toBeLessThan(80);
    await expect(page.getByRole("button", { name: "Baştan başla" })).toHaveCount(0);
    await expect.poll(() => storedEntry(page)).toMatchObject({ completed: false });

    // Reading on from the top keeps it unfinished; nothing old is written back.
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(1_000);
    const entry = await storedEntry(page);
    expect(entry.completed).toBe(false);
    expect(entry.scrollRatio).toBeLessThan(0.5);

    const afterReset = requests.slice(sentBeforeReset);
    expect(afterReset.length).toBeGreaterThan(0);
    expect(afterReset.every((request) => request.resetVersion === 5)).toBe(true);
    const sentCompleted = afterReset.flatMap((request) =>
      request.operations.filter(
        (operation) => operation.entityId === article.articleId && operation.payload.completed,
      ),
    );
    expect(sentCompleted).toEqual([]);
  });

  test("without a reset, the restored place stays where it was", async ({ page }) => {
    await seedFinishedChapter(page);
    let release!: () => void;
    await answerSync(page, 0, new Promise<void>((resolve) => (release = resolve)));

    await page.goto(`/seri/${article.slug}`);
    await expect(page.getByRole("button", { name: "Baştan başla" })).toBeVisible({
      timeout: COMPILE_TIMEOUT,
    });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(400);
    const restoredY = await page.evaluate(() => window.scrollY);

    release();
    await page.waitForTimeout(1_500);

    expect(Math.abs((await page.evaluate(() => window.scrollY)) - restoredY)).toBeLessThan(40);
    expect(await storedEntry(page)).toMatchObject({ completed: true });
  });
});
