"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { UI } from "@/lib/content/labels";
import { useReaderProgress } from "@/lib/progress/use-reader-progress";

type Props = {
  articleId: string;
  show: boolean;
  onDismiss: () => void;
};

export function ResumeNotice({ articleId, show, onDismiss }: Props) {
  const { resetPosition } = useReaderProgress();

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 6000);
    return () => clearTimeout(timer);
  }, [show, onDismiss]);

  if (!show) return null;

  return (
    <div
      role="status"
      className="fixed left-1/2 top-[5.5rem] z-50 flex w-max -translate-x-1/2 items-center gap-4 rounded-full border border-border bg-surface px-4 py-2 text-sm shadow-md"
    >
      <span className="font-medium text-text">{UI.restoredNotice}</span>
      <button
        type="button"
        onClick={() => {
          resetPosition(articleId);
          window.scrollTo(0, 0);
          onDismiss();
        }}
        className="font-medium text-accent hover:underline"
      >
        {UI.startOver}
      </button>
      <button
        type="button"
        onClick={onDismiss}
        aria-label={UI.dismiss}
        className="ml-1 text-text-muted hover:text-text"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
