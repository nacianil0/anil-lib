import "server-only";

import { verifyLegacyPasswordHash } from "@/lib/auth/password-gate";
import { DUMMY_PASSWORD_HASH, needsRehash, verifyPassword } from "@/lib/auth/password";
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
import { getDatabaseClient } from "@/lib/db/client";

export type AuthenticationResult =
  | { status: "ok"; user: ReaderUser }
  | { status: "invalid" }
  | { status: "unavailable" };

/**
 * Verifies a username/password pair.
 *
 * Two properties matter beyond the obvious one:
 *  - A username that does not exist still pays for one scrypt verification, so the
 *    response time does not reveal which accounts are real.
 *  - The owner may still be on the original env-backed SHA-256 gate. The first
 *    successful login re-hashes the plaintext with scrypt and stores that instead,
 *    so the password is never written to source, config, or a migration.
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
  try {
    await ensureOwnerUser(sql);
    credentials = await findCredentialsByUsername(sql, username);
  } catch (error) {
    console.error("[auth] user lookup failed", error);
    return { status: "unavailable" };
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
