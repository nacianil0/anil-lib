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
};

export default nextConfig;
