import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LEVEL_LABELS, pad } from "@/lib/content/labels";
import type { ArticleDescriptor } from "@/lib/content/types";
import type { SeriesRoadmap } from "@/lib/content/series-roadmap";
import type { SeriesStats } from "@/lib/content/series-stats";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { buttonPrimary, buttonSecondary } from "@/components/ui/classes";
import { ContinueReading } from "./continue-reading";

export type SampleReading = {
  article: ArticleDescriptor & { summary: string };
  phaseNumber: number;
  phaseTitle: string;
};

type Props = {
  ai: {
    title: string;
    basePath: string;
    articles: ArticleDescriptor[];
    roadmap: SeriesRoadmap;
    stats: SeriesStats;
    samples: SampleReading[];
  };
  guvenlik: {
    title: string;
    subtitle: string;
    published: number;
    planned: number;
    phaseTitles: string[];
  };
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-2xs uppercase tracking-[0.22em] text-accent">{children}</p>;
}

const sectionHeading = "font-serif text-2xl font-semibold leading-snug sm:text-3xl";

/**
 * The public front page. Everything it states about the series is read from the
 * catalogue, the roadmap and the published files (see `series-stats.ts`); nothing on
 * it is a figure typed in by hand.
 */
export function PublicHome({ ai, guvenlik }: Props) {
  const first = ai.articles[0];
  const bySlug = new Map(ai.articles.map((article) => [article.slug, article]));
  const phases = ai.roadmap.phases.map((phase, index) => {
    const opening = phase.articles
      .map((entry) => (entry.slug ? bySlug.get(entry.slug) : undefined))
      .find((article): article is ArticleDescriptor => Boolean(article));
    return { phase, number: index + 1, opening };
  });

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <SiteHeader />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* Giriş */}
        <section className="mx-auto max-w-5xl px-5 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-20">
          <Eyebrow>Türkçe · sıralı · kaynakları gösterilmiş</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-serif text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.01em] sm:text-6xl">
            Yapay zekâyı sıfırdan, kaynağıyla okumak.
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-text-muted sm:text-xl">
            <strong className="font-semibold text-text">{ai.title}</strong>, yapay zekâyı ilk
            kavramlardan araştırma pratiğine kadar {ai.stats.articles} yazıda, her yazı bir
            öncekinin üzerine kurularak anlatan bir öğrenme serisi. Hesap açmadan okunur; her
            yazının sonunda dayandığı kaynaklar listelenir.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {first && (
              <Link href={`${ai.basePath}/${first.slug}`} className={buttonPrimary}>
                Seriye baştan başla
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
            <Link href={ai.basePath} className={buttonSecondary}>
              Bütün yazılar
            </Link>
          </div>

          <div className="mt-6 max-w-xl">
            <ContinueReading articles={ai.articles} basePath={ai.basePath} />
          </div>

          <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
            {[
              [String(ai.stats.articles), "yazı"],
              [String(ai.roadmap.phases.length), "faz"],
              [ai.stats.references.toLocaleString("tr-TR"), "kaynakça girdisi"],
              [String(ai.stats.figures), "açıklayıcı şekil"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-3xl font-semibold tabular-nums leading-none">
                  {value}
                </dd>
                <dd aria-hidden="true" className="mt-1.5 font-sans text-2xs text-text-muted">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Serinin yapısı */}
        <section aria-labelledby="yapi" className="border-y border-border bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
            <Eyebrow>Serinin yapısı</Eyebrow>
            <h2 id="yapi" className={`mt-3 ${sectionHeading}`}>
              {ai.roadmap.phases.length} fazda bir yol
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-text-muted">
              Fazlar sırayla okunmak üzere kurulu: önce öğrenmenin temelleri, sonra modelin eğitimi
              ve kullanımı, ardından akıl yürütme, ajanlar, güvenlik ve değerlendirme; en sonda
              matematiksel omurga ve araştırma pratiği. Bir fazın adına tıklarsan ilk yazısı açılır.
            </p>
            <ol className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {phases.map(({ phase, number, opening }) => (
                <li key={phase.id} className="border-t border-border py-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-2xs tabular-nums text-accent">
                      {pad(number)}
                    </span>
                    <div className="min-w-0">
                      {opening ? (
                        <Link
                          href={`${ai.basePath}/${opening.slug}`}
                          prefetch={false}
                          className="font-serif text-lg font-semibold leading-snug hover:text-accent"
                        >
                          {phase.title}
                        </Link>
                      ) : (
                        <span className="font-serif text-lg font-semibold leading-snug">
                          {phase.title}
                        </span>
                      )}
                      <p className="mt-1 font-sans text-sm leading-relaxed text-text-muted">
                        {phase.description}
                      </p>
                      <p className="mt-1 font-sans text-2xs text-text-faint">
                        {phase.articles.length} yazı
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Örnek okumalar */}
        <section aria-labelledby="ornek" className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <Eyebrow>Nereden başlanır</Eyebrow>
          <h2 id="ornek" className={`mt-3 ${sectionHeading}`}>
            Üç giriş noktası
          </h2>
          <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-text-muted">
            Serinin başından, ortasından ve sonundan birer fazın ilk yazısı. Sırayla okumak en iyi
            sonucu verir; yine de her yazı, dayandığı önceki yazıları adıyla gösterir.
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {ai.samples.map(({ article, phaseNumber, phaseTitle }) => (
              <li key={article.articleId}>
                <Link
                  href={`${ai.basePath}/${article.slug}`}
                  className="group flex h-full flex-col rounded-md border border-border bg-surface p-5 transition-colors hover:border-accent"
                >
                  <span className="font-mono text-2xs uppercase tracking-[0.14em] text-text-faint">
                    Faz {pad(phaseNumber)} · {phaseTitle}
                  </span>
                  <span className="mt-3 font-serif text-xl font-semibold leading-snug group-hover:text-accent">
                    <span className="tabular-nums text-text-faint">
                      {pad(article.readingOrder)}
                    </span>{" "}
                    {article.title}
                  </span>
                  {/* A preview: some catalog summaries run long, and one card must not
                      dwarf the other two. The full summary opens with the article. */}
                  <span className="mt-2 line-clamp-6 flex-1 font-sans text-sm leading-relaxed text-text-muted">
                    {article.summary}
                  </span>
                  <span className="mt-4 flex items-center justify-between gap-2 font-sans text-xs text-text-muted">
                    {LEVEL_LABELS[article.level]}
                    <ArrowRight
                      className="h-4 w-4 text-text-faint transition-colors group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Güven Sınırı */}
        <section aria-labelledby="guven-siniri" className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[1.2fr_1fr]">
            <div>
              <Eyebrow>İkinci seri · hesapla okunur</Eyebrow>
              <h2 id="guven-siniri" className={`mt-3 ${sectionHeading}`}>
                {guvenlik.title}
              </h2>
              <p className="mt-3 max-w-xl font-serif text-lg leading-relaxed text-text-muted">
                {guvenlik.subtitle}
              </p>
              <p className="mt-4 font-sans text-sm text-text-muted">
                {guvenlik.planned} başlıklık planın {guvenlik.published} yazısı yayında; seri
                gruplar hâlinde sürüyor. Ücretsiz bir hesapla okunur.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/kayit?next=%2Fguvenlik" className={buttonPrimary}>
                  Hesap aç
                </Link>
                <Link href="/login?next=%2Fguvenlik" className={buttonSecondary}>
                  Giriş yap
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-mono text-2xs uppercase tracking-[0.18em] text-text-faint">
                Konular
              </h3>
              <ul className="mt-3 flex flex-col">
                {guvenlik.phaseTitles.map((title) => (
                  <li
                    key={title}
                    className="border-t border-border py-2.5 font-sans text-sm text-text"
                  >
                    {title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Yöntem */}
        <section aria-labelledby="yontem" className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
          <Eyebrow>Nasıl hazırlanıyor</Eyebrow>
          <h2 id="yontem" className={`mt-3 ${sectionHeading}`}>
            Ne olduğu, ne olmadığı
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-6 font-sans text-sm leading-relaxed text-text-muted">
              <div>
                <h3 className="font-serif text-lg font-semibold text-text">Kaynak gösterilir</h3>
                <p className="mt-1.5">
                  Her yazı, metinde dayandığı çalışmaları sonundaki Kaynakça bölümünde bağlantısıyla
                  listeler; serinin tamamında {ai.stats.references.toLocaleString("tr-TR")} kaynakça
                  girdisi var.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-text">
                  Sayılar koşuluyla aktarılır
                </h3>
                <p className="mt-1.5">
                  Serinin yazım kuralı: bir ölçüm aktarıldığında hangi modelde ve hangi koşulda
                  yapıldığı da yazılır. Bakım turları bu kuralın atlandığı yerleri arar ve düzeltir.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold text-text">Düzeltmeler görünür</h3>
                <p className="mt-1.5">
                  Yayımlanan yazılar bakım turlarında kaynaklarıyla yeniden karşılaştırılır. Okurun
                  aklında kalanı değiştiren bir düzeltme, yazının başında tarihli bir “Gözden
                  geçirildi” notuyla gösterilir; şu an {ai.stats.revised} yazıda böyle bir not var.
                </p>
              </div>
            </div>
            <div className="rounded-md border border-border bg-surface p-5 font-sans text-sm leading-relaxed text-text-muted sm:p-6">
              <h3 className="font-serif text-lg font-semibold text-text">Bir uyarı</h3>
              <p className="mt-2">
                Bu yazılar özgün araştırma ya da hakemli yayın değildir. Alanın yayımlanmış
                çalışmalarını Türkçe ve sıralı bir müfredatta anlatan, eğitim amaçlı derlemelerdir.
              </p>
              <p className="mt-3">
                Metinler büyük dil modelleri kullanılarak, site sahibinin yönettiği yazılı bir seri
                sözleşmesine göre yazıldı ve denetlendi. Kaynak eşleşmesi ve bağlantılar bakım
                turlarında yeniden kontrol edilir; yine de hata kalmış olabilir. Önemli bir sayıya
                ya da iddiaya dayanmadan önce kaynağını oku.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
