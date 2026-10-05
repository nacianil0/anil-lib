"use client";

import { useEffect, useRef, useState } from "react";
import { useReaderData } from "@/lib/reader-data/use-reader-data";
import type { SeriesId } from "@/lib/reader-data/series-reset";

export function SeriesProgressReset({ seriesId }: { seriesId: SeriesId }) {
  const { ready, resetSeries } = useReaderData();
  const [armed, setArmed] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const armedAt = useRef(0);
  const busy = useRef(false);
  const cancelButton = useRef<HTMLButtonElement>(null);
  const armButton = useRef<HTMLButtonElement>(null);
  const label = seriesId === "ai" ? "YZ" : "Boğaziçi";

  useEffect(() => {
    if (armed) cancelButton.current?.focus();
  }, [armed]);

  function cancel() {
    if (busy.current) return;
    setArmed(false);
    setError("");
    requestAnimationFrame(() => armButton.current?.focus());
  }

  async function confirm() {
    if (!armed || busy.current || Date.now() - armedAt.current < 500) return;
    busy.current = true;
    setPending(true);
    setError("");
    try {
      await resetSeries(seriesId);
      setArmed(false);
      setMessage("İlerlemen sıfırlandı. Seriye ilk yazıdan başlayabilirsin.");
      requestAnimationFrame(() => armButton.current?.focus());
    } catch {
      setError("İlerleme sıfırlanamadı. Bağlantını kontrol edip tekrar dene.");
    } finally {
      busy.current = false;
      setPending(false);
    }
  }

  const buttonClass =
    "inline-flex min-h-11 items-center justify-center rounded-md px-3 font-sans text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-50";
  return (
    <div
      className="mt-3 font-sans"
      onPointerDown={(event) => {
        if (armed && !pending && Date.now() - armedAt.current < 500) {
          event.preventDefault();
          cancelButton.current?.focus();
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && armed && !pending) {
          event.preventDefault();
          cancel();
        }
      }}
    >
      {!armed ? (
        <button
          key="arm"
          ref={armButton}
          type="button"
          disabled={!ready}
          className={`${buttonClass} text-text-muted hover:bg-surface-muted hover:text-text`}
          onClick={(event) => {
            event.preventDefault();
            armedAt.current = Date.now();
            setMessage("");
            setError("");
            setArmed(true);
          }}
        >
          İlerlemeyi sıfırla
        </button>
      ) : (
        <div className="rounded-md border border-border bg-surface p-4" aria-busy={pending}>
          <p
            id={`reset-description-${seriesId}`}
            className="max-w-xl text-sm leading-relaxed text-text-muted"
          >
            {label} serisindeki okundu bilgilerin ve kaldığın konumlar silinecek. Diğer serideki
            ilerlemen, yer imlerin ve vurguların korunacak. Bu işlem geri alınamaz.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              key="cancel"
              ref={cancelButton}
              type="button"
              disabled={pending}
              className={`${buttonClass} border border-border text-text hover:bg-surface-muted`}
              onClick={cancel}
            >
              Vazgeç
            </button>
            <button
              key="confirm"
              type="button"
              disabled={pending}
              aria-describedby={`reset-description-${seriesId}`}
              className={`${buttonClass} bg-accent text-white hover:bg-accent-fill`}
              onClick={() => void confirm()}
            >
              {pending ? "Sıfırlanıyor…" : "Evet, bu seriyi sıfırla"}
            </button>
          </div>
        </div>
      )}
      <p role="status" className="text-xs leading-relaxed text-text-muted">
        {message}
      </p>
      {error && (
        <p role="alert" className="mt-2 text-xs leading-relaxed text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
