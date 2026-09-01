/**
 * `server-only` throws unless the bundler resolves its `react-server` condition,
 * which Vitest does not do. Aliasing it here lets server modules be unit tested
 * while the real package keeps guarding the client bundle at build time.
 */
export {};
