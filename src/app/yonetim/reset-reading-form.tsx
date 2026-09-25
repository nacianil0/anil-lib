"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { resetReadingAction } from "./actions";
import { initialResetReadingState } from "./reset-reading-state";

/** A confirm this soon after arming is the tail of the arming gesture, not a decision. */
const CONFIRM_DELAY_MS = 500;

type Props = {
  userId: string;
  username: string;
  savedPlaceCount: number;
  highlightCount: number;
};

/**
 * Owner-only "start this account's reading over". Two steps, like the reader's own
 * "reset preferences": the first press only arms the button, so a stray click never
 * erases anyone's reading.
 */
export function ResetReadingForm({ userId, username, savedPlaceCount, highlightCount }: Props) {
  const [state, action, pending] = useActionState(resetReadingAction, initialResetReadingState);
  const [armed, setArmed] = useState(false);
  const armedAtRef = useRef(0);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // The arming button is gone once pressed. Focus lands on the safe choice, so a
  // second Enter — or a held one — backs out instead of erasing.
  useEffect(() => {
    if (armed) cancelRef.current?.focus();
  }, [armed]);

  // Refresh the numbers only after the reset has reported back, and disarm so the
  // next reset needs two presses again.
  useEffect(() => {
    if (state.status === "success") {
      setArmed(false);
      router.refresh();
    }
  }, [state, router]);

  return (
    <form action={action} className="mt-6 rounded-md border border-border bg-surface p-5 sm:p-6">
      <input type="hidden" name="userId" value={userId} />
      <h2 className="flex items-center gap-2 font-serif text-xl font-semibold">
        <RotateCcw className="h-4 w-4 text-accent" aria-hidden="true" />
        Okuma geçmişini sıfırla
      </h2>
      <p className="mt-1.5 font-sans text-2xs leading-relaxed text-text-muted">
        <strong className="font-medium text-text">{username}</strong> için tamamlanan
        bölümler, okuma yüzdeleri ve kaldığı yerler silinir; iki seri de baştan başlar.
        Açık cihazlar kendi kopyalarını bir sonraki eşitlemede temizler. Geri alınamaz.
      </p>

      <fieldset className="mt-4 flex flex-col gap-2 font-sans text-sm" disabled={pending}>
        <legend className="sr-only">Sıfırlamaya eklenecekler</legend>
        <label className="inline-flex items-center gap-2">
          <input
            className="h-4 w-4 accent-[var(--accent)]"
            disabled={savedPlaceCount === 0}
            name="savedPlaces"
            type="checkbox"
          />
          <span className={savedPlaceCount === 0 ? "text-text-faint" : "text-text"}>
            Yer imlerini de sil
            <span className="ml-1 tabular-nums text-text-faint">({savedPlaceCount})</span>
          </span>
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            className="h-4 w-4 accent-[var(--accent)]"
            disabled={highlightCount === 0}
            name="highlights"
            type="checkbox"
          />
          <span className={highlightCount === 0 ? "text-text-faint" : "text-text"}>
            İşaretleri de sil
            <span className="ml-1 tabular-nums text-text-faint">({highlightCount})</span>
          </span>
        </label>
      </fieldset>

      <div aria-live="polite" className="mt-3 min-h-[2rem]">
        {state.status === "error" && (
          <p className="rounded border border-accent-soft bg-accent-soft px-3 py-2 font-sans text-2xs leading-snug text-accent">
            {state.message}
          </p>
        )}
        {state.status === "success" && !armed && (
          <p className="rounded border border-cool-soft bg-cool-soft px-3 py-2 font-sans text-2xs leading-snug text-cool">
            Sıfırlandı: {state.progress} bölümün ilerlemesi silindi
            {state.savedPlaces > 0 && `, ${state.savedPlaces} yer imi kaldırıldı`}
            {state.highlights > 0 && `, ${state.highlights} işaret kaldırıldı`}.
          </p>
        )}
        {armed && (
          <p className="font-sans text-2xs leading-snug text-accent">
            Emin misin? Bu işlem geri alınamaz.
          </p>
        )}
      </div>

      {/* Distinct keys: were the arming button reused as the submit button, React would
          switch its type to "submit" while the arming click is still being dispatched,
          and that same click would submit the form. */}
      <div className="mt-1 flex flex-wrap items-center gap-3">
        {armed ? (
          <>
            <button
              key="confirm"
              className="h-10 rounded bg-accent-fill px-4 font-sans text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={pending}
              // The rest of a double-click or double-tap on the arming button lands
              // here; confirming takes a press of its own, whatever the input.
              onClick={(event) => {
                if (Date.now() - armedAtRef.current < CONFIRM_DELAY_MS) event.preventDefault();
              }}
              type="submit"
            >
              {pending ? "Sıfırlanıyor…" : "Evet, sıfırla"}
            </button>
            <button
              key="cancel"
              ref={cancelRef}
              className="h-10 rounded px-3 font-sans text-sm text-text-muted transition-colors hover:text-text disabled:cursor-not-allowed disabled:opacity-50"
              disabled={pending}
              onClick={() => setArmed(false)}
              type="button"
            >
              Vazgeç
            </button>
          </>
        ) : (
          <button
            key="arm"
            className="h-10 rounded border border-border px-4 font-sans text-sm font-medium text-accent transition-colors hover:border-accent"
            onClick={(event) => {
              event.preventDefault();
              armedAtRef.current = Date.now();
              setArmed(true);
            }}
            type="button"
          >
            Okuma geçmişini sıfırla
          </button>
        )}
      </div>
    </form>
  );
}
