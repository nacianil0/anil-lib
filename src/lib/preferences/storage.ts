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

/**
 * Brings a payload written by an earlier reader up to the current preference set.
 *
 * - `coloredLines` held the line-aid opt-in before it became the line guide. The
 *   behaviour changed (sentence hues became line bands) but the reader's choice to
 *   have a line aid carries over.
 * - `textAlign` is retired: every article is justified now. Its presence marks a
 *   payload from before that policy, when hyphenation defaulted to off because
 *   ragged-right text does not need it. Justified text on a phone does, so such a
 *   payload adopts the new default unless the reader had switched hyphenation on
 *   already. The key itself is dropped by the schema.
 */
function migrateLegacyFields(parsed: unknown): unknown {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return parsed;
  const record = { ...(parsed as Record<string, unknown>) };
  if (!("lineGuide" in record) && typeof record.coloredLines === "boolean") {
    record.lineGuide = record.coloredLines;
  }
  if ("textAlign" in record && record.hyphenation === "off") {
    record.hyphenation = "auto";
  }
  return record;
}

export function parsePreferences(raw: string | null): ReaderPreferences {
  if (!raw) return { ...DEFAULT_PREFERENCES };
  try {
    const parsed = migrateLegacyFields(JSON.parse(raw));
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
