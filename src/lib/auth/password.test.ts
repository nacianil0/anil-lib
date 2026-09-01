import { describe, expect, it } from "vitest";
import { DUMMY_PASSWORD_HASH, hashPassword, needsRehash, verifyPassword } from "./password";

const PASSWORD = "correct horse battery staple";

describe("hashPassword", () => {
  it("produces a parameterised scrypt string, never the plaintext", async () => {
    const hash = await hashPassword(PASSWORD);
    expect(hash).toMatch(/^scrypt\$32768\$8\$1\$[A-Za-z0-9+/=]+\$[A-Za-z0-9+/=]+$/);
    expect(hash).not.toContain(PASSWORD);
  });

  it("salts every hash, so the same password never stores the same value", async () => {
    const [first, second] = await Promise.all([hashPassword(PASSWORD), hashPassword(PASSWORD)]);
    expect(first).not.toBe(second);
  });
});

describe("verifyPassword", () => {
  it("accepts the password it was derived from", async () => {
    expect(await verifyPassword(PASSWORD, await hashPassword(PASSWORD))).toBe(true);
  });

  it("rejects a wrong password", async () => {
    expect(await verifyPassword("wrong password entirely", await hashPassword(PASSWORD))).toBe(
      false,
    );
  });

  it("normalises unicode so a canonically equal password still verifies", async () => {
    const composed = "paröla-degistir"; // o-with-diaeresis as one code point
    const decomposed = "paröla-degistir"; // o followed by combining diaeresis
    expect(composed).not.toBe(decomposed);
    expect(await verifyPassword(decomposed, await hashPassword(composed))).toBe(true);
  });

  it.each([
    ["empty", ""],
    ["not a hash", "not-a-hash"],
    ["wrong scheme", "bcrypt$32768$8$1$c2FsdHNhbHRzYWx0$aGFzaA=="],
    ["missing fields", "scrypt$32768$8$1$c2FsdHNhbHRzYWx0"],
    ["non-numeric cost", "scrypt$abc$8$1$c2FsdHNhbHRzYWx0$aGFzaA=="],
    ["cost below the floor", "scrypt$2$8$1$c2FsdHNhbHRzYWx0$aGFzaA=="],
    ["salt too short", "scrypt$32768$8$1$c2E=$aGFzaA=="],
    ["key of the wrong length", "scrypt$32768$8$1$c2FsdHNhbHRzYWx0$aGFzaA=="],
  ])("returns false for a malformed stored hash (%s)", async (_label, stored) => {
    expect(await verifyPassword(PASSWORD, stored)).toBe(false);
  });

  it("rejects an absurd cost instead of trying to allocate for it", async () => {
    expect(await verifyPassword(PASSWORD, "scrypt$2097152$8$1$c2FsdHNhbHRzYWx0$aGFzaA==")).toBe(
      false,
    );
  });
});

describe("DUMMY_PASSWORD_HASH", () => {
  it("is well-formed, so an unknown username still costs one real verification", async () => {
    expect(needsRehash(DUMMY_PASSWORD_HASH)).toBe(false);
    expect(await verifyPassword("anything at all", DUMMY_PASSWORD_HASH)).toBe(false);
  });
});

describe("needsRehash", () => {
  it("is false for a hash written with the current parameters", async () => {
    expect(needsRehash(await hashPassword(PASSWORD))).toBe(false);
  });

  it("is true for weaker parameters or a foreign format", () => {
    expect(needsRehash("scrypt$16384$8$1$c2FsdHNhbHRzYWx0$aGFzaA==")).toBe(true);
    expect(needsRehash("")).toBe(true);
  });
});
