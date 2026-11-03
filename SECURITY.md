# Security policy

## Reporting a vulnerability

Please do not put the details of a security problem in a public issue. If the repository's
**Security** tab offers **Report a vulnerability** (GitHub private vulnerability reporting), use
it. Otherwise open an issue that says only that you have a security report and how to reach you,
without details, and the owner will arrange a private channel.

Useful to include: what an attacker can do, the affected route or file, steps to reproduce, and
whether you tested against your own deployment (please do not test against anyone else's).

## Scope

In scope: the application in this repository — authentication and sessions, the access rules
(`src/lib/auth/access.ts` and everything that enforces them), the reader APIs, account sign-up
and recovery, rate limiting, and anything that could expose one reader's data to another.

Out of scope: denial of service by volume, findings that need a compromised device or browser,
and third-party services (Vercel, Neon, GitHub) — report those to their vendors.

## How the application is meant to behave

- Sessions are HMAC-signed, `HttpOnly`, `SameSite=Lax`, `Secure` in production; a session that
  outlives the browser exists only if the reader ticks "Beni hatırla".
- Roles are read from the database, never from the cookie. A self-registered reader can read the
  AI and Güven Sınırı series only; anything else answers with a redirect to sign-in or a 404.
- Passwords are stored with scrypt; recovery codes as SHA-256 digests of 125-bit random codes.
  Sign-in, sign-up and recovery are rate-limited per address and per username; addresses are kept
  only as HMAC digests.
- Until `PUBLIC_LAUNCH=1`, every page but `/login` requires an account and sign-up is closed.
