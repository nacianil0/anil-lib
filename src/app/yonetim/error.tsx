"use client";

/**
 * Segment error boundary. Production strips the message from server errors, but the
 * digest survives and identifies the exact entry in the platform's runtime log —
 * without it an owner facing a 500 has nothing to go on.
 */
export default function ManagementError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      <h1 className="font-serif text-2xl font-semibold text-text">Kullanıcılar</h1>
      <p className="mt-4 font-sans text-sm leading-relaxed text-text-muted">
        Bu ekran yüklenirken sunucu tarafında bir hata oluştu.
      </p>
      <dl className="mt-4 rounded border border-border bg-surface px-4 py-3 font-mono text-2xs leading-relaxed text-text">
        <dt className="text-text-faint">digest</dt>
        <dd className="mt-0.5 break-all">{error.digest ?? "(yok)"}</dd>
        <dt className="mt-3 text-text-faint">message</dt>
        <dd className="mt-0.5 break-all">{error.message || "(production'da gizlendi)"}</dd>
      </dl>
      <p className="mt-3 font-sans text-2xs leading-relaxed text-text-faint">
        {"Vercel → Logs içinde bu digest'i aratınca hatanın tam metnini görürsün."}
      </p>
      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded bg-accent-fill px-4 py-2 font-sans text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Tekrar dene
        </button>
        <a href="/" className="font-sans text-2xs text-text-muted hover:text-text">
          ← Ana sayfa
        </a>
      </div>
    </main>
  );
}
