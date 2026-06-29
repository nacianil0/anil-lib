# Synced Reading Marks and Dashboard Design

Date: 2026-06-29  
Status: Approved direction; awaiting written-spec review

## 1. Objective

Turn the private reader into a single-user, cross-device reading workspace. The reader must support:

- selecting a sentence or arbitrary prose fragment and saving it as a highlight;
- jumping back to any saved highlight;
- explicitly marking one “Burada kaldım” location per article;
- showing recent reading positions, explicit locations, highlights, and progress on a real home page;
- synchronizing those records automatically across authenticated devices;
- continuing to work locally when the database or network is unavailable.

The existing article catalog, Markdown files, reading order, completion behavior, preference system, and visual identity remain authoritative.

## 2. Product and Identity Boundaries

This release is intentionally single-user. The existing password gate represents the owner of one private workspace; it does not become a multi-user account system. No email, profile, users table, invitation flow, or password-reset flow is added.

The plaintext site password must never enter source control, browser storage, API payloads, logs, or the database. Authentication continues through the existing signed, `httpOnly` session cookie. Every sync API route validates that session in addition to the middleware boundary.

Multi-user support is explicitly outside scope. The data model keeps a constant server-side workspace identifier so a later migration can introduce real user IDs without changing highlight and progress semantics.

## 3. Hosting Decision

The application remains deployed at the existing Vercel project and domain. PostgreSQL is provisioned as a Neon native storage integration from the Vercel Marketplace; it is not hosted inside the Next.js process.

This follows the current Vercel platform model:

- Vercel Postgres is no longer offered for new databases; Marketplace Postgres integrations are the supported path: <https://vercel.com/docs/postgres>
- Marketplace storage provisions the database and injects credentials into the connected project as environment variables: <https://vercel.com/docs/marketplace-storage>
- Neon is available as a Vercel-native, serverless Postgres integration: <https://vercel.com/marketplace/neon>

Deployment layout:

```text
Browser
  ├── local reader-data cache and pending mutations
  └── same-origin /api/reader-sync
          └── Vercel Function
                  └── server-only DATABASE_URL
                          └── Neon PostgreSQL
```

The Neon region and Vercel Function region must be colocated as closely as the available project configuration allows. Production and Preview receive separate Neon branches or credentials; automated tests never write to the production database. Local development obtains development credentials through Vercel environment pulling or a non-production Neon branch.

## 4. Considered Approaches

### A. Local-first cache plus managed Postgres — selected

Every user action updates the local view immediately and queues an idempotent mutation. Background synchronization sends mutations to a Vercel Function and merges the returned canonical snapshot. Reading and marking remain usable offline, and the same data appears after signing in on another device.

This adds a sync protocol but provides the required responsiveness, resilience, and cross-device behavior.

### B. Server-first writes

Each mark or progress update waits for the database. The server is simpler, but the reader becomes connection-dependent and continuous scroll updates feel fragile. Rejected.

### C. One cloud JSON document

The entire workspace is overwritten as one object. Initial setup is small, but concurrent devices can erase each other’s unrelated changes and deletion history is ambiguous. Rejected.

## 5. Domain Model

The database uses four focused tables. All timestamps stored in Postgres are timezone-aware.

### `reading_progress`

One row per article:

- `workspace_id`
- `article_id`
- `heading_id`
- `scroll_ratio`
- `completed`
- `last_read_at`
- `client_updated_at`
- `server_updated_at`
- `device_id`
- `change_version`, assigned from one database sequence for cursor-based pulls

The `(workspace_id, article_id)` pair is unique. This table replaces the cloud representation of the current local progress object without changing its visible completion rules.

### `saved_places`

At most one explicit location per article:

- `workspace_id`
- `article_id`
- `heading_id`
- `scroll_ratio`
- `preview_text`
- `client_updated_at`
- `server_updated_at`
- `device_id`
- `deleted_at`, retained as a tombstone when the saved place is removed
- `change_version`, assigned from the shared change sequence

Saving again in the same article replaces that article’s previous explicit place. Different articles can each have their own saved place, which is why the dashboard may show multiple “kaldığım yer” entries.

### `highlights`

One row per selected fragment:

- `id`, generated client-side as a UUID;
- `workspace_id`;
- `article_id`;
- `exact_text`;
- `prefix_text` and `suffix_text` for contextual anchoring;
- `heading_id` for section scoping;
- `block_index` and normalized start/end offsets as deterministic fallbacks;
- `created_at`;
- `client_updated_at`;
- `server_updated_at`;
- `device_id`;
- `deleted_at`, used as a tombstone so deletion reaches every device.
- `change_version`, assigned from the shared change sequence.

Only one visual highlight style is introduced in this release. Notes, tags, colors, and sharing are outside scope.

