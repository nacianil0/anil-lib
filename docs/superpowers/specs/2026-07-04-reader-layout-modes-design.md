# Reader Layout Modes and Reading-Area Width Design

Date: 2026-07-04  
Status: Approved for autonomous implementation

## 1. Objective

Use large screens more effectively without changing the default reading experience. The reader will expose two independent preferences:

- **Okuma düzeni:** `Akış` or `Sayfalı`
- **Okuma alanı:** `Dar`, `Standart`, `Geniş`, or `Tam ekran`

`Akış + Standart` remains the default. Existing users therefore keep the current vertical-reading behavior until they choose another layout.

The same change also restructures the existing settings popover into a wider, compact desktop panel and verifies every preference control. The curated expansion adds a broader text-size range, letter spacing, and a sepia theme without exposing low-value page geometry controls.

## 2. Current Problem

The existing preference model already stores `measure: "narrow" | "standard" | "wide"` and maps `wide` to `78ch`. That setting does not actually produce a wider reading area because the shared header/article wrapper is still capped by Tailwind's fixed `max-w-reading` value of `68ch`.

The implementation must remove that conflicting outer cap. Width selection must govern the real reader area, not only `.prose-reader` inside a narrower parent.

## 3. Considered Approaches

### A. Independent layout and width controls (selected)

The reading mode and reading-area width remain orthogonal. A reader can use any width in normal flow and can choose the available spread width in paged mode. This is explicit, composes with the existing typography preferences, and does not hide multiple changes behind one label.

### B. Named presets

Profiles such as `Odaklı`, `Rahat`, `Geniş`, and `Kitap` would change several preferences at once. The panel would be shorter, but a reader could not independently choose layout and width, and the interaction between a profile and existing typography controls would be unclear. Rejected.

### C. Advanced layout editor

Exposing column count, column gap, page height, and arbitrary width would maximize control but create a fragile and unnecessarily complex preference surface. Rejected.

## 4. Preference Model and Migration

Extend the existing version-1 preference object rather than creating another store:

```ts
type ReadingMode = "flow" | "paged";
type Measure = "narrow" | "standard" | "wide" | "full";

type ReaderPreferences = {
  // existing fields remain unchanged
  readingMode: ReadingMode;
  measure: Measure;
  letterSpacing: "tight" | "normal" | "relaxed";
};
```

Defaults:

| Preference | Default |
| --- | --- |
| `readingMode` | `flow` |
| `measure` | `standard` |
| `letterSpacing` | `normal` |

`readingMode` receives a Zod default of `flow`, and `letterSpacing` receives a default of `normal`. Existing valid version-1 records that do not contain the fields are normalized rather than discarded. Existing `narrow`, `standard`, and `wide` values remain valid; `full` is additive. The local-storage key and schema version remain unchanged.

The text-size enum keeps all existing values and adds `extra-small` and `huge`, producing a six-step range of `80%, 90%, 100%, 110%, 120%, 135%`. The theme enum adds `sepia`; existing `system`, `light`, and `dark` values remain unchanged. Sepia is a first-class document theme with its own paper, surface, border, text, accent, and muted color tokens, not a filter applied over another theme.

Resetting preferences restores `flow + standard`. Storage failures remain non-fatal, and cross-tab updates continue through the current preference provider.

## 5. Reading-Area Widths

The visible labels remain short enough for the existing segmented control:

| Stored value | Label | Flow maximum | Paged spread maximum |
| --- | --- | --- | --- |
| `narrow` | Dar | `58ch` | `64rem` |
| `standard` | Standart | `68ch` | `76rem` |
| `wide` | Geniş | `84ch` | `92rem` |
| `full` | Tam | all available main-pane width | all available main-pane width |

The two sets of dimensions are deliberate. A two-column spread needs a wider outer canvas than a single readable line. Treating `68ch` as the total width of two columns would create columns that are too narrow.

The selected maximum applies to the shared toolbar, article body, pagination controls, completion controls, and previous/next navigation. The desktop reading-list sidebar remains outside that width. Existing horizontal padding protects content at small viewport widths.

The old fixed `max-w-reading` wrapper must be replaced by one reader-area class driven by CSS custom properties. In flow mode, `.prose-reader` consumes the flow width. In paged mode, the viewport consumes the spread width and individual columns are computed inside it.

## 6. Layout Modes

### 6.1 Flow mode

Flow mode preserves the current document model:

- one vertical reading column;
- normal browser scrolling;
- existing sticky toolbar and progress bar;
- existing heading anchors, table of contents, saved places, highlights, completion controls, and article navigation.

