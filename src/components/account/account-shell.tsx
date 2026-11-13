import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/**
 * The narrow single-column page every account screen shares: sign-in, sign-up,
 * recovery and the account itself. One header, one form width, one field style.
 */
export function AccountShell({
  eyebrow,
  title,
  intro,
  signedIn = false,
  minimal = false,
  current,
  returnTo,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  signedIn?: boolean;
  /**
   * Before the public launch the sign-in page is the only page anyone can open, so it
   * carries the site's name alone: no account links, no footer of pages behind it.
   */
  minimal?: boolean;
  /** The account page this is, marked in the header. */
  current?: "login" | "kayit";
  /** Where the header's account links return to after signing in. */
  returnTo?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <SiteHeader signedIn={signedIn} minimal={minimal} current={current} returnTo={returnTo} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <div className="mx-auto max-w-md px-5 py-10 sm:py-14">
          <p className="font-mono text-2xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight">{title}</h1>
          {intro && (
            <div className="mt-3 font-sans text-sm leading-relaxed text-text-muted">{intro}</div>
          )}
          <div className="mt-8">{children}</div>
        </div>
      </main>
      {!minimal && <SiteFooter signedIn={signedIn} />}
    </div>
  );
}
