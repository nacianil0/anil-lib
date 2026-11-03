"use client";

import { useState } from "react";

/**
 * Shows a recovery code the one time it exists in readable form. It is never sent
 * again: the server keeps only its digest.
 */
export function RecoveryCodePanel({ username, code }: { username: string; code: string }) {
  const [copied, setCopied] = useState<"idle" | "done" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied("done");
    } catch {
      setCopied("failed");
    }
  }

  function save() {
    const text = `Anıl Lib kurtarma kodu\nKullanıcı adı: ${username}\nKod: ${code}\n\nBu kod bir kez kullanılır. Parolanı unutursan /hesap-kurtar sayfasında gir.\n`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `anil-lib-kurtarma-${username}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-md border border-accent bg-surface p-4 sm:p-5">
      <h2 className="font-serif text-lg font-semibold text-text">Kurtarma kodun</h2>
      <p className="mt-2 font-sans text-sm leading-relaxed text-text-muted">
        Parolanı unutursan hesabına yalnızca bu kodla dönebilirsin; e-posta ile kurtarma yok. Kod
        bir kez gösterilir, sonra bir daha görüntülenemez. Bir parola yöneticisine ya da güvenli bir
        yere kaydet.
      </p>
      <p
        className="mt-4 select-all break-all rounded border border-border bg-bg px-3 py-3 text-center font-mono text-base tracking-wider text-text sm:text-lg"
        aria-label={`Kurtarma kodu: ${code.split("").join(" ")}`}
      >
        {code}
      </p>
      <div className="mt-3 flex flex-wrap gap-2 font-sans text-sm">
        <button
          type="button"
          onClick={() => void copy()}
          className="inline-flex min-h-10 items-center rounded-md border border-border-strong px-3 font-medium text-text hover:border-accent hover:text-accent"
        >
          Kopyala
        </button>
        <button
          type="button"
          onClick={save}
          className="inline-flex min-h-10 items-center rounded-md border border-border-strong px-3 font-medium text-text hover:border-accent hover:text-accent"
        >
          Metin dosyası olarak kaydet
        </button>
      </div>
      <p role="status" className="mt-2 min-h-[1rem] font-sans text-2xs text-text-muted">
        {copied === "done"
          ? "Kod panoya kopyalandı."
          : copied === "failed"
            ? "Kopyalanamadı; kodu elle seç."
            : ""}
      </p>
    </div>
  );
}
