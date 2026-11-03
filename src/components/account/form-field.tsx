import type { InputHTMLAttributes } from "react";

export const inputClass =
  "h-11 w-full rounded border border-border bg-surface px-3 font-sans text-sm text-text outline-none transition-colors placeholder:text-text-faint focus:border-accent focus:ring-1 focus:ring-accent aria-[invalid=true]:border-accent disabled:cursor-not-allowed disabled:opacity-50";

export const primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-accent-fill px-5 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-60";

export const secondaryButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-md border border-border-strong px-5 font-sans text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent disabled:cursor-wait disabled:opacity-60";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  hint?: string;
  /** The message to show under the field when it is the one at fault. */
  error?: string;
};

/** A labelled input whose hint and error are announced with it. */
export function FormField({ label, name, hint, error, id, ...input }: Props) {
  // Several forms on one page may share a field name; `id` keeps their labels apart.
  const fieldId = id ?? name;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="font-sans text-sm font-medium text-text">
        {label}
      </label>
      <input
        id={fieldId}
        name={name}
        className={inputClass}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...input}
      />
      {hint && (
        <p id={hintId} className="font-sans text-2xs leading-snug text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="font-sans text-2xs leading-snug text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
