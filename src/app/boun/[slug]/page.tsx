import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BOUN_BASE_PATH,
  BOUN_SUBTITLE,
  BOUN_TITLE,
  getBounAdjacent,
  getBounArticleBySlug,
  getBounDescriptors,
  renderBounArticleBySlug,
} from "@/lib/content/series-boun";
import { ReaderShell } from "@/components/reader/reader-shell";
import { requireSessionUser } from "@/lib/auth/session-user";

/**
 * Renders per request: the page resolves the signed-in account and scopes reader
 * state to it, so it must never be prerendered into shared static HTML.
 */
export const dynamic = "force-dynamic";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getBounDescriptors().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBounArticleBySlug(slug);
  if (!article) return { title: "Bölüm bulunamadı" };
  return {
    title: `${article.title} · ${BOUN_TITLE}`,
    description: article.summary,
  };
}

export default async function BounArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const user = await requireSessionUser();
  const rendered = await renderBounArticleBySlug(slug);
  if (!rendered) notFound();

  const { prev, next } = getBounAdjacent(slug);

  return (
    <ReaderShell
      workspaceId={user.workspaceId}
      articles={getBounDescriptors()}
      current={rendered.meta}
      prev={prev}
      next={next}
      basePath={BOUN_BASE_PATH}
      listTitle={BOUN_TITLE}
      listSubtitle={BOUN_SUBTITLE}
      homeHref={BOUN_BASE_PATH}
    >
      {rendered.content}
    </ReaderShell>
  );
}
