import "server-only";

import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let cachedUrl = "";
let cachedClient: NeonQueryFunction<false, false> | null = null;

export function getDatabaseUrl(): string | null {
  const value = process.env.DATABASE_URL?.trim();
  return value ? value : null;
}

export function getDatabaseClient(): NeonQueryFunction<false, false> | null {
  const url = getDatabaseUrl();
  if (!url) return null;
  if (!cachedClient || cachedUrl !== url) {
    cachedUrl = url;
    cachedClient = neon(url);
  }
  return cachedClient;
}
