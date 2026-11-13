/**
 * One set of control styles for every page. Pages compose these instead of restating
 * the classes, so a primary action looks and behaves the same on the front page, a
 * series page, the dashboard and a form.
 *
 * Every control is at least 36px tall (44px for the page's main actions), comfortably
 * above the 24px minimum target of WCAG 2.5.8. Focus is drawn by the global
 * `:focus-visible` rule in globals.css, so nothing here removes the outline.
 */

/** The page's one main action: a filled accent button. */
export const buttonPrimary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent-fill px-5 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60";

/** A second, equal-weight choice next to the primary one: an outlined button. */
export const buttonSecondary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border-strong px-5 font-sans text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent disabled:cursor-wait disabled:opacity-60";

/** A quiet text control for headers and toolbars. */
export const navLink =
  "inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 font-sans text-sm text-text-muted transition-colors hover:bg-surface-muted hover:text-text aria-[current=page]:text-text";

/** The header's one emphasised account action ("Hesap aç"). */
export const navButton =
  "inline-flex min-h-9 items-center gap-1.5 rounded-md border border-border-strong px-3 font-sans text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent";