Only the width constraint changes. `Dar`, `Standart`, `Geniş`, and `Tam` must all have observable, distinct effects when sufficient viewport space exists.

### 6.2 Paged mode

On viewports at least `1024px` wide, paged mode presents the article as a fixed-height, two-column spread. CSS multi-column layout flows content in source order from the left column to the right column and then into the next horizontal spread.

The page viewport uses:

- two columns per spread;
- a responsive but bounded column gap;
- a height based on the dynamic viewport after accounting for the sticky toolbar, article padding, and pager;
- `column-fill: auto` so content advances horizontally after filling the current spread;
- hidden horizontal overflow controlled programmatically, without a second visible scrollbar.

Headings avoid breaking immediately away from their following content. Headings, blockquotes, code blocks, tables, and images use targeted `break-inside`/`break-after` rules where practical. Oversized code blocks and tables keep their own horizontal overflow rather than widening a column.

Paged mode includes a compact control row below the spread:

- previous-spread button;
- `current / total` spread indicator;
- next-spread button.

Left and right arrow keys change spreads unless focus is inside an interactive control or the user has an active text selection. Buttons expose disabled states at the first and last spread. Page movement honors reduced-motion preferences.

The existing completion and previous/next-article footer remains below the paged viewport. It is not duplicated inside the columns.

### 6.3 Responsive fallback

Below `1024px`, a persisted `paged` preference has an effective layout of single-column flow. The saved preference is not overwritten, so returning to a larger viewport restores the paged layout. The settings panel communicates that `Sayfalı` is available on wide screens; it must not imply that two narrow mobile columns are active.

The viewport media query is the authoritative breakpoint. JavaScript observes the same query for behavior and accessibility state, so CSS and interaction logic cannot disagree about the effective mode.

## 7. Layout Controller and Data Flow

The current reader shell assumes every location is a vertical `window.scrollY` position. Paged mode cannot be added as CSS alone because progress, restored positions, table-of-contents navigation, saved places, and highlight deep links all depend on that assumption.

Introduce a focused reader-layout controller with a stable interface:

```ts
type ReadingPosition = {
  ratio: number;
  headingId: string | null;
};

type ReaderLayoutController = {
  effectiveMode: "flow" | "paged";
  measure(): ReadingPosition;
  navigateTo(position: ReadingPosition, behavior: ScrollBehavior): void;
  pageIndex: number;
  pageCount: number;
  previousPage(): void;
  nextPage(): void;
};
```

The controller owns layout-specific measurement and navigation:

- **Flow:** keeps the existing vertical ratio and heading logic.
- **Paged:** derives ratio from horizontal spread position and derives the active heading from source elements located in or before the current spread.

Progress storage does not gain a page number. It continues to persist `headingId + scrollRatio`, because page count changes with viewport size, selected width, font, text scale, line spacing, and browser zoom. On restoration or mode changes, heading ID is preferred; the ratio is the fallback.

When fonts, viewport dimensions, or typography preferences reflow paged content, the controller recomputes page count and returns to the same heading or nearest ratio after layout settles. It must clamp stale ratios and page indices.

## 8. Existing Feature Integration

All navigation into article content must use the layout controller rather than directly calling `window.scrollTo`:

- initial reading-position restoration;
- `Baştan başla` and saved-place jumps;
- table-of-contents links;
- mark navigation;
- highlight query-parameter deep links.

The table of contents keeps semantic anchor links. In paged mode, its click handler prevents the default vertical jump, updates the URL hash, and asks the controller to reveal the spread containing the heading.

The top progress bar represents the same normalized `0..1` article ratio in both modes. Position recording remains throttled. Flow listens to window scroll; paged mode records after page navigation and horizontal viewport changes.

Highlight registration and text selection continue to target the unchanged article DOM. Switching layout or changing width triggers highlight geometry refresh after reflow. The implementation must not duplicate article markup, because duplicate IDs and duplicate text anchors would make table-of-contents and highlight behavior ambiguous.

## 9. Settings Interface

The existing settings popover gains a new `Okuma düzeni` segmented control near the current width control:

- `Akış`
- `Sayfalı`

Rename the current `Sütun genişliği` label to `Okuma alanı` and add `Tam` as the fourth segment. Both controls apply immediately and persist without a save button.

The desktop popover changes from the current narrow `18rem` vertical stack to a compact panel approximately `38rem` wide. It uses a two-column field grid so related controls spread horizontally and the panel no longer consumes nearly the full viewport height. The panel has three quiet sections:

