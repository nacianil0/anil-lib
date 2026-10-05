import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

type Article = { articleId: string; slug: string; readingOrder: number };
function catalog(folder: string): Article[] {
  const data = JSON.parse(
    readFileSync(path.join(process.cwd(), "content", folder, "catalog.json"), "utf8"),
  ) as { articles: Article[] };
  return data.articles.sort((a, b) => a.readingOrder - b.readingOrder);
}
const ai = catalog("series");
const boun = catalog("series-boun");
const key = "anil-lib:reader-data:v2:owner";
const device = "11111111-1111-4111-8111-111111111111";
const highlightId = "22222222-2222-4222-8222-222222222222";
const at = "2026-10-01T10:00:00.000Z";

async function prepare(page: Page) {
  await page.addInitScript(
    ({ key, device, highlightId, at, ids }) => {
      if (sessionStorage.getItem("series-reset-seeded")) return;
      sessionStorage.setItem("series-reset-seeded", "1");
      const progress = Object.fromEntries(
        ids.map((id, index) => [
          id,
          {
            articleId: id,
            headingId: null,
            scrollRatio: index % 2 ? 0.4 : 1,
            completed: index % 2 === 0,
            lastReadAt: at,
            clientUpdatedAt: at,
            deviceId: device,
            changeVersion: 20 + index,
          },
        ]),
      );
      localStorage.setItem(
        key,
        JSON.stringify({
          version: 2,
          workspaceId: "owner",
          deviceId: device,
          cursor: 40,
          resetVersion: 0,
          seriesResets: [],
          currentArticleId: ids[1],
          progress,
          savedPlaces: {
            [ids[0]]: {
              articleId: ids[0],
              headingId: null,
              scrollRatio: 0.5,
              previewText: "yer imi",
              clientUpdatedAt: at,
              deviceId: device,
              deletedAt: null,
              changeVersion: 30,
            },
          },
          highlights: {
            [highlightId]: {
              id: highlightId,
              articleId: ids[0],
              exactText: "korunan vurgu",
              createdAt: at,
              clientUpdatedAt: at,
              deviceId: device,
              deletedAt: null,
              changeVersion: 31,
            },
          },
          outbox: [],
          lastSyncAt: at,
        }),
      );
    },
    {
      key,
      device,
      highlightId,
      at,
      ids: [ai[0].articleId, ai[1].articleId, boun[0].articleId, boun[1].articleId],
    },
  );
  await page.goto("/login?next=%2Fseri");
  await page.locator('input[name="username"]').fill("anil");
  await page.locator('input[name="password"]').fill("test-reader-pass");
  await page.locator('button[type="submit"]').click();
  await page.waitForURL((url) => !url.pathname.startsWith("/login"));
}

for (const mobile of [false, true]) {
  for (const seriesId of ["ai", "boun"] as const) {
    test(`${seriesId} scoped reset with confirmation (${mobile ? "mobile" : "desktop"})`, async ({
      page,
    }, testInfo) => {
      if (mobile) await page.setViewportSize({ width: 390, height: 844 });
      const selected = seriesId === "ai" ? ai : boun;
      const other = seriesId === "ai" ? boun : ai;
      const basePath = seriesId === "ai" ? "/seri" : "/boun";
      let resetCalls = 0;
      let seriesResets: Array<{ seriesId: string; resetVersion: number; articleIds: string[] }> =
        [];
      await page.route("**/api/reader-sync", async (route) => {
        const request = route.request().postDataJSON();
        await route.fulfill({
          json: {
            cursor: 50,
            resetVersion: 0,
            seriesResets,
            acknowledged: request.operations.map(
              (operation: { operationId: string }) => operation.operationId,
            ),
            errors: [],
            changes: { progress: [], savedPlaces: [], highlights: [] },
            serverTime: new Date().toISOString(),
          },
        });
      });
      await page.route("**/api/reader-reset", async (route) => {
        resetCalls += 1;
        expect(route.request().postDataJSON()).toEqual({ seriesId });
        const reset = {
          seriesId,
          resetVersion: 70,
          articleIds: selected.map((article) => article.articleId),
        };
        seriesResets = [reset];
        await route.fulfill({ json: { reset, progress: 2 } });
      });
      await prepare(page);
      if (seriesId === "boun") await page.goto(basePath);
      const arm = page.getByRole("button", { name: "İlerlemeyi sıfırla", exact: true });
      await expect(arm).toBeEnabled();
      await arm.dblclick();
      expect(resetCalls).toBe(0);
      // The second pointer can hit harmless text or cancel after layout changes.
      // Reload proves neither gesture confirmed a persistent reset.
      await page.reload();
      await expect(arm).toBeEnabled();
      await arm.click();
      const cancel = page.getByRole("button", { name: "Vazgeç", exact: true });
      await expect(cancel).toBeFocused();
      expect(resetCalls).toBe(0);
      await page.keyboard.press("Escape");
      await expect(arm).toBeFocused();
      expect(resetCalls).toBe(0);
      await arm.click();
      await expect(cancel).toBeFocused();
      await page.screenshot({ path: testInfo.outputPath("confirmation.png") });
      await page.waitForTimeout(550); // Deliberate rapid-click guard, separate confirmation required.
      await page.getByRole("button", { name: "Evet, bu seriyi sıfırla", exact: true }).click();
      await expect(
        page.getByRole("status").filter({ hasText: "İlerlemen sıfırlandı" }),
      ).toBeVisible();
      expect(resetCalls).toBe(1);
      await expect(page.getByRole("link", { name: "Seriye başla", exact: true })).toHaveAttribute(
        "href",
        `${basePath}/${selected[0].slug}`,
      );
      const data = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), key);
      expect(selected.every((article) => !data.progress[article.articleId])).toBe(true);
      expect(data.progress[other[0].articleId].completed).toBe(true);
      expect(data.progress[other[1].articleId].scrollRatio).toBe(0.4);
      expect(data.savedPlaces[ai[0].articleId].deletedAt).toBeNull();
      expect(data.highlights[highlightId].exactText).toBe("korunan vurgu");
      await page.screenshot({ path: testInfo.outputPath("success.png") });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    });
  }
}

test("failed series reset leaves existing reading intact", async ({ page }) => {
  await page.route("**/api/reader-sync", (route) =>
    route.fulfill({
      json: {
        cursor: 40,
        resetVersion: 0,
        acknowledged: [],
        errors: [],
        changes: { progress: [], savedPlaces: [], highlights: [] },
        serverTime: at,
      },
    }),
  );
  await page.route("**/api/reader-reset", (route) =>
    route.fulfill({ status: 503, json: { error: "reset_unavailable" } }),
  );
  await prepare(page);
  await page.getByRole("button", { name: "İlerlemeyi sıfırla", exact: true }).click();
  await page.waitForTimeout(550);
  await page.getByRole("button", { name: "Evet, bu seriyi sıfırla", exact: true }).click();
  await expect(page.getByRole("alert").filter({ hasText: "İlerleme sıfırlanamadı" })).toBeVisible();
  const data = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), key);
  expect(data.progress[ai[0].articleId].completed).toBe(true);
  expect(data.progress[boun[0].articleId].completed).toBe(true);
  await expect(
    page.getByRole("button", { name: "Evet, bu seriyi sıfırla", exact: true }),
  ).toBeEnabled();
});
