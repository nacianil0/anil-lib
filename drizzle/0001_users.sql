CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL,
	"workspace_id" text NOT NULL,
	"role" text NOT NULL,
	"password_hash" text NOT NULL,
	"hash_scheme" text NOT NULL,
	"last_login_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_workspace_id_unique" UNIQUE("workspace_id"),
	CONSTRAINT "users_role_check" CHECK ("users"."role" IN ('owner', 'user')),
	CONSTRAINT "users_hash_scheme_check" CHECK ("users"."hash_scheme" IN ('scrypt', 'env-sha256')),
	CONSTRAINT "users_legacy_scheme_owner_only" CHECK ("users"."hash_scheme" <> 'env-sha256' OR "users"."role" = 'owner')
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;