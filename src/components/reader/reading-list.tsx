"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, STATUS_LABELS, pad, UI } from "@/lib/content/labels";
import type { ArticleDescriptor, ReadingStatus } from "@/lib/content/types";
import { groupByPhase, type PhaseOutline } from "@/lib/content/series-progress";
import { useReaderProgress } from "@/lib/progress/use-reader-progress";
import { readBeforeRevision } from "@/lib/content/revision";
import { groupByBatchAndCategory } from "./reading-list-groups";

function StatusMark({ status }: { status: ReadingStatus }) {
  return (
    <span className="flex h-4 w-4 items-center justify-center" aria-hidden="true">
      {status === "completed" && <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />}
      {status === "in-progress" && <span className="h-1.5 w-1.5 rounded-full bg-cool" />}
    </span>
  );
}

type Props = {
  articles: ArticleDescriptor[];
  currentArticleId: string;
  onNavigate?: () => void;
  idPrefix?: string;
  basePath?: string;
  /**
   * The series roadmap's phases. When given, the list follows the structure the
   * reader sees on the series page; without it (the archive) it keeps the
   * classification batches.
   */
  phases?: PhaseOutline[];
};

function ArticleItem({
  article,
  isActive,
  basePath,
  onNavigate,
}: {
  article: ArticleDescriptor;
  isActive: boolean;
  basePath: string;
  onNavigate?: () => void;
}) {
  const { statusOf, entryOf } = useReaderProgress();
  const status = statusOf(article.articleId);
  const revisedSinceRead = readBeforeRevision(entryOf(article.articleId), article.revisedAt);
  return (
    <li className="relative">
      <Link
        href={`${basePath}/${article.slug}`}
        aria-current={isActive ? "page" : undefined}
        onClick={onNavigate}
        // Portal's row: flat, full width, 14px in from the edge; the current chapter
        // is a soft accent wash with a 2px accent pin on its leading edge.
        className={cn(
          "group relative grid min-h-9 grid-cols-[1.25rem_1fr_1rem] items-start gap-x-[9px] px-[14px] py-[9px] font-sans text-[13px] leading-[1.35] transition-colors focus-visible:outline-offset-[-2px]",
          isActive
            ? "bg-accent-soft font-medium text-text before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-accent before:content-['']"
            : "text-text-muted hover:bg-surface hover:text-text",
        )}
      >
        <span
          className={cn(
            "pt-px text-[11px] tabular-nums",
            isActive ? "text-accent" : "text-text-muted",
          )}
        >
          {pad(article.readingOrder)}
        </span>
        <span>
          {article.title}
          {revisedSinceRead && (
            <span
              className="ml-1.5 whitespace-nowrap font-sans text-2xs font-medium text-accent"
              title={UI.revisionMarkLong}
            >
              <span aria-hidden="true">{UI.revisionMark}</span>
              <span className="sr-only">{UI.revisionMarkLong}</span>
            </span>
          )}
        </span>
        <StatusMark status={status} />
        <span className="sr-only">{STATUS_LABELS[status]}</span>
      </Link>
    </li>
  );
}

export function ReadingList({
  articles,
  currentArticleId,
  onNavigate,
  idPrefix = "spine",
  basePath = "/read",
  phases,
}: Props) {
  const { statusOf } = useReaderProgress();
  const phaseGroups = useMemo(
    () => (phases && phases.length > 0 ? groupByPhase(articles, phases) : null),
    [articles, phases],
  );
  const batches = useMemo(
    () => (phaseGroups ? [] : groupByBatchAndCategory(articles)),
    [articles, phaseGroups],
  );

  if (phaseGroups) {
    return (
      <nav aria-label={UI.phaseListAriaLabel} className="pb-2">
        <div className="flex flex-col gap-3.5">
          {phaseGroups.map((group) => {
            const done = group.articles.filter(
              (article) => statusOf(article.articleId) === "completed",
            ).length;
            const headingId = `${idPrefix}-${group.phase.id}`;
            return (
              <section key={group.phase.id} aria-labelledby={headingId}>
                <h2
                  id={headingId}
                  aria-label={`${UI.phase(group.number)}: ${group.phase.title} — ${UI.phaseProgress(done, group.articles.length)}`}
                  className="px-[14px] pb-[5px] font-sans"
                >
                  <span className="flex items-baseline justify-between gap-3" aria-hidden="true">
                    <span className="text-[10.5px] font-medium uppercase leading-none tracking-[0.08em] text-accent">
                      {UI.phase(group.number)}
                    </span>
                    <span className="text-[10.5px] tabular-nums leading-none text-text-muted">
                      {done} / {group.articles.length}
                    </span>
                  </span>
                  <span
                    className="mt-1.5 block text-xs font-medium leading-snug text-text"
                    aria-hidden="true"
                  >
                    {group.phase.title}
                  </span>
                </h2>
                <ol className="flex flex-col">
                  {group.articles.map((article) => (
                    <ArticleItem
                      key={article.articleId}
                      article={article}
                      isActive={article.articleId === currentArticleId}
                      basePath={basePath}
                      onNavigate={onNavigate}
                    />
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label={UI.batchAriaLabel} className="pb-2">
      <div className="flex flex-col gap-5">
        {batches.map((batchGroup) => (
          <div key={`batch-${batchGroup.batch}`} className="flex flex-col gap-3.5">
            <h2
              aria-label={UI.batchHeader(batchGroup.batch, batchGroup.articleCount)}
              className="px-[14px] font-sans text-xs font-medium text-text-muted"
            >
              <span className="inline-flex items-baseline gap-1.5" aria-hidden="true">
                <span>{UI.classification}</span>
                <span className="font-mono text-[0.68rem] font-semibold tabular-nums tracking-[0.08em] text-text">
                  {pad(batchGroup.batch)}
                </span>
                <span>·</span>
                <span>{UI.articleCount(batchGroup.articleCount)}</span>
              </span>
            </h2>

            {batchGroup.categories.map((group) => (
              <section
                key={group.key}
                aria-labelledby={`${idPrefix}-batch-${batchGroup.batch}-${group.key}`}
              >
                <h3
                  id={`${idPrefix}-batch-${batchGroup.batch}-${group.key}`}
                  className="px-[14px] pb-[5px] font-sans text-[10.5px] font-medium uppercase leading-none tracking-[0.08em] text-text-muted"
                >
                  {CATEGORY_LABELS[group.category]}
                </h3>
                <ol className="flex flex-col">
                  {group.articles.map((article) => (
                    <ArticleItem
                      key={article.articleId}
                      article={article}
                      isActive={article.articleId === currentArticleId}
                      basePath={basePath}
                      onNavigate={onNavigate}
                    />
                  ))}
                </ol>
              </section>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
