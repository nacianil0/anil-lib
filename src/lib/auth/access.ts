/**
 * Who may read what. The single source of truth for collection access: the Edge
 * middleware, every page, the reader APIs and the dashboard all decide from here,
 * so a rule cannot hold in one layer and be forgotten in another.
 *
 * Deliberately free of Node and database imports — the middleware runs on the Edge
 * runtime and imports this file.
 */

/**
 * `reader` is a self-registered external account (`reader_accounts`), `user` an
 * account the owner created (`users`), `owner` the library's owner.
 */
export type AccessRole = "owner" | "user" | "reader";

/** Every readable collection: the three series plus the owner's pre-series archive. */
export type ReadableCollection = "ai" | "guvenlik" | "boun" | "archive";

const COLLECTIONS_BY_ROLE: Record<AccessRole, readonly ReadableCollection[]> = {
  owner: ["ai", "guvenlik", "boun", "archive"],
  user: ["ai", "guvenlik", "boun"],
  reader: ["ai", "guvenlik"],
};

/** Published to everyone, without an account. Only the AI series. */
const ANONYMOUS_COLLECTIONS: readonly ReadableCollection[] = ["ai"];

/** `null` is an anonymous visitor. */
export function canRead(role: AccessRole | null, collection: ReadableCollection): boolean {
  const allowed = role ? COLLECTIONS_BY_ROLE[role] : ANONYMOUS_COLLECTIONS;
  return allowed.includes(collection);
}

/**
 * Workspace keys of self-registered accounts carry this prefix. The workspace sits in
 * the HMAC-signed session cookie, so the reader APIs can narrow an external account's
 * scope from the cookie alone, before any database round trip. Owner-created accounts
 * use a bare uuid and the owner the literal `owner`, so neither can collide with it.
 */
export const READER_WORKSPACE_PREFIX = "r:";

export function isReaderWorkspace(workspaceId: string): boolean {
  return workspaceId.startsWith(READER_WORKSPACE_PREFIX);
}

/**
 * Reading state of a visitor without an account. Never sent to the server: it only
 * names this browser's own `localStorage` entry, which no account shares.
 */
export const LOCAL_WORKSPACE_ID = "local";

const SLUG_SEGMENT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Deploying the code and opening the site to the public are separate decisions. Until
 * `PUBLIC_LAUNCH=1` is set for an environment, the site behaves as it always did: every
 * page but the sign-in asks for an account, and nobody can sign up. Closed by default,
 * so a deploy without the setting can never open anything by accident.
 */
export function publicLaunchEnabled(
  env: Record<string, string | undefined> = process.env,
): boolean {
  return env.PUBLIC_LAUNCH === "1";
}

/** Before the launch: the sign-in page, and robots.txt to keep crawlers out. */
const PRE_LAUNCH_PUBLIC_PAGES = new Set(["/login", "/robots.txt"]);

/** Pages anyone may request without a session once launched. Everything else stays behind the gate. */
const PUBLIC_PAGES = new Set([
  "/",
  "/seri",
  "/login",
  "/kayit",
  "/hesap-kurtar",
  "/gizlilik",
  "/robots.txt",
  "/sitemap.xml",
]);

/**
 * Whether a request path may pass the middleware without a session. Exact matches
 * only — `/seri/<slug>` is public, `/seri/<slug>/anything` and `/serix` are not —
 * and the page itself still decides what an anonymous visitor sees.
 */
export function isPublicPath(pathname: string, launched: boolean): boolean {
  if (!launched) return PRE_LAUNCH_PUBLIC_PAGES.has(pathname);
  if (PUBLIC_PAGES.has(pathname)) return true;
  if (pathname.startsWith("/seri/")) {
    return SLUG_SEGMENT.test(pathname.slice("/seri/".length));
  }
  return false;
}
