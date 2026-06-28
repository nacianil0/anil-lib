import { PREFERENCES_STORAGE_KEY, THEME_STORAGE_KEY } from "@/lib/reader/version";
import { DEFAULT_PREFERENCES, preferencesSchema, type ReaderPreferences } from "./schema";

export function isPreferencesStorageAvailable(): boolean {
  try {
    const test = "__test__";
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function parsePreferences(raw: string | null): ReaderPreferences {
  if (!raw) return { ...DEFAULT_PREFERENCES };
  try {
    const parsed = JSON.parse(raw);
    const result = preferencesSchema.safeParse(parsed);
    if (result.success) {
      return result.data;
    }
    return { ...DEFAULT_PREFERENCES };
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

export function readPreferences(): ReaderPreferences {
  if (!isPreferencesStorageAvailable()) {
    return { ...DEFAULT_PREFERENCES };
  }

  const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
  if (raw) {
    return parsePreferences(raw);
  }

  // Legacy theme migration
  const legacyTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  const prefs: ReaderPreferences = { ...DEFAULT_PREFERENCES };

  if (legacyTheme === "light" || legacyTheme === "dark" || legacyTheme === "system") {
    prefs.theme = legacyTheme;
  }

  writePreferences(prefs);

  // Remove legacy key after successful write
  try {
    window.localStorage.removeItem(THEME_STORAGE_KEY);
  } catch {
    // Ignore if removal fails
  }

  return prefs;
}

export function writePreferences(prefs: ReaderPreferences): void {
  if (!isPreferencesStorageAvailable()) return;
  try {
    window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Persistence is best-effort
  }
}
