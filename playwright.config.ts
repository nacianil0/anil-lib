import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3100);
const BASE_URL = `http://127.0.0.1:${PORT}`;

const TEST_PASSWORD_HASH = "2e10d6962af01967e05f84ac752471d0db86b9123ff0e32536d31102f2cef855";
const TEST_COOKIE_SECRET = "e2e-test-signing-secret-must-be-at-least-32-chars-long";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [["list"]],
  outputDir: "./test-results",
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } },
    },
  ],
  webServer: {
    command: `pnpm exec next dev -p ${PORT} -H 127.0.0.1`,
    url: BASE_URL,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
    env: {
      SITE_PASSWORD_SHA256: TEST_PASSWORD_HASH,
      AUTH_COOKIE_SECRET: TEST_COOKIE_SECRET,
    },
  },
});
