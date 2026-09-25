import type { SeriesRoadmap } from "./series-roadmap";
import type { ArticleDescriptor, ReadingStatus } from "./types";

/**
 * The part of a series roadmap the reading UI needs: each phase's title and the
 * reading orders it covers, planned chapters included. Small and serializable, so a
 * server page can hand it to client components without the whole roadmap.
 */
export type PhaseOutline = {
  id: string;
  title: string;
  orders: number[];
};

export function outlinePhases(roadmap: SeriesRoadmap): PhaseOutline[] {
  return roadmap.phases.map((phase) => ({
    id: phase.id,
    title: phase.title,
    orders: phase.articles.map((article) => article.order),
  }));
}

/** Published chapters under the roadmap phase their reading order belongs to. */
export type PhaseGroup = {
  phase: PhaseOutline;
  /** 1-based position of the phase in the series. */
  number: number;
  articles: ArticleDescriptor[];
};

/**
 * Groups the catalog by roadmap phase without reordering it. A chapter the roadmap
 * does not place — which the roadmap validation rules out — lands in a trailing
 * group rather than disappearing from the list.
 */
export function groupByPhase(
  articles: ArticleDescriptor[],
  phases: PhaseOutline[],
): PhaseGroup[] {
  const phaseOf = new Map<number, number>();
  phases.forEach((phase, index) => {
    for (const order of phase.orders) phaseOf.set(order, index);
  });

  const groups = phases.map((phase, index) => ({
    phase,
    number: index + 1,
    articles: [] as ArticleDescriptor[],
  }));
  const unplaced: ArticleDescriptor[] = [];
  for (const article of [...articles].sort((a, b) => a.readingOrder - b.readingOrder)) {
    const index = phaseOf.get(article.readingOrder);
    if (index === undefined) unplaced.push(article);
    else groups[index].articles.push(article);
  }

  const result = groups.filter((group) => group.articles.length > 0);
  if (unplaced.length > 0) {
    result.push({
      phase: { id: "diger", title: "Diğer", orders: unplaced.map((a) => a.readingOrder) },
      number: phases.length + 1,
      articles: unplaced,
    });
  }
  return result;
}

export type ProgressLookup = {
  statusOf: (articleId: string) => ReadingStatus;
  /** ISO time of the last visit, or "" for an article never opened. */
  lastReadAt: (articleId: string) => string;
};

export type NextStep = {
  article: ArticleDescriptor;
  /** resume: a chapter left part-way; next: the first unfinished one; start: nothing read yet. */
  kind: "resume" | "next" | "start";
};

/**
 * Where a reader continues a series. A chapter left part-way wins, the most recently
 * visited one first — that is where they stopped. Otherwise the series is read in
 * order, so the next step is the first chapter not yet finished, even when later
 * chapters were read out of turn. Null once every published chapter is finished.
 */
export function nextStep(articles: ArticleDescriptor[], lookup: ProgressLookup): NextStep | null {
  const ordered = [...articles].sort((a, b) => a.readingOrder - b.readingOrder);

  let resume: ArticleDescriptor | null = null;
  let resumeAt = "";
  for (const article of ordered) {
    if (lookup.statusOf(article.articleId) !== "in-progress") continue;
    const at = lookup.lastReadAt(article.articleId);
    if (!resume || at > resumeAt) {
      resume = article;
      resumeAt = at;
    }
  }
  if (resume) return { article: resume, kind: "resume" };

  const unfinished = ordered.find((article) => lookup.statusOf(article.articleId) !== "completed");
  if (!unfinished) return null;
  const anyDone = ordered.some((article) => lookup.statusOf(article.articleId) === "completed");
  return { article: unfinished, kind: anyDone ? "next" : "start" };
}

export type PhaseSummary = {
  id: string;
  title: string;
  number: number;
  /** Chapters the roadmap plans for this phase, published or not. */
  planned: number;
  published: number;
  completed: number;
};

export function summarizePhases(
  articles: ArticleDescriptor[],
  phases: PhaseOutline[],
  statusOf: (articleId: string) => ReadingStatus,
): PhaseSummary[] {
  const byOrder = new Map(articles.map((article) => [article.readingOrder, article]));
  return phases.map((phase, index) => {
    let published = 0;
    let completed = 0;
    for (const order of phase.orders) {
      const article = byOrder.get(order);
      if (!article) continue;
      published += 1;
      if (statusOf(article.articleId) === "completed") completed += 1;
    }
    return {
      id: phase.id,
      title: phase.title,
      number: index + 1,
      planned: phase.orders.length,
      published,
      completed,
    };
  });
}

/** The phase a reading order falls in, or null when the roadmap does not place it. */
export function phaseForOrder(
  order: number,
  phases: PhaseOutline[],
): { phase: PhaseOutline; number: number } | null {
  const index = phases.findIndex((phase) => phase.orders.includes(order));
  return index === -1 ? null : { phase: phases[index], number: index + 1 };
}
