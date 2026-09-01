import { describe, expect, it } from "vitest";
import type { ReaderUser } from "@/lib/auth/user-schema";
import {
  buildUserStats,
  isStarted,
  type MarkRow,
  type ProgressRow,
  type SeriesScope,
} from "./aggregate";

const OWNER: ReaderUser = {
  id: "00000000-0000-4000-8000-00000000000a",
  username: "anil",
  workspaceId: "owner",
  role: "owner",
  lastLoginAt: "2026-08-30T08:00:00.000Z",
  createdAt: "2026-06-01T08:00:00.000Z",
};

const READER: ReaderUser = {
  id: "00000000-0000-4000-8000-00000000000b",
  username: "reader",
  workspaceId: "00000000-0000-4000-8000-00000000000b",
  role: "user",
  lastLoginAt: null,
  createdAt: "2026-09-01T08:00:00.000Z",
};

const SCOPES: SeriesScope[] = [
  {
    key: "seri",
    title: "Sıfırdan Yüze: Yapay Zekâ",
    basePath: "/seri",
    articles: [
      { articleId: "ai-1", title: "AI bir", slug: "ai-bir" },
      { articleId: "ai-2", title: "AI iki", slug: "ai-iki" },
      { articleId: "ai-3", title: "AI üç", slug: "ai-uc" },
      { articleId: "ai-4", title: "AI dört", slug: "ai-dort" },
    ],
  },
  {
    key: "boun",
    title: "Mülakat Aynası: Boğaziçi CmpE",
    basePath: "/boun",
    articles: [
      { articleId: "bn-1", title: "BOUN bir", slug: "boun-bir" },
      { articleId: "bn-2", title: "BOUN iki", slug: "boun-iki" },
    ],
  },
];

function progress(overrides: Partial<ProgressRow> & Pick<ProgressRow, "workspaceId" | "articleId">): ProgressRow {
  return {
    completed: false,
    scrollRatio: 0,
    serverUpdatedAt: "2026-09-01T10:00:00.000Z",
    ...overrides,
  };
}

function mark(workspaceId: string, articleId: string, serverUpdatedAt: string): MarkRow {
  return { workspaceId, articleId, serverUpdatedAt };
}

