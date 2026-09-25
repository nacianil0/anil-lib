import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import type { ReaderUser } from "@/lib/auth/user-schema";
import {
  RESET_DEVICE_ID,
  resetReadingProgress,
  ResetNotAllowedError,
} from "./reset-service";

type Call = { text: string; params: unknown[] };

const OWNER_ID = "00000000-0000-4000-8000-00000000000a";
const READER_ID = "00000000-0000-4000-8000-00000000000b";

const owner: ReaderUser = {
  id: OWNER_ID,
  username: "anil",
  workspaceId: "owner",
  role: "owner",
  lastLoginAt: null,
  createdAt: "2026-06-01T08:00:00.000Z",
};
const reader: ReaderUser = { ...owner, id: READER_ID, username: "reader", workspaceId: READER_ID, role: "user" };

const calls: Call[] = [];

const queryMock = vi.fn(async (text: string, params: unknown[] = []) => {
  calls.push({ text, params });
  if (text.includes("RETURNING reset_version")) return [{ reset_version: "57" }];
  if (text.includes("DELETE FROM reading_progress")) return [{ count: 12 }];
  if (text.includes("UPDATE saved_places")) return [{ count: 3 }];
  if (text.includes("UPDATE highlights")) return [{ count: 5 }];
  return [];
});
const transactionMock = vi.fn(async (queries: Promise<unknown>[]) => Promise.all(queries));
const sql = {
  query: queryMock,
  transaction: transactionMock,
} as unknown as NeonQueryFunction<false, false>;

beforeEach(() => {
  calls.length = 0;
  queryMock.mockClear();
  transactionMock.mockClear();
});

describe("resetReadingProgress", () => {
  it("refuses anyone but the owner before a single query runs", async () => {
    await expect(
      resetReadingProgress(sql, reader, "owner", { savedPlaces: true, highlights: true }),
    ).rejects.toBeInstanceOf(ResetNotAllowedError);
    await expect(
      resetReadingProgress(sql, null, "owner", { savedPlaces: false, highlights: false }),
    ).rejects.toBeInstanceOf(ResetNotAllowedError);
    expect(calls).toHaveLength(0);
    expect(transactionMock).not.toHaveBeenCalled();
  });

  it("moves the reset forward and removes progress in one transaction, locked first", async () => {
    const result = await resetReadingProgress(sql, owner, READER_ID, {
      savedPlaces: false,
      highlights: false,
    });

    expect(transactionMock).toHaveBeenCalledTimes(1);
    expect(calls.map((call) => call.text.trim().split(/\s+/).slice(0, 2).join(" "))).toEqual([
      "LOCK TABLE",
      "INSERT INTO",
      "WITH removed",
    ]);
    expect(calls[1].text).toContain("nextval('reader_change_version_seq')");
    expect(calls[1].params).toEqual([READER_ID, OWNER_ID]);
    expect(calls[2].text).toContain("DELETE FROM reading_progress WHERE workspace_id = $1");
    expect(calls[2].params).toEqual([READER_ID]);
    // Reader-authored marks stay unless asked for.
    expect(calls.some((call) => call.text.includes("saved_places"))).toBe(false);
    expect(calls.some((call) => call.text.includes("highlights"))).toBe(false);
    expect(result).toEqual({ resetVersion: 57, progress: 12, savedPlaces: 0, highlights: 0 });
  });

  it("tombstones saved places and highlights when asked, so every device learns of it", async () => {
    const result = await resetReadingProgress(sql, owner, "owner", {
      savedPlaces: true,
      highlights: true,
    });

    const places = calls.find((call) => call.text.includes("UPDATE saved_places"));
    const marks = calls.find((call) => call.text.includes("UPDATE highlights"));
    for (const call of [places, marks]) {
      expect(call?.text).toContain("deleted_at = now()");
      expect(call?.text).toContain("change_version = nextval('reader_change_version_seq')");
      expect(call?.text).toContain("deleted_at IS NULL");
      expect(call?.params).toEqual(["owner", RESET_DEVICE_ID]);
    }
    expect(result).toEqual({ resetVersion: 57, progress: 12, savedPlaces: 3, highlights: 5 });
  });

  it("counts only what was asked for when one of the two extras is chosen", async () => {
    const result = await resetReadingProgress(sql, owner, "owner", {
      savedPlaces: false,
      highlights: true,
    });
    expect(result).toEqual({ resetVersion: 57, progress: 12, savedPlaces: 0, highlights: 5 });
  });

  it("records no author for the database-less local owner, whose id is not a uuid", async () => {
    await resetReadingProgress(sql, { ...owner, id: "owner" }, "owner", {
      savedPlaces: false,
      highlights: false,
    });
    expect(calls[1].params).toEqual(["owner", null]);
  });
});
