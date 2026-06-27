# Reader UX and Persistent Preferences Design

Date: 2026-06-27
Status: Approved for written specification; awaiting user review

## 1. Objective

Improve the existing reader's legibility and day-to-day usability without changing its content model, classification workflow, authentication, or visual identity.

The implementation will add:

- adjustable article text size;
- adjustable line spacing;
- adjustable reading-column width;
- editorial serif or plain sans-serif article text;
- system, light, or dark theme selection;
- a persistent focus mode;
- an article table of contents derived from rendered headings;
- a clear notice when a saved reading position is restored;
- one reset command for reader preferences.

Every reader preference is saved in versioned `localStorage`. Reading progress remains in its existing, separate store.

## 2. Current System Boundaries

The implementation must preserve these established decisions:

- Next.js 15 App Router, React 19, strict TypeScript, Tailwind CSS 3.4, and Zod;
- Newsreader for editorial text, Inter for controls, and JetBrains Mono for indices and status;
- paper and graphite surfaces, burgundy primary accent, and steel-blue secondary accent;
- the reading spine as the product's signature navigation element;
- `anil-lib:reader-progress:v1` as the reading-progress store;
- `anil-lib:theme` as the legacy theme key to migrate;
- heading IDs already generated in rendered Markdown;
- existing progress restoration, completion, sidebar, mobile drawer, and previous/next navigation.

This work must not modify article content, `content/catalog.json`, classification batches, ingestion prompts, password-gate behavior, or Vercel configuration.

## 3. Considered Approaches

### A. One storage key and component state per setting

This is quick to start, but spreads validation, hydration, and persistence across unrelated controls. Cross-tab synchronization and future schema changes become inconsistent. Rejected.

### B. Encode preferences in URL query parameters

This makes a configured view shareable, but preferences leak into navigation and article links, complicate canonical routes, and do not naturally satisfy device-local persistence. Rejected.

### C. One versioned preference store with CSS variables (selected)

A small provider owns parsing, migration, persistence, cross-tab synchronization, and document-level effects. Reader components consume a typed context. Typography is applied through CSS variables so changes preview immediately without rebuilding article markup.

This follows the existing progress architecture while keeping preference and progress lifecycles independent.

## 4. Preference Model

Use the storage key `anil-lib:reader-preferences:v1` with this logical shape:

```ts
type ReaderPreferences = {
  version: 1;
  theme: "system" | "light" | "dark";
  fontScale: "small" | "standard" | "large" | "extra-large";
  lineSpacing: "compact" | "balanced" | "relaxed";
  measure: "narrow" | "standard" | "wide";
  fontFamily: "editorial" | "sans";
  focusMode: boolean;
};
```

Defaults:

| Preference | Default | Applied value |
| --- | --- | --- |
| Theme | `system` | operating-system preference |
| Text size | `standard` | `1.1875rem` |
| Line spacing | `balanced` | `1.72` |
| Column width | `standard` | `68ch` |
| Text family | `editorial` | Newsreader stack |
| Focus mode | `false` | full reader chrome |

The other text sizes are `1.0625rem`, `1.3125rem`, and `1.4375rem`. Line spacing values are `1.58`, `1.72`, and `1.9`. Column widths are `58ch`, `68ch`, and `78ch`.

A Zod schema validates persisted data. Missing, malformed, unsupported, or inaccessible storage always resolves to the complete default object. Persistence is best-effort and must never prevent reading.

### Theme migration

On the first client hydration with no valid new preference object:

1. Read `anil-lib:theme`.
2. Preserve it only when its value is `system`, `light`, or `dark`.
3. Create the complete v1 preference object with that theme and all other defaults.
4. Persist the new object.
5. Remove the legacy key only after the new write succeeds.

When a valid v1 object already exists, it is authoritative. The pre-paint script in `src/app/layout.tsx` must understand the new object and temporarily fall back to the old key during migration so dark mode does not flash.

### Separation from progress

`anil-lib:reader-progress:v1` remains unchanged. Resetting preferences must not delete the current article, scroll position, completion status, or last-read timestamp. Resetting an article's restored position must not alter that article's completion status.

## 5. Architecture

### Preference domain

Create a focused preference module parallel to `src/lib/progress`:

- `src/lib/preferences/schema.ts`: types, defaults, enum mappings, and Zod validation;
- `src/lib/preferences/storage.ts`: safe read, migration, write, and parse helpers;
- `src/lib/preferences/use-reader-preferences.tsx`: provider, typed hook, document effects, system-theme listener, and `storage` event synchronization.

