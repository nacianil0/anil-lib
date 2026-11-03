import "server-only";

import { randomUUID } from "node:crypto";
import { READER_WORKSPACE_PREFIX } from "@/lib/auth/access";
import { hashPassword } from "@/lib/auth/password";
import { generateRecoveryCode, hashRecoveryCode } from "@/lib/auth/recovery-code";
import type { ReaderUser } from "@/lib/auth/user-schema";
import { DuplicateUsernameError, type SqlClient } from "@/lib/auth/users";

/**
 * Self-registered external accounts. They live in their own table, apart from the
 * owner-provisioned `users`, for two reasons:
 *
 *  - Nothing about the existing accounts changes: no constraint is widened and no row
 *    is reclassified.
 *  - Rolling the code back is safe by construction. A build that predates this table
 *    never looks here, so a reader's cookie resolves to no account at all there — it
 *    cannot fall back to the broader access of a standard user.
 *
 * Sign-in, the session cookie and the password hash are the same as for every other
 * account; only where the row is kept differs.
 */
export type ReaderAccount = ReaderUser & { sessionVersion: number };

export type ReaderAccountCredentials = ReaderAccount & {
  passwordHash: string;
  recoveryCodeHash: string;
};

const PUBLIC_COLUMNS = `id, username, workspace_id, session_version, last_login_at, created_at`;
const CREDENTIAL_COLUMNS = `${PUBLIC_COLUMNS}, password_hash, recovery_code_hash`;

function isoOrNull(value: unknown): string | null {
  if (!value) return null;
  const parsed = new Date(String(value));
  return Number.isFinite(parsed.getTime()) ? parsed.toISOString() : null;
}

function mapAccount(row: Record<string, unknown>): ReaderAccount {
  return {
    id: String(row.id),
    username: String(row.username),
    workspaceId: String(row.workspace_id),
    role: "reader",
    sessionVersion: Number(row.session_version),
    lastLoginAt: isoOrNull(row.last_login_at),
    createdAt: isoOrNull(row.created_at) ?? new Date(0).toISOString(),
  };
}

function mapCredentials(row: Record<string, unknown>): ReaderAccountCredentials {
  return {
    ...mapAccount(row),
    passwordHash: String(row.password_hash),
    recoveryCodeHash: String(row.recovery_code_hash),
  };
}

function isUniqueViolation(error: unknown): boolean {
  const candidate = error as {
    code?: unknown;
    sourceError?: { code?: unknown };
  } | null;
  return candidate?.code === "23505" || candidate?.sourceError?.code === "23505";
}

/**
 * Creates the account and returns its one-time recovery code. The username must be
 * free in both tables: the insert itself refuses a name an owner-created account
 * already holds, and the unique index refuses a taken reader name, so a check-then-
 * insert race cannot slip a duplicate past either.
 */
export async function createReaderAccount(
  sql: SqlClient,
  input: { username: string; password: string },
): Promise<{ account: ReaderAccount; recoveryCode: string }> {
  const id = randomUUID();
  const workspaceId = `${READER_WORKSPACE_PREFIX}${id}`;
  const passwordHash = await hashPassword(input.password);
  const recoveryCode = generateRecoveryCode();

  let rows: Record<string, unknown>[];
  try {
    rows = (await sql.query(
      `INSERT INTO reader_accounts (id, username, workspace_id, password_hash, recovery_code_hash)
       SELECT $1::uuid, $2, $3, $4, $5
       WHERE NOT EXISTS (SELECT 1 FROM users WHERE username = $2)
       RETURNING ${PUBLIC_COLUMNS}`,
      [id, input.username, workspaceId, passwordHash, hashRecoveryCode(recoveryCode)],
    )) as Record<string, unknown>[];
  } catch (error) {
    if (isUniqueViolation(error)) throw new DuplicateUsernameError();
    throw error;
  }
  if (rows.length === 0) throw new DuplicateUsernameError();
  return { account: mapAccount(rows[0]), recoveryCode };
}

export async function findReaderCredentialsByUsername(
  sql: SqlClient,
  username: string,
): Promise<ReaderAccountCredentials | null> {
  const rows = (await sql.query(
    `SELECT ${CREDENTIAL_COLUMNS} FROM reader_accounts WHERE username = $1`,
    [username],
  )) as Record<string, unknown>[];
  return rows.length > 0 ? mapCredentials(rows[0]) : null;
}

