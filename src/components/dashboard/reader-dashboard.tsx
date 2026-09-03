"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArticleDescriptor, ReadingStatus } from "@/lib/content/types";
import { pad, UI } from "@/lib/content/labels";
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

/** Ana sayfada kendi satırıyla görünen bir öğrenme serisi. */
export type DashboardSeries = {
  key: string;
  title: string;
  subtitle: string;
  /** Rota tabanı, ör. "/seri" veya "/boun". */
  basePath: string;
  articles: ArticleDescriptor[];
};

type DashboardProps = {
  workspaceId: string;
  series: DashboardSeries[];
  /**
   * Seri öncesi yazılar. Standard kullanıcıda daima boştur; owner'da arşiv girişini
   * ve kendi eski kayıtlarının listelerde görünmesini sağlar.
   */
  archive: ArticleDescriptor[];
  isOwner: boolean;
  username: string;
};

/* Tek bir bölüm başlığı dili: serif başlık, sağda sessiz bir sayı. */
function SectionHeading({ id, title, count }: { id: string; title: string; count?: number }) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-border pb-2">
      <h2 id={id} className="font-serif text-xl font-semibold leading-snug">
        {title}
      </h2>
      {typeof count === "number" && (
        <span className="font-sans text-2xs tabular-nums text-text-faint">{count}</span>
      )}
    </div>
  );
}

function EmptyNote({ children }: { children: React.ReactNode }) {
  return <p className="font-sans text-sm leading-relaxed text-text-muted">{children}</p>;
}

/**
 * Serinin okuma sırası, makale başına bir hücre: tamamlananlar mürekkep, devam eden
 * çelik mavisi, kalanlar boş. Yüzde yerine "nerede olduğunu" gösterir; sayılar altta
 * metin olarak verildiği için şerit dekoratiftir.
 */
function SeriesStrip({ statuses }: { statuses: ReadingStatus[] }) {
  return (
    <div className="flex h-[3px] gap-[2px]" aria-hidden="true">
      {statuses.map((status, index) => (
        <span
          key={index}
          className={cn(
            "flex-1 rounded-[1px]",
            status === "completed"
              ? "bg-accent"
              : status === "in-progress"
                ? "bg-cool"
                : "bg-border",
          )}
        />
      ))}
    </div>
  );
}

