import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

/**
 * The frame around the reading: one header on every page outside the reader, a way
 * home from every dead end, a way on at the end of every chapter, and controls that
 * say what they do. Runs as a visitor without an account against the plain e2e
 * server (PUBLIC_LAUNCH=1, no database).
 */
const catalog = JSON.parse(
  readFileSync(path.join(process.cwd(), "content", "series", "catalog.json"), "utf8"),
) as { articles: Array<{ slug: string; title: string; readingOrder: number }> };
const ordered = [...catalog.articles].sort((a, b) => a.readingOrder - b.readingOrder);
const FIRST = ordered[0];
const SECOND = ordered[1];
const MIDDLE = ordered[Math.floor(ordered.length / 2)];
const LAST = ordered[ordered.length - 1];
const PREFERENCES_KEY = "anil-lib:reader-preferences:v1";

/** The reader has hydrated once its toolbar lists the chapter's headings. */
async function waitForReader(page: Page) {
  await expect(page.getByRole("button", { name: "İçindekiler" })).toBeVisible();
}

test.describe("site header", () => {
  test("every page outside the reader leads home and offers the way in", async ({ page }) => {
    for (const target of ["/", "/seri", "/gizlilik", "/kayit", "/login", "/hesap-kurtar"]) {
      await page.goto(target);
      const banner = page.getByRole("banner");
      await expect(
        banner.getByRole("link", { name: "Anıl Lib", exact: true }),
        target,
      ).toHaveAttribute("href", "/");
      await expect(banner.getByRole("link", { name: "Giriş", exact: true }), target).toBeVisible();
      await expect(
        banner.getByRole("link", { name: "Hesap aç", exact: true }),
        target,
      ).toBeVisible();
      await expect(page.locator("main#main"), target).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 }), target).toHaveCount(1);
    }
  });

  test("the series page signs in back to itself, not to the front page", async ({ page }) => {
    await page.goto("/seri");
    const banner = page.getByRole("banner");
    await expect(banner.getByRole("link", { name: "Giriş", exact: true })).toHaveAttribute(
      "href",
      "/login?next=%2Fseri",
    );
    await expect(banner.getByRole("link", { name: "Hesap aç", exact: true })).toHaveAttribute(
      "href",
      "/kayit?next=%2Fseri",
    );
  });

  test("the skip link is the first stop and moves focus into the page", async ({ page }) => {
    await page.goto("/seri");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "İçeriğe geç" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#main")).toBeFocused();
  });
});

test.describe("series page", () => {
  test("a first visit is not offered to reset progress it does not have", async ({ page }) => {
    await page.goto("/seri");
    await expect(page.getByRole("link", { name: "Seriye başla", exact: true })).toBeVisible();
    // Where the reading is kept is said in words, with the page that explains it.
    await expect(page.getByText("ilerlemen yalnızca bu tarayıcıda saklanır")).toBeVisible();
    await expect(page.getByRole("link", { name: "Nasıl çalışır?" })).toHaveAttribute(
      "href",
      "/gizlilik#yerel-okuma",
    );
    await expect(page.getByRole("button", { name: "İlerlemeyi sıfırla" })).toHaveCount(0);
  });
});

test.describe("not found", () => {
  test("an unknown chapter leads to pages anyone may open", async ({ page }) => {
    const response = await page.goto("/seri/var-olmayan-bir-yazi");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sayfa bulunamadı");
    const main = page.locator("main");
    await expect(main.getByRole("link", { name: "Ana sayfaya dön" })).toHaveAttribute("href", "/");
    await expect(main.getByRole("link", { name: "Yapay Zekâ Serisi" })).toHaveAttribute(
      "href",
      "/seri",
    );
    // The archive is behind the owner's account: a link there would be a sign-in wall.
    await expect(page.locator('a[href^="/read"]')).toHaveCount(0);
  });
});

