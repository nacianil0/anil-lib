# Reader Typography Preferences Design

## Objective

Expand the existing **Tercihler** panel with practical reading-layout controls while preserving the current visual defaults and all previously saved preferences.

## Selected Scope

The focused typography pack adds four preferences:

| Preference | Values | Default |
| --- | --- | --- |
| Text alignment | `left`, `justify` | `left` |
| Paragraph spacing | `compact`, `balanced`, `relaxed` | `balanced` |
| First-line indent | `none`, `subtle`, `classic` | `none` |
| Hyphenation | `off`, `auto` | `off` |

This scope was selected over a single justify toggle because the controls solve related long-form reading needs without turning the panel into an unrestricted theme editor.

## Interface

The controls live in the existing reading-settings popover and use compact segmented buttons consistent with the current settings UI. The popover becomes vertically scrollable on short viewports.

- **Metin hizası:** Sola / İki yana
- **Paragraf aralığı:** Sıkı / Dengeli / Ferah
- **İlk satır girintisi:** Yok / Hafif / Klasik
- **Heceleme:** Kapalı / Otomatik

Each option exposes its selected state with `aria-pressed`. Changes apply immediately through the existing preference provider and reset with the existing reset action.

## Data and Persistence

The new fields extend `ReaderPreferences` and remain under the existing local-storage key and schema version. New schema fields provide defaults during parsing, so a valid older version-1 record is normalized instead of discarded. Invalid or corrupt records retain the current full-default fallback behavior.

CSS mappings translate semantic values into root custom properties:

- `--reader-text-align`
- `--reader-paragraph-spacing`
- `--reader-first-line-indent`
- `--reader-hyphens`

## Styling Boundaries

Alignment and hyphenation apply only to prose paragraphs, list items, and blockquotes. Headings, code blocks, and tables stay left-aligned and are not hyphenated. First-line indentation applies to prose paragraphs but is suppressed inside lists and blockquotes to avoid stacked indentation. Paragraph spacing only changes paragraph bottom margins.

The defaults reproduce the current reader appearance: left alignment, the existing `1.25rem` paragraph gap, no indentation, and no automatic hyphenation.

## Error Handling

- Missing new fields in an older valid record are filled with defaults.
- Unknown enum values or malformed records fall back to all defaults.
- Storage-unavailable behavior remains non-fatal through the existing guarded storage helpers.
- Cross-tab updates continue through the existing `storage` event listener.

## Verification

1. Unit tests cover schema defaults, legacy version-1 normalization, persistence, and CSS variable application.
2. Component tests exercise the new controls and verify immediate persisted updates.
3. End-to-end tests verify the computed article styles and persistence after reload.
4. Desktop and mobile visual checks confirm that the expanded popover remains usable and the prose layout stays coherent.

## Files

- `src/lib/preferences/schema.ts`
- `src/lib/preferences/use-reader-preferences.tsx`
- `src/lib/preferences/preferences.test.ts`
- `src/lib/content/labels.ts`
- `src/components/reader/reading-settings.tsx`
- `src/components/reader/reading-settings.test.tsx`
- `src/app/globals.css`
- `tests/e2e/reader.spec.ts`
- OpenWolf anatomy and memory records
