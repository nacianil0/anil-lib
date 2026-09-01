import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { requireOwnerUser } from "@/lib/auth/session-user";
import { getUserStatsDetail } from "@/lib/stats/server/user-stats";
import { formatDate, formatDateTime } from "@/lib/stats/format";
import { pad } from "@/lib/content/labels";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kullanıcı detayı",
  robots: { index: false, follow: false },
};

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const owner = await requireOwnerUser();
  const { userId } = await params;
  const result = await getUserStatsDetail(owner, userId);
  if (result.status === "not_found") notFound();

  if (result.status === "unavailable") {
    return (
      <main className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
        <p role="status" className="font-sans text-sm text-text-muted">
          Veritabanı bu ortamda yapılandırılmamış; kullanıcı detayı okunamıyor.
        </p>
      </main>
    );
  }

  const { stats, articles } = result.detail;

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/yonetim"
            className="inline-flex items-center gap-1.5 font-sans text-2xs text-text-muted hover:text-text"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Kullanıcılar
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
        <p className="mb-2 font-mono text-2xs uppercase tracking-[0.22em] text-accent">
          {stats.user.role === "owner" ? "owner" : "kullanıcı"}
        </p>
        <h1 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
          {stats.user.username}
        </h1>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-4 font-sans sm:grid-cols-4">
          <div>
            <dt className="text-2xs text-text-faint">Tamamlanan</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums">
              {stats.completedTotal}/{stats.articleTotal}
            </dd>
          </div>
          <div>
            <dt className="text-2xs text-text-faint">Yer imi</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums">{stats.savedPlaceCount}</dd>
          </div>
          <div>
            <dt className="text-2xs text-text-faint">İşaret</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums">{stats.highlightCount}</dd>
          </div>
          <div>
            <dt className="text-2xs text-text-faint">Hesap</dt>
            <dd className="mt-1 text-sm font-medium">{formatDate(stats.user.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-2xs text-text-faint">Son etkinlik</dt>
            <dd className="mt-1 text-sm font-medium">{formatDateTime(stats.lastActivityAt)}</dd>
          </div>
          <div>
            <dt className="text-2xs text-text-faint">Son giriş</dt>
            <dd className="mt-1 text-sm font-medium">
              {formatDateTime(stats.user.lastLoginAt)}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-2xs text-text-faint">Kaldığı yer</dt>
            <dd className="mt-1 text-sm font-medium">
              {stats.currentArticle ? (
                <>
                  {stats.currentArticle.title}
                  <span className="ml-2 text-text-muted">%{stats.currentArticle.percent}</span>
                  <span className="mt-0.5 block font-sans text-2xs text-text-faint">
                    {stats.currentArticle.seriesTitle}
                  </span>
                </>
              ) : (
                "—"
              )}
            </dd>
          </div>
        </dl>

        {articles.map(({ scope, rows }) => {
          const series = stats.series.find((entry) => entry.key === scope.key);
          return (
            <section key={scope.key} className="mt-10" aria-labelledby={`seri-${scope.key}`}>
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-2">
                <h2 id={`seri-${scope.key}`} className="font-serif text-xl font-semibold">
                  {scope.title}
                </h2>
                <p className="font-sans text-2xs text-text-muted">
                  {series?.completed ?? 0}/{series?.total ?? rows.length} tamamlandı · %
                  {series?.percent ?? 0}
                </p>
              </div>

              <ol className="flex flex-col">
                {rows.map((row) => (
                  <li
                    key={row.articleId}
                    className="grid grid-cols-[2rem_1fr_auto] items-baseline gap-x-3 border-b border-border py-2 last:border-b-0"
                  >
                    <span className="font-mono text-2xs tabular-nums text-text-faint">
                      {pad(row.order)}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-serif text-[0.95rem] leading-snug">
                        {row.title}
                      </span>
                      <span className="mt-0.5 block font-sans text-2xs text-text-faint">
                        {row.lastActivityAt ? formatDateTime(row.lastActivityAt) : "hiç açılmadı"}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 font-sans text-2xs tabular-nums">
                      {row.completed ? (
                        <>
                          <Check
                            className="h-3.5 w-3.5 text-accent"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                          <span className="text-text-muted">Tamamlandı</span>
                        </>
                      ) : (
                        <span className="text-text-muted">%{row.percent}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </main>
    </div>
  );
}
