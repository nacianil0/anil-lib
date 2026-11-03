import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  check,
  doublePrecision,
  index,
  integer,
  jsonb,
  pgSequence,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";

/**
 * Reader accounts. `workspace_id` is the tenant key every reader table is already
 * partitioned by, so the owner keeps the pre-existing literal `owner` value and no
 * historical row has to be rewritten.
 */
export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    username: text("username").notNull().unique(),
    workspaceId: text("workspace_id").notNull().unique(),
    role: text("role").notNull(),
    passwordHash: text("password_hash").notNull(),
    hashScheme: text("hash_scheme").notNull(),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    createdBy: uuid("created_by").references((): AnyPgColumn => users.id),
  },
  (table) => [
    check("users_role_check", sql`${table.role} IN ('owner', 'user')`),
    check("users_hash_scheme_check", sql`${table.hashScheme} IN ('scrypt', 'env-sha256')`),
    // The legacy env-backed hash exists only to keep the original owner login working.
    check(
      "users_legacy_scheme_owner_only",
      sql`${table.hashScheme} <> 'env-sha256' OR ${table.role} = 'owner'`,
    ),
  ],
);

/**
 * Self-registered external readers (drizzle/0006). Kept apart from `users` so no
 * existing account changes and an older build, which never reads this table, cannot
 * resolve a reader's cookie to any account. The workspace is `r:<id>`: the reader APIs
 * narrow the scope from the signed cookie alone (see `lib/auth/access.ts`).
 */
export const readerAccounts = pgTable(
  "reader_accounts",
  {
    id: uuid("id").primaryKey(),
    username: text("username").notNull().unique(),
    workspaceId: text("workspace_id").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    /** SHA-256 of the one-time offline recovery code; replaced on every recovery. */
    recoveryCodeHash: text("recovery_code_hash").notNull(),
    /** Bumped by a password change or recovery; cookies minted before stop resolving. */
    sessionVersion: integer("session_version").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    passwordChangedAt: timestamp("password_changed_at", { withTimezone: true }),
  },
  (table) => [
    check(
      "reader_accounts_workspace_prefix_check",
      sql`${table.workspaceId} = 'r:' || ${table.id}::text`,
    ),
    check("reader_accounts_session_version_check", sql`${table.sessionVersion} >= 1`),
  ],
);

/**
 * Fixed-window counters for sign-in, sign-up and recovery limits (drizzle/0006).
 * `bucket` is an HMAC of the subject, never a raw IP address or username.
 */
export const authRateLimits = pgTable(
  "auth_rate_limits",
  {
    bucket: text("bucket").notNull(),
    windowStart: timestamp("window_start", { withTimezone: true }).notNull(),
    hits: integer("hits").notNull().default(0),
  },
  (table) => [
    primaryKey({ name: "auth_rate_limits_pk", columns: [table.bucket, table.windowStart] }),
    index("auth_rate_limits_window_idx").on(table.windowStart),
  ],
);

export const readerChangeVersion = pgSequence("reader_change_version_seq", {
  startWith: 1,
});

const changeVersion = () =>
  bigint("change_version", { mode: "number" })
    .notNull()
    .default(sql`nextval('reader_change_version_seq')`);

export const readingProgress = pgTable(
  "reading_progress",
  {
    workspaceId: text("workspace_id").notNull(),
    articleId: text("article_id").notNull(),
    headingId: text("heading_id"),
    scrollRatio: doublePrecision("scroll_ratio").notNull().default(0),
    /**
     * Resolvable reading anchor (see `readingAnchorSchema`). Nullable: rows written
     * before anchoring, and positions in text too short to anchor, simply have none.
     */
    readingAnchor: jsonb("reading_anchor"),
    completed: boolean("completed").notNull().default(false),
    lastReadAt: timestamp("last_read_at", { withTimezone: true }).notNull(),
    clientUpdatedAt: timestamp("client_updated_at", { withTimezone: true }).notNull(),
    serverUpdatedAt: timestamp("server_updated_at", { withTimezone: true }).notNull().defaultNow(),
    deviceId: uuid("device_id").notNull(),
    changeVersion: changeVersion(),
  },
  (table) => [
    primaryKey({ columns: [table.workspaceId, table.articleId] }),
    check(
      "reading_progress_ratio_check",
      sql`${table.scrollRatio} >= 0 AND ${table.scrollRatio} <= 1`,
    ),
    index("reading_progress_change_idx").on(table.workspaceId, table.changeVersion),
  ],
);

