"use client";

import Link from "next/link";
import { useActionState } from "react";
import { FormField, primaryButtonClass } from "@/components/account/form-field";
import { RecoveryCodePanel } from "@/components/account/recovery-code-panel";
import { READER_MIN_PASSWORD_LENGTH } from "@/lib/auth/password-policy";
import { registerAction } from "./actions";
import { initialRegisterState } from "./register-state";

export function RegisterForm({
  issued,
  next,
  signedIn,
}: {
  issued: string;
  next: string;
  signedIn: boolean;
}) {
  const [state, action, pending] = useActionState(registerAction, initialRegisterState);

  if (state.status === "created") {
    return (
      <div className="flex flex-col gap-6">
        <p role="status" className="font-sans text-sm text-text">
          Hesabın açıldı ve giriş yaptın,{" "}
          <strong className="font-semibold">{state.username}</strong>.
        </p>
        <RecoveryCodePanel username={state.username} code={state.recoveryCode} />
        {/* A full load, so the next page is rendered for the new session from scratch. */}
        <a href={state.next} className={primaryButtonClass}>
          Kodu kaydettim, devam et
        </a>
      </div>
    );
  }

  if (signedIn) {
    return (
      <p role="status" className="font-sans text-sm text-text">
        Zaten giriş yaptın.{" "}
        <Link href={next} className="text-accent underline underline-offset-4 hover:no-underline">
          Okumaya dön
        </Link>
      </p>
    );
  }

  const error = state.status === "error" ? state : null;

  return (
    <form action={action} className="flex flex-col gap-5" noValidate={false}>
      <input type="hidden" name="issued" value={issued} />
      <input type="hidden" name="next" value={next} />
      {/* Left empty by people; a script filling every field fills this one too. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Web sitesi
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <FormField
        label="Kullanıcı adı"
        name="username"
        type="text"
        required
        minLength={3}
        maxLength={32}
        autoCapitalize="none"
        autoComplete="username"
        autoCorrect="off"
        spellCheck={false}
        defaultValue={error?.username ?? ""}
        hint="3–32 karakter: küçük harf, rakam, nokta, alt çizgi ya da tire. Başkalarına gösterilmez."
        error={error?.field === "username" ? error.message : undefined}
      />
      <FormField
        label="Parola"
        name="password"
        type="password"
        required
        minLength={READER_MIN_PASSWORD_LENGTH}
        maxLength={200}
        autoComplete="new-password"
        hint={`En az ${READER_MIN_PASSWORD_LENGTH} karakter. Birkaç kelimelik bir cümle hem güçlü hem akılda kalır; özel karakter şartı yok.`}
        error={error?.field === "password" ? error.message : undefined}
      />
      <FormField
        label="Parola (tekrar)"
        name="confirm"
        type="password"
        required
        autoComplete="new-password"
        error={error?.field === "confirm" ? error.message : undefined}
      />

      <div aria-live="polite" className="min-h-[1.25rem]">
        {error &&
          (error.field ? (
            // The visible copy sits under its field; this one is for screen readers.
            <p className="sr-only">{error.message}</p>
          ) : (
            <p role="alert" className="font-sans text-sm text-accent">
              {error.message}
            </p>
          ))}
      </div>

      <button type="submit" disabled={pending} className={primaryButtonClass}>
        {pending ? "Hesap açılıyor…" : "Hesap aç"}
      </button>
    </form>
  );
}
