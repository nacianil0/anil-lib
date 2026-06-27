import Link from "next/link";
import { getOrderedArticles } from "@/lib/content/catalog";
import { UI } from "@/lib/content/labels";
import { RootRedirect } from "./root-redirect";

export default function HomePage() {
  const ordered = getOrderedArticles();
  const firstSlug = ordered[0]?.slug ?? "";
  const slugById = Object.fromEntries(ordered.map((article) => [article.articleId, article.slug]));

  return (
    <>
      <RootRedirect slugById={slugById} firstSlug={firstSlug} />
      {firstSlug && (
        <noscript>
          <div className="flex min-h-screen items-center justify-center px-6 text-center">
            <Link href={`/read/${firstSlug}`} className="font-sans text-sm text-accent underline">
              {UI.backToReading}
            </Link>
          </div>
        </noscript>
      )}
    </>
  );
}
