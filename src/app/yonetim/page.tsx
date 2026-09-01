import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Home, Users } from "lucide-react";
import { requireOwnerUser } from "@/lib/auth/session-user";
import { getUserStatsOverview } from "@/lib/stats/server/user-stats";
import { formatDateTime } from "@/lib/stats/format";
import { CreateUserForm } from "./create-user-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kullanıcılar",
  robots: { index: false, follow: false },
};

export default async function ManagementPage() {
  const owner = await requireOwnerUser();
  const overview = await getUserStatsOverview(owner);
  const unavailable = overview.status !== "ok";
  const stats = overview.status === "ok" ? overview.stats : [];
  const scopeTitles = stats[0]?.series.map((entry) => entry.title) ?? [];

  return (
    <div className="min-h-screen bg-bg text-text">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-sans text-2xs text-text-muted hover:text-text"
          >
            <Home className="h-3.5 w-3.5" aria-hidden="true" />
            Ana sayfa
          </Link>
          <span className="font-mono text-2xs uppercase tracking-[0.2em] text-text-faint">
            {owner.username}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <p className="mb-3 font-mono text-2xs uppercase tracking-[0.22em] text-accent">
          Yalnızca sana görünür
        </p>
        <h1 className="flex items-center gap-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
          <Users className="h-7 w-7 text-accent" aria-hidden="true" />
          Kullanıcılar
        </h1>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-text-muted">
          Sayılar yalnızca iki öğrenme serisinden gelir; arşiv yazıları bu tabloya
          karışmaz. Ekran salt okunurdur.
        </p>

        <div className="mt-8">
          <CreateUserForm disabled={unavailable} />
        </div>

        {unavailable ? (
          <p
            role="status"
            className="mt-8 rounded border border-cool-soft bg-cool-soft px-4 py-3 font-sans text-sm leading-relaxed text-cool"
          >
            Kullanıcı listesi ve istatistikler şu anda okunamıyor. Ya{" "}
            <code>DATABASE_URL</code> tanımlı değil, ya veritabanına ulaşılamıyor, ya da{" "}
            <code>users</code> tablosunu oluşturan migration henüz uygulanmadı.
          </p>
        ) : (
          <section className="mt-10" aria-labelledby="kullanici-tablosu">
            <h2 id="kullanici-tablosu" className="mb-4 font-serif text-2xl font-semibold">
              Özet
            </h2>

            <div className="overflow-x-auto rounded-md border border-border">
              <table className="w-full min-w-[54rem] border-collapse text-left font-sans text-sm">
                <thead className="bg-surface">
                  <tr className="border-b border-border">
                    <th scope="col" className="px-4 py-3 font-medium">
                      Kullanıcı
                    </th>
                    {scopeTitles.map((title) => (
                      <th key={title} scope="col" className="px-4 py-3 font-medium">
                        {title}
                      </th>
                    ))}
                    <th scope="col" className="px-4 py-3 text-right font-medium">
                      Yer imi
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">
                      İşaret
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Son etkinlik
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Son giriş
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Detay</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((entry) => (
                    <tr key={entry.user.id} className="border-b border-border last:border-b-0">
                      <th scope="row" className="px-4 py-3 font-normal">
                        <span className="block font-serif text-base font-semibold">
                          {entry.user.username}
                        </span>
                        <span className="mt-0.5 block font-mono text-2xs uppercase tracking-[0.15em] text-text-faint">
                          {entry.user.role === "owner" ? "owner" : "kullanıcı"}
                        </span>
                      </th>
                      {entry.series.map((series) => (
                        <td key={series.key} className="px-4 py-3 align-middle">
                          <span className="block tabular-nums">
                            {series.completed}/{series.total}
                            <span className="ml-2 text-text-muted">%{series.percent}</span>
                          </span>
                          <span className="mt-1 block h-1 w-28 overflow-hidden rounded-full bg-border">
                            <span
                              className="block h-full bg-accent"
                              style={{ width: `${series.percent}%` }}
                            />
                          </span>
                          {series.started > 0 && (
                            <span className="mt-1 block font-sans text-2xs text-text-faint">
                              {series.started} makale devam ediyor
                            </span>
                          )}
                        </td>
                      ))}
                      <td className="px-4 py-3 text-right tabular-nums">
                        {entry.savedPlaceCount}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        {entry.highlightCount}
                      </td>
                      <td className="px-4 py-3 text-2xs text-text-muted">
                        {formatDateTime(entry.lastActivityAt)}
                      </td>
                      <td className="px-4 py-3 text-2xs text-text-muted">
                        {formatDateTime(entry.user.lastLoginAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/yonetim/${entry.user.id}`}
                          className="inline-flex items-center gap-1 font-sans text-2xs text-accent hover:underline"
                        >
                          Detay
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="mt-4 flex flex-col gap-1 font-sans text-2xs leading-relaxed text-text-faint">
              <li>
                Tamamlanan sayıları okuyucunun kendi kayıtlarından gelir; yüzde,
                serinin yayımlanmış makale sayısına oranıdır.
              </li>
              <li>
                “Son etkinlik” sunucunun kaydı kabul ettiği andır, tarayıcı saatinden
                bağımsızdır. “Son giriş” hiç giriş yapılmadıysa boştur.
              </li>
              <li>
                Okuma süresi, oturum sayısı gibi ölçümler tutulmadığı için
                gösterilmiyor.
              </li>
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
