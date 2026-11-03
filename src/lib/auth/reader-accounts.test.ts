import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { verifyPassword } from "./password";
import { hashRecoveryCode, verifyRecoveryCode } from "./recovery-code";
import {
  createReaderAccount,
  deleteReaderAccount,
  findReaderById,
  replaceRecoveryCode,
  setReaderPassword,
  type ReaderAccount,
} from "./reader-accounts";
import { DuplicateUsernameError } from "./users";

type Call = { text: string; params: unknown[] };
const calls: Call[] = [];
let rows: Record<string, unknown>[] = [];
let failure: unknown = null;

const query = vi.fn(async (text: string, params: unknown[] = []) => {
  calls.push({ text, params });
  if (failure) {
    const error = failure;
    failure = null;
    throw error;
  }
  return rows;
});
const transaction = vi.fn(async (queries: Promise<unknown>[]) => Promise.all(queries));
const sql = { query, transaction } as unknown as NeonQueryFunction<false, false>;

const ID = "00000000-0000-4000-8000-0000000000c1";
const row = (overrides: Record<string, unknown> = {}) => ({
  id: ID,
  username: "okur",
  workspace_id: `r:${ID}`,
  session_version: 1,
  last_login_at: null,
  created_at: "2026-11-03T10:00:00.000Z",
  ...overrides,
});

beforeEach(() => {
  calls.length = 0;
  rows = [];
  failure = null;
  transaction.mockClear();
});

describe("createReaderAccount", () => {
  it("creates a reader in its own table, with an r: workspace, a scrypt hash and a code digest", async () => {
    rows = [row()];
    const { account, recoveryCode } = await createReaderAccount(sql, {
      username: "okur",
      password: "uzun ve akılda kalan bir parola",
    });
    expect(account).toMatchObject({ role: "reader", username: "okur", sessionVersion: 1 });
    expect(account.workspaceId).toBe(`r:${account.id}`);

    const insert = calls[0];
    expect(insert.text).toContain("INSERT INTO reader_accounts");
    // Refused when an owner-created account holds the name.
    expect(insert.text).toContain("WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = $2)");
    // Never writes to `users`, so no existing account or role can change.
    expect(calls.some((call) => /INTO users|UPDATE users/.test(call.text))).toBe(false);

    const [id, username, workspace, passwordHash, codeHash] = insert.params as string[];
    expect(username).toBe("okur");
    expect(workspace).toBe(`r:${id}`);
    expect(passwordHash.startsWith("scrypt$")).toBe(true);
    expect(passwordHash).not.toContain("parola");
    expect(await verifyPassword("uzun ve akılda kalan bir parola", passwordHash)).toBe(true);
    expect(codeHash).toBe(hashRecoveryCode(recoveryCode));
    expect(insert.params.join("|")).not.toContain(recoveryCode);
  });

  it("reports a name an owner-created account holds as taken", async () => {
    rows = [];
    await expect(
      createReaderAccount(sql, { username: "anil", password: "uzun ve akılda kalan bir parola" }),
    ).rejects.toBeInstanceOf(DuplicateUsernameError);
  });

  it("reports a name another reader holds as taken", async () => {
    failure = { sourceError: { code: "23505" } };
    await expect(
      createReaderAccount(sql, { username: "okur", password: "uzun ve akılda kalan bir parola" }),
    ).rejects.toBeInstanceOf(DuplicateUsernameError);
  });

  it("rethrows any other failure", async () => {
    failure = { code: "57P01" };
    await expect(
      createReaderAccount(sql, { username: "okur", password: "uzun ve akılda kalan bir parola" }),
    ).rejects.toMatchObject({ code: "57P01" });
  });
});

describe("reading an account", () => {
  it("maps the row and never selects a secret for the public shape", async () => {
    rows = [row({ session_version: 3 })];
    const account = await findReaderById(sql, ID);
    expect(account).toMatchObject({ id: ID, role: "reader", sessionVersion: 3 });
    expect(calls[0].text).not.toContain("password_hash");
    expect(calls[0].text).not.toContain("recovery_code_hash");
  });
});

describe("setReaderPassword", () => {
  it("moves the session version on, so every older cookie stops resolving", async () => {
    rows = [{ session_version: 5 }];
    const result = await setReaderPassword(sql, ID, "yepyeni ve uzun bir parola", {
      rotateRecoveryCode: false,
    });
    expect(result).toEqual({ sessionVersion: 5, recoveryCode: null });
    expect(calls[0].text).toContain("session_version = session_version + 1");
    expect(calls[0].params[2]).toBeNull();
  });

  it("replaces the used recovery code when recovering", async () => {
    rows = [{ session_version: 2 }];
    const result = await setReaderPassword(sql, ID, "yepyeni ve uzun bir parola", {
      rotateRecoveryCode: true,
    });
    expect(result?.recoveryCode).toBeTruthy();
    expect(verifyRecoveryCode(result!.recoveryCode!, String(calls[0].params[2]))).toBe(true);
  });

  it("reports a missing account", async () => {
    rows = [];
    expect(
      await setReaderPassword(sql, ID, "yepyeni ve uzun bir parola", { rotateRecoveryCode: false }),
    ).toBeNull();
  });
});

describe("replaceRecoveryCode", () => {
  it("stores only the new code's digest", async () => {
    rows = [{ id: ID }];
    const code = await replaceRecoveryCode(sql, ID);
    expect(code).toBeTruthy();
    expect(calls[0].params[1]).toBe(hashRecoveryCode(code!));
  });
});

describe("deleteReaderAccount", () => {
  const account: ReaderAccount = {
    id: ID,
    username: "okur",
    workspaceId: `r:${ID}`,
    role: "reader",
    sessionVersion: 1,
    lastLoginAt: null,
    createdAt: "2026-11-03T10:00:00.000Z",
  };

  it("removes the account and every row of its workspace in one transaction", async () => {
    await deleteReaderAccount(sql, account);
    expect(transaction).toHaveBeenCalledTimes(1);
    const tables = calls.map((call) => call.text.match(/DELETE FROM (\w+)/)?.[1]);
    expect(tables).toEqual([
      "highlights",
      "saved_places",
      "reading_progress",
      "reading_series_resets",
      "reading_resets",
      "sync_mutations",
      "reader_accounts",
    ]);
    for (const call of calls.slice(0, 6)) expect(call.params).toEqual([account.workspaceId]);
  });

  it("refuses any workspace that is not a self-registered reader's", async () => {
    await expect(deleteReaderAccount(sql, { ...account, workspaceId: "owner" })).rejects.toThrow(
      "not_a_reader_workspace",
    );
    await expect(deleteReaderAccount(sql, { ...account, workspaceId: ID })).rejects.toThrow(
      "not_a_reader_workspace",
    );
    expect(calls).toHaveLength(0);
  });
});
