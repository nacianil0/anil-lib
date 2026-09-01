/**
 * Applies pending SQL migrations from `drizzle/` before the app is built.
 *
 * Deliberately does not use `drizzle-kit migrate`: this database was created
 * before any migration journal existed, so drizzle-kit would try to replay the
 * baseline migration and fail on tables that are already there. This runner keeps
 * its own bookkeeping table and adopts an existing schema as the baseline instead.
 *
 * Safe to run on every deploy: already-applied migrations are skipped, and a
 * statement whose object already exists is treated as satisfied rather than fatal,
 * so a migration applied by hand does not wedge the pipeline.
 *
 * Usage:
 *   node scripts/migrate.mjs            apply pending migrations
 *   node scripts/migrate.mjs --dry-run  parse and report without connecting
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const MIGRATIONS_DIR = path.join(process.cwd(), "drizzle");
const STATEMENT_SEPARATOR = "--> statement-breakpoint";

/**
 * The first migration predates this runner. If these tables already exist, that
 * migration is recorded as applied instead of being replayed.
 */
const BASELINE_MIGRATION = "0000_reader_sync.sql";
const BASELINE_TABLE = "reading_progress";

/** Postgres error codes meaning "this object is already there". */
const ALREADY_EXISTS = new Set([
  "42P07", // duplicate_table
  "42710", // duplicate_object (constraint, index, …)
  "42701", // duplicate_column
]);

const dryRun = process.argv.includes("--dry-run");

function log(message) {
  console.log(`[migrate] ${message}`);
}

async function readMigrations() {
  const entries = await readdir(MIGRATIONS_DIR);
  const files = entries.filter((name) => name.endsWith(".sql")).sort();
  return Promise.all(
    files.map(async (name) => {
      const raw = await readFile(path.join(MIGRATIONS_DIR, name), "utf8");
      const statements = raw
        .split(STATEMENT_SEPARATOR)
        .map((statement) => statement.trim())
        .filter((statement) => statement.length > 0);
      return { name, statements };
    }),
  );
}

async function main() {
  const migrations = await readMigrations();
  log(`${migrations.length} migration dosyası bulundu.`);
  for (const migration of migrations) {
    log(`  ${migration.name}: ${migration.statements.length} ifade`);
  }

  if (dryRun) {
    log("--dry-run: veritabanına bağlanılmadı.");
    return;
  }

  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    // Local builds and previews without a database must still succeed; the app
    // already degrades to the single-account gate when there is no database.
    log("DATABASE_URL tanımlı değil, migration atlanıyor.");
    return;
  }

  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(url);

  await sql.query(
    `CREATE TABLE IF NOT EXISTS app_migrations (
       name text PRIMARY KEY,
       applied_at timestamptz NOT NULL DEFAULT now()
     )`,
  );

  const appliedRows = await sql.query(`SELECT name FROM app_migrations`);
  const applied = new Set(appliedRows.map((row) => String(row.name)));

  if (applied.size === 0) {
    const [row] = await sql.query(
      `SELECT to_regclass($1) IS NOT NULL AS present`,
      [`public.${BASELINE_TABLE}`],
    );
    if (row?.present) {
      await sql.query(
        `INSERT INTO app_migrations (name) VALUES ($1) ON CONFLICT DO NOTHING`,
        [BASELINE_MIGRATION],
      );
      applied.add(BASELINE_MIGRATION);
      log(`mevcut şema baseline kabul edildi: ${BASELINE_MIGRATION}`);
    }
  }

  let appliedCount = 0;
  for (const migration of migrations) {
    if (applied.has(migration.name)) {
      log(`atlandı (zaten uygulanmış): ${migration.name}`);
      continue;
    }

    log(`uygulanıyor: ${migration.name}`);
    for (const statement of migration.statements) {
      try {
        await sql.query(statement);
      } catch (error) {
        const code = error?.code ?? error?.sourceError?.code;
        if (ALREADY_EXISTS.has(code)) {
          log(`  nesne zaten var (${code}), bu ifade atlandı`);
          continue;
        }
        throw error;
      }
    }
    await sql.query(
      `INSERT INTO app_migrations (name) VALUES ($1) ON CONFLICT DO NOTHING`,
      [migration.name],
    );
    appliedCount += 1;
    log(`tamamlandı: ${migration.name}`);
  }

  log(appliedCount === 0 ? "bekleyen migration yok." : `${appliedCount} migration uygulandı.`);
}

main().catch((error) => {
  console.error("[migrate] BAŞARISIZ:", error);
  // Fail the deploy loudly: shipping the app against an unmigrated database
  // locks everyone out of login, which is worse than a red build.
  process.exit(1);
});
