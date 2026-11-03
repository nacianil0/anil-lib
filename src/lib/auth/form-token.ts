import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * A signed issue time for the public account forms. A form posted sooner than a
 * person could fill it in, or long after it was served, is refused — a cheap brake on
 * scripted sign-ups that needs no third-party CAPTCHA and sets no cookie.
 */
const MIN_FILL_MS = 2_000;
const MAX_AGE_MS = 2 * 60 * 60 * 1000;

function sign(issuedAt: number, secret: string): string {
  return createHmac("sha256", `form-token:${secret}`).update(String(issuedAt)).digest("hex");
}

export function issueFormToken(secret: string, nowMs = Date.now()): string {
  return `${nowMs}.${sign(nowMs, secret)}`;
}

export function formTokenIsValid(token: unknown, secret: string, nowMs = Date.now()): boolean {
  if (typeof token !== "string") return false;
  const [issuedRaw, signature, extra] = token.split(".");
  if (!issuedRaw || !signature || extra !== undefined || !/^\d{13}$/.test(issuedRaw)) return false;
  const issuedAt = Number(issuedRaw);
  const expected = Buffer.from(sign(issuedAt, secret), "hex");
  const actual = Buffer.from(signature, "hex");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
  const age = nowMs - issuedAt;
  return age >= MIN_FILL_MS && age <= MAX_AGE_MS;
}
