export const AUTH_COOKIE_NAME = "anil_lib_auth";
/** "Beni hatırla": a persistent cookie the reader explicitly asked for at sign-in. */
export const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
/**
 * Server-side lifetime of a session the reader did not ask to be remembered. Its
 * cookie carries no Max-Age, so the browser drops it on close; the signed expiry
 * still bounds a browser that restores session cookies on restart.
 */
export const AUTH_SESSION_ONLY_SECONDS = 60 * 60 * 12;

const encoder = new TextEncoder();

type GateConfig = {
  passwordHash: string;
  cookieSecret: string;
};

/**
 * Signed cookie payload. Identity lives here so the Edge middleware can authenticate
 * a request without a database round trip. `ws` is immutable per account, so it can
 * never go stale; `role` is deliberately absent — owner checks are resolved from the
 * database in the Node runtime (see `session-user.ts`).
 */
type SessionPayload = {
  uid: string;
  ws: string;
  exp: number;
  /**
   * Credential generation of a self-registered account. A password change or an
   * account recovery bumps the stored value, which voids every cookie minted before.
   * Absent for owner-created accounts, whose cookies predate it.
   */
  sv?: number;
};

export type SessionClaims = {
  userId: string;
  workspaceId: string;
  expiresAt: number;
  sessionVersion: number | null;
};

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBytes(hex: string): Uint8Array | null {
  if (!/^[a-f0-9]{64}$/i.test(hex)) return null;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function timingSafeBytesEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i++) {
    diff |= left[i] ^ right[i];
  }
  return diff === 0;
}

function base64UrlEncode(value: string | ArrayBuffer): string {
  const bytes = typeof value === "string" ? encoder.encode(value) : new Uint8Array(value);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlDecode(value: string): string | null {
  try {
    const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
}

async function sign(value: string, secret: string): Promise<string> {
  const key = await hmacKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return base64UrlEncode(signature);
}

/**
 * The original single-password gate hashed with a bare SHA-256. It survives only to
 * authenticate the owner against `SITE_PASSWORD_SHA256` until the first successful
 * login upgrades that account to scrypt (see `lib/auth/users.ts`).
 */
export async function hashLegacyPassword(password: string): Promise<string> {
  return bytesToHex(await crypto.subtle.digest("SHA-256", encoder.encode(password)));
}

export function getGateConfig(): GateConfig | null {
  const hash = process.env.SITE_PASSWORD_SHA256;
  const secret = process.env.AUTH_COOKIE_SECRET;
  if (!hash || !secret) return null;
  if (!/^[a-f0-9]{64}$/i.test(hash)) return null;
  if (secret.length < 32) return null;
  return { passwordHash: hash.toLowerCase(), cookieSecret: secret };
}

export function isGateIntended(): boolean {
  return Boolean(process.env.SITE_PASSWORD_SHA256 || process.env.AUTH_COOKIE_SECRET);
}

export async function verifyLegacyPasswordHash(
  password: string,
  expectedHash: string,
): Promise<boolean> {
  const expectedBytes = hexToBytes(expectedHash);
  if (!expectedBytes) return false;
  const actualBytes = hexToBytes(await hashLegacyPassword(password));
  if (!actualBytes) return false;
  return timingSafeBytesEqual(actualBytes, expectedBytes);
}

export async function buildSignedSession(
  secret: string,
  session: { userId: string; workspaceId: string; sessionVersion?: number },
  nowMs = Date.now(),
  lifetimeSeconds = AUTH_COOKIE_MAX_AGE_SECONDS,
): Promise<string> {
  const payload = base64UrlEncode(
    JSON.stringify({
      uid: session.userId,
      ws: session.workspaceId,
      exp: nowMs + lifetimeSeconds * 1000,
      ...(session.sessionVersion !== undefined ? { sv: session.sessionVersion } : {}),
    } satisfies SessionPayload),
  );
  const sig = await sign(payload, secret);
  return `${payload}.${sig}`;
}

/**
 * Returns the claims carried by a valid cookie, or null. Cookies minted before
 * identity existed in the payload have no `uid`/`ws` and are rejected, so a
 * pre-upgrade session cannot silently resolve to the owner.
 */
export async function verifySignedSession(
  cookieValue: string | undefined,
  secret: string,
  nowMs = Date.now(),
): Promise<SessionClaims | null> {
  if (!cookieValue) return null;

  const [payload, signature, extra] = cookieValue.split(".");
  if (!payload || !signature || extra !== undefined) return null;

  const expectedSignature = await sign(payload, secret);
  if (!timingSafeBytesEqual(encoder.encode(signature), encoder.encode(expectedSignature))) {
    return null;
  }

  const decoded = base64UrlDecode(payload);
  if (!decoded) return null;

  try {
    const parsed = JSON.parse(decoded) as Partial<SessionPayload>;
    if (typeof parsed.exp !== "number" || nowMs > parsed.exp) return null;
    if (typeof parsed.uid !== "string" || parsed.uid.length === 0) return null;
    if (typeof parsed.ws !== "string" || parsed.ws.length === 0) return null;
    return {
      userId: parsed.uid,
      workspaceId: parsed.ws,
      expiresAt: parsed.exp,
      sessionVersion: Number.isInteger(parsed.sv) ? (parsed.sv as number) : null,
    };
  } catch {
    return null;
  }
}

export function safeNextPath(value: string | null | undefined): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/";
  if (value === "/login" || value.startsWith("/login?") || value.startsWith("/login/")) return "/";
  return value;
}
