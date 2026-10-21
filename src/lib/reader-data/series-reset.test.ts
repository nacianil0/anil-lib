import { describe, expect, it } from "vitest";
import { readerDataSchema } from "./schema";
import {
  SERIES_IDS,
  resetVersionForArticle,
  seriesIdSchema,
  seriesResetRequestSchema,
  seriesResetVersionsSchema,
  type SeriesReset,
} from "./series-reset";
import { syncRequestSchema, syncResponseSchema } from "./sync-contract";

const DEVICE = "11111111-1111-4111-8111-111111111111";
const NOW = "2026-10-21T10:00:00.000Z";

function progress(articleId: string) {
  return {
    articleId,
    headingId: null,
    scrollRatio: 1,
    completed: true,
    lastReadAt: NOW,
    clientUpdatedAt: NOW,
    deviceId: DEVICE,
  };
}

function blob(seriesResets: unknown[]) {
  return {
    version: 2,
    workspaceId: "owner",
    deviceId: DEVICE,
    cursor: 40,
    resetVersion: 0,
    seriesResets,
    progress: { "ai-1": progress("ai-1"), "sec-1": progress("sec-1") },
    outbox: [],
  };
}

const RESET = {
  ai: { seriesId: "ai", resetVersion: 10, articleIds: ["ai-1"] },
  boun: { seriesId: "boun", resetVersion: 11, articleIds: ["boun-1"] },
  guvenlik: { seriesId: "guvenlik", resetVersion: 12, articleIds: ["sec-1"] },
} satisfies Record<string, SeriesReset>;

describe("series ids", () => {
  it("knows the three series and nothing else", () => {
    expect(SERIES_IDS).toEqual(["ai", "boun", "guvenlik"]);
    expect(seriesIdSchema.safeParse("guvenlik").success).toBe(true);
    expect(seriesIdSchema.safeParse("archive").success).toBe(false);
    expect(seriesResetRequestSchema.safeParse({ seriesId: "guvenlik" }).success).toBe(true);
    expect(seriesResetRequestSchema.safeParse({ seriesId: "owasp" }).success).toBe(false);
  });

  it("keeps every series' reset version on a sync request instead of stripping one", () => {
    const versions = { ai: 1, boun: 2, guvenlik: 3 };
    expect(seriesResetVersionsSchema.parse(versions)).toEqual(versions);
    expect(syncRequestSchema.parse({ seriesResetVersions: versions }).seriesResetVersions).toEqual(
      versions,
    );
    // An id this build does not know is stripped, as any unknown key is.
    expect(seriesResetVersionsSchema.parse({ ai: 1, future: 9 })).toEqual({ ai: 1 });
  });
});

describe("stored reader data across the third series", () => {
  it("still reads a blob written before the third series existed", () => {
    const parsed = readerDataSchema.parse(blob([RESET.ai, RESET.boun]));
    expect(parsed.seriesResets.map((reset) => reset.seriesId)).toEqual(["ai", "boun"]);
    expect(Object.keys(parsed.progress)).toEqual(["ai-1", "sec-1"]);
  });

  it("holds a reset for each of the three series", () => {
    const parsed = readerDataSchema.parse(blob([RESET.ai, RESET.boun, RESET.guvenlik]));
    expect(parsed.seriesResets).toHaveLength(3);
  });

  it("drops a reset for an unknown series without discarding the reading data", () => {
    const parsed = readerDataSchema.safeParse(
      blob([RESET.ai, { seriesId: "future", resetVersion: 99, articleIds: ["x"] }]),
    );
    expect(parsed.success).toBe(true);
    expect(parsed.success && parsed.data.seriesResets).toEqual([RESET.ai]);
    expect(parsed.success && Object.keys(parsed.data.progress)).toEqual(["ai-1", "sec-1"]);
  });

  it("still rejects a malformed reset of a known series", () => {
    expect(
      readerDataSchema.safeParse(blob([{ seriesId: "guvenlik", resetVersion: -1, articleIds: [] }]))
        .success,
    ).toBe(false);
  });
});

describe("sync responses across the third series", () => {
  const base = {
    cursor: 5,
    resetVersion: 0,
    acknowledged: [],
    errors: [],
    changes: { progress: [], savedPlaces: [], highlights: [] },
    serverTime: NOW,
  };

  it("parses a response that reports all three series' resets", () => {
    const parsed = syncResponseSchema.parse({
      ...base,
      seriesResets: [RESET.ai, RESET.boun, RESET.guvenlik],
    });
    expect(parsed.seriesResets).toHaveLength(3);
  });

  it("ignores a reset for a series a newer server knows and this page does not", () => {
    const parsed = syncResponseSchema.parse({
      ...base,
      seriesResets: [RESET.guvenlik, { seriesId: "future", resetVersion: 99, articleIds: [] }],
    });
    expect(parsed.seriesResets).toEqual([RESET.guvenlik]);
  });
});

describe("resetVersionForArticle", () => {
  it("applies a series reset only to that series' articles", () => {
    const data = { resetVersion: 3, seriesResets: [RESET.guvenlik] };
    expect(resetVersionForArticle(data, "sec-1")).toBe(12);
    expect(resetVersionForArticle(data, "ai-1")).toBe(3);
  });
});
