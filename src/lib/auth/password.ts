/**
 * Password hashing for reader accounts.
 *
 * Uses `node:crypto` scrypt so no new dependency is required. Runs in the Node
 * runtime only: the Edge middleware never verifies passwords, it only checks the
 * signed session cookie (see `password-gate.ts`).
 */
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";

const SCHEME = "scrypt";
const COST = 32_768;
const BLOCK_SIZE = 8;
const PARALLELISM = 1;
const KEY_LENGTH = 32;
/** 128 * COST * BLOCK_SIZE is ~32 MB; leave headroom above the 32 MB default. */
const MAX_MEMORY = 96 * 1024 * 1024;

/**
 * A syntactically valid hash of a value nobody knows. Verifying against it makes a
 * miss on the users table cost the same as a wrong password, so login responses do
 * not leak which usernames exist.
 */
export const DUMMY_PASSWORD_HASH =
  "scrypt$32768$8$1$X66gHBvcCQhi+jyHm6kqsw==$oZa3U6lwTFLfhwqsKMd+Tag57wHEeLPhfyQmq8z+GhM=";

function derive(
  password: string,
  salt: Buffer,
  cost: number,
  blockSize: number,
  parallelism: number,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(
      password.normalize("NFKC"),
      salt,
      KEY_LENGTH,
      { N: cost, r: blockSize, p: parallelism, maxmem: MAX_MEMORY },
      (error, key) => (error ? reject(error) : resolve(key)),
    );
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await derive(password, salt, COST, BLOCK_SIZE, PARALLELISM);
  return [
    SCHEME,
    COST,
    BLOCK_SIZE,
    PARALLELISM,
    salt.toString("base64"),
    key.toString("base64"),
  ].join("$");
}

/**
 * Constant-time comparison against a stored `scrypt$...` string. Returns false for
 * any malformed input instead of throwing, so a corrupt row cannot crash login.
 */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== SCHEME) return false;

  const cost = Number(parts[1]);
  const blockSize = Number(parts[2]);
  const parallelism = Number(parts[3]);
  if (!Number.isInteger(cost) || cost < 1_024 || cost > 1_048_576) return false;
  if (!Number.isInteger(blockSize) || blockSize < 1 || blockSize > 32) return false;
  if (!Number.isInteger(parallelism) || parallelism < 1 || parallelism > 16) return false;

  const salt = Buffer.from(parts[4], "base64");
  const expected = Buffer.from(parts[5], "base64");
  if (salt.length < 8 || expected.length !== KEY_LENGTH) return false;

  let actual: Buffer;
  try {
    actual = await derive(password, salt, cost, blockSize, parallelism);
  } catch {
    return false;
  }
  return timingSafeEqual(actual, expected);
}

/** True when a stored hash uses parameters weaker than the current defaults. */
export function needsRehash(stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== SCHEME) return true;
  return (
    Number(parts[1]) !== COST ||
    Number(parts[2]) !== BLOCK_SIZE ||
    Number(parts[3]) !== PARALLELISM
  );
}
