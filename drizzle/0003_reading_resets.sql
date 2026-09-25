CREATE TABLE "reading_resets" (
	"workspace_id" text PRIMARY KEY NOT NULL,
	"reset_version" bigint DEFAULT nextval('reader_change_version_seq') NOT NULL,
	"reset_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reset_by" uuid
);
--> statement-breakpoint
ALTER TABLE "reading_resets" ADD CONSTRAINT "reading_resets_reset_by_users_id_fk" FOREIGN KEY ("reset_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;