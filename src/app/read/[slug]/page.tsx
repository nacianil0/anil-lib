import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacent, getDescriptors, getArticleBySlug } from "@/lib/content/catalog";
import { renderArticleBySlug } from "@/lib/content/articles";
import { ReaderShell } from "@/components/reader/reader-shell";

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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const rendered = await renderArticleBySlug(slug);
  if (!rendered) notFound();

  const { prev, next } = getAdjacent(slug);

  return (
    <ReaderShell articles={getDescriptors()} current={rendered.meta} prev={prev} next={next}>
      {rendered.content}
    </ReaderShell>
  );
}