### `sync_mutations`

An idempotency ledger:

- `operation_id`, generated on the device;
- `workspace_id`;
- `device_id`;
- `entity_type` and `entity_id`;
- `operation_type`;
- `accepted_at`.

Repeated delivery of the same offline mutation therefore cannot create duplicate highlights or replay a deletion incorrectly.

## 6. Local Data and Migration

The browser gains the versioned `anil-lib:reader-data:v2` local store containing:

- the latest merged progress, saved places, and highlights;
- a stable random `device_id`;
- an outbox of pending mutations;
- the latest server sync cursor and last successful sync time.

On the first run after release:

1. Parse the existing `anil-lib:reader-progress:v1` object with its existing tolerant schema.
2. Convert each valid article record into the new local representation.
3. Preserve the legacy key until the first successful cloud merge.
4. Upload local records when the server has no corresponding newer record.
5. Write the merged v2 store and mark migration complete.
6. Keep a read-only fallback path for the legacy key for one release; do not silently discard recoverable progress.

Preferences remain in their separate existing store and are not uploaded in this release.

## 7. Sync Protocol

The client exposes a single `ReaderDataProvider`; UI components never call `localStorage` or fetch sync endpoints directly.

### Push and pull

- Local changes apply optimistically and enter the outbox immediately.
- Progress writes retain the current throttle and are batched.
- Explicit places, highlights, deletions, and completion toggles request an immediate background sync.
- The client posts pending mutations plus its sync cursor to `POST /api/reader-sync`.
- The server applies the batch in one transaction, ignores already accepted operation IDs, assigns monotonically increasing `change_version` values, and returns all canonical changes after the supplied cursor.
- The client merges the response, removes acknowledged outbox entries, advances the cursor, and broadcasts the new local state to other tabs.
- A sync runs on hydration, after local mutation, when the browser comes online, on visibility regain, and before page hide when practical.

The data set is small, but cursor-based responses avoid turning continuous reading progress into repeated full-workspace downloads.

### Conflict rules

- **Highlights:** independent UUID records merge; deletions are tombstones and win over older updates to the same UUID.
- **Saved place:** latest `(client_updated_at, device_id)` tuple wins for that article.
- **Reading progress:** the latest tuple wins for heading, ratio, and last-read time; `completed: true` is monotonic unless the user explicitly uses the existing completion toggle to set it to false, which creates a newer mutation.
- **Clock skew:** the server rejects timestamps outside a bounded tolerance and substitutes server receive time. Device ID provides a deterministic tie-breaker.
- **Unknown article IDs:** rejected per operation and reported without failing unrelated valid mutations.

## 8. Highlight Anchoring and Navigation

Typography settings must not invalidate highlights. A highlight therefore never stores viewport coordinates.

When text is selected inside `.prose-reader`, the client serializes a text-quote anchor:

- exact selected text;
- short normalized prefix and suffix;
- nearest heading ID;
- block index and normalized offsets.

Resolution order when opening an article:

1. exact quote within the recorded heading section plus matching context;
2. exact quote within the article plus matching prefix/suffix;
3. recorded block and offsets when the text still matches;
4. unresolved state.

Resolved ranges are registered after hydration through the CSS Custom Highlight API, which paints arbitrary ranges without mutating React-owned article DOM. If that API is unavailable, the saved quote and jump behavior remain available through the article marks panel and dashboard, with a slim section marker as the visual fallback. Clicking a dashboard highlight opens `/read/[slug]?highlight=<id>`, resolves the range, scrolls it below the sticky toolbar, and briefly emphasizes it.

If article content changes and a highlight cannot be resolved, its saved quote remains visible on the dashboard with a `Metindeki konumu değişmiş` status; the record is never deleted automatically.

## 9. Reader Interaction Design

### Text highlights

- Selecting non-empty prose text opens a compact contextual action labeled `İşaretle`.
- Selection spanning outside the prose container, code blocks, or tables is rejected.
- Activating the action saves immediately, renders the highlight, and announces success accessibly.
- Selecting an existing highlight exposes `İşareti kaldır`.
- Keyboard users can create a browser selection and invoke the same contextual action; the highlight list remains the guaranteed navigation/removal surface.

### “Burada kaldım”

- A bookmark control stays in the sticky reader toolbar beside contents and settings.
- Activating it captures the current heading, scroll ratio, and nearby plain-text preview.
- The control changes to a saved state and can update or remove the article’s explicit place.
- Automatic scroll progress continues independently; an explicit saved place is never moved merely because the user keeps scrolling.

### Article marks panel

A toolbar control opens a compact panel listing the current article’s explicit place and highlights. Each row jumps to its location and offers a removal action. The panel is an anchored popover on desktop and a scrollable bottom sheet on mobile, following the established reader-settings behavior.

