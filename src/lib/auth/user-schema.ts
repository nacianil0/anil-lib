import { z } from "zod";

/** Accounts are keyed by the workspace column every reader table is already partitioned by. */
export const OWNER_WORKSPACE_ID = "owner";

/**
 * Identity used when no database is configured (local development). The original
 * single-password gate behaves exactly as before in that mode: the owner signs in
 * against `SITE_PASSWORD_SHA256` and reads their own workspace.
 */
export const LOCAL_OWNER_USER_ID = "owner";

export const DEFAULT_OWNER_USERNAME = "anil";

export type UserRole = "owner" | "user";
export type HashScheme = "scrypt" | "env-sha256";

/** Public shape. Never carries a password hash — see `users.ts`. */
export type ReaderUser = {
  id: string;
  username: string;
  workspaceId: string;
  role: UserRole;
  lastLoginAt: string | null;
  createdAt: string;
};

/** Case- and whitespace-insensitive so `  Anil ` and `anil` cannot become two accounts. */
export function normalizeUsername(raw: string): string {
  return raw.normalize("NFKC").trim().toLowerCase();
}

export const usernameSchema = z
  .string()
  .transform(normalizeUsername)
  .pipe(
    z
      .string()
      .min(3, "Kullanıcı adı en az 3 karakter olmalı.")
      .max(32, "Kullanıcı adı en fazla 32 karakter olabilir.")
      .regex(
        /^[a-z0-9._-]+$/,
        "Kullanıcı adı yalnızca küçük harf, rakam, nokta, alt çizgi ve tire içerebilir.",
      ),
  );

/** Deliberately short: this is a small private library, not a public sign-up. */
export const MIN_PASSWORD_LENGTH = 4;

export const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, `Parola en az ${MIN_PASSWORD_LENGTH} karakter olmalı.`)
  .max(200, "Parola en fazla 200 karakter olabilir.");

export const createUserSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

/** The synthetic owner identity used when no database is configured. */
export function localOwnerUser(): ReaderUser {
  return {
    id: LOCAL_OWNER_USER_ID,
    username: ownerUsername(),
    workspaceId: OWNER_WORKSPACE_ID,
    role: "owner",
    lastLoginAt: null,
    createdAt: new Date(0).toISOString(),
  };
}

export function ownerUsername(): string {
  const configured = process.env.OWNER_USERNAME;
  if (!configured) return DEFAULT_OWNER_USERNAME;
  const normalized = normalizeUsername(configured);
  return usernameSchema.safeParse(normalized).success ? normalized : DEFAULT_OWNER_USERNAME;
}
