import type { Metadata } from "next";
import Link from "next/link";
import { AccountShell } from "@/components/account/account-shell";
import { publicLaunchEnabled } from "@/lib/auth/access";
import { getGateConfig } from "@/lib/auth/password-gate";
import { getDatabaseClient } from "@/lib/db/client";
import { RecoverForm } from "./recover-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hesabını kurtar",
  robots: { index: false, follow: true },
};

export default function RecoverPage() {
  const available = Boolean(publicLaunchEnabled() && getGateConfig() && getDatabaseClient());
  return (
    <AccountShell
      eyebrow="Parolanı mı unuttun?"
      title="Hesabını kurtar"
      intro={
        <>
          <p>
            Hesap açarken verilen kurtarma koduyla yeni bir parola belirle. Kod tek kullanımlık:
            işlem bitince yerine yenisi verilir ve hesabındaki bütün oturumlar kapanır.
          </p>
          <p className="mt-2">
            Kurtarma kodu yalnızca kendi açtığın okuyucu hesaplarında vardır. Yönetici tarafından
            açılmış bir hesapsa parolayı yöneticin yeniler.
          </p>
        </>
      }
    >
      {available ? (
        <RecoverForm />
      ) : (
        <p
          role="status"
          className="rounded border border-cool-soft bg-cool-soft px-3 py-2 font-sans text-sm text-cool"
        >
          Hesap kurtarma şu anda kullanılamıyor.
        </p>
      )}
      <p className="mt-8 font-sans text-sm text-text-muted">
        Parolanı hatırladın mı?{" "}
        <Link href="/login" className="text-accent underline underline-offset-4 hover:no-underline">
          Giriş yap
        </Link>
      </p>
    </AccountShell>
  );
}
