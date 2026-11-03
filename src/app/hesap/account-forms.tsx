"use client";

import { useActionState } from "react";
import {
  FormField,
  primaryButtonClass,
  secondaryButtonClass,
} from "@/components/account/form-field";
import { RecoveryCodePanel } from "@/components/account/recovery-code-panel";
import { READER_MIN_PASSWORD_LENGTH } from "@/lib/auth/password-policy";
import { changePasswordAction, deleteAccountAction, newRecoveryCodeAction } from "./actions";
import { initialAccountActionState, type AccountActionState } from "./account-state";

function Outcome({ state }: { state: AccountActionState }) {
  return (
    <div aria-live="polite" className="min-h-[1.25rem]">
      {state.status === "error" && (
        <p role="alert" className="font-sans text-sm text-accent">
          {state.message}
        </p>
      )}
      {state.status === "done" && (
        <p role="status" className="font-sans text-sm text-text">
          {state.message}
        </p>
      )}
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-border pt-6">
      <h2 id={id} className="font-serif text-xl font-semibold">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function AccountForms({ username }: { username: string }) {
  const [passwordState, passwordAction, passwordPending] = useActionState(
    changePasswordAction,
    initialAccountActionState,
  );
  const [codeState, codeAction, codePending] = useActionState(
    newRecoveryCodeAction,
    initialAccountActionState,
  );
  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteAccountAction,
    initialAccountActionState,
  );

  return (
    <div className="flex flex-col gap-10">
      <Section id="parola" title="Parolayı değiştir">
        <form action={passwordAction} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            autoComplete="username"
            value={username}
            readOnly
            hidden
          />
          <FormField
            label="Şu anki parola"
            name="current"
            type="password"
            required
            autoComplete="current-password"
          />
          <FormField
            label="Yeni parola"
            name="password"
            type="password"
            required
            minLength={READER_MIN_PASSWORD_LENGTH}
            maxLength={200}
            autoComplete="new-password"
            hint={`En az ${READER_MIN_PASSWORD_LENGTH} karakter. Değişince bu cihaz dışındaki oturumların kapanır.`}
          />
          <FormField
            label="Yeni parola (tekrar)"
            name="confirm"
            type="password"
            required
            autoComplete="new-password"
          />
          <Outcome state={passwordState} />
          <button type="submit" disabled={passwordPending} className={primaryButtonClass}>
            {passwordPending ? "Değiştiriliyor…" : "Parolayı değiştir"}
          </button>
        </form>
      </Section>

      <Section id="kurtarma" title="Yeni kurtarma kodu">
        <p className="mb-4 font-sans text-sm leading-relaxed text-text-muted">
          Kodunu kaybettiysen ya da başkası görmüş olabilirse yenisini al; eski kod hemen
          geçersizleşir.
        </p>
        {codeState.status === "done" && codeState.recoveryCode ? (
          <div className="flex flex-col gap-3">
            <Outcome state={codeState} />
            <RecoveryCodePanel
              username={codeState.username ?? username}
              code={codeState.recoveryCode}
            />
          </div>
        ) : (
          <form action={codeAction} className="flex flex-col gap-4">
            <FormField
              label="Şu anki parola"
              name="current"
              id="current-for-code"
              type="password"
              required
              autoComplete="current-password"
            />
            <Outcome state={codeState} />
            <button type="submit" disabled={codePending} className={secondaryButtonClass}>
              {codePending ? "Hazırlanıyor…" : "Yeni kod oluştur"}
            </button>
          </form>
        )}
      </Section>

      <Section id="sil" title="Hesabı sil">
        <p className="mb-4 font-sans text-sm leading-relaxed text-text-muted">
          Hesabın ve ona bağlı bütün okuma verilerin (ilerleme, yer imleri, vurgular) sunucudan
          kalıcı olarak silinir. Bu işlem geri alınamaz.
        </p>
        <form action={deleteAction} className="flex flex-col gap-4">
          <FormField
            label="Şu anki parola"
            name="current"
            id="current-for-delete"
            type="password"
            required
            autoComplete="current-password"
          />
          <FormField
            label={`Onaylamak için kullanıcı adını yaz: ${username}`}
            name="confirmUsername"
            type="text"
            required
            autoCapitalize="none"
            autoComplete="off"
            spellCheck={false}
          />
          <Outcome state={deleteState} />
          <button
            type="submit"
            disabled={deletePending}
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-accent px-5 font-sans text-sm font-semibold text-accent transition-colors hover:bg-accent-soft disabled:cursor-wait disabled:opacity-60"
          >
            {deletePending ? "Siliniyor…" : "Hesabımı kalıcı olarak sil"}
          </button>
        </form>
      </Section>
    </div>
  );
}