test.describe("end of a chapter on a wide screen", () => {
  test("says which chapter comes next where the text ends", async ({ page }) => {
    await page.goto(`/seri/${FIRST.slug}`);
    await waitForReader(page);
    const end = page.getByRole("region", { name: "Sıradaki bölüm" });
    await expect(end).toBeVisible();
    const next = end.getByRole("link", { name: new RegExp(escape(SECOND.title)) });
    await expect(next).toHaveAttribute("href", `/seri/${SECOND.slug}`);
    await expect(end.getByRole("link", { name: "Yol haritasına dön" })).toHaveAttribute(
      "href",
      "/seri",
    );
    // Still one chapter-navigation landmark: the toolbar's.
    await expect(page.getByRole("navigation", { name: "Bölümler arası gezinme" })).toHaveCount(1);

    await next.click();
    await page.waitForURL(`**/seri/${SECOND.slug}`);
    await expect(page.locator("main h1")).toContainText(SECOND.title);
  });

  test("the last chapter says so instead of pointing nowhere", async ({ page }) => {
    await page.goto(`/seri/${LAST.slug}`);
    await waitForReader(page);
    const end = page.getByRole("region", { name: "Bölümün sonu" });
    await expect(end).toBeVisible();
    await expect(end).toContainText("Serinin yayımlanan son bölümündesin.");
    await expect(end.locator('a[rel="next"]')).toHaveCount(0);
  });

  test("the paged layout keeps its controls in the toolbar and adds nothing below", async ({
    page,
  }) => {
    await page.addInitScript(
      ([key, value]) => window.localStorage.setItem(key, value),
      [
        PREFERENCES_KEY,
        JSON.stringify({
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
        }),
      ],
    );
    await page.goto(`/seri/${FIRST.slug}`);
    await expect(page.getByRole("navigation", { name: "Sayfa gezintisi" })).toBeVisible();
    await expect(page.getByRole("region", { name: "Sıradaki bölüm" })).toHaveCount(0);
  });
});

test.describe("reading list", () => {
  test("names its way back and opens on the chapter being read", async ({ page }) => {
    await page.goto(`/seri/${MIDDLE.slug}`);
    await waitForReader(page);
    const aside = page.locator("aside");
    await expect(aside.getByRole("link", { name: "Yol haritası" })).toHaveAttribute(
      "href",
      "/seri",
    );
    // The current chapter and the one after it are both in view in the list.
    const list = aside.locator("div.overflow-y-auto");
    const visible = await list.evaluate((element) => {
      const box = element.getBoundingClientRect();
      const current = element.querySelector('[aria-current="page"]')!.closest("li")!;
      const following = (current.nextElementSibling ??
        current.closest("section")?.nextElementSibling?.querySelector("li")) as HTMLElement;
      const inside = (node: Element) => {
        const rect = node.getBoundingClientRect();
        return rect.top >= box.top && rect.bottom <= box.bottom;
      };
      return { current: inside(current), following: inside(following) };
    });
    expect(visible).toEqual({ current: true, following: true });
  });
});

test.describe("sign-in form", () => {
  test("ties the error to the fields it is about", async ({ page }) => {
    await page.goto("/login?error=invalid");
    // Scoped to the page: Next's route announcer is an alert region of its own.
    await expect(page.locator("main").getByRole("alert")).toHaveText(
      "Kullanıcı adı veya parola hatalı.",
    );
    for (const label of ["Kullanıcı adı", "Parola"]) {
      const field = page.getByLabel(label, { exact: true });
      await expect(field).toHaveAttribute("aria-describedby", "login-error");
      await expect(field).toHaveAttribute("aria-invalid", "true");
    }
    await expect(page.getByLabel("Kullanıcı adı", { exact: true })).toBeFocused();
  });
});

test.describe("narrow screens", () => {
  test.use({ viewport: { width: 320, height: 640 } });

  test("nothing scrolls sideways at 320px", async ({ page }) => {
    for (const target of [
      "/",
      "/seri",
      "/login",
      "/kayit",
      "/seri/var-olmayan-bir-yazi",
      "/seri/kendi-egitim-kosun-tokenizer-veri-ve-dongu",
    ]) {
      await page.goto(target);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, target).toBe(0);
    }
  });

  test("keeps the chapter controls under the article, not the wide-screen block", async ({
    page,
  }) => {
    await page.goto(`/seri/${FIRST.slug}`);
    await expect(page.locator("main footer")).toBeVisible();
    await expect(page.getByRole("region", { name: "Sıradaki bölüm" })).toBeHidden();
  });
});

function escape(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