1. **Düzen:** reading mode, reading area, and focus mode.
2. **Tipografi:** text-size stepper, font, letter spacing, alignment, line spacing, paragraph spacing, first-line indent, and hyphenation.
3. **Görünüm:** four-way theme control and reset action.

Section labels are small and restrained; the panel does not use nested cards. Field labels and segmented controls use tighter vertical spacing than the current `mb-5` stack. On narrow screens the same fields return to one column in a bottom sheet with safe scrolling.

Curated new controls:

- **Metin boyutu:** six steps, `80 / 90 / 100 / 110 / 120 / 135%`.
- **Harf aralığı:** `Sıkı / Normal / Ferah`.
- **Tema:** `Açık / Sepya / Sistem / Koyu` with icon buttons and accessible labels.

The panel keeps its anchored desktop-popover and mobile bottom-sheet behavior. Selected options continue to use `aria-pressed`. The paged choice includes concise supporting text such as `Geniş ekranlarda iki sütun` so its responsive behavior is discoverable.

Changing layout or width closes no panels, does not reset article completion, and preserves the nearest current reading position through the controller.

## 10. Error Handling and Edge Cases

- Invalid stored mode or width values fall back through the existing schema behavior.
- A paged layout that measures zero pages exposes one page and disables both navigation buttons.
- A saved heading that no longer exists falls back to the stored ratio.
- A resize from paged to flow, or back, preserves the nearest heading/ratio instead of jumping to the article start.
- Page keyboard shortcuts do not fire while a button, link, form control, or content-editable element owns focus.
- Page keyboard shortcuts do not fire while text is selected.
- Rapid resize and font-loading events are coalesced through animation frames; stale calculations are discarded.
- `prefers-reduced-motion` changes page navigation to immediate movement.
- Print styles ignore paged UI controls and let the document print in normal source order.
- Server-rendered markup remains deterministic. The effective mode is applied after preference hydration without duplicating or suppressing article content.

## 11. Component Boundaries

The implementation should keep responsibilities separated:

- `src/lib/preferences/schema.ts`: enums, defaults, and flow/paged width mappings.
- `src/lib/preferences/use-reader-preferences.tsx`: preference persistence and CSS variables only.
- `src/components/reader/reading-settings.tsx`: compact two-column preference surface assembled from focused field and section primitives.
- a focused reader-layout hook/module: effective-mode media query, measurement, navigation, reflow restoration, and pure pagination helpers.
- a small pager component: controls, indicator, keyboard behavior, and accessible labels.
- `ReaderShell`: composition and event wiring, not pagination calculations.
- `ArticleToc` and `HighlightLayer`: consume injected content-navigation callbacks rather than own layout assumptions.

No new runtime dependency is required.

## 12. Verification

### Automated

1. Preference tests cover the `readingMode` default, `full` measure, six text sizes, letter spacing, sepia, old version-1 records, invalid values, reset, persistence, CSS variables, and cross-tab updates.
2. Pure layout-helper tests cover page count, page clamping, page/ratio conversion, heading-to-spread resolution, and zero-size inputs.
3. Settings component tests exercise every displayed preference: all mode/width/font/spacing/alignment/indent/hyphenation/theme/focus choices, text-size bounds, labels, pressed states, persistence, and reset.
4. Reader integration tests cover preserving position while switching mode or width and the responsive fallback.
5. End-to-end tests at desktop width verify:
   - all four flow widths produce the expected container maximums;
   - paged mode produces two columns and more than one spread for a long article;
   - pager buttons and arrow keys navigate and update progress;
   - reload restores the selected mode, width, and reading position;
   - table-of-contents, mark, and highlight navigation reveal the correct spread;
   - completion controls and previous/next article navigation remain reachable.
6. End-to-end tests below `1024px` verify the single-column fallback while the `paged` preference remains stored.

### Quality gates

- targeted Vitest suites;
- TypeScript typecheck;
- ESLint for changed source files;
- production build;
- Playwright reader tests;
- desktop and mobile visual inspection of flow, full-width flow, paged spread, first/last page, light/dark theme, and reduced motion.

## 13. Out of Scope

- Arbitrary numeric widths or draggable resizers
- User-configurable column count, gap, or page height
- Additional alignment modes that are unsuitable for long-form body text
- Arbitrary color pickers or theme-token editors
- Page-turn animations that imitate paper
- Synchronizing reader preferences through the server
- Persisting page numbers
- Changing article Markdown or catalog data
- Replacing the existing focus mode
