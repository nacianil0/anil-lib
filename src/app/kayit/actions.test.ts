// @vitest-environment node

import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ database: vi.fn(), headers: vi.fn() }));
vi.mock("@/lib/db/client", () => ({ getDatabaseClient: mocks.database }));
vi.mock("next/headers", () => ({ headers: mocks.headers, cookies: vi.fn() }));

const { registerAction } = await import("./actions");
const { recoverAction } = await import("../hesap-kurtar/actions");

const form = () => {
  const data = new FormData();
  data.set("username", "okur");
  data.set("password", "uzun ve akılda kalan bir parola");
  data.set("confirm", "uzun ve akılda kalan bir parola");
  data.set("code", "00000-00000-00000-00000-00000");
  return data;
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe("sign-up and recovery before the launch", () => {
  // Server actions answer through any path, so the closed middleware alone would not stop them.
  it("refuse without touching the database while PUBLIC_LAUNCH is unset", async () => {
    vi.stubEnv("PUBLIC_LAUNCH", "");
    vi.stubEnv("SITE_PASSWORD_SHA256", "a".repeat(64));
    vi.stubEnv("AUTH_COOKIE_SECRET", "s".repeat(40));
    mocks.database.mockReturnValue({ query: vi.fn(), transaction: vi.fn() });

    expect(await registerAction({ status: "idle" }, form())).toMatchObject({
      status: "error",
      message: "Hesap açma şu anda kullanılamıyor.",
    });
    expect(await recoverAction({ status: "idle" }, form())).toMatchObject({
      status: "error",
      message: "Hesap kurtarma şu anda kullanılamıyor.",
    });
    expect(mocks.headers).not.toHaveBeenCalled();
    const sql = mocks.database.mock.results[0]?.value as { query: ReturnType<typeof vi.fn> };
    expect(sql.query).not.toHaveBeenCalled();
  });
});
