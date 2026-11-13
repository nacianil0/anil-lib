"use client";

import { useEffect } from "react";
import Link from "next/link";
import { UI } from "@/lib/content/labels";
import { SiteHeader } from "@/components/site/site-header";
import { buttonPrimary, buttonSecondary } from "@/components/ui/classes";

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
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <SiteHeader minimal />
      <main id="main" tabIndex={-1} className="flex flex-1 items-center focus:outline-none">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8">
          <h1 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            {UI.errorTitle}
          </h1>
          <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-text-muted">
            {UI.errorBody}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={reset} className={buttonPrimary}>
              {UI.retry}
            </button>
            <Link href="/" className={buttonSecondary}>
              {UI.goHome}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
