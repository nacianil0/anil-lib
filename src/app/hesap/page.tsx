import type { Metadata } from "next";
import { AccountShell } from "@/components/account/account-shell";
import { logout } from "@/app/login/actions";
import { secondaryButtonClass } from "@/components/account/form-field";
import { requireSessionUser } from "@/lib/auth/session-user";
import { AccountForms } from "./account-forms";

/** Renders per request: it shows the signed-in account and must never be prerendered. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hesabım",
  robots: { index: false, follow: false },
};

function formatDate(value: string): string {
  try {
    return new Intl.DateTimeFormat("tr-TR", { dateStyle: "long" }).format(new Date(value));
  } catch {
    return "";
  }
}

export default async function AccountPage() {
  const user = await requireSessionUser();
  const isReader = user.role === "reader";

  return (
    <AccountShell
      signedIn
      eyebrow={isReader ? "Okuyucu hesabı" : "Hesap"}
      title="Hesabım"
      intro={
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          <dt className="text-text-faint">Kullanıcı adı</dt>
          <dd className="text-text">{user.username}</dd>
          <dt className="text-text-faint">Erişim</dt>
          <dd className="text-text">
            {isReader
              ? "Sıfırdan Yüze: Yapay Zekâ ve Güven Sınırı serileri"
              : user.role === "owner"
                ? "Bütün seriler, arşiv ve yönetim"
                : "Yönetici tarafından açılmış hesap"}
          </dd>
          {isReader && (
            <>
              <dt className="text-text-faint">Açılış</dt>
              <dd className="text-text">{formatDate(user.createdAt)}</dd>
            </>
          )}
        </dl>
      }
    >
      {isReader ? (
        <AccountForms username={user.username} />
      ) : (
        <p className="font-sans text-sm leading-relaxed text-text-muted">
          Bu hesap yönetici tarafından açıldı; parolası da yönetici tarafından yönetilir.
        </p>
      )}
      <form action={logout} className="mt-10 border-t border-border pt-6">
        <button type="submit" className={secondaryButtonClass}>
          Oturumu kapat
        </button>
      </form>
    </AccountShell>
  );
}