The provider exposes the hydrated preference object, storage availability, one typed update function, and a reset function. Components do not access `localStorage` directly.

`ReaderPreferencesProvider` wraps `ReaderProgressProvider` at the reader-shell boundary. It does not own article progress or transient panel state.

### CSS application

The provider sets stable data attributes or custom properties on the reader root:

- `--reader-font-size`;
- `--reader-line-height`;
- `--reader-measure`;
- `--reader-font-family`.

`.prose-reader` and its containing column consume these variables. Article headings scale proportionally with the selected article base size while keeping their current hierarchy. The toolbar, navigation, controls, and sidebar labels retain the existing Inter-based UI scale and do not scale.

Theme remains a `dark` class on the document root. System mode listens for operating-system changes. All effects are client-only and hydration-safe.

## 6. Reading Settings UI

Replace the standalone theme cycle control with one settings trigger using the Lucide `SlidersHorizontal` icon. The control stays reachable in the sticky toolbar in normal and focus modes and has an accessible Turkish label and tooltip.

Opening the trigger reveals one quiet utility panel:

- an anchored popover aligned to the toolbar trigger on desktop;
- a bottom sheet on narrow screens;
- no new component dependency unless the repository already contains one at implementation time;
- no nested cards, gradients, decorative blobs, or oversized headings;
- maximum border radius of 8px and existing surface/border tokens.

Controls:

- text-size stepper with minus and plus icons, an `A` size cue, and current percentage;
- `Sıkı / Dengeli / Ferah` segmented control for line spacing;
- `Dar / Standart / Geniş` segmented control for column width;
- `Editoryal / Sade` segmented control for article font;
- icon-assisted `Açık / Sistem / Koyu` theme selection;
- focus-mode switch;
- `Tercihleri sıfırla` command followed by a second inline `Sıfırla` confirmation action.

Each change previews immediately and persists without a separate save action. Text size cannot move beyond its four supported steps. Reset restores all defaults and updates the view immediately.

The panel traps focus while modal, closes on Escape, returns focus to its trigger, and has stable labels and selected states for keyboard and screen-reader use.

## 7. Focus Mode

Focus mode reduces navigation density while keeping every exit and recovery path visible.

- Hide the desktop reading-list sidebar.
- Suppress nonessential toolbar metadata such as level and reading time.
- Keep article progress, settings, table-of-contents access, and an explicit focus-mode exit control.
- Keep the article footer, completion control, and previous/next navigation.
- On mobile, do not leave an open reading-list drawer visible when focus mode is enabled.

Focus mode is a persisted preference. It must never hide the only control capable of disabling it.

## 8. Article Table of Contents

The table of contents is derived on the client from `h2[id]` and `h3[id]` elements inside `bodyRef`. Existing heading IDs are the source of truth; do not add a second Markdown parser or alter the catalog schema.

Behavior:

- show the control only when at least one eligible heading exists;
- present `h3` items as a subordinate level without deep nesting;
- clicking an item scrolls to its heading with the existing sticky-toolbar offset;
- update the active item from the same heading measurement used by reading-progress tracking;
- close the mobile panel after selection;
- preserve native anchor semantics and keyboard operation.

Heading extraction and active-heading calculation are small testable functions rather than logic embedded in a large component effect.

## 9. Restored-Position Notice

After the reader restores a saved heading or a scroll ratio greater than zero, show a compact notice:

`Kaldığın yere dönüldü`

The notice includes:

- `Baştan başla`, which scrolls to the article start and clears only that article's `headingId` and `scrollRatio`;
- a dismiss icon with an accessible label;
- automatic dismissal after a short, nonblocking interval.

Do not show the notice when no meaningful position was restored. The notice must not obscure article text or toolbar controls. Motion is subtle and disabled when `prefers-reduced-motion` requests it. Starting over preserves `completed` and `lastReadAt` unless the normal progress tracker subsequently records a new timestamp.

The progress context gains one explicit position-reset operation instead of letting the notice rewrite the progress object directly.

## 10. Data and Event Flow

1. Server output renders deterministic default reader markup.
2. The pre-paint theme script applies the persisted theme without exposing any other setting to server rendering.
3. On mount, the preference provider safely reads and validates v1 storage or performs the legacy theme migration.
4. The provider applies CSS values and document theme state.
5. A settings interaction updates provider state immediately, applies the visual change, and writes the complete object.
6. A matching `storage` event updates another open tab.
7. Progress hydration and position restoration continue through the independent progress provider.
8. Successful restoration emits local UI state for the notice; dismissing the notice is transient and is not persisted.

