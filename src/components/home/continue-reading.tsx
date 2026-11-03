"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LOCAL_WORKSPACE_ID } from "@/lib/auth/access";
import { pad, UI } from "@/lib/content/labels";
import { nextStep } from "@/lib/content/series-progress";
import type { ArticleDescriptor } from "@/lib/content/types";
import { ReaderDataProvider, useReaderData } from "@/lib/reader-data/use-reader-data";

type Props = { articles: ArticleDescriptor[]; basePath: string };

function ContinueReadingInner({ articles, basePath }: Props) {
  const { ready, statusOf, entryOf, data } = useReaderData();
  if (!ready) return null;
  // Only a visitor who has read something here before gets the shortcut; a first
  // visit shows the plain way in above instead.
  const readHere = articles.some((article) => data.progress[article.articleId]);
  if (!readHere) return null;
  const step = nextStep(articles, {
    statusOf,
    lastReadAt: (articleId) => entryOf(articleId).lastReadAt,
  });
  if (!step) {
    return (
      <p role="status" className="font-sans text-sm text-text-muted">
        {UI.seriesDone}
      </p>
    );
  }
  const percent =
    step.kind === "resume" ? Math.round(entryOf(step.article.articleId).scrollRatio * 100) : 0;

  return (
    <section
      aria-labelledby="continue-heading"
      className="rounded-md border border-border bg-surface p-4 sm:p-5"
    >
      <h2
        id="continue-heading"
        className="font-mono text-2xs uppercase tracking-[0.18em] text-text-faint"
      >
        Bu tarayıcıda kaldığın yer
      </h2>
      <Link
        href={`${basePath}/${step.article.slug}`}
        className="group mt-2 flex items-start justify-between gap-3"
      >
        <span className="min-w-0">
          <span className="font-sans text-sm font-semibold text-accent">
            {step.kind === "resume" ? UI.continueReading : UI.nextChapterLabel}
          </span>
          <span className="mt-1 block font-serif text-lg leading-snug text-text group-hover:text-accent">
            <span className="tabular-nums text-text-faint">{pad(step.article.readingOrder)}</span>{" "}
            {step.article.title}
          </span>
          {percent > 0 && (
            <span className="mt-0.5 block font-sans text-2xs text-text-muted">
              {UI.percentRead(percent)}
            </span>
          )}
        </span>
        <ArrowRight
          className="mt-1 h-4 w-4 shrink-0 text-text-faint group-hover:text-accent"
          aria-hidden="true"
        />
      </Link>
    </section>
  );
}

/** "Kaldığın yerden devam et" for a visitor without an account, from this browser's own record. */
export function ContinueReading(props: Props) {
  return (
    <ReaderDataProvider workspaceId={LOCAL_WORKSPACE_ID} mode="local">
      <ContinueReadingInner {...props} />
    </ReaderDataProvider>
  );
}
