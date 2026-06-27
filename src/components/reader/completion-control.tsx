"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/lib/content/labels";
import { useReaderProgress } from "@/lib/progress/use-reader-progress";

export function CompletionControl({ articleId }: { articleId: string }) {
  const { entryOf, toggleCompleted } = useReaderProgress();
  const completed = entryOf(articleId).completed;

  return (
    <button
      type="button"
      onClick={() => toggleCompleted(articleId)}
      aria-pressed={completed}
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-3 py-2 font-sans text-sm transition-colors",
        completed
          ? "border-accent bg-accent-soft text-accent"
          : "border-border text-text-muted hover:border-border-strong hover:text-text",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-[3px] border transition-colors",
          completed ? "border-accent bg-accent-fill text-white" : "border-border-strong",
        )}
      >
        {completed && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      {completed ? UI.markedComplete : UI.markComplete}
    </button>
  );
}
