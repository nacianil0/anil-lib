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
- The cookie carries no role: pages, owner tools and the reset API read it from the account row
  (with no database the only account is the environment-configured owner). The sync API scopes
  writes by the HMAC-signed workspace and re-checks self-registered readers in the database.
- A self-registered reader can read the AI and Güven Sınırı series only. Pages answer anything
  else with a redirect to sign-in or a 404; the reset API answers 403 and the sync API rejects
  writes outside those series.
- Account passwords are stored with scrypt. The owner starts from the unsalted SHA-256 in
  `SITE_PASSWORD_SHA256`, replaced by scrypt at the first sign-in when a database is configured.
  Recovery codes are stored as SHA-256 digests of 125-bit random codes.
- Failed sign-ins and recovery attempts are rate-limited per address and per username; sign-ups
  per address and by a global hourly ceiling. The limits need the database: a limiter failure lets
  sign-in proceed but closes sign-up and recovery. Addresses and usernames are kept only as HMAC
  digests.
- Until `PUBLIC_LAUNCH=1`, every page but `/login` and `/robots.txt` requires an account and
  sign-up is closed.
