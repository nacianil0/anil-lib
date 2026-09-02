import { describe, expect, it } from "vitest";
import {
  progressRecordSchema,
  readerDataSchema,
  readingAnchorSchema,
  savedPlaceRecordSchema,
  syncMutationSchema,
} from "./schema";

const DEVICE = "11111111-1111-4111-8111-111111111111";
const NOW = "2026-06-29T10:00:00.000Z";

const ANCHOR = {
  exactText: "Döngü değişmezi, döngünün her turunda korunan bir ifadedir.",
  prefixText: "Bir önceki cümle. ",
  suffixText: " Sonraki cümle.",
  blockIndex: 7,
  blockOffset: 0.42,
};

function legacyProgress(extra: Record<string, unknown> = {}) {
  return {
    articleId: "article-1",
    headingId: "giris",
    scrollRatio: 0.5,
    completed: false,
    lastReadAt: NOW,
    clientUpdatedAt: NOW,
    deviceId: DEVICE,
    ...extra,
  };
}

describe("readingAnchorSchema", () => {
  it("fills the optional context fields", () => {
    const parsed = readingAnchorSchema.parse({ exactText: "Yeterince uzun bir metin." });
    expect(parsed).toEqual({
      exactText: "Yeterince uzun bir metin.",
      prefixText: "",
      suffixText: "",
      blockIndex: 0,
      blockOffset: 0,
    });
  });

  it("clamps a block offset that came back out of range", () => {
    expect(readingAnchorSchema.parse({ ...ANCHOR, blockOffset: 4 }).blockOffset).toBe(1);
    expect(readingAnchorSchema.parse({ ...ANCHOR, blockOffset: -1 }).blockOffset).toBe(0);
    expect(readingAnchorSchema.parse({ ...ANCHOR, blockOffset: "yarım" }).blockOffset).toBe(0);
  });

  it("rejects an empty or oversized text", () => {
    expect(readingAnchorSchema.safeParse({ ...ANCHOR, exactText: "" }).success).toBe(false);
    expect(readingAnchorSchema.safeParse({ ...ANCHOR, exactText: "a".repeat(401) }).success).toBe(
      false,
    );
  });
});

describe("progressRecordSchema", () => {
  it("reads a record written before anchoring existed", () => {
    const parsed = progressRecordSchema.parse(legacyProgress());
    expect(parsed.anchor).toBeNull();
    expect(parsed.scrollRatio).toBe(0.5);
    expect(parsed.headingId).toBe("giris");
  });

  it("keeps a valid anchor", () => {
    expect(progressRecordSchema.parse(legacyProgress({ anchor: ANCHOR })).anchor).toEqual(ANCHOR);
  });

  it("drops a malformed anchor without discarding the position", () => {
    const parsed = progressRecordSchema.parse(
      legacyProgress({ anchor: { exactText: 42, blockIndex: "yedi" } }),
    );
    expect(parsed.anchor).toBeNull();
    expect(parsed.scrollRatio).toBe(0.5);
  });
});

describe("savedPlaceRecordSchema", () => {
  it("reads a saved place written before anchoring existed", () => {
    const parsed = savedPlaceRecordSchema.parse({
      articleId: "article-1",
      headingId: null,
      scrollRatio: 0.3,
      previewText: "Bir paragraf.",
      clientUpdatedAt: NOW,
      deviceId: DEVICE,
      deletedAt: null,
    });
    expect(parsed.anchor).toBeNull();
    expect(parsed.previewText).toBe("Bir paragraf.");
  });
});

describe("readerDataSchema", () => {
  it("still accepts a stored blob from before anchoring, unversioned change", () => {
    const parsed = readerDataSchema.safeParse({
      version: 2,
      workspaceId: "owner",
      deviceId: DEVICE,
      cursor: 3,
      currentArticleId: "article-1",
      progress: { "article-1": legacyProgress() },
      savedPlaces: {},
      highlights: {},
      outbox: [],
      lastSyncAt: NOW,
    });
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data.progress["article-1"].anchor).toBeNull();
  });
});

describe("syncMutationSchema", () => {
  it("carries the anchor over the wire", () => {
    const parsed = syncMutationSchema.safeParse({
      operationId: "22222222-2222-4222-8222-222222222222",
      entityType: "progress",
      entityId: "article-1",
      operationType: "upsert",
      deviceId: DEVICE,
      clientUpdatedAt: NOW,
      payload: legacyProgress({ anchor: ANCHOR }),
    });
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data.entityType === "progress" && parsed.data.payload.anchor)
      .toEqual(ANCHOR);
  });
});
