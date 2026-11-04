/**
 * The public site's identity: its name and the origin canonical links, the sitemap,
 * OpenGraph and JSON-LD are built against.
 *
 * `SITE_URL` (for example `https://example.org`) names the canonical domain. Without
 * it the Vercel production domain the platform exposes is used, and outside Vercel a
 * local address — so a misconfigured deploy produces links to its own production
 * alias, never to a guessed domain.
 */
export const SITE_NAME = "Anıl Lib";

export const SITE_DESCRIPTION =
  "Yapay zekâyı sıfırdan araştırma derinliğine taşıyan, kaynakları gösterilmiş 118 yazılık Türkçe öğrenme serisi ve güvenli yazılım serisi.";

function normalizeOrigin(value: string): string | null {
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function siteOrigin(): string {
  const configured = process.env.SITE_URL?.trim();
  if (configured) {
    const origin = normalizeOrigin(configured);
    if (origin) return origin;
  }
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) {
    const origin = normalizeOrigin(vercel);
    if (origin) return origin;
  }
  return "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteOrigin()).toString();
}

/**
 * JSON for a `<script type="application/ld+json">`. `<` is escaped so no string in
 * the data — a title, a summary — can close the script element early.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * The data controller named on the privacy page (KVKK art. 10), as the owner gave it.
 * The contact is where KVKK art. 11 requests go; it is shown only when one is set.
 * While the whole entry is empty, the page says so plainly.
 */
export const DATA_CONTROLLER: { name: string; contact?: string } | null = {
  name: "Naci Anıl Akman",
  contact: "nacianilakman@gmail.com",
};

/** The day the privacy page last changed in substance. */
export const PRIVACY_UPDATED_AT = "2026-11-03";

/**
 * The shared preview card (src/app/opengraph-image.png). Named explicitly wherever a
 * page sets its own `openGraph`: Next replaces the parent's `openGraph` wholesale, so
 * without this such a page would be shared with no image at all.
 */
export const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Anıl Lib — Yapay zekâyı sıfırdan, kaynağıyla okumak. 118 yazılık öğrenme serisi.",
};
