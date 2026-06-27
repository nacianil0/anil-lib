import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { login } from "./actions";
import { getGateConfig, safeNextPath } from "@/lib/auth/password-gate";

type SearchParams = Promise<{
  error?: string | string[];
  next?: string | string[];
}>;

export const metadata: Metadata = {
  title: "Giriş",
  robots: { index: false, follow: false },
};

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const next = safeNextPath(firstParam(params.next));
  const error = firstParam(params.error);
  const isConfigured = Boolean(getGateConfig());

  return (
    <main className="grid min-h-screen place-items-center bg-bg px-6 py-12">
      <div className="relative w-full max-w-[22rem] pl-7">
        <div className="absolute bottom-0 left-0 top-0 w-px bg-accent opacity-40" />

        <div className="absolute left-0 top-6 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-[1.5px] border-accent bg-bg">
          <Lock className="h-2.5 w-2.5 text-accent" aria-hidden="true" />
        </div>

        <div className="pb-2 pt-4">
          <p className="font-mono text-2xs uppercase tracking-[0.2em] text-text-faint">
            Özel kütüphane
          </p>
          <h1 className="mt-3 font-serif text-[1.75rem] font-semibold leading-tight text-text">
            Yapay Zekâyı Okumak
          </h1>
          <p className="mt-3 font-sans text-sm leading-relaxed text-text-muted">
            Okuma listesine erişmek için şifreyi gir.
          </p>
        </div>

        <form action={login} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="next" value={next} />

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-2xs uppercase tracking-[0.15em] text-text-faint">
              Şifre
            </span>
            <input
              autoComplete="current-password"
              autoFocus
              className="h-10 rounded border border-border bg-surface px-3 font-sans text-sm text-text outline-none transition-colors placeholder:text-text-faint focus:border-accent disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!isConfigured}
              name="password"
              required
              type="password"
            />
          </label>

          <div aria-live="polite" className="min-h-[2.5rem]">
            {error === "invalid" && (
              <p className="rounded border border-accent-soft bg-accent-soft px-3 py-2 font-sans text-2xs leading-snug text-accent">
                Şifre eşleşmedi.
              </p>
            )}
            {error === "config" && (
              <p className="rounded border border-cool-soft bg-cool-soft px-3 py-2 font-sans text-2xs leading-snug text-cool">
                Erişim yapılandırması eksik. Vercel ortam değişkenlerini kontrol et.
              </p>
            )}
          </div>

          <button
            className="h-10 rounded bg-accent-fill font-sans text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isConfigured}
            type="submit"
          >
            Kilidi aç
          </button>
        </form>
      </div>
    </main>
  );
}
