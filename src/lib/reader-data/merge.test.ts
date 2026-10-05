import { describe, expect, it } from "vitest";
import { applySeriesReset, mergeStoredReaderData, mergeSyncResponse } from "./merge";
import { emptyReaderData, type ProgressRecord } from "./schema";
import type { SyncResponse } from "./sync-contract";

const DEVICE = "11111111-1111-4111-8111-111111111111";
const WORKSPACE = "owner";
const OPERATION = "22222222-2222-4222-8222-222222222222";

function progress(overrides: Partial<ProgressRecord> = {}): ProgressRecord {
  return {
    articleId: "article-1",
    headingId: null,
    scrollRatio: 0.2,
    anchor: null,
    completed: false,
    lastReadAt: "2026-06-29T10:00:00.000Z",
    clientUpdatedAt: "2026-06-29T10:00:00.000Z",
    deviceId: DEVICE,
    changeVersion: 0,
    ...overrides,
  };
}

describe("mergeSyncResponse", () => {
  it("acknowledges a local operation and applies its canonical server record", () => {
    const current = emptyReaderData(WORKSPACE, DEVICE);
    const local = progress();
    current.progress[local.articleId] = local;
    current.outbox.push({
      operationId: OPERATION,
      entityType: "progress",
      entityId: local.articleId,
      operationType: "upsert",
      deviceId: DEVICE,
      clientUpdatedAt: local.clientUpdatedAt,
      payload: { ...local },
    });

    const next = mergeSyncResponse(current, {
      cursor: 9,
      resetVersion: 0,
      acknowledged: [OPERATION],
      errors: [],
      changes: {
        progress: [progress({ changeVersion: 9, scrollRatio: 0.21 })],
        savedPlaces: [],
        highlights: [],
      },
      serverTime: "2026-06-29T10:01:00.000Z",
    });

    expect(next.outbox).toEqual([]);
    expect(next.cursor).toBe(9);
    expect(next.progress["article-1"].scrollRatio).toBe(0.21);
  });

  it("does not overwrite a newer local entity that remains pending", () => {
    const current = emptyReaderData(WORKSPACE, DEVICE);
    const local = progress({ scrollRatio: 0.8 });
    current.progress[local.articleId] = local;
    current.outbox.push({
      operationId: OPERATION,
      entityType: "progress",
      entityId: local.articleId,
      operationType: "upsert",
      deviceId: DEVICE,
      clientUpdatedAt: local.clientUpdatedAt,
      payload: { ...local },
    });

    const next = mergeSyncResponse(current, {
      cursor: 4,
      resetVersion: 0,
      acknowledged: [],
      errors: [],
      changes: {
        progress: [progress({ changeVersion: 4, scrollRatio: 0.3 })],
        savedPlaces: [],
        highlights: [],
      },
      serverTime: "2026-06-29T10:01:00.000Z",
    });

    expect(next.progress["article-1"].scrollRatio).toBe(0.8);
  });
});

