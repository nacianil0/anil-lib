import { z } from "zod";

export const TEXT_SIZES = [
  "extra-small",
  "small",
  "standard",
  "large",
  "extra-large",
  "huge",
] as const;
export const LINE_SPACINGS = ["compact", "balanced", "relaxed"] as const;
export const MEASURES = ["standard", "wide", "extra-wide", "full"] as const;
export const FONT_FAMILIES = ["editorial", "sans"] as const;
export const THEMES = ["system", "light", "sepia", "dark"] as const;
export const TEXT_ALIGNMENTS = ["left", "justify"] as const;
export const PARAGRAPH_SPACINGS = ["compact", "balanced", "relaxed"] as const;
export const FIRST_LINE_INDENTS = ["none", "subtle", "classic"] as const;
export const HYPHENATIONS = ["off", "auto"] as const;
export const READING_MODES = ["flow", "paged"] as const;
export const LETTER_SPACINGS = ["tight", "normal", "relaxed"] as const;
export const FONT_WEIGHTS = ["light", "regular", "medium"] as const;

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
  readingMode: z.enum(READING_MODES).default("flow"),
  letterSpacing: z.enum(LETTER_SPACINGS).default("normal"),
  fontWeight: z.enum(FONT_WEIGHTS).default("regular"),
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
  readingMode: "flow",
  letterSpacing: "normal",
  fontWeight: "regular",
};

// CSS variables mapping
export const CSS_MAPPINGS = {
  fontScale: {
    "extra-small": "0.9375rem",
    small: "1.0625rem",
    standard: "1.1875rem",
    large: "1.3125rem",
    "extra-large": "1.4375rem",
    huge: "1.625rem",
  },
  lineSpacing: {
    compact: "1.58",
    balanced: "1.72",
    relaxed: "1.9",
  },
  measure: {
    standard: "84ch",
    wide: "100ch",
    "extra-wide": "120ch",
    full: "100%",
  },
  pagedMeasure: {
    standard: "92rem",
    wide: "108rem",
    "extra-wide": "124rem",
    full: "100%",
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
  letterSpacing: {
    tight: "-0.012em",
    normal: "0",
    relaxed: "0.025em",
  },
  fontWeight: {
    light: "300",
    regular: "420",
    medium: "500",
  },
} as const;
