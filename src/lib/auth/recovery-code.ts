/**
 * Offline account recovery for self-registered readers (OWASP Forgot Password Cheat
 * Sheet, "Offline methods"). There is no mail service, so the code handed out at
 * sign-up is the only way back into an account whose password is lost.
 *
 * The code is 25 Crockford base32 symbols (125 random bits) from a CSPRNG, shown
 * once and stored only as a SHA-256 digest: with that much entropy a fast hash is
 * not brute-forceable, so the slow password hash would buy nothing. It is single
 * use — every successful recovery replaces it.
 */
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

/** Crockford base32: no I, L, O or U, so the code survives being read aloud or copied by hand. */
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const SYMBOLS = 25;
const GROUP = 5;

export function generateRecoveryCode(): string {
  // 5 bits per symbol: draw 16 bytes (128 bits) and use the first 125.
  const bytes = randomBytes(16);
  let bits = 0n;
  for (const byte of bytes) bits = (bits << 8n) | BigInt(byte);
  let code = "";
  for (let i = 0; i < SYMBOLS; i++) {
    const shift = BigInt(128 - 5 * (i + 1));
    code += ALPHABET[Number((bits >> shift) & 31n)];
  }
  return code.match(new RegExp(`.{1,${GROUP}}`, "g"))!.join("-");
}

/**
 * Accepts the code the way people type it back: any case, with or without the
 * dashes and spaces, and with the letters Crockford reads as digits.
 */
export function normalizeRecoveryCode(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/[\s-]+/g, "")
    .replace(/O/g, "0")
    .replace(/[IL]/g, "1");
}

export function hashRecoveryCode(code: string): string {
  return createHash("sha256").update(normalizeRecoveryCode(code), "utf8").digest("hex");
}

/** Constant-time check of a typed code against a stored digest. Malformed input is a miss. */
export function verifyRecoveryCode(typed: string, storedHash: string): boolean {
  const normalized = normalizeRecoveryCode(typed);
  if (normalized.length !== SYMBOLS || /[^0-9A-HJKMNP-TV-Z]/.test(normalized)) return false;
  if (!/^[a-f0-9]{64}$/.test(storedHash)) return false;
  const actual = Buffer.from(hashRecoveryCode(normalized), "hex");
  const expected = Buffer.from(storedHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
