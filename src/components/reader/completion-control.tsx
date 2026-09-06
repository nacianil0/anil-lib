"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/lib/content/labels";
import { useReaderProgress } from "@/lib/progress/use-reader-progress";

/**
 * `compact` is the toolbar form: an icon on its own, so the completion state stays
 * one click away wherever the reader is in the article.
 */
export function CompletionControl({
  articleId,
  compact = false,
}: {
  articleId: string;
  compact?: boolean;
}) {
  const { entryOf, toggleCompleted } = useReaderProgress();
  const completed = entryOf(articleId).completed;
  const label = completed ? UI.markedComplete : UI.markComplete;

  return (
    <button
      type="button"
      onClick={() => toggleCompleted(articleId)}
      aria-pressed={completed}
      aria-label={compact ? label : undefined}
      title={compact ? label : undefined}
      className={cn(
        "inline-flex items-center rounded-md border transition-colors",
        compact ? "px-2.5 py-1.5" : "gap-2 px-3 py-2 font-sans text-sm",
        completed
          ? "border-accent bg-accent-soft text-accent"
          : "border-border text-text-muted hover:border-border-strong hover:text-text",
      )}
    >
      {/* In the toolbar the check stands on its own, like every other icon there; a
          boxed checkbox next to them would read as an input the reader must fill in. */}
      {compact ? (
        <Check className="h-4 w-4" strokeWidth={completed ? 3 : 2} aria-hidden="true" />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "flex h-4 w-4 items-center justify-center rounded-[3px] border transition-colors",
            completed ? "border-accent bg-accent-fill text-white" : "border-border-strong",
          )}
        >
          {completed && <Check className="h-3 w-3" strokeWidth={3} />}
        </span>
      )}
      {!compact && label}
    </button>
  );
}
