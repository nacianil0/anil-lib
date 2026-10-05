# Series progress reset implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use $execute-plan to implement this plan task by task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Let each signed-in reader safely restart one series from its first article without losing other reading or annotations.
**Architecture:** Give each workspace and series its own reset epoch. Server-selected article IDs define the scope; sync rejects stale writes, and the client clears only the matching progress and pending writes while ignoring older in-flight responses. An inline confirmation on each series landing applies the reset after server success.
**Tech Stack:** Next.js, React, Zod, Neon PostgreSQL, Vitest, Playwright.

## Server and protocol

Files: `drizzle/0004_series_reading_resets.sql`, `src/lib/db/schema.ts`, `src/lib/reader-data/series-reset.ts`, `src/lib/reader-data/schema.ts`, `src/lib/reader-data/sync-contract.ts`, `src/lib/reader-data/server/reset-service.ts`, `src/lib/reader-data/server/sync-service.ts`, `src/app/api/reader-reset/route.ts`, `src/app/api/reader-sync/route.ts` and corresponding service/route tests.

- [x] Define `SeriesId = "ai" | "boun"`, `SeriesReset = { seriesId: SeriesId; resetVersion: number; articleIds: string[] }`; reset request strictly accepts `{seriesId}`, response `{reset: SeriesReset, progress: number}`. Sync request carries optional `seriesResetVersions`; response carries optional `seriesResets`, both backward compatible. Stored data defaults `seriesResets` to `[]`.
- [x] Test workspace ownership, canonical delete scope, preservation of annotations, stale-series guards, and request authentication/validation before implementing the services.
- [x] Add a keyed workspace/series epoch table; scoped reset locks progress, increments the epoch, and deletes catalog-selected IDs atomically. Sync acquires the progress lock before epoch-guarded writes and returns reset scopes before reading progress.
- [x] Run `corepack pnpm exec vitest run src/lib/reader-data/server src/app/api/reader-reset`; expect all tests to pass.

## Client and interface

Files: `src/lib/reader-data/merge.ts`, `src/lib/reader-data/sync-client.ts`, `src/lib/reader-data/use-reader-data.tsx`, `src/components/reader/reader-shell.tsx`, `src/components/series/series-progress-reset.tsx`, `src/components/series/series-landing.tsx`, `src/app/seri/page.tsx`, `src/app/boun/page.tsx`, merge/provider/schema tests, `tests/e2e/series-reset.spec.ts`.

- [x] Test scoped clearing and preservation of other-series records/outboxes, old response rejection, new-device adoption, and unchanged data after request failure.
- [x] Merge reset scopes by greatest epoch, clear only changed scopes, and discard incoming progress whose reset epoch is older than the stored epoch. A reset response applies immediately; a current article uses the maximum global/scoped epoch to invalidate its restored position.
- [x] Add “İlerlemeyi sıfırla” next to series progress. A separate confirmation step explains the scope, preserves bookmarks/highlights, focuses “Vazgeç”, guards rapid second clicks and repeat requests, and announces errors/success. On success the landing points to the first article.
- [x] Run `corepack pnpm exec vitest run src/lib/reader-data`; expect all tests to pass. Browser tests must cover cancellation, confirmation, isolated scope, failure, and desktop/mobile rendering using local stubbed APIs.

## Verification and delivery

- [x] Read the complete diff and obtain independent scope/race review; repair material findings.
- [x] Run `corepack pnpm typecheck`, `corepack pnpm lint`, `corepack pnpm test`, and `corepack pnpm build`; expect exit code 0. Build and browser checks use an isolated same-drive copy to avoid other sessions’ `.next` output.
- [x] Run `corepack pnpm exec playwright test tests/e2e/series-reset.spec.ts tests/e2e/reader-reset.spec.ts` locally and inspect desktop/mobile screenshots.
- [x] Update OpenWolf logs and file map; preserve the pre-existing `.wolf/anatomy.md` changes.
- [ ] Stage only feature files and this session’s log additions, commit `feat: allow readers to reset one series safely`, push the current branch as requested, and verify the remote commit. Do not inspect production or reset anyone’s actual progress.

## Verification record

- 798 unit tests and 7 local Chromium tests passed. Typecheck, changed-file lint, migration dry-run, and isolated production build passed; desktop/mobile confirmation screenshots inspected.
- Repository-wide lint remains red on pre-existing local artifacts, legacy tool imports and content/schema type-only declarations. Those files were preserved.
- No maintenance-triggered automatic reset was found in repository scripts, trigger instructions, revision handling or reset call sites; existing revision notices stay informational.
- PostgreSQL was not contacted; actual user progress stays untouched until a manual request after deployment.
