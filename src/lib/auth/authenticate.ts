import "server-only";

import { verifyLegacyPasswordHash } from "@/lib/auth/password-gate";
import {
  DUMMY_PASSWORD_HASH,
  hashPassword,
  needsRehash,
  verifyPassword,
} from "@/lib/auth/password";
import {
  ensureOwnerUser,
  findCredentialsByUsername,
  recordLogin,
  updatePasswordHash,
  upgradeOwnerToScrypt,
} from "@/lib/auth/users";
import {
  localOwnerUser,
  ownerUsername,
  type ReaderUser,
} from "@/lib/auth/user-schema";
import {
  findReaderCredentialsByUsername,
  recordReaderLogin,
  type ReaderAccountCredentials,
} from "@/lib/auth/reader-accounts";
import { getDatabaseClient } from "@/lib/db/client";

export type AuthenticationResult =
  /** `sessionVersion` is set for self-registered readers; it goes into their cookie. */
  | { status: "ok"; user: ReaderUser; sessionVersion?: number }
  | { status: "invalid" }
  | { status: "unavailable" };

/** Before drizzle/0006 has run there is no reader table and so no reader to find. */
async function findReader(
  sql: NonNullable<ReturnType<typeof getDatabaseClient>>,
  username: string,
): Promise<ReaderAccountCredentials | null> {
  try {
    return await findReaderCredentialsByUsername(sql, username);
  } catch (error) {
    const code =
      (error as { code?: unknown } | null)?.code ??
      (error as { sourceError?: { code?: unknown } } | null)?.sourceError?.code;
    if (code === "42P01") return null;
    throw error;
  }
}

/**
 * Verifies a username/password pair.
 *
 * Three properties matter beyond the obvious one:
 *  - A username that does not exist still pays for one scrypt verification, so the
 *    response time does not reveal which accounts are real.
 *  - The owner may still be on the original env-backed SHA-256 gate. The first
 *    successful login re-hashes the plaintext with scrypt and stores that instead,
 *    so the password is never written to source, config, or a migration.
 *  - Owner-created accounts and self-registered readers share one sign-in. Both
 *    tables are read in parallel, so the response time does not tell which one holds
 *    a name, and an owner-created account always wins a (theoretical) name clash.
 */
export async function authenticateUser(
  username: string,
  password: string,
  legacyPasswordHash: string,
): Promise<AuthenticationResult> {
  const sql = getDatabaseClient();

  if (!sql) {
    // Local development without a database: the original single-account gate.
    if (username !== ownerUsername()) {
      await verifyPassword(password, DUMMY_PASSWORD_HASH);
      return { status: "invalid" };
    }
    const ok = await verifyLegacyPasswordHash(password, legacyPasswordHash);
    return ok ? { status: "ok", user: localOwnerUser() } : { status: "invalid" };
  }

  let credentials;
  let reader;
  try {
    await ensureOwnerUser(sql);
    [credentials, reader] = await Promise.all([
      findCredentialsByUsername(sql, username),
      findReader(sql, username),
    ]);
  } catch (error) {
    console.error("[auth] user lookup failed", error);
    return { status: "unavailable" };
  }

  if (!credentials && reader) {
    if (!(await verifyPassword(password, reader.passwordHash))) return { status: "invalid" };
    try {
      if (needsRehash(reader.passwordHash)) {
        // Same rule as below; a reader's hash only ever changes through their own
        // password, so rewriting it here keeps the session version as it is.
        await sql.query(`UPDATE reader_accounts SET password_hash = $2 WHERE id = $1::uuid`, [
          reader.id,
          await hashPassword(password),
        ]);
      }
      await recordReaderLogin(sql, reader.id);
    } catch (error) {
      console.error("[auth] post-login update failed", error);
    }
    return {
      status: "ok",
      user: {
        id: reader.id,
        username: reader.username,
        workspaceId: reader.workspaceId,
        role: "reader",
        lastLoginAt: reader.lastLoginAt,
        createdAt: reader.createdAt,
      },
      sessionVersion: reader.sessionVersion,
    };
  }

  if (!credentials) {
    await verifyPassword(password, DUMMY_PASSWORD_HASH);
    return { status: "invalid" };
  }

  const usesLegacyScheme = credentials.hashScheme === "env-sha256";
  const ok = usesLegacyScheme
    ? credentials.role === "owner" && (await verifyLegacyPasswordHash(password, legacyPasswordHash))
    : await verifyPassword(password, credentials.passwordHash);

  if (!ok) return { status: "invalid" };

  try {
    if (usesLegacyScheme) {
      await upgradeOwnerToScrypt(sql, credentials.id, password);
    } else if (needsRehash(credentials.passwordHash)) {
      // Stored with different parameters than the current ones; rewrite it now so
      // the heavier derivation is not repeated on every future sign-in.
      await updatePasswordHash(sql, credentials.id, password);
    }
    await recordLogin(sql, credentials.id);
  } catch (error) {
    // A failed bookkeeping write must not block a correct sign-in.
    console.error("[auth] post-login update failed", error);
  }

  return {
    status: "ok",
    user: {
      id: credentials.id,
      username: credentials.username,
      workspaceId: credentials.workspaceId,
      role: credentials.role,
      lastLoginAt: credentials.lastLoginAt,
      createdAt: credentials.createdAt,
    },
  };
}
