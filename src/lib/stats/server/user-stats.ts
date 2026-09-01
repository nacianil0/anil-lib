import "server-only";

import type { NeonQueryFunction } from "@neondatabase/serverless";
import { findUserById, listUsers } from "@/lib/auth/users";
import type { ReaderUser } from "@/lib/auth/user-schema";
import {
  BOUN_BASE_PATH,
  BOUN_TITLE,
  getBounDescriptors,
} from "@/lib/content/series-boun";
import { getSeriesDescriptors, SERIES_BASE_PATH, SERIES_TITLE } from "@/lib/content/series";
import { getDatabaseClient } from "@/lib/db/client";
import {
  buildUserStats,
  type MarkRow,
  type ProgressRow,
  type SeriesScope,
  type UserStats,
} from "@/lib/stats/aggregate";

type SqlClient = NeonQueryFunction<false, false>;

/**
 * Raised when a non-owner reaches this module. It is thrown *before* any query runs,
 * so authorization does not depend on the caller remembering to check first — this
 * is the enforcement layer underneath the route and the server action.
 */
export class OwnerOnlyError extends Error {
  constructor() {
    super("owner_only");
    this.name = "OwnerOnlyError";
  }
}

function assertOwner(actor: ReaderUser | null): asserts actor is ReaderUser {
  if (!actor || actor.role !== "owner") throw new OwnerOnlyError();
}

/** The two learning series are the whole statistics surface; the archive is excluded. */
export function seriesScopes(): SeriesScope[] {
  return [
    {
      key: "seri",
      title: SERIES_TITLE,
      basePath: SERIES_BASE_PATH,
      articles: getSeriesDescriptors().map((article) => ({
        articleId: article.articleId,
        title: article.title,
        slug: article.slug,
      })),
    },
    {
      key: "boun",
      title: BOUN_TITLE,
      basePath: BOUN_BASE_PATH,
      articles: getBounDescriptors().map((article) => ({
        articleId: article.articleId,
        title: article.title,
        slug: article.slug,
      })),
    },
  ];
}

function mapProgressRow(row: Record<string, unknown>): ProgressRow {
  return {
    workspaceId: String(row.workspace_id),
    articleId: String(row.article_id),
    completed: Boolean(row.completed),
    scrollRatio: Number(row.scroll_ratio),
    serverUpdatedAt: new Date(String(row.server_updated_at)).toISOString(),
  };
}

function mapMarkRow(row: Record<string, unknown>): MarkRow {
  return {
    workspaceId: String(row.workspace_id),
    articleId: String(row.article_id),
    serverUpdatedAt: new Date(String(row.server_updated_at)).toISOString(),
  };
}

/**
 * Only the columns the statistics need. `saved_places.preview_text` and
 * `highlights.exact_text` are reader-authored passages and are never selected.
 */
const PROGRESS_COLUMNS = `workspace_id, article_id, completed, scroll_ratio, server_updated_at`;
const MARK_COLUMNS = `workspace_id, article_id, server_updated_at`;

async function readAll(sql: SqlClient) {
  const [progress, places, highlights] = await Promise.all([
    sql.query(`SELECT ${PROGRESS_COLUMNS} FROM reading_progress`),
    sql.query(`SELECT ${MARK_COLUMNS} FROM saved_places WHERE deleted_at IS NULL`),
    sql.query(`SELECT ${MARK_COLUMNS} FROM highlights WHERE deleted_at IS NULL`),
  ]);
  return {
    progress: (progress as Record<string, unknown>[]).map(mapProgressRow),
    savedPlaces: (places as Record<string, unknown>[]).map(mapMarkRow),
    highlights: (highlights as Record<string, unknown>[]).map(mapMarkRow),
  };
}

async function readWorkspace(sql: SqlClient, workspaceId: string) {
  const [progress, places, highlights] = await Promise.all([
    sql.query(`SELECT ${PROGRESS_COLUMNS} FROM reading_progress WHERE workspace_id = $1`, [
      workspaceId,
    ]),
    sql.query(
      `SELECT ${MARK_COLUMNS} FROM saved_places WHERE workspace_id = $1 AND deleted_at IS NULL`,
      [workspaceId],
    ),
    sql.query(
      `SELECT ${MARK_COLUMNS} FROM highlights WHERE workspace_id = $1 AND deleted_at IS NULL`,
      [workspaceId],
    ),
  ]);
  return {
    progress: (progress as Record<string, unknown>[]).map(mapProgressRow),
    savedPlaces: (places as Record<string, unknown>[]).map(mapMarkRow),
    highlights: (highlights as Record<string, unknown>[]).map(mapMarkRow),
  };
}

export type OverviewResult =
  | { status: "ok"; stats: UserStats[] }
  | { status: "unavailable" };

export async function getUserStatsOverview(actor: ReaderUser | null): Promise<OverviewResult> {
  assertOwner(actor);

  const sql = getDatabaseClient();
  if (!sql) return { status: "unavailable" };

  try {
    const users = await listUsers(sql);
    const rows = await readAll(sql);
    return {
      status: "ok",
      stats: buildUserStats({ users, scopes: seriesScopes(), ...rows }),
    };
  } catch (error) {
    // Unreachable database, or a deploy that has not run the migration yet: degrade
    // to the same empty view instead of failing the whole page.
    console.error("[stats] overview query failed", error);
    return { status: "unavailable" };
  }
}

export type ArticleProgressRow = {
  articleId: string;
  title: string;
  slug: string;
  href: string;
  order: number;
  completed: boolean;
  percent: number;
  lastActivityAt: string | null;
};

export type UserDetail = {
  stats: UserStats;
  articles: Array<{ scope: SeriesScope; rows: ArticleProgressRow[] }>;
};

export type DetailResult =
  | { status: "ok"; detail: UserDetail }
  | { status: "unavailable" }
  | { status: "not_found" };

export async function getUserStatsDetail(
  actor: ReaderUser | null,
  userId: string,
): Promise<DetailResult> {
  assertOwner(actor);

  const sql = getDatabaseClient();
  if (!sql) return { status: "unavailable" };

  let user: Awaited<ReturnType<typeof findUserById>>;
  let rows: Awaited<ReturnType<typeof readWorkspace>>;
  try {
    user = await findUserById(sql, userId);
    if (!user) return { status: "not_found" };
    rows = await readWorkspace(sql, user.workspaceId);
  } catch (error) {
    console.error("[stats] detail query failed", error);
    return { status: "unavailable" };
  }

  const scopes = seriesScopes();
  const [stats] = buildUserStats({ users: [user], scopes, ...rows });

  const progressById = new Map(rows.progress.map((row) => [row.articleId, row]));
  const articles = scopes.map((scope) => ({
    scope,
    rows: scope.articles.map<ArticleProgressRow>((article, index) => {
      const row = progressById.get(article.articleId);
      return {
        articleId: article.articleId,
        title: article.title,
        slug: article.slug,
        href: `${scope.basePath}/${article.slug}`,
        order: index + 1,
        completed: row?.completed ?? false,
        percent: row ? Math.round(row.scrollRatio * 100) : 0,
        lastActivityAt: row?.serverUpdatedAt ?? null,
      };
    }),
  }));

  return { status: "ok", detail: { stats, articles } };
}
