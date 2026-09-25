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
        className={cn(
          "group grid grid-cols-[1.3rem_1fr_1rem] items-start gap-x-2.5 rounded-md py-[0.4rem] pl-7 pr-2 transition-colors",
          isActive ? "bg-accent-soft" : "hover:bg-surface-muted",
        )}
      >
        <span
          className="spine-node"
          data-status={status}
          data-current={isActive || undefined}
          aria-hidden="true"
        />
        <span
          className={cn(
            "pt-px font-sans text-2xs tabular-nums",
            isActive ? "text-accent" : "text-text-faint",
          )}
        >
          {pad(article.readingOrder)}
        </span>
        <span
          className={cn(
            "font-serif text-[0.95rem] leading-snug",
            isActive ? "font-semibold text-accent" : "text-text-muted group-hover:text-text",
          )}
        >
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
      <nav aria-label={UI.phaseListAriaLabel} className="relative px-2 pb-6">
        <span className="spine-rail" aria-hidden="true" />
        <div className="flex flex-col gap-6">
          {phaseGroups.map((group, index) => {
            const done = group.articles.filter(
              (article) => statusOf(article.articleId) === "completed",
            ).length;
            const headingId = `${idPrefix}-${group.phase.id}`;
            return (
              <section key={group.phase.id} aria-labelledby={headingId}>
                <h2
                  id={headingId}
                  aria-label={`${UI.phase(group.number)}: ${group.phase.title} — ${UI.phaseProgress(done, group.articles.length)}`}
                  className="mb-1.5 pl-7 pr-2 font-sans"
                >
                  {index > 0 && (
                    <span className="mb-3 block w-full border-t border-border" aria-hidden="true" />
                  )}
                  <span className="flex items-baseline justify-between gap-3" aria-hidden="true">
                    <span className="font-mono text-[0.68rem] font-semibold tabular-nums tracking-[0.08em] text-accent">
                      {UI.phase(group.number)}
                    </span>
                    <span className="text-2xs tabular-nums text-text-muted">
                      {done} / {group.articles.length}
                    </span>
                  </span>
                  <span
                    className="mt-0.5 block text-xs font-medium leading-snug text-text"
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
    <nav aria-label={UI.batchAriaLabel} className="relative px-2 pb-6">
      <span className="spine-rail" aria-hidden="true" />
      <div className="flex flex-col gap-8">
        {batches.map((batchGroup) => (
          <div key={`batch-${batchGroup.batch}`} className="flex flex-col gap-5">
            <h2
              aria-label={UI.batchHeader(batchGroup.batch, batchGroup.articleCount)}
              className="pl-7 font-sans text-xs font-medium text-text-muted"
            >
              <span className="mb-3 block w-full border-t border-border" aria-hidden="true" />
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
                  className="mb-1 pl-7 font-sans text-2xs font-semibold uppercase tracking-[0.13em] text-text-faint"
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
