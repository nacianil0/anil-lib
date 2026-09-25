import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { loadSeriesCatalog } from "@/lib/content/series";
import type { SyncMutation } from "@/lib/reader-data/schema";
import { synchronizeReaderData } from "./sync-service";

type Call = { text: string; params: unknown[] };

const DEVICE = "11111111-1111-4111-8111-111111111111";
const OPERATION = "22222222-2222-4222-8222-222222222222";
const NOW = new Date().toISOString();
// A real published id, so the unknown-article filter lets the write through.
const ARTICLE = loadSeriesCatalog().articles[0].articleId;

const calls: Call[] = [];
let serverResetVersion: number | null = null;

const queryMock = vi.fn(async (text: string, params: unknown[] = []) => {
  calls.push({ text, params });
  if (text.includes("FROM reading_resets") && text.trimStart().startsWith("SELECT")) {
    return serverResetVersion === null ? [] : [{ reset_version: String(serverResetVersion) }];
  }
  return [];
});
const transactionMock = vi.fn(async (queries: Promise<unknown>[]) => Promise.all(queries));
const sql = {
  query: queryMock,
  transaction: transactionMock,
} as unknown as NeonQueryFunction<false, false>;

function progressWrite(): SyncMutation {
  return {
    operationId: OPERATION,
    entityType: "progress",
    entityId: ARTICLE,
    operationType: "upsert",
    deviceId: DEVICE,
    clientUpdatedAt: NOW,
    payload: {
      articleId: ARTICLE,
      headingId: null,
      scrollRatio: 0.4,
      anchor: null,
      completed: false,
      lastReadAt: NOW,
      clientUpdatedAt: NOW,
      deviceId: DEVICE,
    },
  };
}

function selectOf(table: string): Call {
  const call = calls.find((entry) => entry.text.includes(`SELECT * FROM ${table}`));
  if (!call) throw new Error(`no select from ${table}`);
  return call;
}

beforeEach(() => {
  calls.length = 0;
  serverResetVersion = null;
  queryMock.mockClear();
  transactionMock.mockClear();
});

describe("synchronizeReaderData and progress resets", () => {
  it("guards every progress write with the reset version the device has applied", async () => {
    await synchronizeReaderData(sql, "owner", 10, [progressWrite()], {
      allowArchive: true,
      resetVersion: 7,
    });

    const write = calls.find((entry) => entry.text.includes("INSERT INTO reading_progress"));
    expect(write?.text).toContain("FROM reading_resets");
    expect(write?.text).toContain("reset_version > $11::bigint");
    expect(write?.params[10]).toBe(7);
    expect(transactionMock).toHaveBeenCalledTimes(1);
  });

  it("reports no reset and reads progress past the cursor for an account never reset", async () => {
    const response = await synchronizeReaderData(sql, "owner", 10, [], {
      allowArchive: true,
      resetVersion: 0,
    });

    expect(response.resetVersion).toBe(0);
    expect(selectOf("reading_progress").params).toEqual(["owner", 10]);
  });

  it("sends a device behind the reset every progress row, and the reset version", async () => {
    serverResetVersion = 42;
    const response = await synchronizeReaderData(sql, "owner", 10, [], {
      allowArchive: true,
      resetVersion: 0,
    });

    expect(response.resetVersion).toBe(42);
    expect(selectOf("reading_progress").params).toEqual(["owner", 0]);
    // Only progress is rebuilt; the other entities keep their incremental cursor.
    expect(selectOf("saved_places").params).toEqual(["owner", 10]);
    expect(selectOf("highlights").params).toEqual(["owner", 10]);
  });

  it("reads the reset before the changes, so a device is never told late about rows it already has", async () => {
    serverResetVersion = 42;
    await synchronizeReaderData(sql, "owner", 10, [], { allowArchive: true, resetVersion: 0 });

    const resetIndex = calls.findIndex((entry) => entry.text.includes("FROM reading_resets"));
    const progressIndex = calls.findIndex((entry) =>
      entry.text.includes("SELECT * FROM reading_progress"),
    );
    expect(resetIndex).toBeGreaterThanOrEqual(0);
    expect(resetIndex).toBeLessThan(progressIndex);
  });

  it("never holds back a device with no prior progress, and does not rebuild its set", async () => {
    serverResetVersion = 42;
    const response = await synchronizeReaderData(sql, "owner", 0, [progressWrite()], {
      allowArchive: true,
      resetVersion: null,
    });

    const write = calls.find((entry) => entry.text.includes("INSERT INTO reading_progress"));
    expect(write?.text).toContain("$11::bigint IS NULL");
    expect(write?.params[10]).toBeNull();
    expect(response.resetVersion).toBe(42);
    expect(response.acknowledged).toEqual([OPERATION]);
  });

  it("writes progress before saved places, in the lock order a reset uses", async () => {
    const place: SyncMutation = {
      operationId: "33333333-3333-4333-8333-333333333333",
      entityType: "saved-place",
      entityId: ARTICLE,
      operationType: "upsert",
      deviceId: DEVICE,
      clientUpdatedAt: NOW,
      payload: {
        articleId: ARTICLE,
        headingId: null,
        scrollRatio: 0.2,
        anchor: null,
        previewText: "",
        clientUpdatedAt: NOW,
        deviceId: DEVICE,
        deletedAt: null,
      },
    };
    await synchronizeReaderData(sql, "owner", 0, [place, progressWrite()], {
      allowArchive: true,
      resetVersion: 0,
    });

    const written = calls
      .filter((entry) => entry.text.includes("INSERT INTO sync_mutations"))
      .map((entry) => (entry.text.includes("INSERT INTO reading_progress") ? "progress" : "place"));
    expect(written).toEqual(["progress", "place"]);
  });

  it("keeps the incremental cursor once the device has caught up with the reset", async () => {
    serverResetVersion = 42;
    const response = await synchronizeReaderData(sql, "owner", 50, [], {
      allowArchive: true,
      resetVersion: 42,
    });

    expect(response.resetVersion).toBe(42);
    expect(selectOf("reading_progress").params).toEqual(["owner", 50]);
  });
});
