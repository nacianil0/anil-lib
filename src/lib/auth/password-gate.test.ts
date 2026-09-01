import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  buildSignedSession,
  getGateConfig,
  hashLegacyPassword,
  isGateIntended,
  safeNextPath,
  verifyLegacyPasswordHash,
  verifySignedSession,
} from "./password-gate";

const TEST_PASSWORD = "test-reader-pass";
const TEST_HASH = "2e10d6962af01967e05f84ac752471d0db86b9123ff0e32536d31102f2cef855";
const TEST_SECRET = "a".repeat(64);
const OTHER_SECRET = "b".repeat(64);
const SESSION = { userId: "11111111-1111-4111-8111-111111111111", workspaceId: "owner" };

describe("hashLegacyPassword", () => {
  it("produces a 64-char lowercase hex SHA-256", async () => {
    const hash = await hashLegacyPassword(TEST_PASSWORD);
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
    expect(hash).toBe(TEST_HASH);
  });

  it("returns different hashes for different passwords", async () => {
    const a = await hashLegacyPassword("alpha");
    const b = await hashLegacyPassword("bravo");
    expect(a).not.toBe(b);
  });
});

describe("verifyLegacyPasswordHash", () => {
  it("accepts the correct password", async () => {
    expect(await verifyLegacyPasswordHash(TEST_PASSWORD, TEST_HASH)).toBe(true);
  });

  it("rejects a wrong password", async () => {
    expect(await verifyLegacyPasswordHash("wrong", TEST_HASH)).toBe(false);
  });

  it("rejects a malformed hash", async () => {
    expect(await verifyLegacyPasswordHash(TEST_PASSWORD, "not-a-hash")).toBe(false);
  });

  it("rejects an empty hash", async () => {
    expect(await verifyLegacyPasswordHash(TEST_PASSWORD, "")).toBe(false);
  });
});

describe("signed sessions", () => {
  it("round-trips: build then verify", async () => {
    const token = await buildSignedSession(TEST_SECRET, SESSION);
    expect(await verifySignedSession(token, TEST_SECRET)).toMatchObject(SESSION);
  });

  it("rejects an expired session", async () => {
    const eightDaysAgo = Date.now() - 8 * 24 * 60 * 60 * 1000;
    const token = await buildSignedSession(TEST_SECRET, SESSION, eightDaysAgo);
    expect(await verifySignedSession(token, TEST_SECRET)).toBeNull();
  });

  it("accepts a session just before expiry", async () => {
    const almostExpired = Date.now() - (AUTH_COOKIE_MAX_AGE_SECONDS * 1000 - 1000);
    const token = await buildSignedSession(TEST_SECRET, SESSION, almostExpired);
    expect(await verifySignedSession(token, TEST_SECRET)).toMatchObject(SESSION);
  });

  it("rejects a tampered payload", async () => {
    const token = await buildSignedSession(TEST_SECRET, SESSION);
    const [, sig] = token.split(".");
    const tampered = `dGFtcGVyZWQ.${sig}`;
    expect(await verifySignedSession(tampered, TEST_SECRET)).toBeNull();
  });

  it("rejects a tampered signature", async () => {
    const token = await buildSignedSession(TEST_SECRET, SESSION);
    const [payload] = token.split(".");
    const tampered = `${payload}.dGFtcGVyZWQ`;
    expect(await verifySignedSession(tampered, TEST_SECRET)).toBeNull();
  });

  it("rejects a different secret", async () => {
    const token = await buildSignedSession(TEST_SECRET, SESSION);
    expect(await verifySignedSession(token, OTHER_SECRET)).toBeNull();
  });

  it("rejects undefined cookie value", async () => {
    expect(await verifySignedSession(undefined, TEST_SECRET)).toBeNull();
  });

  it("rejects empty cookie value", async () => {
    expect(await verifySignedSession("", TEST_SECRET)).toBeNull();
  });

  it("rejects cookie with extra parts", async () => {
    const token = await buildSignedSession(TEST_SECRET, SESSION);
    expect(await verifySignedSession(`${token}.extra`, TEST_SECRET)).toBeNull();
  });

  it("rejects a correctly signed cookie that carries no identity", async () => {
    // Cookies minted before multi-user support contained only `{exp}`. Accepting one
    // would mean "any old cookie is the owner", so it must fail closed.
    const encoder = new TextEncoder();
    const payloadJson = JSON.stringify({ exp: Date.now() + 60_000 });
    const payload = btoa(String.fromCharCode(...encoder.encode(payloadJson)))
      .replaceAll("+", "-")
      .replaceAll("/", "_")
      .replaceAll("=", "");
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(TEST_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const signatureBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBytes)))
      .replaceAll("+", "-")
      .replaceAll("/", "_")
      .replaceAll("=", "");

    expect(await verifySignedSession(`${payload}.${signature}`, TEST_SECRET)).toBeNull();
  });

  it("rejects cookie with missing signature", async () => {
    const token = await buildSignedSession(TEST_SECRET, SESSION);
    const [payload] = token.split(".");
    expect(await verifySignedSession(payload, TEST_SECRET)).toBeNull();
  });
});

