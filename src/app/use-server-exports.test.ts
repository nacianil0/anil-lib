import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * A `"use server"` module may only export async functions. Exporting a value from
 * one compiles cleanly and passes `next build`, then fails at module load in
 * production with "can only export async functions, found object" — which takes the
 * whole route down as an opaque 500.
 *
 * This guard is static on purpose: importing the modules here would drag the server
 * runtime into the test environment without proving anything about their exports.
 */
const SOURCE_ROOT = path.join(process.cwd(), "src");

function collectFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) return collectFiles(full);
    return /\.tsx?$/.test(entry) && !/\.test\.tsx?$/.test(entry) ? [full] : [];
  });
}

function isUseServerModule(source: string): boolean {
  // The directive has to be the first statement, so only the opening lines matter.
  const head = source.slice(0, 200);
  return /^\s*(?:\/\*[\s\S]*?\*\/\s*)?["']use server["']/.test(head);
}

/** `export type` / `export interface` are erased at compile time and are allowed. */
const FORBIDDEN_EXPORT = /^export\s+(?:const|let|var|class|enum|default)\b/gm;

describe('"use server" modules', () => {
  const files = collectFiles(SOURCE_ROOT);
  const serverModules = files.filter((file) => isUseServerModule(readFileSync(file, "utf8")));

  it("finds the server action modules it is meant to guard", () => {
    expect(serverModules.length).toBeGreaterThan(0);
  });

  it.each(serverModules.map((file) => [path.relative(process.cwd(), file), file]))(
    "%s exports only async functions",
    (relative, file) => {
      const source = readFileSync(file, "utf8");
      const offenders = source.match(FORBIDDEN_EXPORT) ?? [];
      expect(
        offenders,
        `${relative} exports a value; move it to a module without "use server".`,
      ).toEqual([]);

      // Every exported function must be async: a sync export fails the same way.
      const syncExports = source.match(/^export\s+function\b/gm) ?? [];
      expect(syncExports, `${relative} exports a non-async function.`).toEqual([]);
    },
  );
});
