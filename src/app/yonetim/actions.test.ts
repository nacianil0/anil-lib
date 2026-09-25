import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import type { ReaderUser } from "@/lib/auth/user-schema";

const OWNER_ID = "00000000-0000-4000-8000-00000000000a";
const READER_ID = "00000000-0000-4000-8000-00000000000b";

const hoisted = vi.hoisted(() => ({
  owner: null as ReaderUser | null,
  database: true,
  calls: [] as Array<{ text: string; params: unknown[] }>,
  userRows: [] as Record<string, unknown>[],
}));

vi.mock("@/lib/auth/session-user", () => ({
  getOwnerUser: async () => hoisted.owner,
}));

const queryMock = vi.fn(async (text: string, params: unknown[] = []) => {
  hoisted.calls.push({ text, params });
  if (text.includes("FROM users WHERE id")) return hoisted.userRows;
  if (text.includes("RETURNING reset_version")) return [{ reset_version: "9" }];
  if (text.includes("DELETE FROM reading_progress")) return [{ count: 4 }];
  if (text.includes("UPDATE saved_places")) return [{ count: 2 }];
  if (text.includes("UPDATE highlights")) return [{ count: 1 }];
  return [];
});
const transactionMock = vi.fn(async (queries: Promise<unknown>[]) => Promise.all(queries));

vi.mock("@/lib/db/client", () => ({
  getDatabaseUrl: () => "postgres://fake",
  getDatabaseClient: () =>
    hoisted.database
      ? ({ query: queryMock, transaction: transactionMock } as unknown as NeonQueryFunction<
          false,
          false
        >)
      : null,
}));

const { resetReadingAction } = await import("./actions");
const { initialResetReadingState } = await import("./reset-reading-state");

const OWNER: ReaderUser = {
  id: OWNER_ID,
  username: "anil",
  workspaceId: "owner",
  role: "owner",
  lastLoginAt: null,
  createdAt: "2026-06-01T08:00:00.000Z",
};

function form(fields: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
}

beforeEach(() => {
  hoisted.owner = OWNER;
  hoisted.database = true;
  hoisted.calls.length = 0;
  hoisted.userRows = [
    {
      id: OWNER_ID,
      username: "anil",
      workspace_id: "owner",
      role: "owner",
      last_login_at: null,
      created_at: "2026-06-01T08:00:00.000Z",
    },
  ];
  queryMock.mockClear();
  transactionMock.mockClear();
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("resetReadingAction", () => {
  it("refuses a caller who is not the owner, without touching the database", async () => {
    hoisted.owner = null;
    const state = await resetReadingAction(initialResetReadingState, form({ userId: OWNER_ID }));
    expect(state).toEqual({ status: "error", message: "Bu işlem için yetkin yok." });
    expect(hoisted.calls).toHaveLength(0);
  });

  it("rejects an id that is not a uuid before it reaches a ::uuid cast", async () => {
    const state = await resetReadingAction(initialResetReadingState, form({ userId: "owner" }));
    expect(state.status).toBe("error");
    expect(hoisted.calls).toHaveLength(0);
  });

  it("says so when there is no database to reset", async () => {
    hoisted.database = false;
    const state = await resetReadingAction(initialResetReadingState, form({ userId: OWNER_ID }));
    expect(state.status).toBe("error");
    expect(transactionMock).not.toHaveBeenCalled();
  });

  it("resets nothing for an unknown account", async () => {
    hoisted.userRows = [];
    const state = await resetReadingAction(initialResetReadingState, form({ userId: READER_ID }));
    expect(state).toEqual({ status: "error", message: "Kullanıcı bulunamadı." });
    expect(transactionMock).not.toHaveBeenCalled();
  });

  it("clears the workspace stored for that account, never one taken from the form", async () => {
    const state = await resetReadingAction(
      initialResetReadingState,
      form({ userId: OWNER_ID, workspaceId: "someone-else" }),
    );

    expect(state).toEqual({ status: "success", progress: 4, savedPlaces: 0, highlights: 0 });
    const removal = hoisted.calls.find((call) => call.text.includes("DELETE FROM reading_progress"));
    expect(removal?.params).toEqual(["owner"]);
    expect(hoisted.calls.some((call) => call.text.includes("saved_places"))).toBe(false);
  });

  it("includes saved places and highlights only when their boxes are ticked", async () => {
    const state = await resetReadingAction(
      initialResetReadingState,
      form({ userId: OWNER_ID, savedPlaces: "on", highlights: "on" }),
    );
    expect(state).toEqual({ status: "success", progress: 4, savedPlaces: 2, highlights: 1 });
  });
});
