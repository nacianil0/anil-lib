# Vercel Password Gate Design

Date: 2026-06-27
Status: Approved for specification by the user's request to reuse the nacianilcom password

## 1. Objective

Protect the entire anil-lib reader on Vercel with a username-free password gate.

- Reuse the existing nacianilcom password without storing its plaintext.
- Remember a successful login for seven days.
- Preserve the originally requested destination through login.
- Match the reader's existing visual language.
- Keep secrets out of tracked source files.

## 2. Verified Reference State

The nacianilcom implementation uses:

- a SHA-256 password hash;
- an HMAC-signed httpOnly cookie;
- `sameSite=lax`, production-only `secure`, and a root path;
- middleware redirecting unauthenticated page requests to `/login`;
- a safe internal-only `next` path.

Its current cookie lasts one hour. It also contains tracked fallback hash/secret constants. The plaintext password is not present in the repository, Git history, local env files, or relevant shell history. A SHA-256 hash cannot be reliably reversed.

Reusing the verified nacianilcom password hash is sufficient for the same plaintext password to work in anil-lib. The hash value itself must be copied only into ignored local env and Vercel environment variables, not this tracked design or application source.

## 3. Considered Approaches

### A. Copy nacianilcom fallback hash and cookie secret into source

This exactly mirrors the current reference implementation but exposes a reusable signing secret in a public repository. Rejected.

### B. Reuse both the password hash and cookie secret through env

This removes tracked secrets but unnecessarily couples two deployments. A leaked secret or session-signing weakness would affect both apps. Rejected.

### C. Reuse the password hash and generate an anil-lib-specific cookie secret (selected)

The same user-entered password works, while sessions are cryptographically isolated per app. Both values live only in `.env.local` and Vercel secrets.

## 4. Configuration

Tracked `.env.example` documents:

```dotenv
# SHA-256 of the private reader password. Never commit the plaintext.
SITE_PASSWORD_SHA256=replace-with-sha256-password-hash

# Independent 32-byte-or-longer HMAC secret.
AUTH_COOKIE_SECRET=replace-with-a-strong-random-secret
```

Ignored `.env.local` receives:

- the existing nacianilcom password hash;
- a newly generated random secret from `openssl rand -hex 32`.

The Vercel project must define both variables for Production, Preview, and Development as appropriate. No `NEXT_PUBLIC_` prefix is allowed.

Production is fail-closed: if either variable is absent or malformed, protected routes remain inaccessible and `/login` shows a configuration error. Local development runs without the gate only when both variables are absent and `NODE_ENV !== "production"`; the created `.env.local` enables the gate during normal local verification.

## 5. Authentication Core

Create `src/lib/auth/password-gate.ts` with Web Crypto-compatible helpers suitable for middleware and server actions:

- `AUTH_COOKIE_NAME = "anil_lib_auth"`;
- `AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7`;
- SHA-256 password hashing;
- constant-time byte comparison;
- base64url encoding/decoding;
- HMAC-SHA256 signing;
- signed payload `{ exp: number }`;
- configuration parsing and validation;
- safe internal redirect-path validation.

The cookie value is `<base64url-payload>.<base64url-signature>`. Verification rejects missing parts, extra parts, malformed payloads, modified signatures, invalid secrets, and expired sessions.

The seven-day expiry exists both inside the signed payload and in the cookie `maxAge`. A client cannot extend the signed expiry by editing cookie metadata.

## 6. Request Flow

### Middleware

Root `middleware.ts` protects all application content except:

- `/login` and its server action requests;
- `/_next/*` framework assets;
- favicon and public font/image/static asset extensions needed to render login.

Do not expose article routes, catalog data, or future API routes through a broad `/api` exemption.

For each protected request:

1. Load and validate env configuration.
2. If production config is missing, redirect to `/login?error=config&next=...`.
3. Verify the signed cookie.
4. Continue when valid.
5. Otherwise redirect to `/login?next=<safe-relative-path>`.

### Login

`src/app/login/actions.ts` implements a server action:

1. Validate `next` as an internal relative path.
2. Load config.
3. Compare the submitted password to the configured hash.
4. On failure, redirect back with a generic `invalid` state.
5. On success, set the seven-day cookie and redirect to `next`.

The action never logs, returns, serializes, or stores the plaintext password.

### Session close

