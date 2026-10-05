CREATE TABLE "reading_series_resets" (
	"workspace_id" text NOT NULL,
	"series_id" text NOT NULL,
	"reset_version" bigint DEFAULT nextval('reader_change_version_seq') NOT NULL,
	"reset_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reset_by" uuid,
	CONSTRAINT "reading_series_resets_workspace_id_series_id_pk" PRIMARY KEY("workspace_id","series_id"),
	CONSTRAINT "reading_series_resets_series_check" CHECK ("series_id" IN ('ai', 'boun'))
);
--> statement-breakpoint
ALTER TABLE "reading_series_resets" ADD CONSTRAINT "reading_series_resets_reset_by_users_id_fk" FOREIGN KEY ("reset_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
