import { describe, expect, it } from "vitest";
import { mergeSyncResponse } from "./merge";
import { emptyReaderData, type ProgressRecord } from "./schema";

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

describe("mergeSyncResponse after a server-side progress reset", () => {
  const SAVED_OPERATION = "33333333-3333-4333-8333-333333333333";
  const STALE_OPERATION = "44444444-4444-4444-8444-444444444444";

  function readerWithHistory() {
    const current = emptyReaderData(WORKSPACE, DEVICE);
    current.cursor = 40;
    current.currentArticleId = "article-1";
    current.progress["article-1"] = progress({ completed: true, scrollRatio: 1, changeVersion: 30 });
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
