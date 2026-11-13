import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";
import { navButton, navLink } from "@/components/ui/classes";
import { SignOutButton } from "./sign-out-button";

/** Column widths the site's pages use; header and footer line up with the page below. */
export type SiteWidth = "narrow" | "default" | "wide";

export const SITE_WIDTH: Record<SiteWidth, string> = {
  narrow: "max-w-4xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
};

/** `/login?next=…` back to the page the visitor came from; plain for the front page. */
export function withReturn(path: string, returnTo?: string): string {
  if (!returnTo || returnTo === "/") return path;
  return `${path}?${new URLSearchParams({ next: returnTo })}`;
}

type Props = {
  /** A signed-in reader gets the way back to their reading and a sign-out. */
  signedIn?: boolean;
  /**
   * Only the name. Before the public launch the sign-in page is the one page anyone
   * can open, and the 404/error pages do not know who is looking.
   */
  minimal?: boolean;
  /** The page "Giriş" and "Hesap aç" return to after signing in. */
  returnTo?: string;
  /** Page-specific controls placed before the account links, e.g. the sync state. */
  actions?: ReactNode;
  /** On the dashboard itself, where "Okuma panelim" would point to the same page. */
  onDashboard?: boolean;
  /** The account page the visitor is on, marked as the current link. */
  current?: "login" | "kayit";
  width?: SiteWidth;
};

/**
 * The one header of every page outside the reader: the site's name, which always
 * leads home, and the account actions that fit who is looking. Every page that uses
 * it renders `<main id="main">`, the target of the skip link.
 */
export function SiteHeader({
  signedIn = false,
  minimal = false,
  returnTo,
  actions,
  onDashboard = false,
  current,
  width = "default",
}: Props) {
  return (
    <header className="border-b border-border bg-surface">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-surface focus:px-3 focus:py-2 focus:font-sans focus:text-sm focus:text-text"
      >
        İçeriğe geç
      </a>
      <div
        className={cn(
          "mx-auto flex h-16 items-center justify-between gap-3 px-5 sm:px-8",
          SITE_WIDTH[width],
        )}
      >
        <Link
          href="/"
          className="-mx-1 shrink-0 rounded-md px-1 font-serif text-xl font-semibold leading-tight text-text transition-colors hover:text-accent"
        >
          {SITE_NAME}
        </Link>
        {!minimal && (
          <nav aria-label="Hesap" className="flex min-w-0 items-center gap-1 sm:gap-1.5">
            {actions}
            {signedIn ? (
              <>
                {!onDashboard && (
                  <Link href="/" className={navLink}>
                    Okuma panelim
                  </Link>
                )}
                <SignOutButton />
              </>
            ) : (
              <>
                <Link
                  href={withReturn("/login", returnTo)}
                  aria-current={current === "login" ? "page" : undefined}
                  className={navLink}
                >
                  Giriş
                </Link>
                <Link
                  href={withReturn("/kayit", returnTo)}
                  aria-current={current === "kayit" ? "page" : undefined}
                  className={navButton}
                >
                  Hesap aç
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
