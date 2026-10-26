import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * White text may only sit on `--accent-fill`, never on `--accent`. In light and sepia
 * the two tokens are the same colour, so the mistake is invisible there; in the dark
 * theme `--accent` is a light pink (#d98597) built for text on a dark page, and white
 * on it is 2.71:1 — below WCAG 1.4.3's 4.5:1. The series reset confirm button, the
 * landing CTA and the marks badge all shipped that way before this guard existed.
 *
 * Static on purpose, like the "use server" guard: the class names and the tokens are
 * both plain text, so reading them proves the rule without rendering anything.
 */
const SOURCE_ROOT = path.join(process.cwd(), "src");
const GLOBALS_CSS = path.join(SOURCE_ROOT, "app", "globals.css");

function collectFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return collectFiles(full);
    return /\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry) ? [full] : [];
  });
}

/** The `--name: #rrggbb` value declared inside one theme block of globals.css. */
function themeToken(css: string, selector: string, name: string): string {
  const start = css.indexOf(`${selector} {`);
  expect(start, `${selector} block missing from globals.css`).toBeGreaterThanOrEqual(0);
  const block = css.slice(start, css.indexOf("}", start));
  const match = block.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`));
  expect(match, `${selector} does not declare --${name}`).not.toBeNull();
  return match![1];
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastWithWhite(hex: string): number {
  return 1.05 / (luminance(hex) + 0.05);
}

/** Every quoted or template class string that puts white text on a background. */
const CLASS_STRING = /(["'`])((?:(?!\1).)*\btext-white\b(?:(?!\1).)*)\1/g;
/** `bg-accent` itself — `bg-accent-fill` and `bg-accent-soft` are different tokens. */
const ACCENT_BG = /\bbg-accent(?![-\w])/;

describe("white text on the accent colour", () => {
  const css = readFileSync(GLOBALS_CSS, "utf8");

  it.each([":root", ".dark", ".sepia"])("--accent-fill keeps 4.5:1 under white text in %s", (theme) => {
    const fill = themeToken(css, theme, "accent-fill");
    expect(contrastWithWhite(fill), `${theme} --accent-fill ${fill}`).toBeGreaterThanOrEqual(4.5);
  });

  it("never pairs text-white with bg-accent", () => {
    const offenders = collectFiles(SOURCE_ROOT).flatMap((file) => {
      const source = readFileSync(file, "utf8");
      return [...source.matchAll(CLASS_STRING)]
        .filter((m) => ACCENT_BG.test(m[2]))
        .map((m) => `${path.relative(process.cwd(), file)}: ${m[2].trim()}`);
    });
    expect(offenders, "use bg-accent-fill for white text").toEqual([]);
  });
});
