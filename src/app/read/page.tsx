import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getDescriptors } from "@/lib/content/catalog";
import { ARCHIVE_BASE_PATH, ARCHIVE_SUBTITLE, ARCHIVE_TITLE } from "@/lib/content/archive";
import { CATEGORY_LABELS, pad } from "@/lib/content/labels";
import { requireOwnerUser } from "@/lib/auth/session-user";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/**
 * Renders per request: the archive is owner-only, so it must never be prerendered
 * into static HTML that anyone could be served.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: ARCHIVE_TITLE,
  robots: { index: false, follow: false },
};

export default async function ArchiveIndexPage() {
  await requireOwnerUser();
  const articles = getDescriptors();

  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <SiteHeader signedIn width="narrow" />

      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-4xl flex-1 px-5 py-10 focus:outline-none sm:px-8 sm:py-14"
      >
        <p className="mb-3 font-mono text-2xs uppercase tracking-[0.22em] text-accent">
          {articles.length} yazı
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
          {ARCHIVE_TITLE}
        </h1>
        <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-text-muted">
          {ARCHIVE_SUBTITLE} Okuma ilerlemen ve işaretlerin olduğu gibi duruyor.
        </p>

        <ol className="mt-10 flex flex-col border-t border-border">
          {articles.map((article) => (
            <li key={article.articleId} className="border-b border-border">
              <Link
                href={`${ARCHIVE_BASE_PATH}/${article.slug}`}
                prefetch={false}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 py-3.5 transition-colors hover:bg-surface-muted"
              >
                <span className="font-mono text-2xs tabular-nums text-accent">
                  {pad(article.readingOrder)}
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-[1.05rem] font-semibold leading-snug group-hover:text-accent">
                    {article.title}
                  </span>
                  <span className="mt-0.5 block font-sans text-2xs text-text-muted">
                    {CATEGORY_LABELS[article.category]}
                  </span>
                </span>
                <ChevronRight
                  className="h-3.5 w-3.5 text-text-faint transition-colors group-hover:text-accent"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ol>
      </main>

      <SiteFooter signedIn width="narrow" />
    </div>
  );
}
