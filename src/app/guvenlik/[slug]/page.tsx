import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  GUVENLIK_BASE_PATH,
  GUVENLIK_SUBTITLE,
  GUVENLIK_TITLE,
  getGuvenlikAdjacent,
  getGuvenlikArticleBySlug,
  getGuvenlikDescriptors,
  loadGuvenlikRoadmap,
  renderGuvenlikArticleBySlug,
} from "@/lib/content/series-guvenlik";
import { outlinePhases } from "@/lib/content/series-progress";
import { ReaderShell } from "@/components/reader/reader-shell";
import { requireSessionUser } from "@/lib/auth/session-user";

/**
 * Renders per request: the page resolves the signed-in account and scopes reader
 * state to it, so it must never be prerendered into shared static HTML.
 */
export const dynamic = "force-dynamic";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getGuvenlikDescriptors().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuvenlikArticleBySlug(slug);
  if (!article) return { title: "Bölüm bulunamadı" };
  return {
    title: `${article.title} · ${GUVENLIK_TITLE}`,
    description: article.summary,
  };
}

export default async function GuvenlikArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await requireSessionUser();
  const rendered = await renderGuvenlikArticleBySlug(slug);
  if (!rendered) notFound();

  const { prev, next } = getGuvenlikAdjacent(slug);

  return (
    <ReaderShell
      workspaceId={user.workspaceId}
      articles={getGuvenlikDescriptors()}
      current={rendered.meta}
      prev={prev}
      next={next}
      basePath={GUVENLIK_BASE_PATH}
      listTitle={GUVENLIK_TITLE}
      listSubtitle={GUVENLIK_SUBTITLE}
      homeHref={GUVENLIK_BASE_PATH}
      phases={outlinePhases(loadGuvenlikRoadmap())}
      showTitle
    >
      {rendered.content}
    </ReaderShell>
  );
}
