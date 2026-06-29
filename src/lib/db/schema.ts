import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  check,
  doublePrecision,
  index,
  pgSequence,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

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
