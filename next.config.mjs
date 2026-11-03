/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the file-tracing root to this project; a stray lockfile in the home
  // directory otherwise makes Next infer the wrong workspace root.
  outputFileTracingRoot: import.meta.dirname,
  // Linting is enforced as its own quality gate (`pnpm lint`) so the production
  // build does not depend on ESLint plugin resolution.
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Baseline headers for a public site. Deliberately no script-src policy: the theme
  // script and Next's own inline scripts would need nonces, and a policy that has to be
  // loosened to work protects nothing. Framing is refused outright — nothing here is
  // meant to be embedded, and it closes off clickjacking of the account forms.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
