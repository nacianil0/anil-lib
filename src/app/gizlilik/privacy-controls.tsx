"use client";

import { useEffect, useId, useState } from "react";
import { secondaryButtonClass } from "@/components/account/form-field";
import { PREFERENCES_STORAGE_KEY } from "@/lib/reader/version";
import {
  clearLocalReadingData,
  isLocalTrackingEnabled,
  setLocalTrackingEnabled,
} from "@/lib/reader-data/local-tracking";

const STORAGE_PREFIX = "anil-lib:";

function removeAllSiteKeys(): number {
  const keys: string[] = [];
  for (let index = 0; index < window.localStorage.length; index++) {
    const key = window.localStorage.key(index);
    if (key?.startsWith(STORAGE_PREFIX)) keys.push(key);
  }
  for (const key of keys) window.localStorage.removeItem(key);
  return keys.length;
}

/** The visitor's own controls over what this browser keeps. Nothing here talks to the server. */
export function PrivacyControls() {
  const [ready, setReady] = useState(false);
  const [available, setAvailable] = useState(true);
  const [tracking, setTracking] = useState(true);
  const [message, setMessage] = useState("");
  const switchId = useId();

  useEffect(() => {
    try {
      window.localStorage.getItem(STORAGE_PREFIX);
      setAvailable(true);
    } catch {
      setAvailable(false);
    }
    setTracking(isLocalTrackingEnabled());
    setReady(true);
  }, []);

  if (ready && !available) {
    return (
      <p role="status" className="font-sans text-sm text-text-muted">
        Bu tarayıcı yerel depolamayı engelliyor; burada senin için saklanan bir şey yok. Okuma yine
        de çalışır, yalnızca kaldığın yer hatırlanmaz.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5" aria-busy={!ready}>
      <div className="flex items-start gap-3">
        <input
          id={switchId}
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 accent-accent-fill"
          checked={tracking}
          disabled={!ready}
          onChange={(event) => {
            const enabled = event.target.checked;
            setLocalTrackingEnabled(enabled);
            setTracking(enabled);
            setMessage(
              enabled
                ? "Hesapsız okurken kaldığın yer bu tarayıcıda yeniden saklanacak."
                : "Kapatıldı. Hesapsız okurken bu tarayıcıda hiçbir okuma bilgisi saklanmayacak; saklanmış olan silindi.",
            );
          }}
        />
        <label htmlFor={switchId} className="font-sans text-sm text-text">
          Hesapsız okurken kaldığım yeri bu tarayıcıda sakla
          <span className="block text-2xs leading-snug text-text-muted">
            Kapatırsan şimdiye kadar saklanan da silinir ve “Kaldığın yerden devam et” görünmez.
          </span>
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!ready}
          className={secondaryButtonClass}
          onClick={() => {
            clearLocalReadingData();
            setMessage("Hesapsız okuma bilgilerin bu tarayıcıdan silindi.");
          }}
        >
          Hesapsız okuma verisini sil
        </button>
        <button
          type="button"
          disabled={!ready}
          className={secondaryButtonClass}
          onClick={() => {
            try {
              window.localStorage.removeItem(PREFERENCES_STORAGE_KEY);
            } catch {
              // Nothing stored when storage is blocked.
            }
            setMessage("Okuma ayarların varsayılana döndü; sayfayı yenileyince uygulanır.");
          }}
        >
          Okuma ayarlarını sıfırla
        </button>
        <button
          type="button"
          disabled={!ready}
          className={secondaryButtonClass}
          onClick={() => {
            const removed = removeAllSiteKeys();
            setTracking(true);
            setMessage(
              removed > 0
                ? "Bu tarayıcıdaki bütün Anıl Lib verisi silindi. Hesabındaki veriler sunucuda durur; bir sonraki girişte geri gelir."
                : "Bu tarayıcıda silinecek Anıl Lib verisi yoktu.",
            );
          }}
        >
          Bu tarayıcıdaki bütün verimi sil
        </button>
      </div>

      <p role="status" className="min-h-[1.25rem] font-sans text-sm text-text">
        {message}
      </p>
    </div>
  );
}
