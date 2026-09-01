import { expect, test, type Page } from "@playwright/test";

const TEST_USERNAME = "anil";
const TEST_PASSWORD = "test-reader-pass";
const WRONG_PASSWORD = "wrong-password-123";

async function loginWith(page: Page, username: string, password: string) {
  await page.locator('input[name="username"]').fill(username);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').click();
}

async function authenticate(page: Page) {
  await page.goto("/login?next=/read/modern-yapay-zeka-birikim-ve-donum-noktalari");
  await loginWith(page, TEST_USERNAME, TEST_PASSWORD);
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
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText("Kilidi aç");
  });

  test("wrong password shows a generic error and does not set a cookie", async ({ page }) => {
    await page.goto("/login?next=/");
    await loginWith(page, TEST_USERNAME, WRONG_PASSWORD);
    await page.waitForURL(/error=invalid/);
    await expect(page.getByText("Kullanıcı adı veya şifre hatalı.")).toBeVisible();

    const cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === "anil_lib_auth")).toBeUndefined();
  });

  test("an unknown username fails with the same message as a wrong password", async ({ page }) => {
    // Identical wording in both cases: the form must not reveal which usernames exist.
    await page.goto("/login?next=/");
    await loginWith(page, "nobody-here", TEST_PASSWORD);
    await page.waitForURL(/error=invalid/);
    await expect(page.getByText("Kullanıcı adı veya şifre hatalı.")).toBeVisible();

    const cookies = await page.context().cookies();
    expect(cookies.find((c) => c.name === "anil_lib_auth")).toBeUndefined();
  });

  test("correct credentials redirect to the requested article with an httpOnly cookie", async ({
    page,
  }) => {
    await page.goto("/login?next=/read/modern-yapay-zeka-birikim-ve-donum-noktalari");
    await loginWith(page, TEST_USERNAME, TEST_PASSWORD);
    await page.waitForURL((url) => url.pathname.startsWith("/read/"));
    expect(page.url()).toContain("modern-yapay-zeka");

    const jsAccess = await page.evaluate(() => document.cookie);
    expect(jsAccess).not.toContain("anil_lib_auth");
  });

  test("the username is accepted case-insensitively and with surrounding space", async ({
    page,
  }) => {
    await page.goto("/login?next=/");
    await loginWith(page, `  ${TEST_USERNAME.toUpperCase()} `, TEST_PASSWORD);
    await page.waitForURL((url) => url.pathname === "/");
    await expect(page.getByRole("heading", { name: "Kaldığım yerler" })).toBeVisible();
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
    expect(cookies.find((c) => c.name === "anil_lib_auth")).toBeUndefined();
  });

  test("root dashboard preserves through login", async ({ page }) => {
    await page.goto("/");
    const url = new URL(page.url());
    if (url.pathname === "/login") {
      await loginWith(page, TEST_USERNAME, TEST_PASSWORD);
      await page.waitForURL((nextUrl) => nextUrl.pathname === "/");
    }
    await expect(page.getByRole("heading", { name: "Kaldığım yerler" })).toBeVisible();
  });
});

test.describe("owner-only surfaces", () => {
  test("management is unreachable without a session", async ({ page }) => {
    await page.goto("/yonetim");
    expect(new URL(page.url()).pathname).toBe("/login");

    await page.goto("/yonetim/00000000-0000-4000-8000-00000000000a");
    expect(new URL(page.url()).pathname).toBe("/login");
  });

  test("the owner reaches management and the create-user form", async ({ page }) => {
    await page.goto("/login?next=/yonetim");
    await loginWith(page, TEST_USERNAME, TEST_PASSWORD);
    await page.waitForURL((url) => url.pathname === "/yonetim");

    await expect(page.getByRole("heading", { name: "Kullanıcılar", level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Yeni kullanıcı" })).toBeVisible();
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test("the management page never ships a password hash to the browser", async ({ page }) => {
    await page.goto("/login?next=/yonetim");
    await loginWith(page, TEST_USERNAME, TEST_PASSWORD);
    await page.waitForURL((url) => url.pathname === "/yonetim");

    const html = await page.content();
    expect(html).not.toContain("password_hash");
    expect(html).not.toContain("scrypt$");
    expect(html).not.toContain("hash_scheme");
    expect(html).not.toContain(TEST_PASSWORD);
  });

  test("the owner sees the archive entry and can open the archive index", async ({ page }) => {
    await page.goto("/login?next=/");
    await loginWith(page, TEST_USERNAME, TEST_PASSWORD);
    await page.waitForURL((url) => url.pathname === "/");

    await page.getByRole("link", { name: /Arşiv · \d+ seri öncesi yazı/ }).click();
    await page.waitForURL((url) => url.pathname === "/read");
    await expect(page.getByRole("heading", { name: "Arşiv", level: 1 })).toBeVisible();
  });
});

test.describe("per-account reader storage", () => {
  test("reader state is written under the account's namespaced key", async ({ page }) => {
    await authenticate(page);
    await expect(page.locator("main h1")).toBeVisible();

    await expect
      .poll(async () =>
        page.evaluate(() => window.localStorage.getItem("anil-lib:reader-data:v2:owner")),
      )
      .not.toBeNull();

    const stored = await page.evaluate(() =>
      window.localStorage.getItem("anil-lib:reader-data:v2:owner"),
    );
    expect(JSON.parse(stored!).workspaceId).toBe("owner");

    // The pre-multi-user key is never written to any more.
    const legacy = await page.evaluate(() =>
      window.localStorage.getItem("anil-lib:reader-data:v2"),
    );
    expect(legacy).toBeNull();
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
