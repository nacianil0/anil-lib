"use client";

import Link from "next/link";
import { ArrowRight, Bookmark, CheckCircle2, Highlighter, Library, RotateCcw } from "lucide-react";
import type { ArticleDescriptor } from "@/lib/content/types";
import { CATEGORY_LABELS, UI } from "@/lib/content/labels";
import { ReaderDataProvider, useReaderData } from "@/lib/reader-data/use-reader-data";
import { ReaderPreferencesProvider } from "@/lib/preferences/use-reader-preferences";
import { LockButton } from "@/components/reader/lock-button";
import { SyncStatus } from "@/components/reader/sync-status";

function formatDate(value: string): string {
  try {
    return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" }).format(
      new Date(value),
    );
  } catch {
    return "";
  }
}

function DashboardContent({ articles }: { articles: ArticleDescriptor[] }) {
  const { ready, data, statusOf } = useReaderData();
  const byId = new Map(articles.map((article) => [article.articleId, article]));
  const progressEntries = Object.values(data.progress).sort((a, b) =>
    b.lastReadAt.localeCompare(a.lastReadAt),
  );
  const currentId = data.currentArticleId ?? progressEntries[0]?.articleId;
  const current = currentId ? byId.get(currentId) : articles[0];
  const currentProgress = current ? data.progress[current.articleId] : null;
  const places = Object.values(data.savedPlaces)
    .filter((place) => !place.deletedAt && byId.has(place.articleId))
    .sort((a, b) => b.clientUpdatedAt.localeCompare(a.clientUpdatedAt));
  const highlights = Object.values(data.highlights)
    .filter((highlight) => !highlight.deletedAt && byId.has(highlight.articleId))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const completed = articles.filter(
    (article) => statusOf(article.articleId) === "completed",
  ).length;
  const inProgress = articles.filter(
    (article) => statusOf(article.articleId) === "in-progress",
  ).length;
  const percent = articles.length ? Math.round((completed / articles.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <p className="font-serif text-xl font-semibold">{UI.libraryTitle}</p>
            <p className="mt-0.5 font-sans text-2xs text-text-muted">Okuma çalışma alanın</p>
          </div>
          <div className="flex items-center gap-1">
            <SyncStatus />
            <LockButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-10 grid gap-8 border-b border-border pb-10 lg:grid-cols-[1.45fr_0.55fr]">
          <section>
            <p className="mb-3 font-mono text-2xs uppercase tracking-[0.22em] text-accent">
              Okumaya devam et
            </p>
            {current ? (
              <>
                <h1 className="max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">
                  {current.title}
                </h1>
                <p className="mt-3 font-sans text-sm text-text-muted">
                  {CATEGORY_LABELS[current.category]}
                  {currentProgress && ` · %${Math.round(currentProgress.scrollRatio * 100)}`}
                </p>
                <Link
                  href={`/read/${current.slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-accent-fill"
                >
                  Okumaya dön
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </>
            ) : (
              <p className="font-sans text-sm text-text-muted">Okuma listesi boş.</p>
            )}
          </section>

          <section className="border-l-0 border-border lg:border-l lg:pl-8">
            <div className="flex items-end justify-between">
              <span className="font-serif text-5xl font-semibold tabular-nums">%{percent}</span>
              <Library className="mb-1 h-6 w-6 text-accent" aria-hidden="true" />
            </div>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-border">
              <div className="h-full bg-accent" style={{ width: `${percent}%` }} />
            </div>
            <dl className="mt-5 grid grid-cols-3 gap-2 text-center font-sans">
              <div>
                <dt className="text-2xs text-text-faint">Tamamlandı</dt>
                <dd className="mt-1 text-lg font-semibold">{completed}</dd>
              </div>
              <div>
                <dt className="text-2xs text-text-faint">Devam</dt>
                <dd className="mt-1 text-lg font-semibold">{inProgress}</dd>
              </div>
              <div>
                <dt className="text-2xs text-text-faint">Toplam</dt>
                <dd className="mt-1 text-lg font-semibold">{articles.length}</dd>
              </div>
            </dl>
          </section>
        </div>

        {!ready ? (
          <p role="status" className="py-12 text-center font-sans text-sm text-text-muted">
            Okuma kayıtların hazırlanıyor…
          </p>
        ) : (
          <div className="grid gap-10 lg:grid-cols-2">
            <section aria-labelledby="saved-places-title">
              <div className="mb-4 flex items-center justify-between">
                <h2
                  id="saved-places-title"
                  className="flex items-center gap-2 font-serif text-2xl font-semibold"
                >
                  <Bookmark className="h-5 w-5 text-accent" aria-hidden="true" />
                  Kaldığım yerler
                </h2>
                <span className="font-mono text-2xs text-text-faint">{places.length}</span>
              </div>
              {places.length === 0 ? (
                <div className="border-l-2 border-border py-4 pl-4">
                  <p className="font-sans text-sm leading-relaxed text-text-muted">
                    Makalede yer imi düğmesine basarak kaldığın noktayı buraya ekleyebilirsin.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border border-y border-border">
                  {places.slice(0, 8).map((place) => {
                    const article = byId.get(place.articleId)!;
                    return (
                      <Link
                        key={place.articleId}
                        href={`/read/${article.slug}?place=1`}
                        className="group flex items-start gap-4 py-4"
                      >
                        <span className="font-mono text-2xs text-accent">
                          {String(article.readingOrder).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-serif text-lg font-semibold leading-snug group-hover:text-accent">
                            {article.title}
                          </span>
                          <span className="mt-1 line-clamp-2 block font-serif text-sm leading-relaxed text-text-muted">
                            {place.previewText}
                          </span>
                        </span>
                        <span className="font-sans text-2xs text-text-faint">
                          {formatDate(place.clientUpdatedAt)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>

            <section aria-labelledby="highlights-title">
              <div className="mb-4 flex items-center justify-between">
                <h2
                  id="highlights-title"
                  className="flex items-center gap-2 font-serif text-2xl font-semibold"
                >
                  <Highlighter className="h-5 w-5 text-accent" aria-hidden="true" />
                  İşaretlediklerim
                </h2>
                <span className="font-mono text-2xs text-text-faint">{highlights.length}</span>
              </div>
              {highlights.length === 0 ? (
                <div className="border-l-2 border-border py-4 pl-4">
                  <p className="font-sans text-sm leading-relaxed text-text-muted">
                    Bir cümleyi seçip “İşaretle” dediğinde alıntın burada görünecek.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {highlights.slice(0, 10).map((highlight) => {
                    const article = byId.get(highlight.articleId)!;
                    return (
                      <Link
                        key={highlight.id}
                        href={`/read/${article.slug}?highlight=${highlight.id}`}
                        className="border-accent/40 block border-l-2 py-1 pl-4 hover:border-accent"
                      >
                        <blockquote className="line-clamp-3 font-serif text-base leading-relaxed text-text">
                          “{highlight.exactText.trim()}”
                        </blockquote>
                        <span className="mt-1.5 block font-sans text-2xs text-text-muted">
                          {article.title} · {formatDate(highlight.createdAt)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>

            <section className="lg:col-span-2" aria-labelledby="recent-title">
              <div className="mb-4 flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-accent" aria-hidden="true" />
                <h2 id="recent-title" className="font-serif text-xl font-semibold">
                  Son okunanlar
                </h2>
              </div>
              <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {progressEntries.slice(0, 6).map((entry) => {
                  const article = byId.get(entry.articleId);
                  if (!article) return null;
                  return (
                    <Link
                      key={entry.articleId}
                      href={`/read/${article.slug}`}
                      className="bg-surface p-4 transition-colors hover:bg-surface-muted"
                    >
                      <span className="flex items-center justify-between font-mono text-2xs text-text-faint">
                        {String(article.readingOrder).padStart(2, "0")}
                        {entry.completed && <CheckCircle2 className="h-3.5 w-3.5 text-accent" />}
                      </span>
                      <span className="mt-2 line-clamp-2 block font-serif text-base font-semibold leading-snug">
                        {article.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export function ReaderDashboard({ articles }: { articles: ArticleDescriptor[] }) {
  return (
    <ReaderPreferencesProvider>
      <ReaderDataProvider>
        <DashboardContent articles={articles} />
      </ReaderDataProvider>
    </ReaderPreferencesProvider>
  );
}
