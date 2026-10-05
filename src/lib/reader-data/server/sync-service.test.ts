import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { loadSeriesCatalog } from "@/lib/content/series";
import { loadBounCatalog } from "@/lib/content/series-boun";
import { loadCatalog } from "@/lib/content/catalog";
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
let serverSeriesResets: { series_id: string; reset_version: string }[] = [];

const queryMock = vi.fn(async (text: string, params: unknown[] = []) => {
  calls.push({ text, params });
  if (text.includes("FROM reading_series_resets") && text.trimStart().startsWith("SELECT")) {
    return serverSeriesResets;
  }
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
  serverSeriesResets = [];
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
    expect(calls[0].text).toContain("LOCK TABLE reading_progress IN ROW EXCLUSIVE MODE");
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

describe("synchronizeReaderData and series resets", () => {
  it("guards an article using its canonical series epoch and keeps the account epoch separate", async () => {
    await synchronizeReaderData(sql, "owner", 10, [progressWrite()], {
      allowArchive: true,
      resetVersion: 7,
      seriesResetVersions: { ai: 42, boun: 99 },
    });
    const write = calls.find((entry) => entry.text.includes("INSERT INTO reading_progress"));
    expect(write?.text).toContain("FROM reading_series_resets");
    expect(write?.text).toContain("series_id = $12::text");
    expect(write?.text).toContain("reset_version > $13::bigint");
    expect(write?.params.slice(10)).toEqual([7, "ai", 42]);
  });

  it("treats older clients' omitted series epochs as zero while acknowledging their guarded writes", async () => {
    serverSeriesResets = [{ series_id: "ai", reset_version: "42" }];
    const response = await synchronizeReaderData(sql, "owner", 50, [progressWrite()], {
      allowArchive: true,
      resetVersion: 0,
    });
    const write = calls.find((entry) => entry.text.includes("INSERT INTO reading_progress"));
    expect(write?.params.slice(10)).toEqual([0, "ai", 0]);
    expect(response.acknowledged).toEqual([OPERATION]);
    expect(response.resetVersion).toBe(0);
    expect(response.seriesResets).toEqual([
      {
        seriesId: "ai",
        resetVersion: 42,
        articleIds: loadSeriesCatalog().articles.map((article) => article.articleId),
      },
    ]);
    expect(selectOf("reading_progress").params).toEqual(["owner", 0]);
    expect(selectOf("saved_places").params).toEqual(["owner", 50]);
    expect(selectOf("highlights").params).toEqual(["owner", 50]);
  });

  it("uses the BOUN epoch for BOUN progress and no series guard for the archive", async () => {
    const bounWrite = progressWrite();
    bounWrite.payload.articleId = loadBounCatalog().articles[0].articleId;
    const archiveWrite = progressWrite();
    archiveWrite.operationId = "33333333-3333-4333-8333-333333333333";
    archiveWrite.payload.articleId = loadCatalog().articles[0].articleId;
    await synchronizeReaderData(sql, "owner", 0, [bounWrite, archiveWrite], {
      allowArchive: true,
      resetVersion: 0,
      seriesResetVersions: { ai: 42, boun: 11 },
    });
    const writes = calls.filter((entry) => entry.text.includes("INSERT INTO reading_progress"));
    expect(writes.map((write) => write.params.slice(11))).toEqual([
      ["boun", 11],
      [null, 0],
    ]);
  });

  it("allows a fresh browser to adopt both reset kinds without rejecting new progress", async () => {
    serverResetVersion = 10;
    serverSeriesResets = [{ series_id: "ai", reset_version: "42" }];
    await synchronizeReaderData(sql, "owner", 0, [progressWrite()], {
      allowArchive: true,
      resetVersion: null,
    });
    const write = calls.find((entry) => entry.text.includes("INSERT INTO reading_progress"));
    expect(write?.params.slice(10)).toEqual([null, "ai", null]);
  });

  it("keeps the incremental progress cursor once all series resets are adopted", async () => {
    serverSeriesResets = [
      { series_id: "ai", reset_version: "42" },
      { series_id: "boun", reset_version: "99" },
    ];
    await synchronizeReaderData(sql, "owner", 120, [], {
      allowArchive: true,
      resetVersion: 0,
      seriesResetVersions: { ai: 42, boun: 99 },
    });
    expect(selectOf("reading_progress").params).toEqual(["owner", 120]);
  });

  it("rebuilds progress if any one series is behind and reads reset epochs first", async () => {
    serverSeriesResets = [
      { series_id: "ai", reset_version: "42" },
      { series_id: "boun", reset_version: "99" },
    ];
    await synchronizeReaderData(sql, "owner", 120, [], {
      allowArchive: true,
      resetVersion: 0,
      seriesResetVersions: { ai: 42, boun: 5 },
    });
    expect(selectOf("reading_progress").params).toEqual(["owner", 0]);
    const resets = calls.findIndex((entry) => entry.text.includes("FROM reading_series_resets"));
    const progress = calls.findIndex((entry) =>
      entry.text.includes("SELECT * FROM reading_progress"),
    );
    expect(resets).toBeLessThan(progress);
    expect(calls.some((entry) => entry.text.startsWith("LOCK TABLE"))).toBe(false);
  });
});
