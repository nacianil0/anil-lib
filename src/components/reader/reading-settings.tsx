"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BookOpenText, Minus, Monitor, Moon, Plus, SlidersHorizontal, Sun, X } from "lucide-react";
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
    <div className="min-w-0">
      <span className="mb-1.5 block text-xs font-medium text-text-muted">{label}</span>
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
            className={`min-w-0 flex-1 rounded px-1.5 py-1.5 text-[11px] font-medium transition-all duration-200 ${
              value === option.value
                ? "bg-surface text-text shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                : "text-text-muted hover:bg-black/5 hover:text-text dark:hover:bg-white/5"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * A boolean preference laid out like the segmented controls: label above, a
 * 31px row below. The whole row is the switch, so the tap target is the row and
 * not the 32px knob; the short description doubles as the row's text.
 */
function PreferenceSwitch({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const labelId = useId();
  const descriptionId = useId();
  return (
    <div className="min-w-0">
      <span id={labelId} className="mb-1.5 block text-xs font-medium text-text-muted">
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        aria-describedby={descriptionId}
        onClick={() => onChange(!checked)}
        className="flex h-[31px] w-full items-center justify-between gap-3 rounded-md border border-border bg-surface-muted pl-2.5 pr-2 text-left transition-colors hover:bg-surface"
      >
        <span id={descriptionId} className="min-w-0 truncate text-[11px] text-text-faint">
          {description}
        </span>
        <span
          aria-hidden="true"
          className={`relative inline-flex h-4 w-8 shrink-0 items-center rounded-full transition-colors ${
            checked ? "bg-accent" : "bg-border-strong"
          }`}
        >
          <span
            className={`inline-block h-3 w-3 rounded-full bg-surface shadow-sm transition-transform ${
              checked ? "translate-x-[18px]" : "translate-x-[2px]"
            }`}
          />
        </span>
      </button>
    </div>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-text-faint">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ReadingSettings({
  /** False on narrow viewports, where the paged layout falls back to a single column. */
  isPagedAvailable = true,
}: {
  isPagedAvailable?: boolean;
} = {}) {
  const { preferences, updatePreference, resetPreferences } = useReaderPreferences();
  const [open, setOpen] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closePanel = useCallback(() => {
    setOpen(false);
    setResetConfirm(false);
    triggerRef.current?.focus();
  }, []);

  // Keyboard users land inside the panel rather than having to tab past the page.
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        closePanel();
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
        setResetConfirm(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, closePanel]);

  const currentSizeIndex = TEXT_SIZES.indexOf(preferences.fontScale);
  const sizePercentages = [80, 90, 100, 110, 120, 135];
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
          tabIndex={-1}
          className="border-border/60 bg-surface/95 fixed inset-x-0 bottom-0 z-[55] max-h-[85dvh] w-full overflow-y-auto overscroll-contain rounded-xl rounded-b-none border border-x-0 border-b-0 p-4 font-sans text-text shadow-2xl ring-1 ring-black/5 backdrop-blur-xl focus:outline-none dark:ring-white/10 sm:inset-x-auto sm:bottom-auto sm:right-4 sm:top-[66px] sm:max-h-[calc(100vh-5rem)] sm:w-[46rem] sm:max-w-[calc(100vw-2rem)] sm:rounded-b-xl sm:border-x sm:border-b"
        >
          <div className="border-border/50 mb-4 flex items-start justify-between gap-3 border-b pb-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold">{UI.readingSettings}</p>
              <p className="mt-0.5 text-[11px] text-text-faint">{UI.settingsSubtitle}</p>
            </div>
            <button
              type="button"
              onClick={closePanel}
              aria-label={UI.closeSettings}
              title={UI.dismiss}
              className="-mr-1 -mt-1 shrink-0 rounded-md p-1.5 text-text-muted transition-colors hover:bg-surface-muted hover:text-text"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-4">
            <SettingsSection title={UI.settingsLayout}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <PreferenceSegments
                    label={UI.readingMode}
                    value={preferences.readingMode}
                    options={[
                      { value: "flow", label: UI.readingModeFlow },
                      { value: "paged", label: UI.readingModePaged },
                    ]}
                    onChange={(value) => updatePreference("readingMode", value)}
                  />
                  <p className="mt-1 text-[10px] text-text-faint">
                    {preferences.readingMode === "paged" && !isPagedAvailable
                      ? UI.readingModeFlowActive
                      : UI.readingModeHint}
                  </p>
                </div>
                <PreferenceSegments
                  label={UI.columnWidth}
                  value={preferences.measure}
                  options={[
                    { value: "standard", label: UI.measureStandard },
                    { value: "wide", label: UI.measureWide },
                    { value: "extra-wide", label: UI.measureExtraWide },
                    { value: "full", label: UI.measureFull },
                  ]}
                  onChange={(value) => updatePreference("measure", value)}
                />
              </div>
            </SettingsSection>

            <div className="border-t border-border" />

            <SettingsSection title={UI.settingsTypography}>
              <div className="grid gap-x-4 gap-y-3.5 sm:grid-cols-3">
                <div>
                  <span className="mb-1.5 block text-xs font-medium text-text-muted">
                    {UI.textSize}
                  </span>
                  <div className="flex h-[31px] items-center justify-between rounded-md border border-border bg-surface-muted p-0.5">
                    <button
                      type="button"
                      disabled={currentSizeIndex <= 0}
                      onClick={decreaseSize}
                      className="rounded p-1 text-text-muted transition-colors hover:bg-black/5 disabled:opacity-40 dark:hover:bg-white/5"
                      aria-label={UI.decreaseTextSize}
                    >
                      <Minus className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <span className="font-mono text-[11px] font-semibold tabular-nums text-text">
                      {sizePercentage}%
                    </span>
                    <button
                      type="button"
                      disabled={currentSizeIndex >= TEXT_SIZES.length - 1}
                      onClick={increaseSize}
                      className="rounded p-1 text-text-muted transition-colors hover:bg-black/5 disabled:opacity-40 dark:hover:bg-white/5"
                      aria-label={UI.increaseTextSize}
                    >
                      <Plus className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>

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
                  label={UI.fontWeight}
                  value={preferences.fontWeight}
                  options={[
                    { value: "light", label: UI.fontWeightLight },
                    { value: "regular", label: UI.fontWeightRegular },
                    { value: "medium", label: UI.fontWeightMedium },
                  ]}
                  onChange={(value) => updatePreference("fontWeight", value)}
                />

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
                  label={UI.letterSpacing}
                  value={preferences.letterSpacing}
                  options={[
                    { value: "tight", label: UI.letterSpacingTight },
                    { value: "normal", label: UI.letterSpacingNormal },
                    { value: "relaxed", label: UI.letterSpacingRelaxed },
                  ]}
                  onChange={(value) => updatePreference("letterSpacing", value)}
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
              </div>
            </SettingsSection>

            <div className="border-t border-border" />

            <SettingsSection title={UI.settingsAppearance}>
              <div className="grid gap-x-4 gap-y-3.5 sm:grid-cols-3">
                <div className="min-w-0">
                  <span className="mb-1.5 block text-xs font-medium text-text-muted">
                    {UI.theme}
                  </span>
                  <div
                    role="group"
                    aria-label={UI.theme}
                    className="flex h-[31px] rounded-md border border-border bg-surface-muted p-0.5"
                  >
                    {(["light", "sepia", "dark", "system"] as const).map((value) => {
                      const Icon =
                        value === "light"
                          ? Sun
                          : value === "sepia"
                            ? BookOpenText
                            : value === "dark"
                              ? Moon
                              : Monitor;
                      const label =
                        value === "light"
                          ? UI.themeLight
                          : value === "sepia"
                            ? UI.themeSepia
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
                          className={`flex flex-1 items-center justify-center rounded py-1 transition-all duration-200 ${
                            preferences.theme === value
                              ? "bg-surface text-text shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                              : "text-text-muted hover:bg-black/5 hover:text-text dark:hover:bg-white/5"
                          }`}
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <PreferenceSwitch
                  label={UI.lineGuide}
                  description={UI.lineGuideHint}
                  checked={preferences.lineGuide}
                  onChange={(value) => updatePreference("lineGuide", value)}
                />

                <PreferenceSwitch
                  label={UI.focusMode}
                  description={UI.focusModeHint}
                  checked={preferences.focusMode}
                  onChange={(value) => updatePreference("focusMode", value)}
                />
              </div>
            </SettingsSection>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-2.5">
            <span
              className={`min-w-0 text-[11px] ${resetConfirm ? "text-accent" : "text-text-faint"}`}
            >
              {resetConfirm ? UI.resetPreferencesArmed : UI.resetPreferencesHint}
            </span>
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