## 10. Home Dashboard

The root route stops redirecting immediately to the latest article and becomes a private dashboard. It uses the existing editorial system rather than a generic card grid.

Sections, in order:

1. **Okumaya devam et:** the automatically tracked current article and progress, with a primary continue action.
2. **Kaldığım yerler:** explicit saved places ordered by most recently updated.
3. **İşaretlediklerim:** recent highlights showing quote, article title, section, and timestamp.
4. **Okuma durumu:** completed/in-progress/unread counts and the existing overall completion meter.
5. **Son okunanlar:** a compact recent-article list.

Empty states explain the corresponding reader action and link to the first or current article. Dashboard links deep-link to a highlight, explicit saved place, or automatic progress as appropriate. The desktop sidebar gains a clear `Ana sayfa` link; mobile navigation exposes the same route.

## 11. API and Server Modules

The implementation introduces isolated modules:

- database schema and migrations;
- server-only Neon client using `@neondatabase/serverless`;
- Drizzle ORM schemas plus reviewed SQL migrations managed with Drizzle Kit;
- authenticated single-workspace resolver;
- sync request/response Zod schemas shared across server and client;
- transactional sync service with no React dependency;
- local store, migration, merge, and outbox helpers;
- reader-data provider and hook;
- highlight anchor serializer/resolver;
- dashboard view-model builder.

`POST /api/reader-sync` accepts JSON only, validates payload size, checks same-origin request metadata, verifies the signed session, and returns structured per-operation errors. Database credentials remain server-only.

No database query is executed during static article generation. Article pages remain statically generated; sync and dashboard data are loaded after authentication through the API.

## 12. Failure and Recovery Behavior

- If Neon or the network is unavailable, local reads and mutations continue and the UI shows a quiet `Senkron bekliyor` state.
- Failed operations remain in the outbox with bounded exponential retry; retries stop while offline.
- Malformed local or server records are isolated and reported rather than resetting the complete workspace.
- An unavailable database never blocks article rendering.
- A database configuration error produces a server-side 503 from the sync endpoint and a non-destructive local-only UI state.
- A user-visible sync-status detail shows last successful sync and permits retry; it never exposes connection strings or internal errors.
- Tombstones are retained long enough for stale devices to receive deletions before cleanup.

## 13. Deployment Sequence

1. Install the Neon native integration into the existing `anil-lib` Vercel project.
2. Provision non-production and production database branches/credentials.
3. Pull development environment variables locally without committing them.
4. Add the database driver, migration tooling, schema, and initial migration.
5. Apply the migration to non-production and run integration tests.
6. Deploy a Preview, verify authentication, migration, offline behavior, and two-browser synchronization.
7. Apply the reviewed migration to Production.
8. Deploy the application and verify the existing production domain, login gate, dashboard, deep links, and cross-device sync.

The application must fail locally, not destructively: a deployment with missing database credentials keeps reading/local data available but reports sync as unavailable.

## 14. Verification

### Unit tests

- local v1-to-v2 migration;
- schema validation and corruption isolation;
- highlight serialization/resolution and unresolved behavior;
- deterministic merge and conflict rules;
- outbox idempotency and acknowledgement;
- dashboard ordering and empty states.

### API and database tests

- authenticated/unauthenticated access;
- same-origin and payload validation;
- transaction rollback for database faults;
- duplicate operation delivery;
- concurrent device updates;
- deletion tombstones;
- unknown article rejection;
- sync cursor behavior.

### End-to-end tests

- existing local progress imports without loss;
- selected text becomes a persistent highlight and deep-links correctly;
- explicit saved places remain independent from automatic scrolling;
- dashboard sections and navigation work on desktop and mobile;
- two isolated browser contexts see each other’s highlights, saved places, progress, and deletions;
- offline mutations appear immediately and synchronize after reconnection;
- production-like missing-DB behavior preserves local reading.

### Release gates

Typecheck, lint, all unit/integration tests, production build, Playwright flows, database migration dry run, desktop/mobile visual review, and a live Vercel/Neon smoke test must pass before the task is reported complete.

## 15. Acceptance Criteria

The work is complete only when:

- the existing production site remains available under its current Vercel domain and password gate;
- the owner can save, revisit, and delete arbitrary prose highlights;
- the owner can save one explicit place per article and revisit it;
- `/` is a useful dashboard for progress, saved places, highlights, and recent reading;
- existing local progress migrates without manual export;
- a second authenticated device receives the same records automatically;
- local reading and marking continue during a sync outage;
- database secrets are server-only and no plaintext password is persisted;
- production database migration and live synchronization are verified with evidence.
