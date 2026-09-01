import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import {
  createStandardUser,
  DuplicateUsernameError,
  ensureOwnerUser,
  findCredentialsByUsername,
  listUsers,
  recordLogin,
} from "./users";
import { verifyPassword } from "./password";

type Call = { text: string; params: unknown[] };

const calls: Call[] = [];
let nextRows: Record<string, unknown>[] = [];
let nextError: unknown = null;

const queryMock = vi.fn(async (text: string, params: unknown[] = []) => {
  calls.push({ text, params });
  if (nextError) {
    const error = nextError;
    nextError = null;
    throw error;
  }
  return nextRows;
});

const sql = { query: queryMock } as unknown as NeonQueryFunction<false, false>;

const OWNER_ID = "00000000-0000-4000-8000-00000000000a";

beforeEach(() => {
  calls.length = 0;
  nextRows = [];
  nextError = null;
  queryMock.mockClear();
});

describe("ensureOwnerUser", () => {
  it("is a no-op after the first run and never carries password material", async () => {
    await ensureOwnerUser(sql);
    expect(calls).toHaveLength(1);
    expect(calls[0].text).toContain("ON CONFLICT (workspace_id) DO NOTHING");
    expect(calls[0].params[2]).toBe("owner");
    // The owner starts on the env-backed scheme with an empty stored hash.
    expect(calls[0].text).toContain("'env-sha256'");
    expect(JSON.stringify(calls[0].params)).not.toContain("password");
  });
});

describe("createStandardUser", () => {
  it("stores a scrypt hash, never the plaintext, and returns the new account", async () => {
    const user = await createStandardUser(sql, {
      username: "reader",
      password: "abcd",
      createdBy: OWNER_ID,
    });

    expect(user).toMatchObject({ username: "reader", role: "user" });
    // Workspace equals the id, so reader rows are partitioned per account.
    expect(user.workspaceId).toBe(user.id);
    expect(user.lastLoginAt).toBeNull();

    const [insert] = calls;
    // No RETURNING: the driver's INSERT result shape is never relied upon.
    expect(insert.text).not.toContain("RETURNING");
    expect(insert.params[1]).toBe("reader");
    expect(insert.params[2]).toBe(user.id);

    const stored = String(insert.params[3]);
    expect(stored).not.toContain("abcd");
    expect(stored.startsWith("scrypt$")).toBe(true);
    expect(await verifyPassword("abcd", stored)).toBe(true);
    expect(await verifyPassword("abce", stored)).toBe(false);
  });

  it("records the owner as author when the id is a uuid", async () => {
    await createStandardUser(sql, {
      username: "reader",
      password: "abcd",
      createdBy: OWNER_ID,
    });
    expect(calls[0].params[4]).toBe(OWNER_ID);
  });

  it("stores no author when the caller has the synthetic no-database id", async () => {
    await createStandardUser(sql, {
      username: "reader",
      password: "abcd",
      createdBy: "owner",
    });
    // "owner" is not a uuid; sending it would fail the ::uuid cast.
    expect(calls[0].params[4]).toBeNull();
  });

  it.each([
    ["a bare code", { code: "23505" }],
    ["a wrapped code", { sourceError: { code: "23505" } }],
    ["a named constraint", { constraint: "users_username_unique" }],
  ])("maps a unique violation (%s) to DuplicateUsernameError", async (_label, error) => {
    nextError = error;
    await expect(
      createStandardUser(sql, { username: "reader", password: "abcd", createdBy: OWNER_ID }),
    ).rejects.toBeInstanceOf(DuplicateUsernameError);
  });

  it("rethrows an unrelated database error untouched", async () => {
    nextError = { code: "42P01", message: 'relation "users" does not exist' };
    await expect(
      createStandardUser(sql, { username: "reader", password: "abcd", createdBy: OWNER_ID }),
    ).rejects.toMatchObject({ code: "42P01" });
  });
});

describe("credential reads", () => {
  it("never selects the hash in the public listing", async () => {
    nextRows = [];
    await listUsers(sql);
    expect(calls[0].text).not.toContain("password_hash");
    expect(calls[0].text).not.toContain("hash_scheme");
  });

  it("selects the hash only on the login path", async () => {
    nextRows = [
      {
        id: OWNER_ID,
        username: "anil",
        workspace_id: "owner",
        role: "owner",
        last_login_at: null,
        created_at: "2026-06-01T08:00:00.000Z",
        password_hash: "",
        hash_scheme: "env-sha256",
      },
    ];
    const credentials = await findCredentialsByUsername(sql, "anil");
    expect(credentials).toMatchObject({ username: "anil", hashScheme: "env-sha256" });
    expect(calls[0].text).toContain("password_hash");
  });

  it("returns null for an unknown username", async () => {
    nextRows = [];
    expect(await findCredentialsByUsername(sql, "nobody")).toBeNull();
  });
});

describe("recordLogin", () => {
  it("stamps the account without reading anything back", async () => {
    await recordLogin(sql, OWNER_ID);
    expect(calls[0].text).toContain("last_login_at = now()");
    expect(calls[0].text).not.toContain("RETURNING");
    expect(calls[0].params[0]).toBe(OWNER_ID);
  });
});