describe("per-series resets", () => {
  const reset = { seriesId: "ai" as const, resetVersion: 50, articleIds: ["article-1"] };
  function history() {
    const data = emptyReaderData(WORKSPACE, DEVICE);
    data.currentArticleId = "article-1";
    for (const id of ["article-1", "boun-1", "archive-1"]) {
      const record = progress({ articleId: id, completed: true });
      data.progress[id] = record;
      data.outbox.push({
        operationId: crypto.randomUUID(),
        entityType: "progress",
        entityId: id,
        operationType: "upsert",
        deviceId: DEVICE,
        clientUpdatedAt: record.clientUpdatedAt,
        payload: record,
      });
    }
    data.savedPlaces["article-1"] = {
      articleId: "article-1",
      headingId: null,
      scrollRatio: 0.5,
      anchor: null,
      previewText: "saved",
      deviceId: DEVICE,
      deletedAt: null,
      changeVersion: 0,
      clientUpdatedAt: "2026-06-29T10:00:00.000Z",
    };
    data.outbox.push({
      operationId: crypto.randomUUID(),
      entityType: "saved-place",
      entityId: "article-1",
      operationType: "upsert",
      deviceId: DEVICE,
      clientUpdatedAt: data.savedPlaces["article-1"].clientUpdatedAt,
      payload: data.savedPlaces["article-1"],
    });
    return data;
  }
  function answer(seriesResets = [reset]): SyncResponse {
    return {
      cursor: 51,
      resetVersion: 0,
      seriesResets,
      acknowledged: [],
      errors: [],
      changes: { progress: [], savedPlaces: [], highlights: [] },
      serverTime: "2026-06-29T10:01:00.000Z",
    };
  }

  it("clears only the reset series and preserves unrelated pending writes and annotations", () => {
    const current = history();
    const next = applySeriesReset(current, reset);
    expect(Object.keys(next.progress)).toEqual(["boun-1", "archive-1"]);
    expect(next.currentArticleId).not.toBe("article-1");
    expect(next.outbox.map((operation) => `${operation.entityType}:${operation.entityId}`)).toEqual(
      ["progress:boun-1", "progress:archive-1", "saved-place:article-1"],
    );
    expect(next.savedPlaces).toEqual(current.savedPlaces);
    expect(next.highlights).toEqual(current.highlights);
    expect(next.resetVersion).toBe(0);
  });

  it("ignores an older in-flight response after immediate local reset", () => {
    const current = applySeriesReset(history(), reset);
    const old = answer([]);
    old.changes.progress = [progress()];
    const next = mergeSyncResponse(current, old);
    expect(next.progress["article-1"]).toBeUndefined();
    expect(next.seriesResets).toEqual([reset]);
    expect(next.progress["boun-1"]).toBeDefined();
  });

  it("adopts a reset on a fresh device without clearing its new visit", () => {
    const current = emptyReaderData(WORKSPACE, DEVICE);
    current.progress["article-1"] = progress();
    const next = mergeSyncResponse(current, answer(), { adoptReset: true });
    expect(next.progress["article-1"]).toBeDefined();
    expect(next.seriesResets).toEqual([reset]);
  });

  it("does not let an older tab lower the reset epoch or restore its queued progress", () => {
    const oldTab = history();
    const current = applySeriesReset(history(), reset);
    const next = mergeStoredReaderData(current, oldTab);
    expect(next.seriesResets).toEqual([reset]);
    expect(next.progress["article-1"]).toBeUndefined();
    expect(
      next.outbox
        .filter((operation) => operation.entityType === "progress")
        .every((operation) => operation.entityId !== "article-1"),
    ).toBe(true);
    expect(next.progress["boun-1"]).toBeDefined();
  });

  it("learns a reset from another tab without losing unrelated unsent progress", () => {
    const current = history();
    const incoming = applySeriesReset(emptyReaderData(WORKSPACE, DEVICE), reset);
    const next = mergeStoredReaderData(current, incoming);
    expect(next.progress["article-1"]).toBeUndefined();
    expect(next.progress["boun-1"]).toBeDefined();
    expect(next.outbox.some((operation) => operation.entityId === "boun-1")).toBe(true);
  });

  it("adopts a sibling tab's new pending article and its matching local record", () => {
    const current = emptyReaderData(WORKSPACE, DEVICE);
    const incoming = history();
    const next = mergeStoredReaderData(current, incoming);
    expect(next.progress["boun-1"]).toEqual(incoming.progress["boun-1"]);
    expect(next.outbox.some((operation) => operation.entityId === "boun-1")).toBe(true);
  });

  it("keeps unsent reading made by a sibling after its newer reset", () => {
    const incoming = applySeriesReset(history(), reset);
    const record = progress({ scrollRatio: 0.1, completed: false });
    incoming.progress[record.articleId] = record;
    incoming.outbox.push({
      operationId: crypto.randomUUID(),
      entityType: "progress",
      entityId: record.articleId,
      operationType: "upsert",
      deviceId: DEVICE,
      clientUpdatedAt: record.clientUpdatedAt,
      payload: record,
    });
    const next = mergeStoredReaderData(history(), incoming);
    expect(next.progress["article-1"]).toMatchObject({ scrollRatio: 0.1, completed: false });
    expect(
      next.outbox.some(
        (operation) => operation.entityType === "progress" && operation.entityId === "article-1",
      ),
    ).toBe(true);
  });

  it("does not regress already-synced other-series progress from an older tab snapshot", () => {
    const current = history();
    current.progress["boun-1"] = progress({
      articleId: "boun-1",
      scrollRatio: 0.8,
      clientUpdatedAt: "2026-06-30T10:00:00.000Z",
    });
    current.outbox = current.outbox.filter((operation) => operation.entityId !== "boun-1");
    const next = mergeStoredReaderData(current, history());
    expect(next.progress["boun-1"].scrollRatio).toBe(0.8);
    expect(next.outbox.some((operation) => operation.entityId === "boun-1")).toBe(false);
  });

  it("keeps progress written after the reset and applies subsequent global resets", () => {
    const current = applySeriesReset(history(), reset);
    const newer = answer();
    newer.changes.progress = [progress({ scrollRatio: 0.1, changeVersion: 51 })];
    const next = mergeSyncResponse(current, newer);
    expect(next.progress["article-1"].scrollRatio).toBe(0.1);
    const global = mergeSyncResponse(next, { ...answer(), resetVersion: 60 });
    expect(global.progress).toEqual({});
    const stale = mergeSyncResponse(global, { ...newer, resetVersion: 0 });
    expect(stale.progress).toEqual({});
  });
});

