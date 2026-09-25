import { describe, expect, it } from "vitest";
import type { ArticleDescriptor, ReadingStatus } from "./types";
import {
  groupByPhase,
  nextStep,
  outlinePhases,
  phaseForOrder,
  summarizePhases,
  type PhaseOutline,
} from "./series-progress";

function article(readingOrder: number): ArticleDescriptor {
  return {
    articleId: `a${readingOrder}`,
    slug: `a-${readingOrder}`,
    title: `Makale ${readingOrder}`,
    category: "foundations",
    level: "beginner",
    readingOrder,
    classificationBatch: 0,
  };
}

const PHASES: PhaseOutline[] = [
  { id: "faz-01", title: "Birinci", orders: [1, 2, 3] },
  { id: "faz-02", title: "İkinci", orders: [4, 5, 6] },
  // Planned chapters (7, 8) are not published yet.
  { id: "faz-03", title: "Üçüncü", orders: [7, 8] },
];
const ARTICLES = [1, 2, 3, 4, 5, 6].map(article);

function lookup(state: Record<number, { status: ReadingStatus; at?: string }>) {
  return {
    statusOf: (id: string) => state[Number(id.slice(1))]?.status ?? "unread",
    lastReadAt: (id: string) => state[Number(id.slice(1))]?.at ?? "",
  };
}

describe("series progress", () => {
  it("outlines a roadmap into phases with their planned orders", () => {
    const outline = outlinePhases({
      schemaVersion: 1,
      seriesTitle: "Seri",
      seriesSubtitle: "Alt",
      phases: [
        {
          id: "faz-01",
          title: "Birinci",
          description: "d",
          articles: [
            { order: 1, title: "x", status: "yayinda", slug: "x" },
            { order: 2, title: "y", status: "planlandi" },
          ],
        },
      ],
    });
    expect(outline).toEqual([{ id: "faz-01", title: "Birinci", orders: [1, 2] }]);
  });

  it("groups published chapters by phase and skips phases with nothing published", () => {
    const groups = groupByPhase(ARTICLES, PHASES);
    expect(groups.map((group) => [group.phase.id, group.number, group.articles.length])).toEqual([
      ["faz-01", 1, 3],
      ["faz-02", 2, 3],
    ]);
  });

  it("keeps a chapter the roadmap does not place instead of dropping it", () => {
    const groups = groupByPhase([...ARTICLES, article(9)], PHASES);
    expect(groups.at(-1)?.articles.map((a) => a.readingOrder)).toEqual([9]);
  });

  it("starts at the first chapter when nothing has been read", () => {
    expect(nextStep(ARTICLES, lookup({}))).toMatchObject({ article: { readingOrder: 1 }, kind: "start" });
  });

  it("resumes the most recently visited unfinished chapter", () => {
    const step = nextStep(
      ARTICLES,
      lookup({
        1: { status: "completed" },
        2: { status: "in-progress", at: "2026-09-20T10:00:00.000Z" },
        5: { status: "in-progress", at: "2026-09-24T10:00:00.000Z" },
      }),
    );
    expect(step).toMatchObject({ article: { readingOrder: 5 }, kind: "resume" });
  });

  it("continues in order even when later chapters were read out of turn", () => {
    const step = nextStep(
      ARTICLES,
      lookup({ 1: { status: "completed" }, 2: { status: "completed" }, 5: { status: "completed" } }),
    );
    expect(step).toMatchObject({ article: { readingOrder: 3 }, kind: "next" });
  });

  it("has no next step once every published chapter is finished", () => {
    const all = Object.fromEntries(ARTICLES.map((a) => [a.readingOrder, { status: "completed" as const }]));
    expect(nextStep(ARTICLES, lookup(all))).toBeNull();
  });

  it("summarizes each phase against its plan", () => {
    const { statusOf } = lookup({ 1: { status: "completed" }, 2: { status: "completed" }, 4: { status: "in-progress" } });
    expect(summarizePhases(ARTICLES, PHASES, statusOf)).toEqual([
      { id: "faz-01", title: "Birinci", number: 1, planned: 3, published: 3, completed: 2 },
      { id: "faz-02", title: "İkinci", number: 2, planned: 3, published: 3, completed: 0 },
      { id: "faz-03", title: "Üçüncü", number: 3, planned: 2, published: 0, completed: 0 },
    ]);
  });

  it("finds the phase of a reading order", () => {
    expect(phaseForOrder(5, PHASES)).toMatchObject({ phase: { id: "faz-02" }, number: 2 });
    expect(phaseForOrder(42, PHASES)).toBeNull();
  });
});
