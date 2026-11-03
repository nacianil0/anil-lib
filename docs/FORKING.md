# Fork guide

How to take this repository, run it as your own, start a series of your own and keep it going
with agent-driven runs. Every command here was run on a clean clone (see
[Verified on a clean clone](#verified-on-a-clean-clone)); where the project has a limit, it is
stated rather than papered over.

## 1. Run your fork locally

```bash
git clone https://github.com/<you>/anil-lib.git && cd anil-lib
corepack enable                      # pnpm 10, as pinned in package.json
pnpm install --frozen-lockfile
pnpm dev                             # http://localhost:3000, open as the owner, no database
```

Nothing in a fresh clone talks to the author's services: there are no hard-coded URLs, keys or
database addresses, and with no `.env.local` the app neither connects to a database nor sends
anything anywhere. To try the access model, copy `.env.example` to `.env.local` and set
`SITE_PASSWORD_SHA256`, `AUTH_COOKIE_SECRET` and `PUBLIC_LAUNCH=1` (see the README).

Before you change anything, make sure the baseline is green on your machine:

```bash
pnpm check                           # typecheck + lint + unit tests + production build
node tools/series/check-series-content.cjs --series=ai
node tools/series/check-series-svg.cjs content/series/assets
node tools/series/sync-series-hashes.cjs --series=ai
```

## 2. Find your way around the existing series

| Series key | Content | Contract and state | Routes |
| --- | --- | --- | --- |
| `ai` | `content/series/` | `docs/seri/` | `/seri`, `/seri/[slug]` |
| `guvenlik` | `content/series-guvenlik/` | `docs/seri-guvenlik/` | `/guvenlik`, `/guvenlik/[slug]` |
| `boun` | `content/series-boun/` | `docs/seri-boun/` | `/boun`, `/boun/[slug]` |

Read one series end to end before writing your own: its `SOZLESME.md` (the rules), `HANDOFF.md`
(where it stands), `TRIGGER.md` (how a run starts) and a few articles with their `catalog.json`
entries. The Güven Sınırı series is the best model for a series still in production; the AI
series shows the maintenance mode.

## 3. Add a series

Series are registered in code, not in a configuration file: each one has its own routes,
category vocabulary, access rule and database check-constraint entry. Adding one is a
checklist. The list below is the one the third series (`guvenlik`) actually needed — see
`git show --stat 9e720b9` for the original commit. Use a short lower-case key (here `demo`),
a content directory `content/series-demo/` and a route such as `/demo`.

**Content and docs**

1. `content/series-demo/roadmap.json` — start from [`templates/series/roadmap.json`](templates/series/roadmap.json):
   phases, then planned articles with `"status": "planlandi"`.
2. `content/series-demo/articles/<category>/<slug>.md` — the first article, from
   [`templates/series/article.md`](templates/series/article.md).
3. `docs/seri-demo/SOZLESME.md`, `HANDOFF.md`, `TRIGGER.md` (and `YOL-HARITASI.md` once you plan in
   detail) — from [`templates/series/`](templates/series/).

**Code**

4. `src/lib/content/schema.ts` — a category enum for the series, `demoCatalogSchema` and
   `demoFrontmatterSchema` from the existing factories, and the new categories in
   `allCategorySchema`.
5. `src/lib/content/labels.ts` — a label for every new category (`CATEGORY_LABELS` is a
   `Record` over all categories, so the build fails until each has one).
6. `src/lib/content/series-demo.ts` — copy `series-guvenlik.ts`; change the base path, title,
   subtitle, directory (`dirName: "series-demo"`) and schemas. Keep the title equal to
   `roadmap.json`'s `seriesTitle` (the roadmap test checks it).
7. `src/app/demo/page.tsx` and `src/app/demo/[slug]/page.tsx` — copy the `guvenlik` routes and
   call `requireCollectionAccess("demo", …)`.
8. `src/lib/auth/access.ts` — add `"demo"` to `ReadableCollection` and to the roles that may read
   it. If it should be public after launch, also extend `isPublicPath`.
9. `src/lib/reader-data/series-reset.ts` — add the key to `SERIES_IDS`;
   `src/lib/reader-data/server/series-catalogs.ts` — map it to its catalog loader. Both are
   `Record`s over the series keys, so the compiler points at anything you miss.
10. A migration `drizzle/000N_demo_series_reset.sql` widening
    `reading_series_resets_series_check` (copy `drizzle/0005_guvenlik_series_reset.sql`), and the
    same list in `src/lib/db/schema.ts` (`src/lib/db/series-check.test.ts` compares them).
11. `src/app/page.tsx` — a dashboard entry; `src/components/series/series-progress-reset.tsx` —
    its short label.
12. `tools/series/*.cjs` — the key in `SERIES_DIRS` (`sync-series-hashes`, `entegre-batch`) and a
    rule set in `check-series-content.cjs` (copy the `guvenlik` block and adjust).

**Validate**

```bash
node tools/series/entegre-batch.cjs --series=demo --write      # catalog entries from frontmatter
node tools/series/sync-series-hashes.cjs --series=demo --write # content_hash in frontmatter + catalog
node tools/series/check-series-content.cjs --series=demo
node tools/series/check-series-svg.cjs content/series-demo/assets
pnpm check
pnpm dev                                                        # open /demo
```

The existing series are untouched by these steps: their content, catalogs, routes and access
rules do not change, and the checks above re-validate them alongside the new one.

## 4. Agent-driven runs

A run is a session of an AI coding agent working inside the repository under a series' rules.
Nothing here schedules or executes it: the "trigger" is a prompt file, and the state that lets
the next run resume lives in Markdown files in the repository.

- **Start a run:** open your coding agent at the repository root and give it the trigger as its
  instruction — for example, with Claude Code, reference `@docs/seri-guvenlik/TRIGGER.md` in the
  prompt. The trigger's first line (`BATCH=N+1`) says how many articles one run produces; the
  `+1` is the state update that closes the run.
- **What the agent does:** reads the contract, the handoff and the plan; reconciles them with
  what is actually published (`catalog.json`, frontmatter, `roadmap.json` win over notes); writes
  the next articles and figures; runs the content tools and `pnpm check`; renders the pages; then
  updates `HANDOFF.md` and `YOL-HARITASI.md` so the next run knows where to start. A trigger in
  maintenance mode (the AI series' current one) produces nothing new: it re-checks sources,
  fixes, and records decisions.
- **Resume:** a run that stops half-way is picked up by starting the same trigger again; it
  reconciles from the published state. Long runs keep a control file (for example
  `docs/seri/BAKIM-RUN7.md`) with their work packages, evidence and log.
- **Inspect the output:** review the diff — articles, catalog, handoff, decisions — and the
  tools' output. Gate failures are printed by the tools and recorded in the run's control file.
  This repository also keeps an agent memory under `.wolf/` (OpenWolf): `buglog.json` lists
  errors met and how they were fixed. It is optional; delete it in your fork if you do not use it.
- **Publish:** the triggers forbid committing, pushing and deploying. You review, commit and push;
  the deployment flow below takes it from there.

What a run cannot do for you: guarantee factual accuracy. The contracts make the agent check
sources and mark corrections, and maintenance runs have found and fixed real errors — read the
diffs.

## 5. Deploy your fork

1. Create a Vercel project from your fork and add a Neon database (the Vercel integration sets
   `DATABASE_URL`). If previews should use their own database branch, set
   `MIGRATE_ON_PREVIEW=1` for the Preview environment; otherwise previews skip migrations.
2. Set `SITE_PASSWORD_SHA256`, `AUTH_COOKIE_SECRET` (and `OWNER_USERNAME` if not `anil`) for
   Production. The build (`pnpm vercel-build`) applies migrations, then builds.
3. Keep `PUBLIC_LAUNCH` unset until you are ready: the deployment then behaves as a private
   library. Before setting it, fill in `DATA_CONTROLLER` in `src/lib/site.ts`, review
   `src/app/gizlilik/page.tsx` for your jurisdiction, and set `SITE_URL` to your domain.

## Verified on a clean clone

The steps in sections 1 and 3 were run on a fresh clone of this repository (2026-11-03,
Windows, Node 24, pnpm 10.22). The record of that run — commands, outputs and what had to be
adjusted — is in [docs/platform/ACIK-KAYNAK.md](platform/ACIK-KAYNAK.md).
