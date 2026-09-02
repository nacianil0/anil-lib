import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

type CatalogArticle = { articleId: string; slug: string; readingOrder: number };

const catalog = JSON.parse(
  readFileSync(path.join(process.cwd(), "content", "catalog.json"), "utf8"),
) as { articles: CatalogArticle[] };

const first = [...catalog.articles].sort((a, b) => a.readingOrder - b.readingOrder)[0];
const READER_DATA_KEY = "anil-lib:reader-data:v2:owner";
const PREFERENCES_KEY = "anil-lib:reader-preferences:v1";
const TEST_PASSWORD = "test-reader-pass";
const TEST_USERNAME = "anil";

/** Toolbar offset + the gap the reader restores with; see `use-reader-layout`. */
const READING_LINE = 76;
/** A paragraph is ~100–150px tall, so this tolerance still proves paragraph accuracy. */
const TOLERANCE = 40;
/** The dev server compiles a route on first visit, which can outrun the default wait. */
const COMPILE_TIMEOUT = 30_000;

async function authenticate(page: Page) {
  await page.goto(`/login?next=/read/${first.slug}`);
  await page.locator('input[name="username"]').fill(TEST_USERNAME);
  await page.locator('input[name="password"]').fill(TEST_PASSWORD);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL((url) => url.pathname.startsWith("/read/"));
  await expect(page.locator("main h1")).toBeVisible({ timeout: COMPILE_TIMEOUT });
}

/** Puts the paragraph at `fraction` of the article on the reading line, and returns it. */
async function readUntil(page: Page, fraction: number): Promise<string> {
  return page.evaluate((share) => {
    const blocks = Array.from(document.querySelectorAll<HTMLElement>(".prose-reader p"));
    const block = blocks[Math.floor(blocks.length * share)];
    block.scrollIntoView({ block: "start", behavior: "instant" });
    // scrollIntoView leaves the block flush with the viewport top; drop it to where
    // the reader actually reads, just under the sticky toolbar.
    window.scrollBy(0, -88);
    return (block.textContent ?? "").slice(0, 60);
  }, fraction);
}

function storedAnchorText(page: Page) {
  return page.evaluate(
    ([key, articleId]) =>
      (JSON.parse(window.localStorage.getItem(key) ?? "{}")?.progress?.[articleId]?.anchor
        ?.exactText ?? "") as string,
    [READER_DATA_KEY, first.articleId],
  );
}

/** Where the paragraph starting with `text` currently sits in the viewport. */
function paragraphTop(page: Page, text: string) {
  return page.evaluate((needle) => {
    const block = Array.from(document.querySelectorAll<HTMLElement>(".prose-reader p")).find(
      (candidate) => (candidate.textContent ?? "").startsWith(needle),
    );
    return block ? block.getBoundingClientRect().top : null;
  }, text);
}

