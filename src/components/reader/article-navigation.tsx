import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/lib/content/labels";
import type { AdjacentArticle } from "@/lib/content/types";

type Direction = "prev" | "next";

function NavItem({ article, direction }: { article: AdjacentArticle; direction: Direction }) {
  const isPrev = direction === "prev";
  const eyebrow = isPrev ? UI.previous : UI.next;

  if (!article) {
    return (
      <span
        aria-disabled="true"
        className={cn(
          "flex min-h-[3.5rem] cursor-not-allowed flex-col gap-1 rounded-md border border-dashed border-border p-3 opacity-50",
          isPrev ? "items-start text-left" : "items-end text-right",
        )}
      >
        <span className="flex items-center gap-1 font-sans text-2xs uppercase tracking-wider text-text-faint">
          {isPrev && <ChevronLeft className="h-3 w-3" aria-hidden="true" />}
          {eyebrow}
          {!isPrev && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
        </span>
      </span>
    );
  }

  return (
    <Link
      href={`/read/${article.slug}`}
      rel={isPrev ? "prev" : "next"}
      className={cn(
        "group flex min-h-[3.5rem] flex-col gap-1 rounded-md border border-border p-3 transition-colors hover:border-border-strong hover:bg-surface-muted",
        isPrev ? "items-start text-left" : "items-end text-right",
      )}
    >
      <span className="flex items-center gap-1 font-sans text-2xs uppercase tracking-wider text-text-faint">
        {isPrev && <ChevronLeft className="h-3 w-3" aria-hidden="true" />}
        {eyebrow}
        {!isPrev && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
      </span>
      <span className="line-clamp-2 font-serif text-sm text-text transition-colors group-hover:text-accent">
        {article.title}
      </span>
    </Link>
  );
}

export function ArticleNavigation({
  prev,
  next,
}: {
  prev: AdjacentArticle;
  next: AdjacentArticle;
}) {
  return (
    <nav className="grid grid-cols-2 gap-3" aria-label="Bölümler arası gezinme">
      <NavItem article={prev} direction="prev" />
      <NavItem article={next} direction="next" />
    </nav>
  );
}
