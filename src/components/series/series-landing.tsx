"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Home, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { pad, UI } from "@/lib/content/labels";
import { readBeforeRevision } from "@/lib/content/revision";
import type { ArticleDescriptor } from "@/lib/content/types";
import type { SeriesRoadmap } from "@/lib/content/series-roadmap";
import {
  nextStep,
  outlinePhases,
  phaseForOrder,
  summarizePhases,
} from "@/lib/content/series-progress";
import { ReaderDataProvider, useReaderData } from "@/lib/reader-data/use-reader-data";
import { ReaderPreferencesProvider } from "@/lib/preferences/use-reader-preferences";
import { LockButton } from "@/components/reader/lock-button";
import { SyncStatus } from "@/components/reader/sync-status";
import { PhaseProgress } from "./phase-progress";

type Props = {
  roadmap: SeriesRoadmap;
  articles: ArticleDescriptor[];
  /** Rota tabanı, ör. "/seri" veya "/boun". */
  basePath: string;
  /** Giriş paragrafının okuma sırası vurgusu; seri kendi cümlesini verir. */
  intro: string;
  /** Sayfa sonundaki yayım ritmi notu. */
  footerNote: string;
};

function LandingContent({ roadmap, articles, basePath, intro, footerNote }: Props) {
  const { ready, statusOf, entryOf } = useReaderData();
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  const totalPlanned = roadmap.phases.reduce((sum, phase) => sum + phase.articles.length, 0);
  const phases = outlinePhases(roadmap);
  const summaries = summarizePhases(articles, phases, statusOf);

  const completedCount = articles.filter(
    (article) => statusOf(article.articleId) === "completed",
  ).length;
  const inProgressCount = articles.filter(
    (article) => statusOf(article.articleId) === "in-progress",
  ).length;

  // One rule for "where next" across the home page and this one: the chapter left
  // part-way, else the first unfinished chapter in reading order.
  const step = ready
    ? nextStep(articles, {
        statusOf,
        lastReadAt: (articleId) => entryOf(articleId).lastReadAt,
      })
    : null;
  const continueTarget = step?.article ?? (ready ? null : articles[0]);
  const stepPhase = step ? phaseForOrder(step.article.readingOrder, phases) : null;
  const stepPercent =
    step?.kind === "resume" ? Math.round(entryOf(step.article.articleId).scrollRatio * 100) : 0;
  const started = ready && step?.kind !== "start";

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-sans text-2xs text-text-muted hover:text-text"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            Ana sayfa
          </Link>
          <div className="flex items-center gap-1">
            <SyncStatus />
            <LockButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="mb-3 font-mono text-2xs uppercase tracking-[0.22em] text-accent">
          {totalPlanned} makalelik seri
        </p>
        <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
          {roadmap.seriesTitle}
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-text-muted">
          {roadmap.seriesSubtitle} {intro}
        </p>

        {continueTarget && (
          <div className={cn("mt-7", !ready && "invisible")} aria-busy={!ready}>
            <Link
              href={`${basePath}/${continueTarget.slug}`}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-accent-fill"
            >
              {started ? UI.continueReading : UI.startSeries}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            {/* Say where the button goes: recognising the chapter beats recalling it. */}
            <p className="mt-2.5 font-sans text-sm text-text-muted">
              <span className="tabular-nums text-text-faint">
                {pad(continueTarget.readingOrder)}
              </span>
              <span className="px-1.5 text-text-faint">·</span>
              <span className="font-serif text-base text-text">{continueTarget.title}</span>
              {stepPercent > 0 && (
                <>
                  <span className="px-1.5 text-text-faint">·</span>
                  {UI.percentRead(stepPercent)}
                </>
              )}
            </p>
          </div>
        )}
        {ready && !step && articles.length > 0 && (
          <p className="mt-7 font-sans text-sm text-text-muted">{UI.seriesDone}</p>
        )}

        <div className="mt-10 max-w-2xl border-y border-border py-4 font-sans">
          <PhaseProgress phases={summaries} markerOrder={step?.article.readingOrder} />
          <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs text-text-muted">
            <p className="min-w-0">
              {/* Before the record loads, or once everything is read, there is no
                  current phase: say how the series is built instead of guessing one. */}
              {stepPhase ? (
                <>
                  <span className="font-medium text-text">
                    {UI.phaseOf(stepPhase.number, phases.length)}
                  </span>
                  <span className="px-1.5 text-text-faint">·</span>
                  {stepPhase.phase.title}
                </>
              ) : (
                UI.phaseCount(phases.length)
              )}
            </p>
            <p className="tabular-nums">
              {ready
                ? UI.phaseProgress(completedCount, articles.length)
                : UI.articleCount(articles.length)}
              {ready && inProgressCount > 0 && ` · ${UI.inProgressCount(inProgressCount)}`}
              {articles.length < totalPlanned && (
                <span className="text-text-faint"> · {totalPlanned} planlandı</span>
              )}
            </p>
          </div>
        </div>

        <section className="mt-12" aria-labelledby="yol-haritasi-baslik">
          <div className="mb-6 flex items-center gap-2">
            <MapIcon className="h-4 w-4 text-accent" aria-hidden="true" />
            <h2 id="yol-haritasi-baslik" className="font-serif text-2xl font-semibold">
              Yol haritası
            </h2>
          </div>

          <ol className="flex flex-col gap-10">
            {roadmap.phases.map((phase, phaseIndex) => (
              <li key={phase.id} id={phase.id} className="scroll-mt-6">
                <div className="flex items-baseline gap-3 border-b border-border pb-2">
                  <span className="shrink-0 font-mono text-2xs font-semibold tabular-nums text-accent">
                    {UI.phase(phaseIndex + 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg font-semibold leading-snug">{phase.title}</h3>
                    <p className="mt-0.5 font-sans text-xs text-text-muted">{phase.description}</p>
                  </div>
                  {ready && summaries[phaseIndex].published > 0 && (
                    <span className="shrink-0 font-sans text-xs tabular-nums text-text-muted">
                      {summaries[phaseIndex].completed} / {summaries[phaseIndex].published}
                      <span className="sr-only"> tamamlandı</span>
                    </span>
                  )}
                </div>
                <ol className="mt-2 flex flex-col">
                  {phase.articles.map((article) => {
                    const descriptor =
                      article.status === "yayinda" && article.slug
                        ? bySlug.get(article.slug)
                        : undefined;
                    const status = descriptor ? statusOf(descriptor.articleId) : "unread";
                    const revisedSinceRead = descriptor
                      ? readBeforeRevision(entryOf(descriptor.articleId), descriptor.revisedAt)
                      : false;

                    if (!descriptor) {
                      return (
                        <li
                          key={article.order}
                          className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-2.5 py-[0.45rem] pl-1 pr-2"
                        >
                          <span className="font-sans text-2xs tabular-nums text-text-faint">
                            {pad(article.order)}
                          </span>
                          <span className="font-serif text-[0.95rem] leading-snug text-text-faint">
                            {article.title}
                          </span>
                          <span className="font-sans text-2xs text-text-faint">yakında</span>
                        </li>
                      );
                    }

                    const isStep = step?.article.articleId === descriptor.articleId;
                    const percent =
                      status === "in-progress"
                        ? Math.round(entryOf(descriptor.articleId).scrollRatio * 100)
                        : 0;
                    return (
                      <li key={article.order}>
                        <Link
                          href={`${basePath}/${descriptor.slug}`}
                          aria-current={isStep ? "step" : undefined}
                          className={cn(
                            "group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-2.5 rounded-md py-[0.45rem] pl-1 pr-2 transition-colors hover:bg-surface-muted",
                            isStep && "bg-accent-soft",
                          )}
                        >
                          <span className="font-sans text-2xs tabular-nums text-accent">
                            {pad(article.order)}
                          </span>
                          <span
                            className={cn(
                              "font-serif text-[0.95rem] leading-snug",
                              status === "completed"
                                ? "text-text-muted"
                                : "text-text group-hover:text-accent",
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
                          <span className="flex items-center gap-1.5">
                            {status === "completed" && (
                              <Check
                                className="h-3.5 w-3.5 text-accent"
                                strokeWidth={2.5}
                                aria-hidden="true"
                              />
                            )}
                            {/* Part-read and next are said in words, not only in colour. */}
                            {status === "in-progress" && (
                              <span
                                className="font-sans text-2xs tabular-nums text-text-muted"
                                aria-hidden="true"
                              >
                                %{percent}
                              </span>
                            )}
                            {isStep && status === "unread" && (
                              <span className="font-sans text-2xs font-medium text-accent">
                                {UI.upNext}
                              </span>
                            )}
                            <ArrowUpRight
                              className="h-3.5 w-3.5 text-text-faint transition-colors group-hover:text-accent"
                              aria-hidden="true"
                            />
                            <span className="sr-only">
                              {status === "completed"
                                ? "Tamamlandı"
                                : status === "in-progress"
                                  ? `Devam ediyor, %${percent}`
                                  : "Okunmadı"}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </li>
            ))}
          </ol>
        </section>

        <p className="mt-12 border-t border-border pt-6 font-sans text-2xs leading-relaxed text-text-faint">
          {footerNote}
        </p>
      </main>
    </div>
  );
}

export function SeriesLanding({ workspaceId, ...props }: Props & { workspaceId: string }) {
  return (
    <ReaderPreferencesProvider>
      <ReaderDataProvider workspaceId={workspaceId}>
        <LandingContent {...props} />
      </ReaderDataProvider>
    </ReaderPreferencesProvider>
  );
}
