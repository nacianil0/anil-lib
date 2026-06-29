CREATE SEQUENCE "public"."reader_change_version_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1;--> statement-breakpoint
CREATE TABLE "highlights" (
	"id" uuid NOT NULL,
	"workspace_id" text NOT NULL,
	"article_id" text NOT NULL,
	"exact_text" text NOT NULL,
	"prefix_text" text DEFAULT '' NOT NULL,
	"suffix_text" text DEFAULT '' NOT NULL,
	"heading_id" text,
	"block_index" bigint DEFAULT 0 NOT NULL,
	"start_offset" bigint DEFAULT 0 NOT NULL,
	"end_offset" bigint DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"client_updated_at" timestamp with time zone NOT NULL,
	"server_updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"device_id" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"change_version" bigint DEFAULT nextval('reader_change_version_seq') NOT NULL,
	CONSTRAINT "highlights_workspace_id_id_pk" PRIMARY KEY("workspace_id","id")
);
--> statement-breakpoint
CREATE TABLE "reading_progress" (
	"workspace_id" text NOT NULL,
	"article_id" text NOT NULL,
	"heading_id" text,
	"scroll_ratio" double precision DEFAULT 0 NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"last_read_at" timestamp with time zone NOT NULL,
	"client_updated_at" timestamp with time zone NOT NULL,
	"server_updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"device_id" uuid NOT NULL,
	"change_version" bigint DEFAULT nextval('reader_change_version_seq') NOT NULL,
	CONSTRAINT "reading_progress_workspace_id_article_id_pk" PRIMARY KEY("workspace_id","article_id"),
	CONSTRAINT "reading_progress_ratio_check" CHECK ("reading_progress"."scroll_ratio" >= 0 AND "reading_progress"."scroll_ratio" <= 1)
);
--> statement-breakpoint
CREATE TABLE "saved_places" (
	"workspace_id" text NOT NULL,
	"article_id" text NOT NULL,
	"heading_id" text,
	"scroll_ratio" double precision DEFAULT 0 NOT NULL,
	"preview_text" text DEFAULT '' NOT NULL,
	"client_updated_at" timestamp with time zone NOT NULL,
	"server_updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"device_id" uuid NOT NULL,
	"deleted_at" timestamp with time zone,
	"change_version" bigint DEFAULT nextval('reader_change_version_seq') NOT NULL,
	CONSTRAINT "saved_places_workspace_id_article_id_pk" PRIMARY KEY("workspace_id","article_id"),
	CONSTRAINT "saved_places_ratio_check" CHECK ("saved_places"."scroll_ratio" >= 0 AND "saved_places"."scroll_ratio" <= 1)
);
--> statement-breakpoint
CREATE TABLE "sync_mutations" (
	"workspace_id" text NOT NULL,
	"operation_id" uuid NOT NULL,
	"device_id" uuid NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text NOT NULL,
	"operation_type" text NOT NULL,
	"accepted_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "sync_mutations_workspace_id_operation_id_pk" PRIMARY KEY("workspace_id","operation_id")
);
--> statement-breakpoint
CREATE INDEX "highlights_article_idx" ON "highlights" USING btree ("workspace_id","article_id");--> statement-breakpoint
CREATE INDEX "highlights_change_idx" ON "highlights" USING btree ("workspace_id","change_version");--> statement-breakpoint
CREATE INDEX "reading_progress_change_idx" ON "reading_progress" USING btree ("workspace_id","change_version");--> statement-breakpoint
CREATE INDEX "saved_places_change_idx" ON "saved_places" USING btree ("workspace_id","change_version");--> statement-breakpoint
CREATE INDEX "sync_mutations_accepted_idx" ON "sync_mutations" USING btree ("workspace_id","accepted_at");