function DashboardContent({ series, archive, isOwner, username }: DashboardProps) {
  const { ready, data, statusOf } = useReaderData();

  const seriesArticles = series.flatMap((entry) => entry.articles);
  // Görünür küme kullanıcıya göre değişir: seri dışı yazılar yalnızca owner'da var.
  const visible = [...seriesArticles, ...archive];
  const byId = new Map(visible.map((article) => [article.articleId, article]));
  const seriesById = new Map(
    series.flatMap((entry) => entry.articles.map((article) => [article.articleId, entry] as const)),
  );
  const hrefFor = (article: ArticleDescriptor) =>
    `${seriesById.get(article.articleId)?.basePath ?? "/read"}/${article.slug}`;
  const seriesTitleFor = (article: ArticleDescriptor) =>
    seriesById.get(article.articleId)?.title ?? "Arşiv";

  const progressEntries = Object.values(data.progress)
    .filter((entry) => byId.has(entry.articleId))
    .sort((a, b) => b.lastReadAt.localeCompare(a.lastReadAt));
  const currentId =
    (data.currentArticleId && byId.has(data.currentArticleId) ? data.currentArticleId : null) ??
    progressEntries[0]?.articleId;
  const current = (currentId ? byId.get(currentId) : undefined) ?? seriesArticles[0];
  const currentProgress = current ? (data.progress[current.articleId] ?? null) : null;
  const currentSeries = current ? seriesById.get(current.articleId) : undefined;
  // Kayıt hazır olana kadar dönen okuyucuyu varsay; ilk açılışta tek karelik bir
  // "Kaldığın yer → Başlangıç" geçişi, tersinden daha az rahatsız eder.
  const started = !ready || Boolean(currentProgress);
  const currentPercent = currentProgress ? Math.round(currentProgress.scrollRatio * 100) : 0;

  const places = Object.values(data.savedPlaces)
    .filter((place) => !place.deletedAt && byId.has(place.articleId))
    .sort((a, b) => b.clientUpdatedAt.localeCompare(a.clientUpdatedAt));
  const highlights = Object.values(data.highlights)
    .filter((highlight) => !highlight.deletedAt && byId.has(highlight.articleId))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="min-w-0">
            <p className="font-serif text-xl font-semibold leading-tight">{UI.libraryTitle}</p>
            <p className="mt-0.5 truncate font-sans text-2xs text-text-muted">{username}</p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {isOwner && (
              <Link
                href="/yonetim"
                className="mr-1 inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 font-sans text-2xs text-text-muted transition-colors hover:text-text"
              >
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Kullanıcılar
              </Link>
            )}
            <SyncStatus />
            <LockButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <section aria-labelledby="continue-title" className="border-b border-border pb-10">
          <p className="font-sans text-2xs font-medium uppercase tracking-[0.14em] text-text-faint">
            {started ? "Kaldığın yer" : "Başlangıç"}
          </p>
          {current ? (
            <>
              <h1
                id="continue-title"
                className="mt-3 max-w-2xl font-serif text-3xl font-semibold leading-tight sm:text-4xl"
              >
                {current.title}
              </h1>
              <p className="mt-3 font-sans text-sm text-text-muted">
                {seriesTitleFor(current)}
                {currentSeries && (
                  <>
                    <span className="px-1.5 text-text-faint">·</span>
                    {UI.chapter(current.readingOrder, currentSeries.articles.length)}
                  </>
                )}
                {ready && currentProgress && currentPercent > 0 && !currentProgress.completed && (
                  <>
                    <span className="px-1.5 text-text-faint">·</span>%{currentPercent} okundu
                  </>
                )}
                {ready && currentProgress?.completed && (
                  <>
                    <span className="px-1.5 text-text-faint">·</span>
                    {UI.markedComplete}
                  </>
                )}
              </p>
              <Link
                href={hrefFor(current)}
                className="mt-6 inline-flex items-center rounded-md bg-accent-fill px-4 py-2.5 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {started ? "Okumaya dön" : "Okumaya başla"}
              </Link>
            </>
          ) : (
            <h1 id="continue-title" className="mt-3 font-sans text-sm text-text-muted">
              Okuma listesi boş.
            </h1>
          )}
        </section>

        <section aria-labelledby="series-title" className="border-b border-border py-10">
          <SectionHeading id="series-title" title="Seriler" />
          <ol className="flex flex-col gap-9">
            {series.map((entry) => {
              const statuses = entry.articles.map((article) => statusOf(article.articleId));
              const completed = statuses.filter((status) => status === "completed").length;
              const inProgress = statuses.filter((status) => status === "in-progress").length;
              return (
                <li key={entry.key}>
                  <h3 className="font-serif text-2xl font-semibold leading-snug">
                    <Link href={entry.basePath} className="transition-colors hover:text-accent">
                      {entry.title}
                    </Link>
                  </h3>
                  <p className="mt-1.5 max-w-2xl font-sans text-sm leading-relaxed text-text-muted">
                    {entry.subtitle}
                  </p>
                  <div className="mt-4">
                    <SeriesStrip statuses={statuses} />
                    <div className="mt-2 flex items-baseline justify-between gap-4 font-sans text-2xs">
                      <p className="tabular-nums text-text-faint">
                        {ready
                          ? `${completed} / ${entry.articles.length} tamamlandı`
                          : UI.articleCount(entry.articles.length)}
                        {ready && inProgress > 0 && ` · ${inProgress} devam ediyor`}
                      </p>
                      <Link
                        href={entry.basePath}
                        className="shrink-0 text-accent underline-offset-4 hover:underline"
                      >
                        Yol haritası
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {isOwner && archive.length > 0 && (
            <Link
              href="/read"
              className="mt-8 inline-block font-sans text-sm text-text-muted transition-colors hover:text-text"
            >
              Arşiv
              <span className="text-text-faint"> · {archive.length} seri öncesi yazı</span>
            </Link>
          )}
        </section>

        {!ready ? (
          <p role="status" className="py-12 text-center font-sans text-sm text-text-muted">
            Okuma kayıtların hazırlanıyor…
          </p>
        ) : (
          <div className="grid gap-x-12 gap-y-10 pt-10 lg:grid-cols-2">
            <section aria-labelledby="saved-places-title">
              <SectionHeading
                id="saved-places-title"
                title="Kaldığım yerler"
                count={places.length}
              />
              {places.length === 0 ? (
                <EmptyNote>
                  Makalede yer imi düğmesine basarak kaldığın noktayı buraya ekleyebilirsin.
                </EmptyNote>
              ) : (
                <ol className="divide-y divide-border">
                  {places.slice(0, 8).map((place) => {
                    const article = byId.get(place.articleId)!;
                    return (
                      <li key={place.articleId}>
                        <Link
                          href={`${hrefFor(article)}?place=1`}
                          className="group flex items-baseline gap-4 py-3.5"
                        >
                          <span className="font-sans text-2xs tabular-nums text-text-faint">
                            {pad(article.readingOrder)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-serif text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
                              {article.title}
                            </span>
                            <span className="mt-1 line-clamp-2 block font-serif text-sm leading-relaxed text-text-muted">
                              {place.previewText}
                            </span>
                          </span>
                          <span className="shrink-0 font-sans text-2xs text-text-faint">
                            {formatDate(place.clientUpdatedAt)}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>

            <section aria-labelledby="highlights-title">
              <SectionHeading
                id="highlights-title"
                title="İşaretlediklerim"
                count={highlights.length}
              />
              {highlights.length === 0 ? (
                <EmptyNote>
                  Bir cümleyi seçip “İşaretle” dediğinde alıntın burada görünecek.
                </EmptyNote>
              ) : (
                <ol className="flex flex-col gap-4">
                  {highlights.slice(0, 10).map((highlight) => {
                    const article = byId.get(highlight.articleId)!;
                    return (
                      <li key={highlight.id}>
                        <Link
                          href={`${hrefFor(article)}?highlight=${highlight.id}`}
                          className="block border-l-2 border-border py-1 pl-4 transition-colors hover:border-accent"
                        >
                          <blockquote className="line-clamp-3 font-serif text-base leading-relaxed text-text">
                            “{highlight.exactText.trim()}”
                          </blockquote>
                          <span className="mt-1.5 block font-sans text-2xs text-text-muted">
                            {article.title} · {formatDate(highlight.createdAt)}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>

            <section className="lg:col-span-2" aria-labelledby="recent-title">
              <SectionHeading
                id="recent-title"
                title="Son okunanlar"
                count={progressEntries.length}
              />
              {progressEntries.length === 0 ? (
                <EmptyNote>
                  Açtığın makaleler burada, en son okuduğun başta olacak şekilde sıralanır.
                </EmptyNote>
              ) : (
                <ol className="grid border-b border-border sm:grid-cols-2 sm:gap-x-12">
                  {progressEntries.slice(0, 6).map((entry) => {
                    const article = byId.get(entry.articleId);
                    if (!article) return null;
                    const percent = Math.round(entry.scrollRatio * 100);
                    return (
                      <li key={entry.articleId} className="border-t border-border">
                        <Link
                          href={hrefFor(article)}
                          className="group flex items-baseline gap-4 py-3.5"
                        >
                          <span className="font-sans text-2xs tabular-nums text-text-faint">
                            {pad(article.readingOrder)}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="line-clamp-2 block font-serif text-base font-semibold leading-snug transition-colors group-hover:text-accent">
                              {article.title}
                            </span>
                            <span className="mt-0.5 block font-sans text-2xs text-text-muted">
                              {seriesTitleFor(article)}
                              {entry.completed
                                ? ` · ${UI.markedComplete}`
                                : percent > 0
                                  ? ` · %${percent}`
                                  : ""}
                            </span>
                          </span>
                          <span className="shrink-0 font-sans text-2xs text-text-faint">
                            {formatDate(entry.lastReadAt)}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export function ReaderDashboard(props: DashboardProps) {
  return (
    <ReaderPreferencesProvider>
      <ReaderDataProvider workspaceId={props.workspaceId}>
        <DashboardContent {...props} />
      </ReaderDataProvider>
    </ReaderPreferencesProvider>
  );
}
