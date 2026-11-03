import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 font-sans text-sm text-text-muted sm:flex-row sm:items-start sm:justify-between sm:px-8">
        <div className="max-w-md">
          <p className="font-serif text-base font-semibold text-text">{SITE_NAME}</p>
          <p className="mt-1 text-2xs leading-relaxed">
            Analitik, reklam ya da üçüncü taraf izleme çerezi kullanılmaz. Hesapsız okurken
            ilerlemen yalnızca bu tarayıcıda tutulur.
          </p>
        </div>
        <nav aria-label="Site" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/seri" className="hover:text-text">
            Yapay Zekâ Serisi
          </Link>
          <Link href="/gizlilik" className="hover:text-text">
            Gizlilik ve çerezler
          </Link>
          <Link href="/login" className="hover:text-text">
            Giriş
          </Link>
          <Link href="/kayit" className="hover:text-text">
            Hesap aç
          </Link>
        </nav>
      </div>
    </footer>
  );
}