export const savedPlaces = pgTable(
  "saved_places",
  {
    workspaceId: text("workspace_id").notNull(),
    articleId: text("article_id").notNull(),
    headingId: text("heading_id"),
    scrollRatio: doublePrecision("scroll_ratio").notNull().default(0),
    /**
     * Resolvable reading anchor (see `readingAnchorSchema`). Nullable: rows written
     * before anchoring, and positions in text too short to anchor, simply have none.
     */
    readingAnchor: jsonb("reading_anchor"),
    previewText: text("preview_text").notNull().default(""),
    clientUpdatedAt: timestamp("client_updated_at", { withTimezone: true }).notNull(),
    serverUpdatedAt: timestamp("server_updated_at", { withTimezone: true }).notNull().defaultNow(),
    deviceId: uuid("device_id").notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    changeVersion: changeVersion(),
  },
  (table) => [
    primaryKey({ columns: [table.workspaceId, table.articleId] }),
    check("saved_places_ratio_check", sql`${table.scrollRatio} >= 0 AND ${table.scrollRatio} <= 1`),
    index("saved_places_change_idx").on(table.workspaceId, table.changeVersion),
  ],
);

export const highlights = pgTable(
  "highlights",
  {
    id: uuid("id").notNull(),
    workspaceId: text("workspace_id").notNull(),
    articleId: text("article_id").notNull(),
    exactText: text("exact_text").notNull(),
    prefixText: text("prefix_text").notNull().default(""),
    suffixText: text("suffix_text").notNull().default(""),
    headingId: text("heading_id"),
    blockIndex: bigint("block_index", { mode: "number" }).notNull().default(0),
    startOffset: bigint("start_offset", { mode: "number" }).notNull().default(0),
    endOffset: bigint("end_offset", { mode: "number" }).notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull(),
    clientUpdatedAt: timestamp("client_updated_at", { withTimezone: true }).notNull(),
    serverUpdatedAt: timestamp("server_updated_at", { withTimezone: true }).notNull().defaultNow(),
    deviceId: uuid("device_id").notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    changeVersion: changeVersion(),
  },
  (table) => [
    primaryKey({ columns: [table.workspaceId, table.id] }),
    index("highlights_article_idx").on(table.workspaceId, table.articleId),
    index("highlights_change_idx").on(table.workspaceId, table.changeVersion),
  ],
);

/**
 * One row per workspace whose reading progress an owner has reset. `reset_version`
 * comes from the same sequence as every change, so it orders against the sync
 * cursor and never depends on a clock. A device that syncs with an older version
 * learns that its local progress is void, and its pending progress writes — made on
 * top of that void state — are not applied.
 */
export const readingResets = pgTable("reading_resets", {
  workspaceId: text("workspace_id").primaryKey(),
  resetVersion: bigint("reset_version", { mode: "number" })
    .notNull()
    .default(sql`nextval('reader_change_version_seq')`),
  resetAt: timestamp("reset_at", { withTimezone: true }).notNull().defaultNow(),
  resetBy: uuid("reset_by").references((): AnyPgColumn => users.id),
});

/** A reader may start one series over without invalidating their other reading. */
export const readingSeriesResets = pgTable(
  "reading_series_resets",
  {
    workspaceId: text("workspace_id").notNull(),
    seriesId: text("series_id").notNull(),
    resetVersion: bigint("reset_version", { mode: "number" })
      .notNull()
      .default(sql`nextval('reader_change_version_seq')`),
    resetAt: timestamp("reset_at", { withTimezone: true }).notNull().defaultNow(),
    resetBy: uuid("reset_by").references((): AnyPgColumn => users.id),
  },
  (table) => [
    primaryKey({ columns: [table.workspaceId, table.seriesId] }),
    // Widened by drizzle/0005; must list every id in SERIES_IDS (src/lib/reader-data/series-reset.ts).
    check(
      "reading_series_resets_series_check",
      sql`${table.seriesId} IN ('ai', 'boun', 'guvenlik')`,
    ),
  ],
);

export const syncMutations = pgTable(
  "sync_mutations",
  {
    workspaceId: text("workspace_id").notNull(),
    operationId: uuid("operation_id").notNull(),
    deviceId: uuid("device_id").notNull(),
    entityType: text("entity_type").notNull(),
    entityId: text("entity_id").notNull(),
    operationType: text("operation_type").notNull(),
    acceptedAt: timestamp("accepted_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.workspaceId, table.operationId] }),
    index("sync_mutations_accepted_idx").on(table.workspaceId, table.acceptedAt),
  ],
);
