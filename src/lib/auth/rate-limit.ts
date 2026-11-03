import "server-only";

import { createHmac } from "node:crypto";
import type { SqlClient } from "@/lib/auth/users";

/**
 * Fixed-window counters in Postgres, the one store every serverless instance shares.
 * No new service: the table is created by `drizzle/0006_reader_accounts.sql`.
 *
 * Subjects (an IP address, a username) are never stored as given: the bucket key is
 * an HMAC of the subject, so the table holds no raw IP addresses and cannot be read
 * back into a list of who tried what. Windows older than a day are deleted.
 */
export type RateLimitRule = {
  name: string;
  windowSeconds: number;
  limit: number;
};

export const RATE_LIMITS = {
  /** Failed sign-ins from one address. */
  loginIp: { name: "login-ip", windowSeconds: 15 * 60, limit: 30 },
  /**
   * Failed sign-ins against one username from anywhere. Associated with the account,
   * not the address, so spreading guesses over many addresses does not help (OWASP
   * Authentication Cheat Sheet). The window is short so a lockout cannot last.
   */
  loginAccount: { name: "login-acct", windowSeconds: 15 * 60, limit: 10 },
  /** Sign-up attempts from one address, successful or not — this is what slows username probing. */
  registerIp: { name: "register-ip", windowSeconds: 60 * 60, limit: 5 },
  /** All sign-ups together; bounds a flood from many addresses. */
  registerAll: { name: "register-all", windowSeconds: 60 * 60, limit: 60 },
  recoverIp: { name: "recover-ip", windowSeconds: 15 * 60, limit: 10 },
  recoverAccount: { name: "recover-acct", windowSeconds: 15 * 60, limit: 5 },
} as const satisfies Record<string, RateLimitRule>;

/** One-way bucket key; `secret` is the server's cookie secret, used here with its own label. */
export function bucketKey(rule: RateLimitRule, subject: string, secret: string): string {
  const digest = createHmac("sha256", `rate-limit:${secret}`).update(subject).digest("hex");
  return `${rule.name}:${digest.slice(0, 32)}`;
}

const WINDOW_START = `to_timestamp((floor(extract(epoch FROM now()) / $2::int) * $2::int)::double precision)`;

/** Hits recorded in the current window, without adding one. */
export async function currentHits(
  sql: SqlClient,
  key: string,
  rule: RateLimitRule,
): Promise<number> {
  const rows = (await sql.query(
    `SELECT hits FROM auth_rate_limits WHERE bucket = $1 AND window_start = ${WINDOW_START}`,
    [key, rule.windowSeconds],
  )) as Record<string, unknown>[];
  return rows.length > 0 ? Number(rows[0].hits) : 0;
}

/** Adds a hit to the current window and returns the window's new total. */
export async function recordHit(sql: SqlClient, key: string, rule: RateLimitRule): Promise<number> {
  const rows = (await sql.query(
    `INSERT INTO auth_rate_limits (bucket, window_start, hits)
     VALUES ($1, ${WINDOW_START}, 1)
     ON CONFLICT (bucket, window_start) DO UPDATE SET hits = auth_rate_limits.hits + 1
     RETURNING hits`,
    [key, rule.windowSeconds],
  )) as Record<string, unknown>[];
  if (Math.random() < 0.02) {
    // Housekeeping rides on an occasional write instead of a scheduled job.
    await sql.query(`DELETE FROM auth_rate_limits WHERE window_start < now() - interval '1 day'`);
  }
  return rows.length > 0 ? Number(rows[0].hits) : 1;
}

export async function isOverLimit(
  sql: SqlClient,
  key: string,
  rule: RateLimitRule,
): Promise<boolean> {
  return (await currentHits(sql, key, rule)) >= rule.limit;
}
