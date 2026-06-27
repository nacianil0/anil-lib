import Link from "next/link";
import { getOrderedArticles } from "@/lib/content/catalog";
import { UI } from "@/lib/content/labels";

export default function NotFound() {
  const first = getOrderedArticles()[0];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
      <p className="font-mono text-sm tracking-widest text-text-faint">404</p>
      <h1 className="font-serif text-2xl font-semibold text-text">{UI.notFoundTitle}</h1>
      <p className="max-w-sm font-sans text-sm text-text-muted">{UI.notFoundBody}</p>
      {first && (
        <Link
          href={`/read/${first.slug}`}
          className="mt-2 rounded-md border border-border px-4 py-2 font-sans text-sm text-text transition-colors hover:border-border-strong hover:bg-surface-muted"
        >
          {UI.backToReading}
        </Link>
      )}
    </main>
  );
}