describe("mergeSyncResponse after a server-side progress reset", () => {
  const SAVED_OPERATION = "33333333-3333-4333-8333-333333333333";
  const STALE_OPERATION = "44444444-4444-4444-8444-444444444444";

  function readerWithHistory() {
    const current = emptyReaderData(WORKSPACE, DEVICE);
    current.cursor = 40;
    current.currentArticleId = "article-1";
    current.progress["article-1"] = progress({
      completed: true,
      scrollRatio: 1,
      changeVersion: 30,
    });
    current.progress["article-2"] = progress({ articleId: "article-2", changeVersion: 31 });
    current.savedPlaces["article-2"] = {
      articleId: "article-2",
      headingId: null,
      scrollRatio: 0.4,
      anchor: null,
      previewText: "",
      clientUpdatedAt: "2026-06-29T10:00:00.000Z",
      deviceId: DEVICE,
      deletedAt: null,
      changeVersion: 32,
    };
    // A progress write made on top of the old state, and an unrelated saved-place write.
    const stale = progress({ articleId: "article-2", scrollRatio: 0.6 });
    current.outbox.push(
      {
        operationId: STALE_OPERATION,
        entityType: "progress",
        entityId: "article-2",
        operationType: "upsert",
        deviceId: DEVICE,
        clientUpdatedAt: stale.clientUpdatedAt,
        payload: { ...stale },
      },
      {
        operationId: SAVED_OPERATION,
        entityType: "saved-place",
        entityId: "article-3",
        operationType: "upsert",
        deviceId: DEVICE,
        clientUpdatedAt: "2026-06-29T10:05:00.000Z",
        payload: {
          articleId: "article-3",
          headingId: null,
          scrollRatio: 0.1,
          anchor: null,
          previewText: "",
          clientUpdatedAt: "2026-06-29T10:05:00.000Z",
          deviceId: DEVICE,
          deletedAt: null,
        },
      },
    );
    return current;
  }

  function response(overrides: Partial<Parameters<typeof mergeSyncResponse>[1]> = {}) {
    return {
      cursor: 50,
      resetVersion: 45,
      acknowledged: [],
      errors: [],
      changes: { progress: [], savedPlaces: [], highlights: [] },
      serverTime: "2026-06-29T11:00:00.000Z",
      ...overrides,
    };
  }

  it("drops every local progress record and pending progress write", () => {
    const next = mergeSyncResponse(readerWithHistory(), response());

    expect(next.progress).toEqual({});
    expect(next.currentArticleId).toBeNull();
    expect(next.resetVersion).toBe(45);
    expect(next.outbox.map((operation) => operation.operationId)).toEqual([SAVED_OPERATION]);
  });

  it("keeps saved places and highlights, which the reset does not own", () => {
    const next = mergeSyncResponse(readerWithHistory(), response());

    expect(next.savedPlaces["article-2"]?.deletedAt).toBeNull();
  });

  it("applies the progress written since the reset, even for a formerly pending article", () => {
    const fresh = progress({ articleId: "article-2", scrollRatio: 0.15, changeVersion: 47 });
    const next = mergeSyncResponse(
      readerWithHistory(),
      response({ changes: { progress: [fresh], savedPlaces: [], highlights: [] } }),
    );

    expect(Object.keys(next.progress)).toEqual(["article-2"]);
    expect(next.progress["article-2"].scrollRatio).toBe(0.15);
    // The resume target is rebuilt from what survived the reset.
    expect(next.currentArticleId).toBe("article-2");
  });

  it("applies a reset once: the same version again leaves later reading alone", () => {
    const once = mergeSyncResponse(readerWithHistory(), response());
    once.progress["article-5"] = progress({ articleId: "article-5", scrollRatio: 0.5 });
    once.currentArticleId = "article-5";

    const again = mergeSyncResponse(once, response({ cursor: 51 }));

    expect(again.progress["article-5"]?.scrollRatio).toBe(0.5);
    expect(again.currentArticleId).toBe("article-5");
    expect(again.resetVersion).toBe(45);
  });

  it("adopts the version without clearing when the device held no prior progress", () => {
    const current = emptyReaderData(WORKSPACE, DEVICE);
    current.progress["article-9"] = progress({ articleId: "article-9", scrollRatio: 0.3 });
    current.currentArticleId = "article-9";

    const next = mergeSyncResponse(current, response(), { adoptReset: true });

    expect(next.resetVersion).toBe(45);
    expect(next.progress["article-9"]?.scrollRatio).toBe(0.3);
    expect(next.currentArticleId).toBe("article-9");
  });

  it("ignores a response that predates what this device already applied", () => {
    const current = readerWithHistory();
    current.resetVersion = 45;

    const next = mergeSyncResponse(current, response({ resetVersion: 12 }));

    expect(Object.keys(next.progress).sort()).toEqual(["article-1", "article-2"]);
    expect(next.resetVersion).toBe(45);
  });
});