describe("buildUserStats", () => {
  it("keeps the two series apart", () => {
    const [stats] = buildUserStats({
      users: [READER],
      scopes: SCOPES,
      progress: [
        progress({ workspaceId: READER.workspaceId, articleId: "ai-1", completed: true }),
        progress({ workspaceId: READER.workspaceId, articleId: "ai-2", completed: true }),
        progress({ workspaceId: READER.workspaceId, articleId: "bn-1", completed: true }),
      ],
      savedPlaces: [],
      highlights: [],
    });

    expect(stats.series[0]).toMatchObject({ key: "seri", completed: 2, total: 4, percent: 50 });
    expect(stats.series[1]).toMatchObject({ key: "boun", completed: 1, total: 2, percent: 50 });
    expect(stats.completedTotal).toBe(3);
    expect(stats.articleTotal).toBe(6);
    expect(stats.overallPercent).toBe(50);
  });

  it("isolates one account's rows from another's", () => {
    const [owner, reader] = buildUserStats({
      users: [OWNER, READER],
      scopes: SCOPES,
      progress: [
        progress({ workspaceId: "owner", articleId: "ai-1", completed: true }),
        progress({ workspaceId: "owner", articleId: "ai-2", completed: true }),
        progress({ workspaceId: "owner", articleId: "ai-3", completed: true }),
        progress({ workspaceId: READER.workspaceId, articleId: "ai-1", completed: true }),
      ],
      savedPlaces: [mark("owner", "ai-1", "2026-09-01T10:00:00.000Z")],
      highlights: [
        mark("owner", "ai-1", "2026-09-01T10:00:00.000Z"),
        mark("owner", "ai-2", "2026-09-01T10:00:00.000Z"),
      ],
    });

    expect(owner.completedTotal).toBe(3);
    expect(owner.savedPlaceCount).toBe(1);
    expect(owner.highlightCount).toBe(2);

    expect(reader.completedTotal).toBe(1);
    expect(reader.savedPlaceCount).toBe(0);
    expect(reader.highlightCount).toBe(0);
  });

  it("excludes archive rows the owner still has outside the two series", () => {
    const [stats] = buildUserStats({
      users: [OWNER],
      scopes: SCOPES,
      progress: [
        progress({ workspaceId: "owner", articleId: "ai-1", completed: true }),
        progress({ workspaceId: "owner", articleId: "archive-legacy-1", completed: true }),
      ],
      savedPlaces: [mark("owner", "archive-legacy-1", "2026-09-01T12:00:00.000Z")],
      highlights: [mark("owner", "archive-legacy-1", "2026-09-01T12:00:00.000Z")],
    });

    expect(stats.completedTotal).toBe(1);
    expect(stats.savedPlaceCount).toBe(0);
    expect(stats.highlightCount).toBe(0);
    expect(stats.lastArticle?.articleId).toBe("ai-1");
  });

  it("counts an unfinished article as started only past the shared threshold", () => {
    const [stats] = buildUserStats({
      users: [READER],
      scopes: SCOPES,
      progress: [
        progress({ workspaceId: READER.workspaceId, articleId: "ai-1", scrollRatio: 0.5 }),
        progress({ workspaceId: READER.workspaceId, articleId: "ai-2", scrollRatio: 0.02 }),
        progress({ workspaceId: READER.workspaceId, articleId: "ai-3", scrollRatio: 0 }),
        progress({
          workspaceId: READER.workspaceId,
          articleId: "ai-4",
          scrollRatio: 0.99,
          completed: true,
        }),
      ],
      savedPlaces: [],
      highlights: [],
    });

    expect(stats.series[0].started).toBe(1);
    expect(stats.startedTotal).toBe(1);
    expect(isStarted({ completed: false, scrollRatio: 0.02 })).toBe(false);
    expect(isStarted({ completed: false, scrollRatio: 0.021 })).toBe(true);
    expect(isStarted({ completed: true, scrollRatio: 1 })).toBe(false);
  });

  it("resolves last and current article from the server clock", () => {
    const [stats] = buildUserStats({
      users: [READER],
      scopes: SCOPES,
      progress: [
        progress({
          workspaceId: READER.workspaceId,
          articleId: "ai-1",
          completed: true,
          scrollRatio: 1,
          serverUpdatedAt: "2026-09-01T09:00:00.000Z",
        }),
        progress({
          workspaceId: READER.workspaceId,
          articleId: "bn-1",
          scrollRatio: 0.4,
          serverUpdatedAt: "2026-09-01T11:00:00.000Z",
        }),
        progress({
          workspaceId: READER.workspaceId,
          articleId: "ai-2",
          completed: true,
          scrollRatio: 1,
          serverUpdatedAt: "2026-09-01T12:00:00.000Z",
        }),
      ],
      savedPlaces: [],
      highlights: [],
    });

    expect(stats.lastArticle).toMatchObject({
      articleId: "ai-2",
      href: "/seri/ai-iki",
      completed: true,
    });
    expect(stats.currentArticle).toMatchObject({
      articleId: "bn-1",
      href: "/boun/boun-bir",
      percent: 40,
      seriesTitle: "Mülakat Aynası: Boğaziçi CmpE",
    });
  });

  it("takes last activity from the newest of the three reader tables", () => {
    const [stats] = buildUserStats({
      users: [READER],
      scopes: SCOPES,
      progress: [
        progress({
          workspaceId: READER.workspaceId,
          articleId: "ai-1",
          serverUpdatedAt: "2026-09-01T09:00:00.000Z",
        }),
      ],
      savedPlaces: [mark(READER.workspaceId, "ai-1", "2026-09-01T10:00:00.000Z")],
      highlights: [mark(READER.workspaceId, "ai-2", "2026-09-02T08:00:00.000Z")],
    });

    expect(stats.lastActivityAt).toBe("2026-09-02T08:00:00.000Z");
  });

  it("reports zeroes, not nulls, for an account that has never read anything", () => {
    const [stats] = buildUserStats({
      users: [READER],
      scopes: SCOPES,
      progress: [],
      savedPlaces: [],
      highlights: [],
    });

    expect(stats.completedTotal).toBe(0);
    expect(stats.overallPercent).toBe(0);
    expect(stats.series.map((entry) => entry.percent)).toEqual([0, 0]);
    expect(stats.lastActivityAt).toBeNull();
    expect(stats.lastArticle).toBeNull();
    expect(stats.currentArticle).toBeNull();
  });

  it("does not divide by zero when a series has no published article yet", () => {
    const [stats] = buildUserStats({
      users: [READER],
      scopes: [{ key: "empty", title: "Boş", basePath: "/bos", articles: [] }],
      progress: [],
      savedPlaces: [],
      highlights: [],
    });

    expect(stats.series[0].percent).toBe(0);
    expect(stats.overallPercent).toBe(0);
  });
});
