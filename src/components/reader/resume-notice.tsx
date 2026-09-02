"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { UI } from "@/lib/content/labels";
import { useReaderProgress } from "@/lib/progress/use-reader-progress";

type Props = {
  articleId: string;
  show: boolean;
  /** First words of the paragraph the reader was returned to, when one was anchored. */
  preview?: string | null;
  onDismiss: () => void;
  onStartOver: () => void;
};

export function ResumeNotice({ articleId, show, preview, onDismiss, onStartOver }: Props) {
  const { resetPosition } = useReaderProgress();

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 6000);
    return () => clearTimeout(timer);
  }, [show, onDismiss]);

  if (!show) return null;

  const snippet = preview?.trim() ? preview.trim().slice(0, 70) : null;

  return (
    <div
      role="status"
      className="fixed left-1/2 top-[5.5rem] z-50 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-sm shadow-md sm:max-w-[calc(100vw-2rem)] sm:gap-4 sm:px-4"
    >
      <span className="min-w-0 truncate font-sans text-text">
        <span className="font-medium">{UI.restoredNotice}</span>
        {snippet && (
          <span className="hidden text-text-muted sm:inline">
            {" "}
            · &ldquo;{snippet}&hellip;&rdquo;
          </span>
        )}
      </span>
      <button
        type="button"
        onClick={() => {
          resetPosition(articleId);
          onStartOver();
          onDismiss();
        }}
        className="shrink-0 font-medium text-accent hover:underline"
      >
        {UI.startOver}
      </button>
      <button
        type="button"
        onClick={onDismiss}
        aria-label={UI.dismiss}
        className="shrink-0 text-text-muted hover:text-text sm:ml-1"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
