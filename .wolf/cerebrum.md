# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-06-26

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

- Execute explicit setup and GitHub publishing requests promptly, and report the verified state directly.
- Expects real verification before any "done" claim: run typecheck, lint, unit tests, production build, e2e, and capture desktop/mobile screenshots; never claim success without evidence.
- Values distinctive, non-templated UI with one justified signature element, but when a brief pins the visual direction (fonts, palette, radius limits) follow it exactly.

## Key Learnings

- **Project:** anil-lib
- OpenWolf 1.0.4 resolves the project root from markers such as `.git` or `package.json`; without a local marker it may select a parent repository.
- GitHub publishing on this machine uses `gh` HTTPS credentials; SSH private keys are not configured.
- macOS BSD `sed` does not support multi-line branch/loop (`{$d;N;ba;}`) syntax that works in GNU sed; use Python for content normalization and hash computation.
- `git mv` stages the rename but does NOT re-stage content modifications made before the move; run `git add` on the moved files afterward to stage frontmatter changes.
- The nacianilcom gate stores only a SHA-256 hash; its plaintext password is not recoverable from the repository or relevant shell history. Reusing that hash preserves password compatibility.
- **Reader app (anil-lib-reader):** Next 15 App Router + React 19 + TS strict + Tailwind 3.4. Server-only content layer in `src/lib/content` (reads `content/catalog.json` + `content/articles/**`, Zod-validated, path-traversal guarded); browser progress in `src/lib/progress` (localStorage key `anil-lib:reader-progress:v1`); UI in `src/components/reader`. Main route `/read/[slug]` is statically generated; `/` client-redirects to last/first article.
- Article Markdown is rendered with a `unified` pipeline (`remark-parse` → `remark-gfm` → `remark-rehype` (no allowDangerousHtml) → `rehype-slug` → `rehype-react`), NOT `next-mdx-remote`. This drops raw HTML by default and never chokes on Turkish prose containing `<`/`{`.
- `next/font/google` self-hosts Newsreader/Inter/JetBrains Mono at build time (build needs network once; no runtime external font request).
- pnpm 10 blocks dependency build scripts: run `pnpm rebuild esbuild` (Vitest/Vite needs the esbuild binary) and `pnpm exec playwright install chromium` after install.
- Next 15.5 appends a `./.next/types/routes.d.ts` reference to `next-env.d.ts` and shows a dev-only floating "N" indicator (absent in `next start` production).
- A stray `~/package-lock.json` makes Next infer the wrong workspace root; pin `outputFileTracingRoot: import.meta.dirname` in `next.config.mjs`.
- Visual QC: `openwolf designqc --url <running-dev-url> --routes <route>` saves sectioned JPEGs to `.wolf/designqc-captures/`.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

- [2026-06-27] Do not hold explicit install or publish operations behind creative-design brainstorming. Complete independent operational work first, then use the design gate for the generated prompt or application architecture.
- [2026-06-27] ESLint 9 flat config scans `.wolf/hooks/*.js` (OpenWolf's own scripts) and fails on their empty catch blocks; add `".wolf/**"` to the eslint `ignores`.
- [2026-06-27] In the reader, child effects (ReaderShellInner) run before the provider's hydrate effect on mount; gate `setCurrentArticle`/`recordPosition` behind `ready`, or the first write clobbers saved localStorage progress before it is read back.
- [2026-06-27] Node scripts placed in the session scratchpad cannot resolve the project's `node_modules`; run them with `NODE_PATH=<project>/node_modules node script.cjs`.
- [2026-06-27] In Playwright against `next dev`, a single click can race React hydration; use `await expect(async () => { if (notPressed) click(); await expect(pressed).toBeVisible(); }).toPass()` so retries never double-toggle.

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

- [2026-06-27] Build a single Next.js reader backed by a file contract instead of copying the full nacianilcom Studio monorepo; authoring UI and API services are outside the requested scope.
- [2026-06-27] Make article ingestion idempotent with persistent `article_id` frontmatter, normalized content hashes, and `content/catalog.json`; normal reruns never reclassify existing articles.
- [2026-06-27] Track ingestion cohorts with immutable append-only `classification_batch` values separate from `classification_version`; the current 18 articles are Batch 1 and each successful future import creates one next batch.
- [2026-06-27] Protect the Vercel reader with the existing nacianilcom password hash, a new app-specific env-only HMAC secret, and a seven-day signed httpOnly cookie; production must fail closed when env is missing.
- [2026-06-27] Render article Markdown with the `unified` remark/rehype→React pipeline instead of `next-mdx-remote`: guarantees raw HTML is dropped (no `rehype-raw`), avoids MDX parsing arbitrary prose, and is fully RSC/React-19 compatible while still using gray-matter, remark-gfm, and rehype-slug.
- [2026-06-27] Signature UI is a continuous "reading spine" threading all 18 numbered chapters in the sidebar — justified because the catalog is a single pedagogically ordered sequence, so reading-order numbers carry real information.
- [2026-06-27] Disable ESLint during `next build` (`eslint.ignoreDuringBuilds`) and enforce lint as a separate `pnpm lint` gate, decoupling the production build from ESLint plugin resolution.
- [2026-06-27] Keep the live per-article scroll ratio in shell-local state, not the progress context, so the 18-row sidebar does not re-render on every scroll frame.
