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
import { loadSeriesRoadmap } from "@/lib/content/series-roadmap";
import { outlinePhases } from "@/lib/content/series-progress";
import { ReaderShell } from "@/components/reader/reader-shell";
import { LOCAL_WORKSPACE_ID } from "@/lib/auth/access";
import { getSessionUser } from "@/lib/auth/session-user";
import { absoluteUrl, jsonLdScript, OG_IMAGE, SITE_NAME } from "@/lib/site";

/**
 * Public: the article is readable without an account and its full text is in the
 * server-rendered HTML, so a direct link and a crawler both get it without running
 * any script. Rendered per request, because a signed-in reader's page carries their
 * own workspace — it must never be prerendered into HTML someone else is served.
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
  const path = `${SERIES_BASE_PATH}/${article.slug}`;
  return {
    title: `${article.title} · ${SERIES_TITLE}`,
    description: article.summary,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      locale: "tr_TR",
      title: article.title,
      description: article.summary,
      url: path,
      section: SERIES_TITLE,
      tags: article.tags,
      ...(article.revisedAt ? { modifiedTime: article.revisedAt } : {}),
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function SeriesArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const viewer = await getSessionUser();
  const rendered = await renderSeriesArticleBySlug(slug);
  if (!rendered) notFound();

  const { prev, next } = getSeriesAdjacent(slug);
  const { meta } = rendered;
  // Only what the catalog states: no author, no publication date, nothing inferred.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.summary,
    inLanguage: "tr",
    url: absoluteUrl(`${SERIES_BASE_PATH}/${meta.slug}`),
    keywords: meta.tags.join(", "),
    ...(meta.revisedAt ? { dateModified: meta.revisedAt } : {}),
    isPartOf: {
      "@type": "CreativeWorkSeries",
      name: SERIES_TITLE,
      url: absoluteUrl(SERIES_BASE_PATH),
    },
    position: meta.readingOrder,
    isAccessibleForFree: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(structuredData) }}
      />
      <ReaderShell
        workspaceId={viewer?.workspaceId ?? LOCAL_WORKSPACE_ID}
        mode={viewer ? "account" : "local"}
        articles={getSeriesDescriptors()}
        current={meta}
        prev={prev}
        next={next}
        basePath={SERIES_BASE_PATH}
        listTitle={SERIES_TITLE}
        listSubtitle={SERIES_SUBTITLE}
        homeHref={SERIES_BASE_PATH}
        phases={outlinePhases(loadSeriesRoadmap())}
        showTitle
      >
        {rendered.content}
      </ReaderShell>
    </>
  );
}
