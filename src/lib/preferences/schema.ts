import { z } from "zod";

export const TEXT_SIZES = ["small", "standard", "large", "extra-large"] as const;
export const LINE_SPACINGS = ["compact", "balanced", "relaxed"] as const;
export const MEASURES = ["narrow", "standard", "wide"] as const;
export const FONT_FAMILIES = ["editorial", "sans"] as const;
export const THEMES = ["system", "light", "dark"] as const;

export const preferencesSchema = z.object({
  version: z.literal(1),
  theme: z.enum(THEMES),
  fontScale: z.enum(TEXT_SIZES),
  lineSpacing: z.enum(LINE_SPACINGS),
  measure: z.enum(MEASURES),
  fontFamily: z.enum(FONT_FAMILIES),
  focusMode: z.boolean(),
});

export type ReaderPreferences = z.infer<typeof preferencesSchema>;

export const DEFAULT_PREFERENCES: ReaderPreferences = {
  version: 1,
  theme: "system",
  fontScale: "standard",
  lineSpacing: "balanced",
  measure: "standard",
  fontFamily: "editorial",
  focusMode: false,
};

// CSS variables mapping
export const CSS_MAPPINGS = {
  fontScale: {
    small: "1.0625rem",
    standard: "1.1875rem",
    large: "1.3125rem",
    "extra-large": "1.4375rem",
  },
  lineSpacing: {
    compact: "1.58",
    balanced: "1.72",
    relaxed: "1.9",
  },
  measure: {
    narrow: "58ch",
    standard: "68ch",
    wide: "78ch",
  },
  fontFamily: {
    editorial: "var(--font-newsreader)",
    sans: "var(--font-inter)",
  },
} as const;