If storage is blocked or full, controls remain usable for the current session. A storage failure must not produce a fatal error, hydration mismatch, repeated migration loop, or user-facing exception.

## 11. Visual Direction

This is an extension of the existing reading tool, not a redesign.

- Retain paper `#faf9f7`, graphite `#1b1d1f`, burgundy `#8a2e43`, steel blue `#2f5d74`, and their existing dark-mode tokens.
- Retain Newsreader, Inter, and JetBrains Mono.
- Keep the reading spine as the primary visual signature.
- Treat settings and table of contents as compact tools, not feature cards.
- Use familiar Lucide icons for settings, increment/decrement, theme, close, and focus controls.
- Keep visible text inside compact controls short enough for Turkish labels on mobile.
- Do not introduce gradients, glass effects, floating decorative elements, large marketing copy, or a new one-note palette.

## 12. Verification Strategy

The implementation session is intentionally source-focused to protect Claude Code context. It must not use a browser, dev server, screenshots, visual-QA tools, production build, or end-to-end suite.

Allowed verification:

- targeted Vitest files for changed preference and progress behavior;
- `pnpm typecheck`;
- ESLint restricted to changed source files;
- direct source inspection of changed files and their immediate dependencies.

Required automated coverage:

- defaults and all enum mappings;
- valid, malformed, partial, and unsupported persisted preference data;
- migration from each valid legacy theme and fallback from an invalid value;
- blocked and throwing `localStorage`;
- cross-tab preference updates;
- text-size bounds and reset behavior;
- CSS-variable and document-theme application;
- heading extraction and active-heading selection;
- position reset preserving completion;
- restored-notice eligibility;
- focus mode retaining settings and exit access;
- panel keyboard behavior where it can be covered without browser automation.

Visual and end-to-end checks are deferred to a separate verification session after implementation. The handoff must state that this deferral is deliberate, not evidence that those checks passed.

## 13. Context Budget for the Implementation Session

The receiving Claude Code session must follow these limits:

- do not inspect the application in a browser;
- do not start a development server;
- do not run `pnpm build`, Playwright, screenshots, `designqc`, or equivalent visual tooling;
- do not run `pnpm install` unless a missing dependency makes implementation impossible;
- do not read all articles, the full catalog, ingestion reports, or unrelated auth/classification files;
- begin with this spec and only the named files in the implementation area;
- use targeted `rg` queries and narrow file reads;
- make no changes outside reader UX, preferences, and directly required tests;
- stop expanding scope when the acceptance criteria are met.

## 14. Expected Files

Likely additions:

- `src/lib/preferences/schema.ts`;
- `src/lib/preferences/storage.ts`;
- `src/lib/preferences/use-reader-preferences.tsx`;
- `src/components/reader/reading-settings.tsx`;
- `src/components/reader/article-toc.tsx`;
- `src/components/reader/resume-notice.tsx`;
- focused test files for those modules.

Likely modifications:

- `src/components/reader/reader-shell.tsx`;
- `src/components/reader/reader-sidebar.tsx` and mobile reading-list behavior for focus mode;
- `src/lib/progress/use-reader-progress.tsx` for explicit position reset;
- `src/lib/content/labels.ts` for Turkish UI labels;
- `src/lib/reader/version.ts` for the preference key;
- `src/app/globals.css` for reader variables and focused presentation;
- `src/app/layout.tsx` for pre-paint theme migration support;
- existing focused unit tests.

Remove `src/components/reader/theme-toggle.tsx` once its behavior is fully owned by the settings panel and preference provider.

## 15. Acceptance Criteria

- A reader can change text size, spacing, column width, article font, theme, and focus mode from one accessible panel.
- Every preference survives reload and synchronizes to another open tab when storage is available.
- The legacy theme choice migrates without a light/dark flash or preference loss.
- Invalid or unavailable storage falls back safely and does not block reading.
- Resetting preferences does not reset reading progress.
- Focus mode always exposes a way to exit and access settings.
- The table of contents reflects rendered `h2` and `h3` headings and highlights the current section.
- Restoring a saved location produces a clear notice, and `Baştan başla` clears position without clearing completion.
- Existing visual tokens, fonts, reading spine, completion, navigation, and responsive reader behavior remain intact.
- No article, catalog, classification, authentication, or deployment behavior changes.
- Targeted tests, typecheck, and changed-file lint pass; browser, build, and end-to-end verification remain explicitly deferred.
