"use client";

import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, Minus, Plus, Sun, Monitor, Moon } from "lucide-react";
import { UI } from "@/lib/content/labels";
import { useReaderPreferences } from "@/lib/preferences/use-reader-preferences";
import { TEXT_SIZES } from "@/lib/preferences/schema";

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

  const sizes = TEXT_SIZES;
  const currentSizeIndex = sizes.indexOf(preferences.fontScale);
  const sizePercentages = [90, 100, 110, 120];
  const sizePercentage = currentSizeIndex !== -1 ? sizePercentages[currentSizeIndex] : 100;

  function decreaseSize() {
    if (currentSizeIndex > 0) updatePreference("fontScale", sizes[currentSizeIndex - 1]);
  }
  function increaseSize() {
    if (currentSizeIndex < sizes.length - 1)
      updatePreference("fontScale", sizes[currentSizeIndex + 1]);
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
          className="absolute right-0 top-full z-50 mt-2 w-[18rem] rounded-lg border border-border bg-surface p-4 font-sans text-text shadow-xl max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:top-auto max-sm:w-full max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-b-0 sm:right-auto"
        >
          {/* Text Size */}
          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm font-medium">{UI.textSize}</span>
            <div className="flex items-center gap-3">
              <button
                disabled={currentSizeIndex <= 0}
                onClick={decreaseSize}
                className="rounded border border-border p-1 text-text-muted hover:bg-surface-muted disabled:opacity-50"
                aria-label="Decrease size"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-medium tabular-nums">
                {sizePercentage}%
              </span>
              <button
                disabled={currentSizeIndex >= sizes.length - 1}
                onClick={increaseSize}
                className="rounded border border-border p-1 text-text-muted hover:bg-surface-muted disabled:opacity-50"
                aria-label="Increase size"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Line Spacing */}
          <div className="mb-5">
            <span className="mb-2 block text-sm font-medium">{UI.lineSpacing}</span>
            <div className="flex rounded-md border border-border bg-surface-muted p-0.5">
              {(["compact", "balanced", "relaxed"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => updatePreference("lineSpacing", v)}
                  className={`flex-1 rounded py-1 text-xs font-medium transition-colors ${
                    preferences.lineSpacing === v
                      ? "bg-surface text-text shadow-sm"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {v === "compact"
                    ? UI.spacingCompact
                    : v === "balanced"
                      ? UI.spacingBalanced
                      : UI.spacingRelaxed}
                </button>
              ))}
            </div>
          </div>

          {/* Measure */}
          <div className="mb-5">
            <span className="mb-2 block text-sm font-medium">{UI.columnWidth}</span>
            <div className="flex rounded-md border border-border bg-surface-muted p-0.5">
              {(["narrow", "standard", "wide"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => updatePreference("measure", v)}
                  className={`flex-1 rounded py-1 text-xs font-medium transition-colors ${
                    preferences.measure === v
                      ? "bg-surface text-text shadow-sm"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {v === "narrow"
                    ? UI.measureNarrow
                    : v === "standard"
                      ? UI.measureStandard
                      : UI.measureWide}
                </button>
              ))}
            </div>
          </div>

          {/* Font */}
          <div className="mb-5">
            <span className="mb-2 block text-sm font-medium">{UI.articleFont}</span>
            <div className="flex rounded-md border border-border bg-surface-muted p-0.5">
              {(["editorial", "sans"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => updatePreference("fontFamily", v)}
                  className={`flex-1 rounded py-1 text-xs font-medium transition-colors ${
                    preferences.fontFamily === v
                      ? "bg-surface text-text shadow-sm"
                      : "text-text-muted hover:text-text"
                  }`}
                >
                  {v === "editorial" ? UI.fontEditorial : UI.fontSans}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="mb-5">
            <div className="flex rounded-md border border-border bg-surface-muted p-0.5">
              {(["light", "system", "dark"] as const).map((v) => {
                const Icon = v === "light" ? Sun : v === "dark" ? Moon : Monitor;
                const label =
                  v === "light" ? UI.themeLight : v === "dark" ? UI.themeDark : UI.themeSystem;
                return (
                  <button
                    key={v}
                    onClick={() => updatePreference("theme", v)}
                    aria-label={label}
                    title={label}
                    className={`flex flex-1 items-center justify-center rounded py-1 transition-colors ${
                      preferences.theme === v
                        ? "bg-surface text-text shadow-sm"
                        : "text-text-muted hover:text-text"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Focus Mode */}
          <div className="mb-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-medium">{UI.focusMode}</span>
            <button
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

          {/* Reset */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-muted">{UI.resetPreferences}</span>
            <button
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
