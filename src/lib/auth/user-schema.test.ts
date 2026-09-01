import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  createUserSchema,
  DEFAULT_OWNER_USERNAME,
  localOwnerUser,
  normalizeUsername,
  OWNER_WORKSPACE_ID,
  ownerUsername,
  usernameSchema,
} from "./user-schema";

describe("normalizeUsername", () => {
  it("trims and lowercases so one person cannot hold two spellings", () => {
    expect(normalizeUsername("  Anil ")).toBe("anil");
    expect(normalizeUsername("ANIL")).toBe("anil");
  });
});

describe("usernameSchema", () => {
  it.each(["anil", "test-user", "reader_02", "a.b-c_1"])("accepts %s", (value) => {
    expect(usernameSchema.parse(value)).toBe(value);
  });

  it("normalises before validating", () => {
    expect(usernameSchema.parse("  Reader_02  ")).toBe("reader_02");
  });

  it.each([
    ["too short", "ab"],
    ["too long", "a".repeat(33)],
    ["a space inside", "two words"],
    ["an at sign", "user@example.com"],
    ["a slash", "a/b"],
    ["empty", ""],
  ])("rejects %s", (_label, value) => {
    expect(usernameSchema.safeParse(value).success).toBe(false);
  });
});

describe("createUserSchema", () => {
  it("requires a password of at least ten characters", () => {
    expect(createUserSchema.safeParse({ username: "reader", password: "short" }).success).toBe(
      false,
    );
    expect(
      createUserSchema.safeParse({ username: "reader", password: "0123456789" }).success,
    ).toBe(true);
  });

  it("reports a human-readable reason rather than a raw schema path", () => {
    const result = createUserSchema.safeParse({ username: "ab", password: "0123456789" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("Kullanıcı adı");
    }
  });
});

describe("ownerUsername", () => {
  const env = process.env;
  beforeEach(() => {
    process.env = { ...env };
  });
  afterEach(() => {
    process.env = env;
  });

  it("falls back to the default when unset", () => {
    delete process.env.OWNER_USERNAME;
    expect(ownerUsername()).toBe(DEFAULT_OWNER_USERNAME);
  });

  it("uses a configured value, normalised", () => {
    process.env.OWNER_USERNAME = "  Owner_01 ";
    expect(ownerUsername()).toBe("owner_01");
  });

  it("ignores a configured value that could never be logged in with", () => {
    process.env.OWNER_USERNAME = "not a valid username!";
    expect(ownerUsername()).toBe(DEFAULT_OWNER_USERNAME);
  });
});

describe("localOwnerUser", () => {
  it("keeps the pre-existing workspace key so historical rows still resolve", () => {
    expect(localOwnerUser()).toMatchObject({
      workspaceId: OWNER_WORKSPACE_ID,
      role: "owner",
      lastLoginAt: null,
    });
  });
});
