import { STARTED_RATIO } from "@/lib/reader/version";
import type { ReaderUser } from "@/lib/auth/user-schema";

/**
 * Pure statistics layer.
 *
 * Every displayed number is computed here from rows the database already stores, so
 * the metric maths is testable without a database and there is exactly one place
 * where a definition can drift. No metric is invented: anything not derivable from
 * `reading_progress`, `saved_places`, `highlights` or `users` is simply absent.
 */

export type ArticleRef = {
  articleId: string;
  title: string;
  slug: string;
};

export type SeriesScope = {
  key: string;
  title: string;
  basePath: string;
  /** Published articles of this series, in reading order. */
  articles: ArticleRef[];
};

/** Narrow projection of `reading_progress`; no reader-authored text is selected. */
export type ProgressRow = {
  workspaceId: string;
  articleId: string;
  completed: boolean;
  scrollRatio: number;
  serverUpdatedAt: string;
};

/**
 * Narrow projection of `saved_places` / `highlights`. Deliberately excludes
 * `preview_text` and `exact_text`: the owner sees how many marks exist, never what
 * another reader chose to keep.
 */
export type MarkRow = {
  workspaceId: string;
  articleId: string;
  serverUpdatedAt: string;
};

export type SeriesStats = {
  key: string;
  title: string;
  basePath: string;
  total: number;
  completed: number;
  started: number;
  percent: number;
};

export type ArticlePosition = {
  articleId: string;
  title: string;
  href: string;
  seriesTitle: string;
  percent: number;
  completed: boolean;
};

export type UserStats = {
  user: ReaderUser;
  series: SeriesStats[];
  completedTotal: number;
  startedTotal: number;
  articleTotal: number;
  overallPercent: number;
  savedPlaceCount: number;
  highlightCount: number;
  lastActivityAt: string | null;
  /** Most recently touched series article, finished or not. */
  lastArticle: ArticlePosition | null;
  /** Most recently touched *unfinished* series article — where the reader stands. */
  currentArticle: ArticlePosition | null;
};

export type StatsInput = {
  users: ReaderUser[];
  scopes: SeriesScope[];
  progress: ProgressRow[];
  savedPlaces: MarkRow[];
  highlights: MarkRow[];
};

function laterOf(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return a >= b ? a : b;
}

function percentOf(part: number, total: number): number {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}

function groupByWorkspace<T extends { workspaceId: string }>(rows: T[]): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const row of rows) {
    const bucket = grouped.get(row.workspaceId);
    if (bucket) bucket.push(row);
    else grouped.set(row.workspaceId, [row]);
  }
  return grouped;
}

type ScopeIndex = {
  scope: SeriesScope;
  byId: Map<string, ArticleRef>;
};

function indexScopes(scopes: SeriesScope[]): ScopeIndex[] {
  return scopes.map((scope) => ({
    scope,
    byId: new Map(scope.articles.map((article) => [article.articleId, article])),
  }));
}

function positionOf(
  row: ProgressRow,
  index: ScopeIndex[],
): ArticlePosition | null {
  for (const { scope, byId } of index) {
    const article = byId.get(row.articleId);
    if (!article) continue;
    return {
      articleId: article.articleId,
      title: article.title,
      href: `${scope.basePath}/${article.slug}`,
      seriesTitle: scope.title,
      percent: Math.round(row.scrollRatio * 100),
      completed: row.completed,
    };
  }
  return null;
}

/** True when an unfinished article has been scrolled far enough to count as started. */
export function isStarted(row: { completed: boolean; scrollRatio: number }): boolean {
  return !row.completed && row.scrollRatio > STARTED_RATIO;
}

export function buildUserStats(input: StatsInput): UserStats[] {
  const index = indexScopes(input.scopes);
  const knownArticleIds = new Set(
    input.scopes.flatMap((scope) => scope.articles.map((article) => article.articleId)),
  );
  const progressByWorkspace = groupByWorkspace(input.progress);
  const placesByWorkspace = groupByWorkspace(input.savedPlaces);
  const highlightsByWorkspace = groupByWorkspace(input.highlights);

  return input.users.map((user) => {
    // Rows outside the two series (the owner's archive) never reach these numbers.
    const progress = (progressByWorkspace.get(user.workspaceId) ?? []).filter((row) =>
      knownArticleIds.has(row.articleId),
    );
    const places = (placesByWorkspace.get(user.workspaceId) ?? []).filter((row) =>
      knownArticleIds.has(row.articleId),
    );
    const highlights = (highlightsByWorkspace.get(user.workspaceId) ?? []).filter((row) =>
      knownArticleIds.has(row.articleId),
    );

    const series = index.map<SeriesStats>(({ scope, byId }) => {
      const rows = progress.filter((row) => byId.has(row.articleId));
      const completed = rows.filter((row) => row.completed).length;
      const started = rows.filter(isStarted).length;
      return {
        key: scope.key,
        title: scope.title,
        basePath: scope.basePath,
        total: scope.articles.length,
        completed,
        started,
        percent: percentOf(completed, scope.articles.length),
      };
    });

    const articleTotal = series.reduce((sum, entry) => sum + entry.total, 0);
    const completedTotal = series.reduce((sum, entry) => sum + entry.completed, 0);
    const startedTotal = series.reduce((sum, entry) => sum + entry.started, 0);

    const byRecency = [...progress].sort((a, b) =>
      b.serverUpdatedAt.localeCompare(a.serverUpdatedAt),
    );
    const lastRow: ProgressRow | null = byRecency.length > 0 ? byRecency[0] : null;
    const currentRow = byRecency.find((row) => !row.completed) ?? null;

    let lastActivityAt: string | null = lastRow ? lastRow.serverUpdatedAt : null;
    for (const row of [...places, ...highlights]) {
      lastActivityAt = laterOf(lastActivityAt, row.serverUpdatedAt);
    }

    return {
      user,
      series,
      completedTotal,
      startedTotal,
      articleTotal,
      overallPercent: percentOf(completedTotal, articleTotal),
      savedPlaceCount: places.length,
      highlightCount: highlights.length,
      lastActivityAt,
      lastArticle: lastRow ? positionOf(lastRow, index) : null,
      currentArticle: currentRow ? positionOf(currentRow, index) : null,
    };
  });
}
