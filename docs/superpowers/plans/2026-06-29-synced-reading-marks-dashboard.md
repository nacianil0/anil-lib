# Synced Reading Marks and Dashboard Implementation Plan

> Source design: `docs/superpowers/specs/2026-06-29-synced-reading-marks-dashboard-design.md`

## Goal

Deliver persistent prose highlights, one explicit saved place per article, a private reader dashboard, and automatic single-user synchronization between authenticated devices through Neon Postgres connected to the existing Vercel project.

## Phase 1 — Database and contracts

### Task 1: Add database tooling

Files:

- `package.json`
- `pnpm-lock.yaml`
- `drizzle.config.ts`
- `.env.example`

Actions:

1. Add `@neondatabase/serverless`, `drizzle-orm`, and development-only `drizzle-kit`.
2. Add `db:generate`, `db:migrate`, and `db:check` scripts.
3. Document only variable names in `.env.example`; never write credentials.
4. Verify dependency installation, typecheck, and lockfile integrity.

### Task 2: Define and migrate the database schema

Files:

- `src/lib/db/schema.ts`
- `src/lib/db/client.ts`
- `drizzle/0000_reader_sync.sql`
- `src/lib/db/schema.test.ts`

Actions:

1. Define the shared change-version sequence.
2. Define `reading_progress`, `saved_places`, `highlights`, and `sync_mutations` with primary keys, tombstones, timestamps, indexes, and workspace scoping.
3. Keep the client server-only and return an explicit unavailable result when `DATABASE_URL` is absent.
4. Generate and review SQL before applying it.
5. Test schema constraints and migration SQL invariants.

### Task 3: Define shared sync contracts

Files:

- `src/lib/reader-data/schema.ts`
- `src/lib/reader-data/sync-contract.ts`
- `src/lib/reader-data/schema.test.ts`
- `src/lib/reader/version.ts`

Actions:

1. Define Zod schemas for progress, saved places, highlight anchors, mutations, acknowledgements, server changes, and cursor responses.
2. Add `anil-lib:reader-data:v2` without deleting the legacy progress key.
3. Bound text/context lengths, mutation batch size, ratios, timestamps, and cursor values.
4. Test valid data, partial corruption isolation, and rejected oversized payloads.

## Phase 2 — Authenticated sync service

### Task 4: Extract reusable server authentication

Files:

- `src/lib/auth/require-reader-session.ts`
- `src/lib/auth/require-reader-session.test.ts`
- existing password-gate modules only where necessary

Actions:

1. Verify the signed session from route handlers without exposing the secret.
2. Resolve one constant server-side workspace ID after authentication.
3. Validate same-origin mutating requests.
4. Test missing, invalid, expired, and valid sessions.

### Task 5: Implement transactional synchronization

Files:

- `src/lib/reader-data/server/sync-service.ts`
- `src/lib/reader-data/server/sync-service.test.ts`
- `src/app/api/reader-sync/route.ts`
- `src/app/api/reader-sync/route.test.ts`

Actions:

1. Apply mutation batches in one transaction.
2. Deduplicate by operation ID.
3. Validate article IDs against the catalog.
4. Implement deterministic conflict rules and deletion tombstones.
5. Allocate `change_version` and return changes after the client cursor.
6. Return 401, 403, 413, 422, or 503 without leaking internals.
7. Cover duplicates, partial invalid operations, conflicts, cursor pulls, and rollback.

## Phase 3 — Local-first reader data

### Task 6: Implement local migration, storage, merge, and outbox

Files:

- `src/lib/reader-data/storage.ts`
- `src/lib/reader-data/migration.ts`
- `src/lib/reader-data/merge.ts`
- `src/lib/reader-data/storage.test.ts`
- `src/lib/reader-data/migration.test.ts`
- `src/lib/reader-data/merge.test.ts`

Actions:

1. Migrate valid v1 progress into v2 once.
2. Preserve the v1 key until a successful cloud merge.
3. Generate stable device and operation IDs.
4. Apply optimistic mutations and retain an idempotent outbox.
5. Merge remote changes by entity and `change_version` while retaining pending local intent.
6. Test corrupt storage, retry persistence, tombstones, and two-device conflicts.

### Task 7: Build the reader-data provider and sync scheduler

Files:

- `src/lib/reader-data/use-reader-data.tsx`
- `src/lib/reader-data/sync-client.ts`
- `src/lib/reader-data/use-reader-data.test.tsx`

Actions:

1. Expose progress, saved places, highlights, sync status, and typed mutations.
2. Hydrate deterministically and gate writes until ready.
3. Sync on hydration, immediate mutations, reconnect, visibility regain, and bounded retries.
4. Preserve the current 250ms scroll-write throttle.
5. Synchronize tabs through storage events.
6. Test ready gating, offline behavior, retries, acknowledgement, and teardown flushing.

### Task 8: Replace the old progress provider without behavior regression

