import type { Metadata } from "next";
import Link from "next/link";
import { AccountShell } from "@/components/account/account-shell";
import { publicLaunchEnabled } from "@/lib/auth/access";
import { issueFormToken } from "@/lib/auth/form-token";
import { getGateConfig, safeNextPath } from "@/lib/auth/password-gate";
import { getSessionUser } from "@/lib/auth/session-user";
import { getDatabaseClient } from "@/lib/db/client";
import { RegisterForm } from "./register-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hesap aç",
  description:
    "Güven Sınırı serisini okumak ve ilerlemeni eşitlemek için ücretsiz bir okuyucu hesabı aç.",
  robots: { index: false, follow: true },
};

type SearchParams = Promise<{ next?: string | string[] }>;

export default async function RegisterPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const next = safeNextPath(Array.isArray(params.next) ? params.next[0] : params.next);
  // No redirect for a signed-in visitor: the sign-up action itself signs the new reader
  // in, and the cookie change makes Next render this page again in the action's
  // response. A redirect there would navigate away from the one screen that shows the
  // recovery code. The form stays mounted instead and decides what to show.
  const signedIn = Boolean(await getSessionUser());

  const config = getGateConfig();
  const available = Boolean(publicLaunchEnabled() && config && getDatabaseClient());

  return (
    <AccountShell
      signedIn={signedIn}
      current="kayit"
      returnTo={next}
      eyebrow="Ücretsiz okuyucu hesabı"
      title="Hesap aç"
      intro={
        <>
          <p>
            Hesapla <strong className="font-semibold text-text">Güven Sınırı</strong> serisini de
            okursun; okuma ilerlemen, yer imlerin ve vurguların cihazların arasında eşitlenir. Yapay
            zekâ serisini okumak için hesap gerekmez.
          </p>
          <p className="mt-2">
            E-posta istenmez. Bunun bedeli şu: parolanı unutursan hesabına yalnızca hesap açınca
            verilen kurtarma koduyla dönebilirsin.
          </p>
        </>
      }
    >
      {available && config ? (
        <RegisterForm
          issued={issueFormToken(config.cookieSecret)}
          next={next}
          signedIn={signedIn}
        />
      ) : (
        <p
          role="status"
          className="rounded border border-cool-soft bg-cool-soft px-3 py-2 font-sans text-sm text-cool"
        >
          Hesap açma şu anda kullanılamıyor.
        </p>
      )}
      <p className="mt-8 font-sans text-sm text-text-muted">
        Hesabın var mı?{" "}
        <Link
          href={next === "/" ? "/login" : `/login?${new URLSearchParams({ next })}`}
          className="text-accent underline underline-offset-4 hover:no-underline"
        >
          Giriş yap
        </Link>
      </p>
      <p className="mt-2 font-sans text-2xs leading-relaxed text-text-muted">
        Hesap açarken saklanan bilgiler ve haklarınla ilgili ayrıntılar{" "}
        <Link
          href="/gizlilik#hesap"
          className="text-accent underline underline-offset-4 hover:no-underline"
        >
          Gizlilik ve çerezler
        </Link>{" "}
        sayfasında.
      </p>
    </AccountShell>
  );
}
