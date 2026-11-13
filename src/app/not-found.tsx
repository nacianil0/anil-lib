import Link from "next/link";
import { UI } from "@/lib/content/labels";
import { SiteHeader } from "@/components/site/site-header";
import { buttonPrimary, buttonSecondary } from "@/components/ui/classes";

/**
 * Every unknown address ends here: a chapter that does not exist, a page that never
 * did. The page renders without knowing who is looking, so it offers only what
 * everyone may open — the front page and the public series — never a page behind an
 * account, which would send a visitor from one dead end to a sign-in wall.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-text">
      <SiteHeader minimal />
      <main id="main" tabIndex={-1} className="flex flex-1 items-center focus:outline-none">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8">
          <p className="font-mono text-2xs uppercase tracking-[0.22em] text-accent">404</p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            {UI.notFoundTitle}
          </h1>
          <p className="mt-3 max-w-md font-sans text-sm leading-relaxed text-text-muted">
            {UI.notFoundBody}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className={buttonPrimary}>
              {UI.goHome}
            </Link>
            <Link href="/seri" className={buttonSecondary}>
              {UI.aiSeries}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
