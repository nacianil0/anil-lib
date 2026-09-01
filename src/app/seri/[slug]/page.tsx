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
import { requireSessionUser } from "@/lib/auth/session-user";

/**
 * Renders per request: the page resolves the signed-in account and scopes reader
 * state to it, so it must never be prerendered into shared static HTML.
 */
export const dynamic = "force-dynamic";

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
  const user = await requireSessionUser();
  const rendered = await renderSeriesArticleBySlug(slug);
  if (!rendered) notFound();

  const { prev, next } = getSeriesAdjacent(slug);

  return (
    <ReaderShell
      workspaceId={user.workspaceId}
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
