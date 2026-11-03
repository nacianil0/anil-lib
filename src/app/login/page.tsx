import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import { login } from "./actions";
import { getGateConfig, safeNextPath } from "@/lib/auth/password-gate";

type SearchParams = Promise<{
  error?: string | string[];
  next?: string | string[];
  notice?: string | string[];
}>;

export const metadata: Metadata = {
  title: "Giriş",
  robots: { index: false, follow: false },
};

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const inputClass =
  "h-10 rounded border border-border bg-surface px-3 font-sans text-sm text-text outline-none transition-colors placeholder:text-text-faint focus:border-accent focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50";

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const next = safeNextPath(firstParam(params.next));
  const error = firstParam(params.error);
  const notice = firstParam(params.notice);
  const isConfigured = Boolean(getGateConfig());
  const registerHref = next === "/" ? "/kayit" : `/kayit?${new URLSearchParams({ next })}`;

  return (
    <main className="grid min-h-screen place-items-center bg-bg px-6 py-12">
      <div className="relative w-full max-w-[22rem] pl-7">
        <div className="absolute bottom-0 left-0 top-0 w-px bg-accent opacity-40" />

        <div className="absolute left-0 top-6 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border-[1.5px] border-accent bg-bg">
          <Lock className="h-2.5 w-2.5 text-accent" aria-hidden="true" />
        </div>

        <div className="pb-2 pt-4">
          <p className="font-mono text-2xs uppercase tracking-[0.2em] text-text-faint">
            <Link href="/" className="hover:text-text">
              Anıl Lib
            </Link>
          </p>
          <h1 className="mt-3 font-serif text-[1.75rem] font-semibold leading-tight text-text">
            Giriş yap
          </h1>
          <p className="mt-3 font-sans text-sm leading-relaxed text-text-muted">
            Hesabınla Güven Sınırı serisini de okursun ve ilerlemen cihazların arasında eşitlenir.
            Yapay zekâ serisi hesapsız da açık.
          </p>
        </div>

        {notice === "recovered" && (
          <p
            role="status"
            className="mt-4 rounded border border-cool-soft bg-cool-soft px-3 py-2 font-sans text-2xs leading-snug text-cool"
          >
            Parolan değişti ve eski oturumların kapandı. Yeni parolanla giriş yap.
          </p>
        )}
        {notice === "deleted" && (
          <p
            role="status"
            className="mt-4 rounded border border-cool-soft bg-cool-soft px-3 py-2 font-sans text-2xs leading-snug text-cool"
          >
            Hesabın ve hesaba bağlı okuma verilerin silindi.
          </p>
        )}

        <form action={login} className="mt-6 flex flex-col gap-4">
          <input type="hidden" name="next" value={next} />

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-2xs uppercase tracking-[0.15em] text-text-faint">
              Kullanıcı adı
            </span>
            <input
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              autoFocus
              className={inputClass}
              disabled={!isConfigured}
              name="username"
              required
              spellCheck={false}
              type="text"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-mono text-2xs uppercase tracking-[0.15em] text-text-faint">
              Şifre
            </span>
            <input
              autoComplete="current-password"
              className={inputClass}
              disabled={!isConfigured}
              name="password"
              required
              type="password"
            />
          </label>

          <label className="flex items-start gap-2.5 font-sans text-sm text-text">
            <input
              className="mt-0.5 h-4 w-4 shrink-0 accent-accent-fill"
              disabled={!isConfigured}
              name="remember"
              type="checkbox"
              aria-describedby="remember-help"
            />
            <span>
              Beni hatırla
              <span id="remember-help" className="block text-2xs leading-snug text-text-muted">
                7 gün açık kalır ve bunun için çerez kullanır. İşaretlemezsen tarayıcıyı kapatınca
                oturum kapanır.
              </span>
            </span>
          </label>

          <div aria-live="polite" className="min-h-[2.5rem]">
            {error === "invalid" && (
              <p className="rounded border border-accent-soft bg-accent-soft px-3 py-2 font-sans text-2xs leading-snug text-accent">
                Kullanıcı adı veya şifre hatalı.
              </p>
            )}
            {error === "throttled" && (
              <p className="rounded border border-accent-soft bg-accent-soft px-3 py-2 font-sans text-2xs leading-snug text-accent">
                Çok fazla başarısız deneme oldu. Birkaç dakika bekleyip tekrar dene.
              </p>
            )}
            {error === "unavailable" && (
              <p className="rounded border border-cool-soft bg-cool-soft px-3 py-2 font-sans text-2xs leading-snug text-cool">
                Hesap servisi şu anda yanıt vermiyor. Birazdan tekrar dene.
              </p>
            )}
            {error === "config" && (
              <p className="rounded border border-cool-soft bg-cool-soft px-3 py-2 font-sans text-2xs leading-snug text-cool">
                Erişim yapılandırması eksik. Vercel ortam değişkenlerini kontrol et.
              </p>
            )}
          </div>

          <button
            className="h-10 rounded bg-accent-fill font-sans text-sm font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isConfigured}
            type="submit"
          >
            Giriş yap
          </button>
        </form>

        <nav aria-label="Hesap seçenekleri" className="mt-6 flex flex-col gap-2 font-sans text-sm">
          <Link href={registerHref} className="text-accent underline-offset-4 hover:underline">
            Hesabın yok mu? Ücretsiz hesap aç
          </Link>
          <Link href="/hesap-kurtar" className="text-text-muted underline-offset-4 hover:underline">
            Parolanı mı unuttun? Kurtarma koduyla gir
          </Link>
          <Link href="/seri" className="text-text-muted underline-offset-4 hover:underline">
            Hesapsız okumaya dön
          </Link>
        </nav>
      </div>
    </main>
  );
}
