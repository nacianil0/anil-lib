import { z } from "zod";

export const TEXT_SIZES = ["small", "standard", "large", "extra-large"] as const;
export const LINE_SPACINGS = ["compact", "balanced", "relaxed"] as const;
export const MEASURES = ["narrow", "standard", "wide"] as const;
export const FONT_FAMILIES = ["editorial", "sans"] as const;
export const THEMES = ["system", "light", "dark"] as const;
export const TEXT_ALIGNMENTS = ["left", "justify"] as const;
export const PARAGRAPH_SPACINGS = ["compact", "balanced", "relaxed"] as const;
export const FIRST_LINE_INDENTS = ["none", "subtle", "classic"] as const;
export const HYPHENATIONS = ["off", "auto"] as const;

export const preferencesSchema = z.object({
  version: z.literal(1),
  theme: z.enum(THEMES),
  fontScale: z.enum(TEXT_SIZES),
  lineSpacing: z.enum(LINE_SPACINGS),
  measure: z.enum(MEASURES),
  fontFamily: z.enum(FONT_FAMILIES),
  focusMode: z.boolean(),
  textAlign: z.enum(TEXT_ALIGNMENTS).default("left"),
  paragraphSpacing: z.enum(PARAGRAPH_SPACINGS).default("balanced"),
  firstLineIndent: z.enum(FIRST_LINE_INDENTS).default("none"),
  hyphenation: z.enum(HYPHENATIONS).default("off"),
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
  textAlign: "left",
  paragraphSpacing: "balanced",
  firstLineIndent: "none",
  hyphenation: "off",
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
  textAlign: {
    left: "left",
    justify: "justify",
  },
  paragraphSpacing: {
    compact: "0.85rem",
    balanced: "1.25rem",
    relaxed: "1.75rem",
  },
  firstLineIndent: {
    none: "0",
    subtle: "1em",
    classic: "1.75em",
  },
  hyphenation: {
    off: "none",
    auto: "auto",
  },
} as const;
