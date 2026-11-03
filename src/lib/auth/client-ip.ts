/**
 * The address a request came from, for rate limiting only — never stored as given
 * (see `rate-limit.ts`).
 *
 * On Vercel the platform sets `x-real-ip` and overwrites `x-forwarded-for`, so a
 * client cannot choose its own value. Anywhere else (local development) the headers
 * may be absent; every such request then shares one bucket, which only ever makes
 * the limit stricter.
 */
export function clientIpFrom(headers: Pick<Headers, "get">): string {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  return "unknown";
}
