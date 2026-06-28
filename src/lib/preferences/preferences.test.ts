import { describe, expect, it, beforeEach } from "vitest";
import { applyCssVariables } from "./use-reader-preferences";
import { CSS_MAPPINGS, DEFAULT_PREFERENCES, preferencesSchema } from "./schema";
import {
  parsePreferences,
  readPreferences,
  writePreferences,
  isPreferencesStorageAvailable,
} from "./storage";
import { PREFERENCES_STORAGE_KEY, THEME_STORAGE_KEY } from "@/lib/reader/version";

describe("preferencesSchema", () => {
  it("resolves to defaults for an empty object", () => {
    const result = preferencesSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("validates a complete valid preference object", () => {
    const prefs = {
      version: 1,
      theme: "dark",
      fontScale: "large",
      lineSpacing: "relaxed",
      measure: "wide",
      fontFamily: "sans",
      focusMode: true,
      textAlign: "justify",
      paragraphSpacing: "relaxed",
      firstLineIndent: "classic",
      hyphenation: "auto",
    };
    expect(preferencesSchema.parse(prefs)).toEqual(prefs);
  });
});

describe("parsePreferences", () => {
  it("returns defaults for null", () => {
    expect(parsePreferences(null)).toEqual(DEFAULT_PREFERENCES);
  });

  it("returns defaults for corrupt JSON", () => {
    expect(parsePreferences("{bad json")).toEqual(DEFAULT_PREFERENCES);
  });

  it("returns defaults for invalid schema (e.g., unsupported version)", () => {
    const bad = JSON.stringify({ ...DEFAULT_PREFERENCES, version: 2 });
    expect(parsePreferences(bad)).toEqual(DEFAULT_PREFERENCES);
  });

  it("parses valid payload", () => {
    const payload = JSON.stringify({ ...DEFAULT_PREFERENCES, theme: "light" });
    expect(parsePreferences(payload).theme).toBe("light");
  });

  it("fills new typography fields when reading a legacy version-1 payload", () => {
    const legacyPayload = {
      version: 1,
      theme: "dark",
      fontScale: "large",
      lineSpacing: "relaxed",
      measure: "wide",
      fontFamily: "sans",
      focusMode: true,
    };

    expect(parsePreferences(JSON.stringify(legacyPayload))).toEqual({
      ...legacyPayload,
      textAlign: "left",
      paragraphSpacing: "balanced",
      firstLineIndent: "none",
      hyphenation: "off",
    });
  });

  it("falls back to all defaults when a typography value is invalid", () => {
    const payload = JSON.stringify({ ...DEFAULT_PREFERENCES, textAlign: "center" });
    expect(parsePreferences(payload)).toEqual(DEFAULT_PREFERENCES);
  });
});

describe("applyCssVariables", () => {
  it("maps typography preferences to reader CSS variables", () => {
    const preferences = {
      ...DEFAULT_PREFERENCES,
      textAlign: "justify" as const,
      paragraphSpacing: "relaxed" as const,
      firstLineIndent: "classic" as const,
      hyphenation: "auto" as const,
    };

    applyCssVariables(preferences);

    const style = document.documentElement.style;
    expect(style.getPropertyValue("--reader-text-align")).toBe(CSS_MAPPINGS.textAlign.justify);
    expect(style.getPropertyValue("--reader-paragraph-spacing")).toBe(
      CSS_MAPPINGS.paragraphSpacing.relaxed,
    );
    expect(style.getPropertyValue("--reader-first-line-indent")).toBe(
      CSS_MAPPINGS.firstLineIndent.classic,
    );
    expect(style.getPropertyValue("--reader-hyphens")).toBe(CSS_MAPPINGS.hyphenation.auto);
  });
});

describe("storage and migration", () => {
  const store: Record<string, string> = {};
  const mockLocalStorage = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((k) => delete store[k]);
    },
  };

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });
    window.localStorage.clear();
  });

  it("returns defaults when storage is empty", () => {
    expect(readPreferences()).toEqual(DEFAULT_PREFERENCES);
  });

  it("writes and reads preferences", () => {
    const prefs = { ...DEFAULT_PREFERENCES, theme: "dark" as const };
    writePreferences(prefs);
    expect(readPreferences().theme).toBe("dark");
  });

  it("migrates legacy theme", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "dark");
    const prefs = readPreferences();
    expect(prefs.theme).toBe("dark");
    // Verify legacy key is removed
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
    // Verify new key is written
    const stored = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
    expect(stored).not.toBeNull();
  });

  it("falls back safely if legacy theme is invalid", () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, "purple");
    const prefs = readPreferences();
    expect(prefs.theme).toBe("system");
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it("isPreferencesStorageAvailable returns true if localStorage works", () => {
    expect(isPreferencesStorageAvailable()).toBe(true);
  });

  it("handles throwing localStorage gracefully", () => {
    const setItem = window.localStorage.setItem;
    window.localStorage.setItem = () => {
      throw new Error("Quota Exceeded");
    };

    expect(isPreferencesStorageAvailable()).toBe(false);
    expect(readPreferences()).toEqual(DEFAULT_PREFERENCES);
    expect(() => writePreferences({ ...DEFAULT_PREFERENCES })).not.toThrow();

    window.localStorage.setItem = setItem;
  });
});
