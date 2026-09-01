import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacent, getDescriptors, getArticleBySlug } from "@/lib/content/catalog";
import { renderArticleBySlug } from "@/lib/content/articles";
import { ReaderShell } from "@/components/reader/reader-shell";
import { requireOwnerUser } from "@/lib/auth/session-user";
import { ARCHIVE_BASE_PATH, ARCHIVE_SUBTITLE, ARCHIVE_TITLE } from "@/lib/content/archive";

/**
 * Renders per request: the page resolves the signed-in account and scopes reader
 * state to it, so it must never be prerendered into shared static HTML.
 */
export const dynamic = "force-dynamic";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getDescriptors().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Bölüm bulunamadı" };
  return {
    title: article.title,
    description: article.summary,
  };
}

/**
 * The pre-series library is an owner-only archive: standard users get a 404 even
 * with a direct link, and the routes stay reachable so existing owner progress and
 * highlights are not orphaned.
 */
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const owner = await requireOwnerUser();
  const rendered = await renderArticleBySlug(slug);
  if (!rendered) notFound();

  const { prev, next } = getAdjacent(slug);

  return (
    <ReaderShell
      workspaceId={owner.workspaceId}
      articles={getDescriptors()}
      current={rendered.meta}
      prev={prev}
      next={next}
      listTitle={ARCHIVE_TITLE}
      listSubtitle={ARCHIVE_SUBTITLE}
      homeHref={ARCHIVE_BASE_PATH}
    >
      {rendered.content}
    </ReaderShell>
  );
}
