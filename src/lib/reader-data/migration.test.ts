import { describe, expect, it } from "vitest";
import { migrateLegacyProgress } from "./migration";

describe("migrateLegacyProgress", () => {
  it("preserves valid v1 progress and queues one cloud mutation per article", () => {
    const deviceId = "11111111-1111-4111-8111-111111111111";
    const legacy = JSON.stringify({
      currentArticleId: "article-1",
      articles: {
        "article-1": {
          headingId: "bolum-2",
          scrollRatio: 0.42,
          completed: false,
          lastReadAt: "2026-06-20T10:00:00.000Z",
        },
      },
    });

    const migrated = migrateLegacyProgress(legacy, deviceId, "2026-06-29T10:00:00.000Z");

    expect(migrated.version).toBe(2);
    expect(migrated.currentArticleId).toBe("article-1");
    expect(migrated.progress["article-1"]).toMatchObject({
      headingId: "bolum-2",
      scrollRatio: 0.42,
      completed: false,
      deviceId,
    });
    expect(migrated.outbox).toHaveLength(1);
    expect(migrated.outbox[0]).toMatchObject({
      entityType: "progress",
      entityId: "article-1",
    });
  });

  it("falls back safely when the legacy payload is corrupt", () => {
    const migrated = migrateLegacyProgress(
      "{broken",
      "11111111-1111-4111-8111-111111111111",
      "2026-06-29T10:00:00.000Z",
    );
    expect(migrated.progress).toEqual({});
    expect(migrated.outbox).toEqual([]);
  });
});
