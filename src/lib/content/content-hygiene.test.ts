import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const CONTENT_DIR = path.join(process.cwd(), "content");

function walkMarkdown(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkMarkdown(full);
    return entry.name.endsWith(".md") ? [full] : [];
  });
}

// ChatGPT dışa aktarımlarında kalan atıf işaretleri: U+E200 cite U+E202 turn12search3 … U+E201.
// Kaynak bilgisi taşımazlar ve okuyucuda "citeturn…" diye çöp metin olarak görünürler.
const CHAT_CITATION_MARKER = /[\u{E200}-\u{E202}]|\bturn\d+(?:search|view|news|fetch)\d+/u;

describe("content hygiene", () => {
  it("has no leftover chat citation markers in any article", () => {
    const offenders = walkMarkdown(CONTENT_DIR)
      .filter((file) => CHAT_CITATION_MARKER.test(readFileSync(file, "utf8")))
      .map((file) => path.relative(process.cwd(), file));
    expect(offenders).toEqual([]);
  });
});
