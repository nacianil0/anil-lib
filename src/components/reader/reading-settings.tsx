"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Monitor, Moon, Plus, SlidersHorizontal, Sun } from "lucide-react";
import { UI } from "@/lib/content/labels";
import { TEXT_SIZES } from "@/lib/preferences/schema";
import { useReaderPreferences } from "@/lib/preferences/use-reader-preferences";

type SegmentOption<T extends string> = {
  value: T;
  label: string;
};

function PreferenceSegments<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly SegmentOption<T>[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="mb-5">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <div
        role="group"
        aria-label={label}
        className="flex rounded-md border border-border bg-surface-muted p-0.5"
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={`min-w-0 flex-1 rounded px-1.5 py-1 text-xs font-medium transition-colors ${
              value === option.value
                ? "bg-surface text-text shadow-sm"
                : "text-text-muted hover:text-text"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ReadingSettings() {
  const { preferences, updatePreference, resetPreferences } = useReaderPreferences();
  const [open, setOpen] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function onClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const currentSizeIndex = TEXT_SIZES.indexOf(preferences.fontScale);
  const sizePercentages = [90, 100, 110, 120];
  const sizePercentage = currentSizeIndex !== -1 ? sizePercentages[currentSizeIndex] : 100;

  function decreaseSize() {
    if (currentSizeIndex > 0) {
      updatePreference("fontScale", TEXT_SIZES[currentSizeIndex - 1]);
    }
  }

  function increaseSize() {
    if (currentSizeIndex < TEXT_SIZES.length - 1) {
      updatePreference("fontScale", TEXT_SIZES[currentSizeIndex + 1]);
    }
  }

  function handleReset() {
    if (resetConfirm) {
      resetPreferences();
      setResetConfirm(false);
    } else {
      setResetConfirm(true);
    }
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          setOpen(!open);
          setResetConfirm(false);
        }}
        className="inline-flex items-center gap-2 rounded-md border border-border px-2.5 py-1.5 font-sans text-2xs text-text-muted transition-colors hover:border-border-strong hover:text-text"
        aria-label={UI.readingSettings}
        aria-expanded={open}
        aria-haspopup="dialog"
        title={UI.readingSettings}
      >
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={UI.readingSettings}
          className="absolute right-0 top-full z-50 mt-2 max-h-[calc(100vh-5rem)] w-[18rem] overflow-y-auto overscroll-contain rounded-lg border border-border bg-surface p-4 font-sans text-text shadow-xl max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:max-h-[85dvh] max-sm:w-full max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-b-0"
        >
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium">{UI.textSize}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={currentSizeIndex <= 0}
                onClick={decreaseSize}
                className="rounded border border-border p-1 text-text-muted hover:bg-surface-muted disabled:opacity-50"
                aria-label={UI.decreaseTextSize}
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="w-10 text-center text-sm font-medium tabular-nums">
                {sizePercentage}%
              </span>
              <button
                type="button"
                disabled={currentSizeIndex >= TEXT_SIZES.length - 1}
                onClick={increaseSize}
                className="rounded border border-border p-1 text-text-muted hover:bg-surface-muted disabled:opacity-50"
                aria-label={UI.increaseTextSize}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <PreferenceSegments
            label={UI.lineSpacing}
            value={preferences.lineSpacing}
            options={[
              { value: "compact", label: UI.spacingCompact },
              { value: "balanced", label: UI.spacingBalanced },
              { value: "relaxed", label: UI.spacingRelaxed },
            ]}
            onChange={(value) => updatePreference("lineSpacing", value)}
          />

          <PreferenceSegments
            label={UI.paragraphSpacing}
            value={preferences.paragraphSpacing}
            options={[
              { value: "compact", label: UI.spacingCompact },
              { value: "balanced", label: UI.spacingBalanced },
              { value: "relaxed", label: UI.spacingRelaxed },
            ]}
            onChange={(value) => updatePreference("paragraphSpacing", value)}
          />

          <PreferenceSegments
            label={UI.textAlignment}
            value={preferences.textAlign}
            options={[
              { value: "left", label: UI.alignLeft },
              { value: "justify", label: UI.alignJustify },
            ]}
            onChange={(value) => updatePreference("textAlign", value)}
          />

          <PreferenceSegments
            label={UI.firstLineIndent}
            value={preferences.firstLineIndent}
            options={[
              { value: "none", label: UI.indentNone },
              { value: "subtle", label: UI.indentSubtle },
              { value: "classic", label: UI.indentClassic },
            ]}
            onChange={(value) => updatePreference("firstLineIndent", value)}
          />

          <PreferenceSegments
            label={UI.columnWidth}
            value={preferences.measure}
            options={[
              { value: "narrow", label: UI.measureNarrow },
              { value: "standard", label: UI.measureStandard },
              { value: "wide", label: UI.measureWide },
            ]}
            onChange={(value) => updatePreference("measure", value)}
          />

          <PreferenceSegments
            label={UI.articleFont}
            value={preferences.fontFamily}
            options={[
              { value: "editorial", label: UI.fontEditorial },
              { value: "sans", label: UI.fontSans },
            ]}
            onChange={(value) => updatePreference("fontFamily", value)}
          />

          <PreferenceSegments
            label={UI.hyphenation}
            value={preferences.hyphenation}
            options={[
              { value: "off", label: UI.hyphenationOff },
              { value: "auto", label: UI.hyphenationAuto },
            ]}
            onChange={(value) => updatePreference("hyphenation", value)}
          />

          <div className="mb-5">
            <span className="mb-2 block text-sm font-medium">{UI.theme}</span>
            <div
              role="group"
              aria-label={UI.theme}
              className="flex rounded-md border border-border bg-surface-muted p-0.5"
            >
              {(["light", "system", "dark"] as const).map((value) => {
                const Icon = value === "light" ? Sun : value === "dark" ? Moon : Monitor;
                const label =
                  value === "light"
                    ? UI.themeLight
                    : value === "dark"
                      ? UI.themeDark
                      : UI.themeSystem;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updatePreference("theme", value)}
                    aria-label={label}
                    aria-pressed={preferences.theme === value}
                    title={label}
                    className={`flex flex-1 items-center justify-center rounded py-1 transition-colors ${
                      preferences.theme === value
                        ? "bg-surface text-text shadow-sm"
                        : "text-text-muted hover:text-text"
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-medium">{UI.focusMode}</span>
            <button
              type="button"
              role="switch"
              aria-checked={preferences.focusMode}
              onClick={() => updatePreference("focusMode", !preferences.focusMode)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                preferences.focusMode ? "bg-accent" : "bg-border"
              }`}
            >
              <span className="sr-only">
                {preferences.focusMode ? UI.focusModeExit : UI.focusModeEnter}
              </span>
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-surface transition-transform ${
                  preferences.focusMode ? "translate-x-[18px]" : "translate-x-[4px]"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-muted">{UI.resetPreferences}</span>
            <button
              type="button"
              onClick={handleReset}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                resetConfirm
                  ? "bg-accent text-surface hover:bg-accent-fill"
                  : "text-text hover:bg-surface-muted"
              }`}
            >
              {resetConfirm ? UI.resetConfirm : UI.resetPreferences}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
