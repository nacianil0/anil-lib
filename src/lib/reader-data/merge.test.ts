import { describe, expect, it } from "vitest";
import { mergeSyncResponse } from "./merge";
import { emptyReaderData, type ProgressRecord } from "./schema";

const DEVICE = "11111111-1111-4111-8111-111111111111";
const OPERATION = "22222222-2222-4222-8222-222222222222";

function progress(overrides: Partial<ProgressRecord> = {}): ProgressRecord {
  return {
    articleId: "article-1",
    headingId: null,
    scrollRatio: 0.2,
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
    const current = emptyReaderData(DEVICE);
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
    const current = emptyReaderData(DEVICE);
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