A small `Kilidi kapat` action in the reader sidebar and mobile footer clears the cookie and returns to `/login`. It uses a familiar lock icon, not a large text control. A week-long session needs an explicit way to end access on a shared device.

## 7. Login UI Design

### Subject and job

This is the locked entrance to a private, sequenced AI research shelf. Its single job is to accept the password and return the reader to the requested article.

### Visual direction

Reuse the reader tokens and fonts rather than introducing an auth-product aesthetic:

- paper/surface backgrounds and graphite text;
- burgundy for focus and the unlock action;
- cool steel blue only for quiet supporting status;
- Newsreader title, Inter controls, JetBrains Mono index/status text.

The layout is a compact unframed folio centered in the viewport. A vertical burgundy spine and a small lock index tie it to the sidebar's reading-spine signature. The page is not a marketing hero and does not use gradients, blobs, glass effects, oversized typography, or nested cards.

Suggested copy:

- status: `Özel kütüphane`;
- heading: `Yapay Zekâyı Okumak`;
- instruction: `Okuma listesine erişmek için şifreyi gir.`;
- field label: `Şifre`;
- action: `Kilidi aç`;
- invalid error: `Şifre eşleşmedi.`;
- configuration error: `Erişim yapılandırması eksik. Vercel ortam değişkenlerini kontrol et.`

The form provides visible focus, `autocomplete="current-password"`, an accessible label, disabled/config states, and a stable error region. Metadata sets `robots: { index: false, follow: false }`.

## 8. Security Boundaries

This is a practical privacy gate, not multi-user identity or authorization.

- No username, account database, OAuth, recovery, or role system.
- No plaintext password in code, docs, logs, test snapshots, or browser storage.
- Password hash and HMAC secret remain server-only.
- Cookies are `httpOnly`, `sameSite=lax`, `path=/`, and `secure` in production.
- Internal redirect validation blocks protocol-relative and login-loop paths.
- Error messages do not reveal whether a password hash or signing secret is valid.
- The implementation does not claim rate limiting; Vercel firewall controls remain the deployment-level mitigation for brute-force traffic.

## 9. Testing

### Unit tests

- Password hashes verify correctly and reject wrong/malformed inputs.
- Signed sessions verify before seven days and reject after expiry.
- Tampered payload/signature and a different secret are rejected.
- Safe `next` paths preserve internal routes and reject external/protocol-relative/login-loop values.
- Missing/malformed production env is fail-closed.

### End-to-end tests

Playwright's local web server receives a dedicated test password hash and test-only signing secret.

- An unauthenticated article request redirects to `/login` and preserves `next`.
- Wrong password shows the generic error and does not set a valid cookie.
- Correct password redirects to the originally requested article.
- The resulting cookie is httpOnly and has a seven-day maximum age.
- A valid session can use all existing reader, progress, sidebar, batch, and mobile tests.
- Logout clears access and returns to login.
- Login renders without overlap or clipped text on desktop and mobile.

## 10. Vercel Readiness

- Add `.env.example` with placeholders and generation commands.
- Create ignored `.env.local` for local verification using the existing hash and a new secret.
- Document the two Vercel variables and required environments.
- Do not create `vercel.json` unless a real platform setting requires it; Next.js middleware and server actions work without one.
- Run a production build with the gate configured.

The repository is not currently linked to a Vercel project and the Vercel CLI is not installed, so this task prepares and verifies deployment configuration but does not invent a project ID or silently create a Vercel project.

## 11. Files Expected to Change

- `.env.example`;
- ignored `.env.local`;
- `middleware.ts`;
- `src/lib/auth/password-gate.ts`;
- `src/lib/auth/password-gate.test.ts`;
- `src/app/login/actions.ts`;
- `src/app/login/page.tsx`;
- reader sidebar/mobile footer components for the lock action;
- labels and styles required by login/logout UI;
- Playwright config and e2e tests;
- root metadata for private indexing behavior;
- OpenWolf records required by actual work.

## 12. Acceptance Criteria

- The same plaintext password accepted by nacianilcom is accepted through the reused hash.
- No tracked file contains the live hash, plaintext password, or live HMAC secret.
- Successful login remains valid for seven days unless the user explicitly locks the app.
- Protected article routes cannot be read without a valid signed cookie.
- Production env errors fail closed.
- Login returns to the original safe route.
- Login and logout UI match the reader's established visual system.
- Unit, e2e, build, and desktop/mobile visual checks pass alongside the classification-batch changes.
