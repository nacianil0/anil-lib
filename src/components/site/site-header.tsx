import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

/**
 * Header of the public pages: the site's name, and the way in — or, for someone
 * already signed in, the way back to their reading.
 */
export function SiteHeader({ signedIn = false }: { signedIn?: boolean }) {
  return (
    <header className="border-b border-border bg-surface">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2 focus:font-sans focus:text-sm"
      >
        İçeriğe geç
      </a>
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="font-serif text-xl font-semibold leading-tight text-text">
          {SITE_NAME}
        </Link>
        <nav aria-label="Hesap" className="flex items-center gap-1 font-sans text-sm">
          {signedIn ? (
            <Link
              href="/"
              className="rounded-md border border-border-strong px-3 py-2 font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              Okuma panelim
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-2 text-text-muted transition-colors hover:text-text"
              >
                Giriş
              </Link>
              <Link
                href="/kayit"
                className="rounded-md border border-border-strong px-3 py-2 font-medium text-text transition-colors hover:border-accent hover:text-accent"
              >
                Hesap aç
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
