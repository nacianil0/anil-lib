import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getSeriesAdjacent,
  getSeriesArticleBySlug,
  getSeriesDescriptors,
  renderSeriesArticleBySlug,
  SERIES_BASE_PATH,
  SERIES_SUBTITLE,
  SERIES_TITLE,
} from "@/lib/content/series";
import { ReaderShell } from "@/components/reader/reader-shell";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getSeriesDescriptors().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getSeriesArticleBySlug(slug);
  if (!article) return { title: "Bölüm bulunamadı" };
  return {
    title: `${article.title} · ${SERIES_TITLE}`,
    description: article.summary,
  };
}

export default async function SeriesArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rendered = await renderSeriesArticleBySlug(slug);
  if (!rendered) notFound();

  const { prev, next } = getSeriesAdjacent(slug);

  return (
    <ReaderShell
      articles={getSeriesDescriptors()}
      current={rendered.meta}
      prev={prev}
      next={next}
      basePath={SERIES_BASE_PATH}
      listTitle={SERIES_TITLE}
      listSubtitle={SERIES_SUBTITLE}
      homeHref={SERIES_BASE_PATH}
    >
      {rendered.content}
    </ReaderShell>
  );
}