export async function findReaderById(sql: SqlClient, id: string): Promise<ReaderAccount | null> {
  const rows = (await sql.query(
    `SELECT ${PUBLIC_COLUMNS} FROM reader_accounts WHERE id = $1::uuid`,
    [id],
  )) as Record<string, unknown>[];
  return rows.length > 0 ? mapAccount(rows[0]) : null;
}

export async function findReaderCredentialsById(
  sql: SqlClient,
  id: string,
): Promise<ReaderAccountCredentials | null> {
  const rows = (await sql.query(
    `SELECT ${CREDENTIAL_COLUMNS} FROM reader_accounts WHERE id = $1::uuid`,
    [id],
  )) as Record<string, unknown>[];
  return rows.length > 0 ? mapCredentials(rows[0]) : null;
}

/** Whether an owner-created account already holds this username. */
export async function internalUsernameExists(sql: SqlClient, username: string): Promise<boolean> {
  const rows = (await sql.query(`SELECT 1 FROM users WHERE username = $1`, [
    username,
  ])) as unknown[];
  return rows.length > 0;
}

/** Whether a self-registered account already holds this username. */
export async function readerUsernameExists(sql: SqlClient, username: string): Promise<boolean> {
  const rows = (await sql.query(`SELECT 1 FROM reader_accounts WHERE username = $1`, [
    username,
  ])) as unknown[];
  return rows.length > 0;
}

export async function recordReaderLogin(sql: SqlClient, id: string): Promise<void> {
  await sql.query(`UPDATE reader_accounts SET last_login_at = now() WHERE id = $1::uuid`, [id]);
}

/**
 * Sets a new password and voids every session minted before: the stored session
 * version moves on, and cookies carrying the old one stop resolving. With
 * `rotateRecoveryCode` (account recovery) the used code is replaced too, so it can
 * never be spent twice. Returns the new session version and, when rotated, the code.
 */
export async function setReaderPassword(
  sql: SqlClient,
  id: string,
  password: string,
  options: { rotateRecoveryCode: boolean },
): Promise<{ sessionVersion: number; recoveryCode: string | null } | null> {
  const passwordHash = await hashPassword(password);
  const recoveryCode = options.rotateRecoveryCode ? generateRecoveryCode() : null;
  const rows = (await sql.query(
    `UPDATE reader_accounts SET
       password_hash = $2,
       recovery_code_hash = COALESCE($3, recovery_code_hash),
       session_version = session_version + 1,
       password_changed_at = now()
     WHERE id = $1::uuid
     RETURNING session_version`,
    [id, passwordHash, recoveryCode ? hashRecoveryCode(recoveryCode) : null],
  )) as Record<string, unknown>[];
  if (rows.length === 0) return null;
  return { sessionVersion: Number(rows[0].session_version), recoveryCode };
}

/** Issues a fresh recovery code; the previous one stops working at once. */
export async function replaceRecoveryCode(sql: SqlClient, id: string): Promise<string | null> {
  const recoveryCode = generateRecoveryCode();
  const rows = (await sql.query(
    `UPDATE reader_accounts SET recovery_code_hash = $2 WHERE id = $1::uuid RETURNING id`,
    [id, hashRecoveryCode(recoveryCode)],
  )) as unknown[];
  return rows.length > 0 ? recoveryCode : null;
}

/**
 * Deletes the account and everything stored under its workspace in one transaction:
 * a half-deleted account would leave reading data nobody can reach or remove.
 */
export async function deleteReaderAccount(sql: SqlClient, account: ReaderAccount): Promise<void> {
  if (!account.workspaceId.startsWith(READER_WORKSPACE_PREFIX)) {
    // Only ever a self-registered workspace; an owner-created one is never touched here.
    throw new Error("not_a_reader_workspace");
  }
  const workspaceId = account.workspaceId;
  await sql.transaction([
    sql.query(`DELETE FROM highlights WHERE workspace_id = $1`, [workspaceId]),
    sql.query(`DELETE FROM saved_places WHERE workspace_id = $1`, [workspaceId]),
    sql.query(`DELETE FROM reading_progress WHERE workspace_id = $1`, [workspaceId]),
    sql.query(`DELETE FROM reading_series_resets WHERE workspace_id = $1`, [workspaceId]),
    sql.query(`DELETE FROM reading_resets WHERE workspace_id = $1`, [workspaceId]),
    sql.query(`DELETE FROM sync_mutations WHERE workspace_id = $1`, [workspaceId]),
    sql.query(`DELETE FROM reader_accounts WHERE id = $1::uuid AND workspace_id = $2`, [
      account.id,
      workspaceId,
    ]),
  ]);
}
