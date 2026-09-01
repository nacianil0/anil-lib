import "server-only";

import { randomUUID } from "node:crypto";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import { hashPassword } from "@/lib/auth/password";
import {
  OWNER_WORKSPACE_ID,
  ownerUsername,
  type HashScheme,
  type ReaderUser,
  type UserRole,
} from "@/lib/auth/user-schema";

export type SqlClient = NeonQueryFunction<false, false>;

/** Internal shape. Only the login path ever sees the stored hash. */
export type UserCredentials = ReaderUser & {
  passwordHash: string;
  hashScheme: HashScheme;
};

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const PUBLIC_COLUMNS = `id, username, workspace_id, role, last_login_at, created_at`;
const CREDENTIAL_COLUMNS = `${PUBLIC_COLUMNS}, password_hash, hash_scheme`;

function isoOrNull(value: unknown): string | null {
  if (!value) return null;
  const parsed = new Date(String(value));
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : null;
}

function mapUser(row: Record<string, unknown>): ReaderUser {
  return {
    id: String(row.id),
    username: String(row.username),
    workspaceId: String(row.workspace_id),
    role: String(row.role) as UserRole,
    lastLoginAt: isoOrNull(row.last_login_at),
    createdAt: isoOrNull(row.created_at) ?? new Date(0).toISOString(),
  };
}

function mapCredentials(row: Record<string, unknown>): UserCredentials {
  return {
    ...mapUser(row),
    passwordHash: String(row.password_hash),
    hashScheme: String(row.hash_scheme) as HashScheme,
  };
}

/**
 * Creates the owner row if it is not there yet. Runs at login time rather than in a
 * SQL migration so no password material ever reaches a migration file, and it is
 * safe to call on every attempt: the workspace unique constraint makes it a no-op
 * after the first run.
 */
export async function ensureOwnerUser(sql: SqlClient): Promise<void> {
  await sql.query(
    `INSERT INTO users (id, username, workspace_id, role, password_hash, hash_scheme)
     VALUES ($1::uuid, $2, $3, 'owner', '', 'env-sha256')
     ON CONFLICT (workspace_id) DO NOTHING`,
    [randomUUID(), ownerUsername(), OWNER_WORKSPACE_ID],
  );
}

export async function findCredentialsByUsername(
  sql: SqlClient,
  username: string,
): Promise<UserCredentials | null> {
  const rows = (await sql.query(`SELECT ${CREDENTIAL_COLUMNS} FROM users WHERE username = $1`, [
    username,
  ])) as Record<string, unknown>[];
  return rows.length > 0 ? mapCredentials(rows[0]) : null;
}

export async function findUserById(sql: SqlClient, id: string): Promise<ReaderUser | null> {
  const rows = (await sql.query(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = $1::uuid`, [
    id,
  ])) as Record<string, unknown>[];
  return rows.length > 0 ? mapUser(rows[0]) : null;
}

export async function listUsers(sql: SqlClient): Promise<ReaderUser[]> {
  const rows = (await sql.query(
    `SELECT ${PUBLIC_COLUMNS} FROM users
     ORDER BY CASE WHEN role = 'owner' THEN 0 ELSE 1 END, username ASC`,
  )) as Record<string, unknown>[];
  return rows.map(mapUser);
}

export class DuplicateUsernameError extends Error {
  constructor() {
    super("duplicate_username");
    this.name = "DuplicateUsernameError";
  }
}

/**
 * The Neon HTTP driver sometimes wraps the Postgres error, so the code is checked
 * both on the error itself and on the wrapped original.
 */
function isUniqueViolation(error: unknown): boolean {
  const candidate = error as {
    code?: unknown;
    constraint?: unknown;
    sourceError?: { code?: unknown; constraint?: unknown };
  } | null;
  if (candidate?.code === "23505" || candidate?.sourceError?.code === "23505") return true;
  const constraint = candidate?.constraint ?? candidate?.sourceError?.constraint;
  return typeof constraint === "string" && constraint.startsWith("users_username");
}

/**
 * New accounts use their own id as the workspace key, so reader rows are partitioned
 * per user without touching any existing row. The owner keeps the literal `owner`
 * workspace it has always had.
 */
export async function createStandardUser(
  sql: SqlClient,
  input: { username: string; password: string; createdBy: string | null },
): Promise<ReaderUser> {
  const id = randomUUID();
  const passwordHash = await hashPassword(input.password);
  // The synthetic no-database owner has a non-uuid id; record no author rather than
  // failing the insert on a cast.
  const createdBy = input.createdBy && UUID_PATTERN.test(input.createdBy) ? input.createdBy : null;
  try {
    // Deliberately no RETURNING: every value is already known here, and reading rows
    // back from an INSERT is the one driver behaviour this codebase never exercises
    // anywhere else.
    await sql.query(
      `INSERT INTO users (id, username, workspace_id, role, password_hash, hash_scheme, created_by)
       VALUES ($1::uuid, $2, $3, 'user', $4, 'scrypt', $5::uuid)`,
      [id, input.username, id, passwordHash, createdBy],
    );
  } catch (error) {
    if (isUniqueViolation(error)) throw new DuplicateUsernameError();
    throw error;
  }

  return {
    id,
    username: input.username,
    workspaceId: id,
    role: "user",
    lastLoginAt: null,
    createdAt: new Date().toISOString(),
  };
}

export async function recordLogin(sql: SqlClient, userId: string): Promise<void> {
  await sql.query(`UPDATE users SET last_login_at = now() WHERE id = $1::uuid`, [userId]);
}

/**
 * Moves the owner off the env-backed SHA-256 gate. Called with the plaintext that was
 * just verified, so the password is never stored or logged anywhere else. Guarded on
 * the old scheme so a concurrent login cannot downgrade an already-upgraded row.
 */
export async function upgradeOwnerToScrypt(
  sql: SqlClient,
  userId: string,
  password: string,
): Promise<void> {
  const passwordHash = await hashPassword(password);
  await sql.query(
    `UPDATE users SET password_hash = $2, hash_scheme = 'scrypt'
     WHERE id = $1::uuid AND role = 'owner' AND hash_scheme = 'env-sha256'`,
    [userId, passwordHash],
  );
}
