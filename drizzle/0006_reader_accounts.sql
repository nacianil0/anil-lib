-- Self-registered external readers and the counters that rate-limit sign-in, sign-up and
-- recovery. Additive only: two new tables, nothing existing is altered, so every current
-- account, role and reading row stays exactly as it is. Rolling the code back leaves these
-- tables unused and harmless — an older build never reads them, so a reader account cannot
-- resolve to anything there (see src/lib/auth/reader-accounts.ts). To undo the schema by hand:
--   DROP TABLE reader_accounts; DROP TABLE auth_rate_limits;
-- after deleting the reader workspaces' rows (workspace_id LIKE 'r:%') from the reader tables.
CREATE TABLE IF NOT EXISTS "reader_accounts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"workspace_id" text NOT NULL,
	"password_hash" text NOT NULL,
	"recovery_code_hash" text NOT NULL,
	"session_version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_login_at" timestamp with time zone,
	"password_changed_at" timestamp with time zone,
	CONSTRAINT "reader_accounts_username_unique" UNIQUE("username"),
	CONSTRAINT "reader_accounts_workspace_id_unique" UNIQUE("workspace_id"),
	CONSTRAINT "reader_accounts_workspace_prefix_check" CHECK ("workspace_id" = 'r:' || "id"::text),
	CONSTRAINT "reader_accounts_session_version_check" CHECK ("session_version" >= 1)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth_rate_limits" (
	"bucket" text NOT NULL,
	"window_start" timestamp with time zone NOT NULL,
	"hits" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "auth_rate_limits_pk" PRIMARY KEY("bucket","window_start")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "auth_rate_limits_window_idx" ON "auth_rate_limits" ("window_start");
