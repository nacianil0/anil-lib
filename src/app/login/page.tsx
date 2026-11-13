import type { Metadata } from "next";
import Link from "next/link";
import { login } from "./actions";
import { publicLaunchEnabled } from "@/lib/auth/access";
import { getGateConfig, safeNextPath } from "@/lib/auth/password-gate";
import { AccountShell } from "@/components/account/account-shell";
import { FormField } from "@/components/account/form-field";
import { buttonPrimary } from "@/components/ui/classes";

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

/** What went wrong, in the reader's words; `alert` errors are theirs to fix. */
const ERRORS: Record<string, { text: string; tone: "alert" | "info" }> = {
  invalid: { text: "Kullanıcı adı veya parola hatalı.", tone: "alert" },
  throttled: {
    text: "Çok fazla başarısız deneme oldu. Birkaç dakika bekleyip tekrar dene.",
    tone: "alert",
  },
  unavailable: {
    text: "Hesap servisi şu anda yanıt vermiyor. Birazdan tekrar dene.",
    tone: "info",
  },
  config: {
    text: "Erişim yapılandırması eksik. Vercel ortam değişkenlerini kontrol et.",
    tone: "info",
  },
};

const NOTICES: Record<string, string> = {
  recovered: "Parolan değişti ve eski oturumların kapandı. Yeni parolanla giriş yap.",
  deleted: "Hesabın ve hesaba bağlı okuma verilerin silindi.",
};

const noteClass = "rounded-md border px-3 py-2.5 font-sans text-sm leading-snug";

export default async function LoginPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const next = safeNextPath(firstParam(params.next));
  const errorKey = firstParam(params.error);
  const noticeKey = firstParam(params.notice);
  const error = errorKey ? ERRORS[errorKey] : undefined;
  const notice = noticeKey ? NOTICES[noticeKey] : undefined;
  const isConfigured = Boolean(getGateConfig());
  // Before the launch there is no sign-up and nothing to read without an account.
  const launched = publicLaunchEnabled();
  const registerHref = next === "/" ? "/kayit" : `/kayit?${new URLSearchParams({ next })}`;
  // Both fields carry the error: focus lands on the first one, and the reason it
  // failed is read out with it rather than sitting unannounced above the form.
  const errorProps =
    error?.tone === "alert"
      ? { "aria-describedby": "login-error", "aria-invalid": errorKey === "invalid" || undefined }
      : {};

  return (
    <AccountShell
      eyebrow="Okuyucu hesabı"
      title="Giriş yap"
      minimal={!launched}
      current="login"
      returnTo={next}
      intro={
        launched
          ? "Hesabınla Güven Sınırı serisini de okursun ve ilerlemen cihazların arasında eşitlenir. Yapay zekâ serisi hesapsız da açık."
          : "Okuma listesine erişmek için kullanıcı adını ve parolanı gir."
      }
    >
      {notice && (
        <p role="status" className={`mb-6 border-cool-soft bg-cool-soft text-cool ${noteClass}`}>
          {notice}
        </p>
      )}

      <form action={login} className="flex flex-col gap-5">
        <input type="hidden" name="next" value={next} />

        {error && (
          <p
            id="login-error"
            role={error.tone === "alert" ? "alert" : "status"}
            className={`${noteClass} ${
              error.tone === "alert"
                ? "border-accent-soft bg-accent-soft text-accent"
                : "border-cool-soft bg-cool-soft text-cool"
            }`}
          >
            {error.text}
          </p>
        )}

        <FormField
          label="Kullanıcı adı"
          name="username"
          type="text"
          autoCapitalize="none"
          autoComplete="username"
          autoCorrect="off"
          autoFocus
          spellCheck={false}
          required
          disabled={!isConfigured}
          {...errorProps}
        />

        <FormField
          label="Parola"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={!isConfigured}
          {...errorProps}
        />

        <label className="flex items-start gap-3 font-sans text-sm text-text">
          <input
            className="mt-0.5 h-4 w-4 shrink-0 accent-accent-fill"
            disabled={!isConfigured}
            name="remember"
            type="checkbox"
            aria-describedby="remember-help"
          />
          <span>
            Beni hatırla
            <span id="remember-help" className="mt-0.5 block text-xs leading-snug text-text-muted">
              7 gün açık kalır ve bunun için çerez kullanır. İşaretlemezsen tarayıcıyı kapatınca
              oturum kapanır.
            </span>
          </span>
        </label>

        <button className={`${buttonPrimary} mt-1 w-full`} disabled={!isConfigured} type="submit">
          Giriş yap
        </button>
      </form>

      {launched && (
        <nav aria-label="Hesap seçenekleri" className="mt-8 flex flex-col gap-1 font-sans text-sm">
          <Link
            href={registerHref}
            className="inline-flex min-h-8 items-center text-accent underline-offset-4 hover:underline"
          >
            Hesabın yok mu? Ücretsiz hesap aç
          </Link>
          <Link
            href="/hesap-kurtar"
            className="inline-flex min-h-8 items-center text-text-muted underline-offset-4 hover:text-text hover:underline"
          >
            Parolanı mı unuttun? Kurtarma koduyla gir
          </Link>
          <Link
            href="/seri"
            className="inline-flex min-h-8 items-center text-text-muted underline-offset-4 hover:text-text hover:underline"
          >
            Hesapsız okumaya dön
          </Link>
        </nav>
      )}
    </AccountShell>
  );
}
