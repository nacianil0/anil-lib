import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import type { ReaderUser } from "@/lib/auth/user-schema";

const OWNER_ID = "00000000-0000-4000-8000-00000000000a";
const READER_ID = "00000000-0000-4000-8000-00000000000b";

const hoisted = vi.hoisted(() => {
  const queries: Array<{ text: string; params: unknown[] }> = [];
  const queryMock = vi.fn();
  return { queries, queryMock };
});

vi.mock("@/lib/db/client", () => ({
  getDatabaseUrl: () => "postgres://fake",
  getDatabaseClient: () =>
    ({ query: hoisted.queryMock } as unknown as NeonQueryFunction<false, false>),
}));

const { getUserStatsDetail, getUserStatsOverview, OwnerOnlyError, seriesScopes } = await import(
  "./user-stats"
);

// Real published ids, so scope filtering is exercised against the actual catalogs.
const scopes = seriesScopes();
const AI_ARTICLE = scopes[0].articles[0].articleId;
const BOUN_ARTICLE = scopes[1].articles[0].articleId;

const USER_ROWS = [
  {
    id: OWNER_ID,
    username: "anil",
    workspace_id: "owner",
    role: "owner",
    last_login_at: "2026-08-30T08:00:00.000Z",
    created_at: "2026-06-01T08:00:00.000Z",
  },
  {
    id: READER_ID,
    username: "reader",
    workspace_id: READER_ID,
    role: "user",
    last_login_at: null,
    created_at: "2026-09-01T08:00:00.000Z",
  },
];

const PROGRESS_ROWS = [
  {
    workspace_id: "owner",
    article_id: AI_ARTICLE,
    completed: true,
    scroll_ratio: 1,
    server_updated_at: "2026-09-01T09:00:00.000Z",
  },
  {
    workspace_id: READER_ID,
    article_id: BOUN_ARTICLE,
    completed: false,
    scroll_ratio: 0.5,
    server_updated_at: "2026-09-01T10:00:00.000Z",
  },
];

const PLACE_ROWS = [
  {
    workspace_id: "owner",
    article_id: AI_ARTICLE,
    server_updated_at: "2026-09-01T09:30:00.000Z",
  },
];

function matchesWorkspace(row: { workspace_id: string }, params: unknown[]): boolean {
  return params.length === 0 || row.workspace_id === params[0];
}

hoisted.queryMock.mockImplementation(async (text: string, params: unknown[] = []) => {
  hoisted.queries.push({ text, params });
  if (text.includes("FROM users")) {
    return text.includes("WHERE id = $1::uuid")
      ? USER_ROWS.filter((row) => row.id === params[0])
      : USER_ROWS;
  }
  if (text.includes("FROM reading_progress")) {
    return PROGRESS_ROWS.filter((row) => matchesWorkspace(row, params));
  }
  if (text.includes("FROM saved_places")) {
    return PLACE_ROWS.filter((row) => matchesWorkspace(row, params));
  }
  return [];
});

const OWNER: ReaderUser = {
  id: OWNER_ID,
  username: "anil",
  workspaceId: "owner",
  role: "owner",
  lastLoginAt: null,
  createdAt: "2026-06-01T08:00:00.000Z",
};

const STANDARD: ReaderUser = {
  id: READER_ID,
  username: "reader",
  workspaceId: READER_ID,
  role: "user",
  lastLoginAt: null,
  createdAt: "2026-09-01T08:00:00.000Z",
};

beforeEach(() => {
  hoisted.queries.length = 0;
  hoisted.queryMock.mockClear();
});

describe("owner-only enforcement in the data layer", () => {
  it("refuses a standard user before running any query", async () => {
    await expect(getUserStatsOverview(STANDARD)).rejects.toBeInstanceOf(OwnerOnlyError);
    await expect(getUserStatsDetail(STANDARD, OWNER_ID)).rejects.toBeInstanceOf(OwnerOnlyError);
    expect(hoisted.queryMock).not.toHaveBeenCalled();
  });

  it("refuses an anonymous caller before running any query", async () => {
    await expect(getUserStatsOverview(null)).rejects.toBeInstanceOf(OwnerOnlyError);
    await expect(getUserStatsDetail(null, OWNER_ID)).rejects.toBeInstanceOf(OwnerOnlyError);
    expect(hoisted.queryMock).not.toHaveBeenCalled();
  });
});

describe("getUserStatsOverview", () => {
  it("maps stored rows into per-user, per-series statistics", async () => {
    const result = await getUserStatsOverview(OWNER);
    expect(result.status).toBe("ok");
    if (result.status !== "ok") return;

    const [owner, reader] = result.stats;
    expect(owner.user.username).toBe("anil");
    expect(owner.series[0].completed).toBe(1);
    expect(owner.series[1].completed).toBe(0);
    expect(owner.savedPlaceCount).toBe(1);
    expect(owner.highlightCount).toBe(0);
    expect(owner.lastActivityAt).toBe("2026-09-01T09:30:00.000Z");

    expect(reader.user.username).toBe("reader");
    expect(reader.completedTotal).toBe(0);
    expect(reader.series[1].started).toBe(1);
    expect(reader.savedPlaceCount).toBe(0);
    expect(reader.currentArticle?.articleId).toBe(BOUN_ARTICLE);
  });

  it("never selects credentials or reader-authored text", async () => {
    await getUserStatsOverview(OWNER);
    const selects = hoisted.queries.map((entry) => entry.text).join("\n");
    expect(selects).not.toContain("preview_text");
    expect(selects).not.toContain("exact_text");
    expect(selects).not.toContain("password_hash");
    expect(selects).not.toContain("hash_scheme");
  });

  it("returns nothing readable when no database is configured", async () => {
    vi.resetModules();
    vi.doMock("@/lib/db/client", () => ({
      getDatabaseUrl: () => null,
      getDatabaseClient: () => null,
    }));
    const module = await import("./user-stats");
    await expect(module.getUserStatsOverview(OWNER)).resolves.toEqual({ status: "unavailable" });
    vi.doUnmock("@/lib/db/client");
    vi.resetModules();
  });
});

describe("getUserStatsDetail", () => {
  it("scopes every reader query to the requested workspace", async () => {
    const result = await getUserStatsDetail(OWNER, READER_ID);
    expect(result.status).toBe("ok");

    const readerQueries = hoisted.queries.filter((entry) => !entry.text.includes("FROM users"));
    expect(readerQueries).toHaveLength(3);
    for (const entry of readerQueries) {
      expect(entry.text).toContain("workspace_id = $1");
      expect(entry.params[0]).toBe(READER_ID);
    }
  });

  it("lists every published article of both series, read or not", async () => {
    const result = await getUserStatsDetail(OWNER, READER_ID);
    if (result.status !== "ok") throw new Error("expected ok");

    expect(result.detail.articles).toHaveLength(2);
    expect(result.detail.articles[0].rows).toHaveLength(scopes[0].articles.length);
    expect(result.detail.articles[1].rows).toHaveLength(scopes[1].articles.length);
    expect(result.detail.articles[0].rows[0].order).toBe(1);
    expect(result.detail.articles[1].rows[0]).toMatchObject({
      articleId: BOUN_ARTICLE,
      completed: false,
      percent: 50,
    });
  });

  it("reports a missing account instead of leaking another one", async () => {
    const result = await getUserStatsDetail(OWNER, "00000000-0000-4000-8000-0000000000ff");
    expect(result).toEqual({ status: "not_found" });
  });
});