describe("safeNextPath", () => {
  it("preserves internal paths", () => {
    expect(safeNextPath("/read/some-article")).toBe("/read/some-article");
    expect(safeNextPath("/")).toBe("/");
    expect(safeNextPath("/read/foo?bar=1")).toBe("/read/foo?bar=1");
  });

  it("rejects null/undefined/empty", () => {
    expect(safeNextPath(null)).toBe("/");
    expect(safeNextPath(undefined)).toBe("/");
    expect(safeNextPath("")).toBe("/");
  });

  it("rejects protocol-relative URLs", () => {
    expect(safeNextPath("//evil.com")).toBe("/");
  });

  it("rejects non-slash-prefixed paths", () => {
    expect(safeNextPath("https://evil.com")).toBe("/");
    expect(safeNextPath("javascript:alert(1)")).toBe("/");
  });

  it("rejects login-loop paths", () => {
    expect(safeNextPath("/login")).toBe("/");
    expect(safeNextPath("/login?next=/")).toBe("/");
    expect(safeNextPath("/login/")).toBe("/");
  });
});

describe("getGateConfig", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it("returns config when both vars are valid", () => {
    process.env.SITE_PASSWORD_SHA256 = TEST_HASH;
    process.env.AUTH_COOKIE_SECRET = TEST_SECRET;
    const config = getGateConfig();
    expect(config).toEqual({ passwordHash: TEST_HASH, cookieSecret: TEST_SECRET });
  });

  it("returns null when hash is missing", () => {
    process.env.AUTH_COOKIE_SECRET = TEST_SECRET;
    expect(getGateConfig()).toBeNull();
  });

  it("returns null when secret is missing", () => {
    process.env.SITE_PASSWORD_SHA256 = TEST_HASH;
    expect(getGateConfig()).toBeNull();
  });

  it("returns null when hash is malformed", () => {
    process.env.SITE_PASSWORD_SHA256 = "not-a-valid-hash";
    process.env.AUTH_COOKIE_SECRET = TEST_SECRET;
    expect(getGateConfig()).toBeNull();
  });

  it("returns null when secret is too short", () => {
    process.env.SITE_PASSWORD_SHA256 = TEST_HASH;
    process.env.AUTH_COOKIE_SECRET = "short";
    expect(getGateConfig()).toBeNull();
  });

  it("lowercases the hash", () => {
    process.env.SITE_PASSWORD_SHA256 = TEST_HASH.toUpperCase();
    process.env.AUTH_COOKIE_SECRET = TEST_SECRET;
    expect(getGateConfig()?.passwordHash).toBe(TEST_HASH);
  });
});

describe("isGateIntended", () => {
  const env = process.env;

  beforeEach(() => {
    process.env = { ...env };
  });

  afterEach(() => {
    process.env = env;
  });

  it("returns true when hash is set", () => {
    process.env.SITE_PASSWORD_SHA256 = TEST_HASH;
    expect(isGateIntended()).toBe(true);
  });

  it("returns true when secret is set", () => {
    process.env.AUTH_COOKIE_SECRET = TEST_SECRET;
    expect(isGateIntended()).toBe(true);
  });

  it("returns false when neither is set", () => {
    delete process.env.SITE_PASSWORD_SHA256;
    delete process.env.AUTH_COOKIE_SECRET;
    expect(isGateIntended()).toBe(false);
  });
});
