"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PREFERENCES_STORAGE_KEY } from "@/lib/reader/version";
import { CSS_MAPPINGS, DEFAULT_PREFERENCES, type ReaderPreferences } from "./schema";
import {
  isPreferencesStorageAvailable,
  parsePreferences,
  readPreferences,
  writePreferences,
} from "./storage";

type PreferencesContextValue = {
  ready: boolean;
  storageAvailable: boolean;
  preferences: ReaderPreferences;
  updatePreference: <K extends keyof ReaderPreferences>(
    key: K,
    value: ReaderPreferences[K],
  ) => void;
  resetPreferences: () => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function applyTheme(theme: ReaderPreferences["theme"]) {
  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

function applyCssVariables(prefs: ReaderPreferences) {
  const root = document.documentElement;
  root.style.setProperty("--reader-font-size", CSS_MAPPINGS.fontScale[prefs.fontScale]);
  root.style.setProperty("--reader-line-height", CSS_MAPPINGS.lineSpacing[prefs.lineSpacing]);
  root.style.setProperty("--reader-measure", CSS_MAPPINGS.measure[prefs.measure]);
  root.style.setProperty("--reader-font-family", CSS_MAPPINGS.fontFamily[prefs.fontFamily]);
}

export function ReaderPreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<ReaderPreferences>(DEFAULT_PREFERENCES);
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);

  // Hydrate preferences on mount
  useEffect(() => {
    const prefs = readPreferences();
    setPreferences(prefs);
    setStorageAvailable(isPreferencesStorageAvailable());
    setReady(true);
    applyTheme(prefs.theme);
    applyCssVariables(prefs);
  }, []);

  // Sync across tabs
  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== PREFERENCES_STORAGE_KEY) return;
      const next = parsePreferences(event.newValue);
      setPreferences(next);
      applyTheme(next.theme);
      applyCssVariables(next);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // System theme listener
  useEffect(() => {
    if (preferences.theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [preferences.theme]);

  const updatePreference = useCallback(
    <K extends keyof ReaderPreferences>(key: K, value: ReaderPreferences[K]) => {
      setPreferences((prev) => {
        const next = { ...prev, [key]: value };
        writePreferences(next);
        applyTheme(next.theme);
        applyCssVariables(next);
        return next;
      });
    },
    [],
  );

  const resetPreferences = useCallback(() => {
    const next = { ...DEFAULT_PREFERENCES };
    writePreferences(next);
    setPreferences(next);
    applyTheme(next.theme);
    applyCssVariables(next);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      storageAvailable,
      preferences,
      updatePreference,
      resetPreferences,
    }),
    [ready, storageAvailable, preferences, updatePreference, resetPreferences],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function useReaderPreferences(): PreferencesContextValue {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("useReaderPreferences, ReaderPreferencesProvider içinde kullanılmalı");
  }
  return context;
}
