import { expect, test, type Page } from "@playwright/test";

const TEST_PASSWORD = "test-reader-pass";
const WRONG_PASSWORD = "wrong-password-123";

async function loginWith(page: Page, password: string) {
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').click();
}

async function authenticate(page: Page) {
  await page.goto("/login?next=/read/modern-yapay-zeka-birikim-ve-donum-noktalari");
  await loginWith(page, TEST_PASSWORD);
  await page.waitForURL((url) => url.pathname.startsWith("/read/"));
}

test.describe("password gate", () => {
  test("unauthenticated article request redirects to /login with next", async ({ page }) => {
    await page.goto("/read/modern-yapay-zeka-birikim-ve-donum-noktalari");
    const url = new URL(page.url());
    expect(url.pathname).toBe("/login");
    expect(url.searchParams.get("next")).toContain("/read/");
  });

  test("login page renders with the expected elements", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("h1")).toContainText("Yapay Zekâyı Okumak");
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText("Kilidi aç");
  });

  test("wrong password shows error and does not set cookie", async ({ page }) => {
    await page.goto("/login?next=/");
    await loginWith(page, WRONG_PASSWORD);
    await page.waitForURL(/error=invalid/);
    await expect(page.getByText("Şifre eşleşmedi.")).toBeVisible();

    const cookies = await page.context().cookies();
    const authCookie = cookies.find((c) => c.name === "anil_lib_auth");
    expect(authCookie).toBeUndefined();
  });

  test("correct password redirects to requested article with httpOnly cookie", async ({ page }) => {
    await page.goto("/login?next=/read/modern-yapay-zeka-birikim-ve-donum-noktalari");
    await loginWith(page, TEST_PASSWORD);
    await page.waitForURL((url) => url.pathname.startsWith("/read/"));
    expect(page.url()).toContain("modern-yapay-zeka");

    const jsAccess = await page.evaluate(() => document.cookie);
    expect(jsAccess).not.toContain("anil_lib_auth");
  });

  test("authenticated session can access articles", async ({ page }) => {
    await authenticate(page);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("aside")).toBeVisible();
  });

  test("lock button clears session and returns to login", async ({ page }) => {
    await authenticate(page);

    await page.locator('aside button[aria-label="Kilidi kapat"]').click();
    await page.waitForURL(/\/login/);

    const cookies = await page.context().cookies();
    const authCookie = cookies.find((c) => c.name === "anil_lib_auth");
    expect(authCookie).toBeUndefined();
  });

  test("root dashboard preserves through login", async ({ page }) => {
    await page.goto("/");
    const url = new URL(page.url());
    if (url.pathname === "/login") {
      await loginWith(page, TEST_PASSWORD);
      await page.waitForURL((nextUrl) => nextUrl.pathname === "/");
    }
    await expect(page.getByRole("heading", { name: "Kaldığım yerler" })).toBeVisible();
  });
});

test.describe("password gate mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("login page renders without clipping on mobile", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    const button = page.locator('button[type="submit"]');
    const box = await button.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(390);
  });

  test("mobile lock button works after login", async ({ page }) => {
    await authenticate(page);

    await page.getByRole("button", { name: "Okuma listesini aç" }).click();
    const dialog = page.getByRole("dialog", { name: "Okuma listesi" });
    await expect(dialog).toBeVisible();

    await dialog
      .locator('button[aria-label="Kilidi kapat"]')
      .evaluate((b) => (b as HTMLButtonElement).closest("form")?.requestSubmit());
    await page.waitForURL(/\/login/);
  });
});
