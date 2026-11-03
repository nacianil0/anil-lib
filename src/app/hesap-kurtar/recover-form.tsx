"use client";

import Link from "next/link";
import { useActionState } from "react";
import { FormField, primaryButtonClass } from "@/components/account/form-field";
import { RecoveryCodePanel } from "@/components/account/recovery-code-panel";
import { READER_MIN_PASSWORD_LENGTH } from "@/lib/auth/password-policy";
import { recoverAction } from "./actions";
import { initialRecoverState } from "./recover-state";

export function RecoverForm() {
  const [state, action, pending] = useActionState(recoverAction, initialRecoverState);

  if (state.status === "recovered") {
    return (
      <div className="flex flex-col gap-6">
        <p role="status" className="font-sans text-sm text-text">
          Parolan değişti ve hesabındaki bütün oturumlar kapandı. Kullandığın kurtarma kodu artık
          geçersiz; yenisi aşağıda.
        </p>
        <RecoveryCodePanel username={state.username} code={state.recoveryCode} />
        <Link href="/login?notice=recovered" className={primaryButtonClass}>
          Kodu kaydettim, giriş yap
        </Link>
      </div>
    );
  }

  const error = state.status === "error" ? state : null;

  return (
    <form action={action} className="flex flex-col gap-5">
      <FormField
        label="Kullanıcı adı"
        name="username"
        type="text"
        required
        autoCapitalize="none"
        autoComplete="username"
        autoCorrect="off"
        spellCheck={false}
        defaultValue={error?.username ?? ""}
      />
      <FormField
        label="Kurtarma kodu"
        name="code"
        type="text"
        required
        autoCapitalize="characters"
        autoComplete="one-time-code"
        autoCorrect="off"
        spellCheck={false}
        hint="Hesap açarken verilen 25 karakterlik kod. Tireleri yazmasan da olur."
      />
      <FormField
        label="Yeni parola"
        name="password"
        type="password"
        required
        minLength={READER_MIN_PASSWORD_LENGTH}
        maxLength={200}
        autoComplete="new-password"
        hint={`En az ${READER_MIN_PASSWORD_LENGTH} karakter.`}
        error={error?.field === "password" ? error.message : undefined}
      />
      <FormField
        label="Yeni parola (tekrar)"
        name="confirm"
        type="password"
        required
        autoComplete="new-password"
        error={error?.field === "confirm" ? error.message : undefined}
      />

      <div aria-live="polite" className="min-h-[1.25rem]">
        {error &&
          (error.field ? (
            <p className="sr-only">{error.message}</p>
          ) : (
            <p role="alert" className="font-sans text-sm text-accent">
              {error.message}
            </p>
          ))}
      </div>

      <button type="submit" disabled={pending} className={primaryButtonClass}>
        {pending ? "Kontrol ediliyor…" : "Parolamı yenile"}
      </button>
    </form>
  );
}