Files:

- `src/components/reader/reader-shell.tsx`
- reader sidebar/list/progress/completion consumers
- `src/lib/progress/*` migration or removal
- existing progress and reader tests

Actions:

1. Route existing progress APIs through `ReaderDataProvider`.
2. Preserve automatic restoration, completion, sidebar states, scroll tracking, and cross-tab behavior.
3. Keep compatibility exports temporarily only where they reduce migration risk.
4. Run all existing progress and reader tests before adding new UI.

## Phase 4 — Saved places and highlights

### Task 9: Add explicit saved places

Files:

- `src/components/reader/saved-place-control.tsx`
- `src/components/reader/reader-shell.tsx`
- `src/lib/content/labels.ts`
- component tests

Actions:

1. Reuse the shell measurement function to capture heading, ratio, and nearby preview text.
2. Add save/update/remove states with accessible Turkish labels.
3. Deep-link to an explicit place and restore below the sticky toolbar.
4. Prove that continued scrolling does not move the explicit place.

### Task 10: Implement highlight anchor serialization and resolution

Files:

- `src/lib/highlights/text-anchor.ts`
- `src/lib/highlights/text-anchor.test.ts`
- `src/lib/highlights/highlight-registry.ts`
- `src/lib/highlights/highlight-registry.test.ts`

Actions:

1. Serialize exact text, prefix/suffix, heading, block, and normalized offsets from a DOM Range.
2. Reject invalid, collapsed, out-of-prose, code, and table selections.
3. Resolve anchors in the documented fallback order.
4. Register resolved ranges through the CSS Custom Highlight API and implement the section-marker fallback.
5. Test repeated quotes, typography changes, content drift, and unresolved records.

### Task 11: Add selection action and article marks panel

Files:

- `src/components/reader/highlight-selection-action.tsx`
- `src/components/reader/article-marks.tsx`
- `src/components/reader/reader-shell.tsx`
- `src/app/globals.css`
- `src/lib/content/labels.ts`
- component tests

Actions:

1. Position a compact `İşaretle` action near valid selections.
2. Save and render the highlight immediately.
3. List the current article’s saved place and highlights in an accessible popover/bottom sheet.
4. Support jump and removal actions.
5. Verify selection, keyboard access, outside click, Escape, focus return, and mobile scrolling.

## Phase 5 — Dashboard and navigation

### Task 12: Replace root redirect with the private dashboard

Files:

- `src/app/page.tsx`
- `src/components/dashboard/reader-dashboard.tsx`
- `src/components/dashboard/dashboard-view-model.ts`
- `src/components/dashboard/*.test.tsx`
- remove or repurpose `src/app/root-redirect.tsx`

Actions:

1. Build ordered view models for continue reading, saved places, highlights, status counts, and recent articles.
2. Add useful empty states.
3. Deep-link each entry to automatic progress, explicit place, or highlight.
4. Keep initial SSR deterministic and hydrate private data locally/synchronously.
5. Verify desktop/mobile hierarchy and long quote truncation.

### Task 13: Add home and sync status navigation

Files:

- `src/components/reader/reader-sidebar.tsx`
- `src/components/reader/mobile-reading-list.tsx`
- `src/components/reader/sync-status.tsx`
- `src/lib/content/labels.ts`
- component tests

Actions:

1. Add an `Ana sayfa` link to desktop and mobile navigation.
2. Show quiet synced/pending/offline/error states and last successful sync.
3. Provide manual retry without exposing internal errors.
4. Keep the reader usable when the database is unavailable.

## Phase 6 — Provisioning, verification, and release

### Task 14: Provision Neon through Vercel

Actions:

1. Install the Neon native Marketplace integration on the existing `anil-lib` project using a no-cost plan unless the user explicitly approves a paid plan.
2. Connect Production and Preview/development resources.
3. Pull development variables locally and verify none are tracked.
4. Apply the migration to development, inspect tables, then apply to production immediately before release.

### Task 15: End-to-end and visual verification

Files:

- `tests/e2e/reader-data.spec.ts`
- existing auth/reader specs
- Playwright configuration only if required for isolated contexts

Actions:

1. Test legacy migration, selection, highlight deep-link, saved place, deletion, dashboard, and offline recovery.
2. Use two isolated browser contexts against the same non-production database to prove bidirectional synchronization.
3. Run typecheck, lint, all unit/integration tests, production build, and full E2E suite.
4. Inspect desktop and mobile screenshots; fix clipping, selection-action placement, and bottom-sheet behavior.
5. Verify the missing-database local-only path.

### Task 16: Publish and audit production

Actions:

1. Commit intentional source and migration changes.
2. Push `main` and wait for Vercel success.
3. Verify the production login gate, dashboard, article reading, highlights, saved places, and sync between two authenticated browser contexts.
4. Confirm the repository is clean, Neon migrations match source, no secret is committed, and every acceptance criterion has direct evidence.
