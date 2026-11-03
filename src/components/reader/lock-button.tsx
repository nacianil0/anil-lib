"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, LogIn } from "lucide-react";
import { logout } from "@/app/login/actions";
import { useReaderDataMode } from "@/lib/reader-data/use-reader-data";

/**
 * Ends the session, or — for a visitor reading without an account — offers to sign
 * in and come back to this same page.
 */
export function LockButton() {
  const mode = useReaderDataMode();
  const pathname = usePathname();

  if (mode === "local") {
    const next = pathname && pathname !== "/" ? `?${new URLSearchParams({ next: pathname })}` : "";
    return (
      <Link
        href={`/login${next}`}
        aria-label="Giriş yap"
        title="Giriş yap"
        className="rounded-md p-1.5 text-text-faint transition-colors hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
      >
        <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <form action={logout}>
      <button
        type="submit"
        aria-label="Kilidi kapat"
        className="rounded-md p-1.5 text-text-faint transition-colors hover:text-text"
      >
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </form>
  );
}
