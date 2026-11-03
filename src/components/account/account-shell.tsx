import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/** The narrow single-column page the account forms (sign-up, recovery, account) share. */
export function AccountShell({
  eyebrow,
  title,
  intro,
  signedIn = false,
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  signedIn?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <SiteHeader signedIn={signedIn} />
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
      <SiteFooter />
    </div>
  );
}
