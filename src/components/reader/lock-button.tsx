"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLink } from "@/components/ui/classes";
import { SignOutButton } from "@/components/site/sign-out-button";
import { useReaderDataMode } from "@/lib/reader-data/use-reader-data";

/**
 * The account action of the reading list: sign out, or — for a visitor reading
 * without an account — sign in and come back to this same page. Said in words, not
 * by a lock icon, which read as "lock the screen" rather than "end my session".
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
        className={cn(navLink, "min-h-8 px-2 text-xs")}
      >
        <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
        Giriş yap
      </Link>
    );
  }

  return <SignOutButton label="always" size="sm" />;
}
