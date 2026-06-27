"use client";

import { useEffect, useRef } from "react";
import { UI } from "@/lib/content/labels";
import type { ArticleDescriptor } from "@/lib/content/types";
import { LockButton } from "./lock-button";
import { ReadingList } from "./reading-list";
import { ProgressMeter } from "./progress-meter";

type Props = {
  articles: ArticleDescriptor[];
  currentArticleId: string;
};

export function ReaderSidebar({ articles, currentArticleId }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const articleIds = articles.map((article) => article.articleId);

  useEffect(() => {
    const active = scrollRef.current?.querySelector('[aria-current="page"]');
    active?.scrollIntoView({ block: "nearest" });
  }, [currentArticleId]);

  return (
    <aside
      className="sticky top-0 hidden h-screen w-[19rem] shrink-0 flex-col border-r border-border bg-surface lg:flex"
      aria-label={UI.readingList}
    >
      <div className="shrink-0 px-5 pb-3 pt-6">
        <p className="font-serif text-lg font-semibold leading-tight text-text">
          {UI.libraryTitle}
        </p>
        <p className="mt-1 font-sans text-2xs leading-snug text-text-muted">{UI.librarySubtitle}</p>
      </div>
      <div className="shrink-0 border-y border-border">
        <ProgressMeter articleIds={articleIds} />
      </div>
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto pt-3">
        <ReadingList articles={articles} currentArticleId={currentArticleId} idPrefix="desktop" />
      </div>
      <div className="flex shrink-0 items-center justify-between border-t border-border px-5 py-3">
        <span className="font-sans text-2xs text-text-faint">anil-lib</span>
        <div className="flex items-center gap-1">
          <LockButton />
        </div>
      </div>
    </aside>
  );
}
