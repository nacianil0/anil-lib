import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SITE_WIDTH, type SiteWidth } from "./site-header";

const linkClass =
  "-mx-1 inline-flex min-h-6 items-center rounded px-1 transition-colors hover:text-text";

/**
 * The footer of every page outside the reader. It names what the site does not do
 * with its visitors and links the pages that explain it; a signed-in reader gets the
 * way back to their reading instead of the sign-in links.
 */
export function SiteFooter({
  signedIn = false,
  width = "default",
}: {
  signedIn?: boolean;
  width?: SiteWidth;
}) {
  return (
    <footer className="border-t border-border bg-surface">
      <div
        className={cn(
          "mx-auto flex flex-col gap-5 px-5 py-8 font-sans text-sm text-text-muted sm:flex-row sm:items-start sm:justify-between sm:px-8",
          SITE_WIDTH[width],
        )}
      >
        <div className="max-w-md">
          <p className="font-serif text-base font-semibold text-text">{SITE_NAME}</p>
          <p className="mt-1 text-xs leading-relaxed">
            Analitik, reklam ya da üçüncü taraf izleme çerezi kullanılmaz. Hesapsız okurken
            ilerlemen yalnızca bu tarayıcıda tutulur.
          </p>
        </div>
        <nav aria-label="Site" className="flex flex-wrap gap-x-5 gap-y-2">
          {signedIn && (
            <Link href="/" className={linkClass}>
              Okuma panelim
            </Link>
          )}
          <Link href="/seri" className={linkClass}>
            Yapay Zekâ Serisi
          </Link>
          <Link href="/gizlilik" className={linkClass}>
            Gizlilik ve çerezler
          </Link>
          {!signedIn && (
            <>
              <Link href="/login" className={linkClass}>
                Giriş
              </Link>
              <Link href="/kayit" className={linkClass}>
                Hesap aç
              </Link>
            </>
          )}
        </nav>
      </div>
    </footer>
  );
}
