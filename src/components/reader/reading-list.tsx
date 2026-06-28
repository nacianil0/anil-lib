"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, STATUS_LABELS, pad, UI } from "@/lib/content/labels";
import type { ArticleDescriptor, ReadingStatus } from "@/lib/content/types";
import { useReaderProgress } from "@/lib/progress/use-reader-progress";
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
};

export function ReadingList({ articles, currentArticleId, onNavigate, idPrefix = "spine" }: Props) {
  const { statusOf } = useReaderProgress();
  const batches = useMemo(() => groupByBatchAndCategory(articles), [articles]);

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
                  {group.articles.map((article) => {
                    const status = statusOf(article.articleId);
                    const isActive = article.articleId === currentArticleId;
                    return (
                      <li key={article.articleId} className="relative">
                        <Link
                          href={`/read/${article.slug}`}
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
                              isActive
                                ? "font-semibold text-accent"
                                : "text-text-muted group-hover:text-text",
                            )}
                          >
                            {article.title}
                          </span>
                          <StatusMark status={status} />
                          <span className="sr-only">{STATUS_LABELS[status]}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </section>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
