"use client";

import { useEffect } from "react";
import { UI } from "@/lib/content/labels";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
      <h1 className="font-serif text-2xl font-semibold text-text">{UI.errorTitle}</h1>
      <p className="max-w-sm font-sans text-sm text-text-muted">{UI.errorBody}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-2 rounded-md border border-border px-4 py-2 font-sans text-sm text-text transition-colors hover:border-border-strong hover:bg-surface-muted"
      >
        {UI.retry}
      </button>
    </main>
  );
}
