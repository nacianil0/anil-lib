"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Home, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { pad } from "@/lib/content/labels";
import type { ArticleDescriptor } from "@/lib/content/types";
import type { SeriesRoadmap } from "@/lib/content/series-roadmap";
import { ReaderDataProvider, useReaderData } from "@/lib/reader-data/use-reader-data";
import { ReaderPreferencesProvider } from "@/lib/preferences/use-reader-preferences";
import { LockButton } from "@/components/reader/lock-button";
import { SyncStatus } from "@/components/reader/sync-status";

type Props = {
  roadmap: SeriesRoadmap;
  articles: ArticleDescriptor[];
};

function LandingContent({ roadmap, articles }: Props) {
  const { ready, statusOf } = useReaderData();
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  const published = roadmap.phases
    .flatMap((phase) => phase.articles)
    .filter((article) => article.status === "yayinda");
  const totalPlanned = roadmap.phases.reduce((sum, phase) => sum + phase.articles.length, 0);

  const completedCount = articles.filter(
    (article) => statusOf(article.articleId) === "completed",
  ).length;

  const continueTarget =
    articles.find((article) => statusOf(article.articleId) === "in-progress") ??
    articles.find((article) => statusOf(article.articleId) !== "completed") ??
    articles[0];
  const started = ready && articles.some((article) => statusOf(article.articleId) !== "unread");

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
          {roadmap.seriesSubtitle} Hiçbir ön bilgi varsaymadan başlar; her makale bir öncekinin
          üzerine biner. Sıra önemlidir: en iyi sonucu baştan sona okuyarak alırsın.
        </p>

        {continueTarget && (
          <Link
            href={`/seri/${continueTarget.slug}`}
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-accent-fill"
          >
            {started ? "Kaldığın yerden devam et" : "Seriye başla"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}

        <dl className="mt-10 grid max-w-md grid-cols-3 gap-2 border-y border-border py-4 text-center font-sans">
          <div>
            <dt className="text-2xs text-text-faint">Yayında</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums">{published.length}</dd>
          </div>
          <div>
            <dt className="text-2xs text-text-faint">Tamamladın</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums">{completedCount}</dd>
          </div>
          <div>
            <dt className="text-2xs text-text-faint">Planlanan</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums">{totalPlanned}</dd>
          </div>
        </dl>

        <section className="mt-12" aria-labelledby="yol-haritasi-baslik">
          <div className="mb-6 flex items-center gap-2">
            <MapIcon className="h-4 w-4 text-accent" aria-hidden="true" />
            <h2 id="yol-haritasi-baslik" className="font-serif text-2xl font-semibold">
              Yol haritası
            </h2>
          </div>

          <ol className="flex flex-col gap-10">
            {roadmap.phases.map((phase, phaseIndex) => (
              <li key={phase.id}>
                <div className="flex items-baseline gap-3 border-b border-border pb-2">
                  <span className="font-mono text-2xs font-semibold tabular-nums text-accent">
                    Faz {pad(phaseIndex + 1)}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold leading-snug">
                      {phase.title}
                    </h3>
                    <p className="mt-0.5 font-sans text-2xs text-text-muted">
                      {phase.description}
                    </p>
                  </div>
                </div>
                <ol className="mt-2 flex flex-col">
                  {phase.articles.map((article) => {
                    const descriptor =
                      article.status === "yayinda" && article.slug
                        ? bySlug.get(article.slug)
                        : undefined;
                    const status = descriptor ? statusOf(descriptor.articleId) : "unread";

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

                    return (
                      <li key={article.order}>
                        <Link
                          href={`/seri/${descriptor.slug}`}
                          className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-2.5 rounded-md py-[0.45rem] pl-1 pr-2 transition-colors hover:bg-surface-muted"
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
                          </span>
                          <span className="flex items-center gap-1.5">
                            {status === "completed" && (
                              <Check
                                className="h-3.5 w-3.5 text-accent"
                                strokeWidth={2.5}
                                aria-hidden="true"
                              />
                            )}
                            {status === "in-progress" && (
                              <span
                                className="h-1.5 w-1.5 rounded-full bg-cool"
                                aria-hidden="true"
                              />
                            )}
                            <ArrowUpRight
                              className="h-3.5 w-3.5 text-text-faint transition-colors group-hover:text-accent"
                              aria-hidden="true"
                            />
                            <span className="sr-only">
                              {status === "completed"
                                ? "Tamamlandı"
                                : status === "in-progress"
                                  ? "Devam ediyor"
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
          Seri 5&apos;er makalelik gruplar halinde yayımlanır; planlanan başlıklar yeni gruplar
          hazırlanırken güncellenebilir.
        </p>
      </main>
    </div>
  );
}

export function SeriesLanding(props: Props) {
  return (
    <ReaderPreferencesProvider>
      <ReaderDataProvider>
        <LandingContent {...props} />
      </ReaderDataProvider>
    </ReaderPreferencesProvider>
  );
}
