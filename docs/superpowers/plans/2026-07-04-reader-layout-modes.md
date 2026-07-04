# Reader Layout Modes and Compact Settings Implementation Plan

> Source design: `docs/superpowers/specs/2026-07-04-reader-layout-modes-design.md`

## Goal

Deliver a compact premium settings panel, verify every preference control, add curated typography/theme options, make width controls affect the real reading canvas, and provide a responsive two-column paged reading mode without regressing progress, marks, highlights, or navigation.

## Phase 1 — Preference domain

1. Extend the schema with `readingMode`, `full` width, six text sizes, letter spacing, and sepia.
2. Preserve version-1 records through field defaults and keep the existing storage key.
3. Apply new width, spacing, and theme tokens through the preference provider and pre-paint script.
4. Expand schema, storage, reset, CSS-variable, and migration tests.

## Phase 2 — Compact settings surface

1. Restructure the desktop popover as a `38rem` two-column section grid with tighter field spacing.
2. Preserve the single-column mobile bottom sheet.
3. Add reading mode, full-width, expanded text scale, letter-spacing, and sepia controls.
4. Exercise every preference and reset behavior in component tests.

## Phase 3 — Layout engine and paged reader

1. Add pure pagination helpers for spread metrics, page clamping, and ratio conversion.
2. Add a layout hook that chooses flow/paged mode, measures position, navigates to headings/elements, restores after reflow, and exposes pager state.
3. Replace the fixed `68ch` outer wrapper with mode-aware reader-area widths.
4. Add a compact accessible pager with button and guarded keyboard navigation.
5. Add paged multi-column CSS, break rules, responsive fallback, reduced motion, and print reset.

## Phase 4 — Existing feature integration

1. Route restore, saved-place, TOC, mark, highlight, and start-over navigation through the layout controller.
2. Keep normalized progress persistence independent of unstable page numbers.
3. Re-register highlights after layout reflow and preserve one article DOM.
4. Keep completion and article navigation reachable below the spread.

## Phase 5 — Verification

1. Run targeted preference, settings, pagination, and reader unit tests.
2. Run typecheck, lint, production build, and reader Playwright suites.
3. Start the app and verify desktop flow widths, paged navigation, responsive fallback, compact panel, all themes, focus mode, saved places, TOC, and highlights in the browser.
4. Resolve every failure and repeat the affected checks before completion.

