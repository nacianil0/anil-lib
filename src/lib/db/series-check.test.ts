import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { getTableConfig, PgDialect } from "drizzle-orm/pg-core";
import { describe, expect, it } from "vitest";
import { SERIES_IDS } from "@/lib/reader-data/series-reset";
import { readingSeriesResets } from "./schema";

const CONSTRAINT = "reading_series_resets_series_check";
const MIGRATIONS_DIR = path.join(process.cwd(), "drizzle");

/** The quoted values of the first `IN (...)` list in a SQL fragment. */
function inListValues(fragment: string): string[] {
  const list = /\bIN\s*\(([^)]*)\)/i.exec(fragment)?.[1];
  if (list === undefined) throw new Error(`no IN list in: ${fragment}`);
  return [...list.matchAll(/'([^']*)'/g)].map((match) => match[1] ?? "");
}

// A series added to SERIES_IDS but not to this check passes every local test (there is no
// database locally) and only fails in production, when a reader resets that series.
describe("reading_series_resets series check", () => {
  it("the Drizzle schema admits exactly the reader-data series", () => {
    const check = getTableConfig(readingSeriesResets).checks.find((c) => c.name === CONSTRAINT);
    expect(check).toBeDefined();
    const { sql } = new PgDialect().sqlToQuery(check!.value);
    expect(inListValues(sql).sort()).toEqual([...SERIES_IDS].sort());
  });

  it("the newest migration that defines the check admits exactly the same series", () => {
    const newest = readdirSync(MIGRATIONS_DIR)
      .filter((name) => name.endsWith(".sql"))
      .sort()
      .map((name) => readFileSync(path.join(MIGRATIONS_DIR, name), "utf8"))
      .filter((source) => source.includes(CONSTRAINT))
      .at(-1);
    expect(newest).toBeDefined();
    // The last mention is the definition: a widening migration drops the old check first.
    const definition = newest!.slice(newest!.lastIndexOf(CONSTRAINT));
    expect(inListValues(definition).sort()).toEqual([...SERIES_IDS].sort());
  });
});