test.describe("precise resume", () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test("returns to the paragraph that was being read, not the top of its section", async ({
    page,
  }) => {
    const paragraph = await readUntil(page, 0.6);
    await expect.poll(() => storedAnchorText(page)).toContain(paragraph);

    // The stored position must be an anchor into the text, not only a heading.
    const stored = await page.evaluate(
      ([key, articleId]) =>
        JSON.parse(window.localStorage.getItem(key) ?? "{}")?.progress?.[articleId],
      [READER_DATA_KEY, first.articleId],
    );
    expect(stored.anchor.blockIndex).toBeGreaterThan(0);

    await page.reload();
    await expect(page.locator("main h1")).toBeVisible({ timeout: COMPILE_TIMEOUT });

    await expect.poll(() => paragraphTop(page, paragraph)).not.toBeNull();
    const top = await paragraphTop(page, paragraph);
    expect(Math.abs(top! - READING_LINE)).toBeLessThan(TOLERANCE);
  });

  test("holds the place while the text reflows under a bigger font", async ({ page }) => {
    const paragraph = await readUntil(page, 0.5);
    await expect.poll(() => storedAnchorText(page)).toContain(paragraph);

    await page.getByRole("button", { name: "Okuma ayarları" }).click();
    const dialog = page.getByRole("dialog", { name: "Okuma ayarları" });
    const bigger = dialog.getByRole("button", { name: "Metni büyüt" });
    await bigger.click();
    await bigger.click();
    await bigger.click();
    await expect
      .poll(() =>
        page.evaluate(
          (key) => JSON.parse(window.localStorage.getItem(key) ?? "{}")?.fontScale,
          PREFERENCES_KEY,
        ),
      )
      .toBe("huge");

    // Same words, much taller text: the reader must not have been shifted off them.
    await expect.poll(() => paragraphTop(page, paragraph)).not.toBeNull();
    const afterReflow = await paragraphTop(page, paragraph);
    expect(Math.abs(afterReflow! - READING_LINE)).toBeLessThan(TOLERANCE);
  });

  test("resolves the saved position again after a font change and a reload", async ({ page }) => {
    const paragraph = await readUntil(page, 0.45);
    await expect.poll(() => storedAnchorText(page)).toContain(paragraph);

    await page.getByRole("button", { name: "Okuma ayarları" }).click();
    const dialog = page.getByRole("dialog", { name: "Okuma ayarları" });
    await dialog
      .getByRole("group", { name: "Satır aralığı" })
      .getByRole("button", { name: "Ferah" })
      .click();
    await dialog
      .getByRole("group", { name: "Okuma alanı" })
      .getByRole("button", { name: "Ekstra Geniş" })
      .click();
    await dialog.getByRole("button", { name: "Ayarları kapat" }).click();

    await page.reload();
    await expect(page.locator("main h1")).toBeVisible({ timeout: COMPILE_TIMEOUT });

    await expect.poll(() => paragraphTop(page, paragraph)).not.toBeNull();
    const top = await paragraphTop(page, paragraph);
    expect(Math.abs(top! - READING_LINE)).toBeLessThan(TOLERANCE);
  });

  test("tells the reader where they were brought back to", async ({ page }) => {
    const paragraph = await readUntil(page, 0.55);
    await expect.poll(() => storedAnchorText(page)).toContain(paragraph);

    await page.reload();
    const notice = page.getByRole("status");
    await expect(notice).toBeVisible();
    await expect(notice).toContainText(paragraph.trim().slice(0, 25));
  });

  test("starting over really starts over, on this load and the next", async ({ page }) => {
    await readUntil(page, 0.5);
    await expect.poll(() => storedAnchorText(page)).not.toBe("");

    await page.reload();
    await page.getByRole("button", { name: "Baştan başla" }).click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(20);

    // The position now points at the opening paragraph again, not deep in the text.
    await expect
      .poll(() =>
        page.evaluate(
          ([key, articleId]) =>
            JSON.parse(window.localStorage.getItem(key) ?? "{}")?.progress?.[articleId]?.anchor
              ?.blockIndex ?? -1,
          [READER_DATA_KEY, first.articleId],
        ),
      )
      .toBe(0);

    await page.reload();
    await expect(page.locator("main h1")).toBeVisible({ timeout: COMPILE_TIMEOUT });
    await page.waitForTimeout(1200);
    // Nothing to return to, so the reader is left looking at the title.
    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(20);
    await expect(page.getByRole("status")).toHaveCount(0);
  });

  test("an explicit saved place returns to its own paragraph", async ({ page }) => {
    const paragraph = await readUntil(page, 0.65);
    await page.getByRole("button", { name: "Burada kaldım" }).click();

    // The bookmark stores the anchored paragraph, and previews it with the same text.
    await expect
      .poll(() =>
        page.evaluate(
          ([key, articleId]) => {
            const place = JSON.parse(window.localStorage.getItem(key) ?? "{}")?.savedPlaces?.[
              articleId
            ];
            return { text: place?.anchor?.exactText ?? "", preview: place?.previewText ?? "" };
          },
          [READER_DATA_KEY, first.articleId],
        ),
      )
      .toMatchObject({ text: expect.stringContaining(paragraph) });

    // Leave, then follow the dashboard's deep link back to the bookmark.
    await page.goto("/");
    await page.goto(`/read/${first.slug}?place=1`);
    await expect(page.locator("main h1")).toBeVisible({ timeout: COMPILE_TIMEOUT });

    await expect.poll(() => paragraphTop(page, paragraph)).not.toBeNull();
    const top = await paragraphTop(page, paragraph);
    expect(Math.abs(top! - READING_LINE)).toBeLessThan(TOLERANCE);
  });

  test("falls back safely for a position stored before anchoring existed", async ({ page }) => {
    const heading = await page.evaluate(
      () => document.querySelector(".prose-reader h2[id]")?.id ?? null,
    );
    // A record in the old shape: heading + ratio only, no anchor field at all.
    await page.addInitScript(
      ([key, articleId, headingId]) => {
        const now = new Date().toISOString();
        window.localStorage.setItem(
          key!,
          JSON.stringify({
            version: 2,
            workspaceId: "owner",
            deviceId: "11111111-1111-4111-8111-111111111111",
            cursor: 0,
            currentArticleId: articleId,
            progress: {
              [articleId!]: {
                articleId,
                headingId,
                scrollRatio: 0.5,
                completed: false,
                lastReadAt: now,
                clientUpdatedAt: now,
                deviceId: "11111111-1111-4111-8111-111111111111",
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
      [READER_DATA_KEY, first.articleId, heading],
    );

    await page.goto(`/read/${first.slug}`);
    await expect(page.locator("main h1")).toBeVisible({ timeout: COMPILE_TIMEOUT });
    await expect(page.locator("aside")).toBeVisible();
    // The old record still restores, and it is no longer pinned to the heading top.
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(400);
  });

  test("an unresolvable anchor degrades to the coarse position without breaking", async ({
    page,
  }) => {
    await page.addInitScript(
      ([key, articleId]) => {
        const now = new Date().toISOString();
        window.localStorage.setItem(
          key!,
          JSON.stringify({
            version: 2,
            workspaceId: "owner",
            deviceId: "11111111-1111-4111-8111-111111111111",
            cursor: 0,
            currentArticleId: articleId,
            progress: {
              [articleId!]: {
                articleId,
                headingId: null,
                scrollRatio: 0.4,
                anchor: {
                  exactText: "Bu cümle bu makalede kesinlikle yok, silinmiş bir paragraftandır.",
                  prefixText: "",
                  suffixText: "",
                  blockIndex: 4000,
                  blockOffset: 0.5,
                },
                completed: false,
                lastReadAt: now,
                clientUpdatedAt: now,
                deviceId: "11111111-1111-4111-8111-111111111111",
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
      [READER_DATA_KEY, first.articleId],
    );

    await page.goto(`/read/${first.slug}`);
    await expect(page.locator("main h1")).toBeVisible({ timeout: COMPILE_TIMEOUT });
    await expect(page.locator(".prose-reader p").first()).toBeVisible();
    // It fell back to the ratio rather than refusing to restore or throwing.
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);
  });
});

test.describe("precise resume on a phone", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await authenticate(page);
  });

  test("anchors and restores the same paragraph at a phone width", async ({ page }) => {
    const paragraph = await readUntil(page, 0.5);
    await expect.poll(() => storedAnchorText(page)).toContain(paragraph);

    await page.reload();
    await expect(page.locator("main h1")).toBeVisible({ timeout: COMPILE_TIMEOUT });

    await expect.poll(() => paragraphTop(page, paragraph)).not.toBeNull();
    const top = await paragraphTop(page, paragraph);
    expect(Math.abs(top! - READING_LINE)).toBeLessThan(TOLERANCE);
  });

  test("the toolbar still shows which chapter is open", async ({ page }) => {
    const chapter = page.locator("header p").first();
    await expect(chapter).toContainText("Bölüm");
    // The label used to be squeezed to a few pixels between the drawer button and
    // the icon row; it must render in full at this width.
    const fits = await chapter.evaluate((element) => {
      const inner = element.querySelector("span")!;
      const probe = document.createElement("span");
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:nowrap";
      probe.className = element.className.replace("truncate", "");
      probe.textContent = inner.textContent;
      document.body.appendChild(probe);
      const needed = Math.ceil(probe.getBoundingClientRect().width);
      probe.remove();
      return { needed, available: element.clientWidth };
    });
    expect(fits.available).toBeGreaterThanOrEqual(fits.needed);
  });

  test("the settings sheet covers the width without pushing the page sideways", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Okuma ayarları" }).click();
    const dialog = page.getByRole("dialog", { name: "Okuma ayarları" });
    await expect(dialog).toBeVisible();

    const box = await dialog.boundingBox();
    const viewport = page.viewportSize()!;
    expect(box!.x).toBe(0);
    expect(Math.round(box!.width)).toBe(viewport.width);
    expect(Math.round(box!.y + box!.height)).toBe(viewport.height);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth),
    ).toBe(false);

    // A sheet with no visible way out is a trap on a touch screen.
    await dialog.getByRole("button", { name: "Ayarları kapat" }).click();
    await expect(dialog).toBeHidden();
  });
});

test.describe("precise resume on a tablet", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test("the settings panel stays inside the viewport", async ({ page }) => {
    await authenticate(page);
    await page.getByRole("button", { name: "Okuma ayarları" }).click();
    const dialog = page.getByRole("dialog", { name: "Okuma ayarları" });
    await expect(dialog).toBeVisible();

    const box = await dialog.boundingBox();
    const viewport = page.viewportSize()!;
    // It used to be anchored to the trigger and hang 41px off the left edge here.
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width);
    expect(box!.y + box!.height).toBeLessThanOrEqual(viewport.height);
  });
});
