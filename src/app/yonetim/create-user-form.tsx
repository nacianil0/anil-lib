"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { MIN_PASSWORD_LENGTH } from "@/lib/auth/user-schema";
import { createUserAction } from "./actions";
import { initialCreateUserState } from "./create-user-state";

export function CreateUserForm({ disabled }: { disabled?: boolean }) {
  const [state, action, pending] = useActionState(createUserAction, initialCreateUserState);
  const router = useRouter();

  // Refresh the list only after the create has reported back, so a rendering
  // problem in the table can never be mistaken for a failed account creation.
  useEffect(() => {
    if (state.status === "success") router.refresh();
  }, [state, router]);

  return (
    <form
      action={action}
      className="rounded-md border border-border bg-surface p-5 sm:p-6"
      // A fresh form after a successful create, so the previous password never
      // lingers in the field.
      key={state.status === "success" ? state.username : "new"}
    >
      <h2 className="flex items-center gap-2 font-serif text-xl font-semibold">
        <UserPlus className="h-4 w-4 text-accent" aria-hidden="true" />
        Yeni kullanıcı
      </h2>
      <p className="mt-1.5 font-sans text-2xs leading-relaxed text-text-muted">
        Oluşturulan kullanıcı iki seriye de erişir, kendi ilerlemesini tutar ve
        kullanıcı oluşturamaz.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-2xs uppercase tracking-[0.15em] text-text-faint">
            Kullanıcı adı
          </span>
          <input
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            className="h-10 rounded border border-border bg-bg px-3 font-sans text-sm text-text outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50"
            disabled={disabled || pending}
            maxLength={32}
            name="username"
            required
            spellCheck={false}
            type="text"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="font-mono text-2xs uppercase tracking-[0.15em] text-text-faint">
            Parola
          </span>
          <input
            autoComplete="new-password"
            className="h-10 rounded border border-border bg-bg px-3 font-sans text-sm text-text outline-none transition-colors focus:border-accent disabled:cursor-not-allowed disabled:opacity-50"
            disabled={disabled || pending}
            minLength={MIN_PASSWORD_LENGTH}
            name="password"
            required
            type="password"
          />
        </label>
      </div>

      <div aria-live="polite" className="mt-3 min-h-[2rem]">
        {state.status === "error" && (
          <p className="rounded border border-accent-soft bg-accent-soft px-3 py-2 font-sans text-2xs leading-snug text-accent">
            {state.message}
          </p>
        )}
        {state.status === "success" && (
          <p className="rounded border border-cool-soft bg-cool-soft px-3 py-2 font-sans text-2xs leading-snug text-cool">
            <strong>{state.username}</strong> oluşturuldu. Kendi kullanıcı adı ve
            parolasıyla giriş yapabilir.
          </p>
        )}
      </div>

      <button
        className="mt-1 h-10 rounded bg-accent-fill px-4 font-sans text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled || pending}
        type="submit"
      >
        {pending ? "Oluşturuluyor…" : "Kullanıcı oluştur"}
      </button>
    </form>
  );
}
