# Fork guide

How to take this repository, run it as your own, start a series of your own and keep it going
with agent-driven runs. Every command here was run on a clean clone (see
[Verified on a clean clone](#verified-on-a-clean-clone)); where the project has a limit, it is
stated rather than papered over.

> **License first.** No license has been chosen for this repository yet (see
> [Licensing](../README.md#licensing)). GitHub's terms let you fork it on GitHub, but grant no
> right to run, modify or deploy the code or the articles elsewhere until a license says so. The
> guide describes how the project works; it is not a grant of rights.

## 1. Run your fork locally

```bash
git clone https://github.com/<you>/anil-lib.git && cd anil-lib
corepack enable                      # pnpm 10, as pinned in package.json
pnpm install --frozen-lockfile
pnpm dev                             # http://localhost:3000, open as the owner, no database
```

Nothing in a fresh clone talks to the author's services: there are no hard-coded URLs, keys or
database addresses, and with no `.env.local` the app connects to no database. The Next.js
tooling itself still goes online: `next/font/google` downloads the three fonts from Google Fonts
during `pnpm dev` and `pnpm build` (the site then serves them itself), and Next.js sends
anonymous telemetry unless `NEXT_TELEMETRY_DISABLED=1` is set. To try the access model, copy
`.env.example` to `.env.local` and set `SITE_PASSWORD_SHA256`, `AUTH_COOKIE_SECRET` and
`PUBLIC_LAUNCH=1` (see the README). Browser tests need a browser once:
`pnpm exec playwright install chromium`.

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
   phases, then planned articles with `"status": "planlandi"`. Keep **one article per line**, as
   in the template: `entegre-batch.cjs` rewrites that line when the article is published and
   refuses ("kompakt satır bulunamadı") if the file was reformatted.
2. `content/series-demo/articles/<category>/<slug>.md` — the first article, from
   [`templates/series/article.md`](templates/series/article.md), and its figure in
   `content/series-demo/assets/<slug>/` (start from
   [`templates/series/first-figure.svg`](templates/series/first-figure.svg)). The content checker
   applies common rules to every series: the body opens with an H2, has at least one figure that
   the prose names ("Şekil 1"), one to three self-check boxes (`> **Kendini yokla:**` here; the
   label is set per series), and `### Sırada ne var` right before `## Kaynakça`. Each series'
   profile then adds a word band and its own sections (BOUN requires `## Mülakatta nasıl görünür`,
   Güven Sınırı a `## Karar kartı`). The template passes the common rules; it is about 150 words,
   so the new profile's `minWords` has to be low until the article is written.
3. `docs/seri-demo/SOZLESME.md`, `HANDOFF.md`, `TRIGGER.md` — from
   [`templates/series/`](templates/series/). The existing series also keep a `YOL-HARITASI.md`
   (plan, decisions, ledgers); there is no template for it — start one when you plan in detail.

**Code**

4. `src/lib/content/schema.ts` — a category enum for the series, `demoCatalogSchema` and
   `demoFrontmatterSchema` from the existing factories, and the new categories in
   `allCategorySchema`.
5. `src/lib/content/labels.ts` — a label for every new category (`CATEGORY_LABELS` is a
   `Record` over all categories, so the build fails until each has one).
6. `src/lib/content/series-demo.ts` — copy `series-guvenlik.ts` and replace every
   `guvenlik`/`Guvenlik`/`GUVENLIK`: that changes the base path, `dirName`, the roadmap path (the
   module names its `roadmap.json` folder separately), the labels and the schemas. Set the title
   and subtitle equal to `roadmap.json`'s `seriesTitle`/`seriesSubtitle`, and copy
   `src/lib/content/series-guvenlik-roadmap.test.ts` to guard that.
7. `src/app/demo/page.tsx` and `src/app/demo/[slug]/page.tsx` — copy the `guvenlik` routes; they
   call `requireCollectionAccess("demo", …)`, which sends visitors without an account to sign in.
8. `src/lib/auth/access.ts` — add `"demo"` to `ReadableCollection` and to the roles that may read
   it. To make it public after launch, also add it to `ANONYMOUS_COLLECTIONS`, add `/demo` and
   `/demo/<slug>` to `isPublicPath`, and model the routes on the `/seri` pages (local reading mode
   without a session) rather than on `/guvenlik`; `src/app/sitemap.ts` lists only the AI series.
9. `src/lib/reader-data/series-reset.ts` — add the key to `SERIES_IDS`; every reader-data schema
   derives from it. `src/lib/reader-data/server/series-catalogs.ts` maps each key to its catalog
   loader, and `SERIES_CATALOGS` there and `SERIES_LABELS` (step 11) are `Record`s over the keys,
   so the compiler points at them. `src/lib/reader-data/series-reset.test.ts` pins the list on
   purpose; add the key there too. The sync and reset services need no edit: they derive from
   these.
10. A migration `drizzle/000N_demo_series_reset.sql` widening
    `reading_series_resets_series_check` (copy `drizzle/0005_guvenlik_series_reset.sql`), and the
    same list in `src/lib/db/schema.ts` (`src/lib/db/series-check.test.ts` compares them).
11. `src/app/page.tsx` — a dashboard entry; `src/components/series/series-progress-reset.tsx` —
    its short label.
12. `tools/series/*.cjs` — the key in `SERIES_DIRS` (`sync-series-hashes`, `entegre-batch`) and a
    profile in `check-series-content.cjs`'s `PROFILES`: copy the `ai` block, point `articlesDir` at
    `content/series-demo/articles`, and set the word band and `checkpointLabel`. Do not copy the
    `guvenlik` block: its `decisionCard`, `absoluteClaims` and `excludeCode` add Güven Sınırı's
    own rules, such as a required `## Karar kartı`.
13. Optional: owner statistics (`src/lib/stats/server/user-stats.ts`, whose test pins the series
    list), the figure test's `ASSET_ROOTS` (`src/lib/content/series-assets.test.ts`), the public
    front page (`src/components/home/public-home.tsx`), `tools/README.md` and the browser tests
    (`tests/e2e/`).

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
rules do not change. `pnpm check` re-runs their tests; re-run the content tools with
`--series=ai`, `boun` and `guvenlik` to re-check their content as well.

## 4. Agent-driven runs

A run is a session of an AI coding agent working inside the repository under a series' rules.
Nothing here schedules or executes it: the "trigger" is a prompt file, and the state that lets
the next run resume lives in Markdown files in the repository.

- **Start a run:** open your coding agent at the repository root and give it the trigger as its
  instruction — for example, with Claude Code, reference `@docs/seri-guvenlik/TRIGGER.md` in the
  prompt. The trigger's `BATCH=N+1` line (under its title) says how many articles one run
  produces; the `+1` is the state update that closes the run.
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
  errors met and how they were fixed. It is optional. To drop it, delete `.wolf/` together with
  the hook entries in `.claude/settings.json` and `.codex/hooks.json` and the OpenWolf lines in
  `CLAUDE.md`, `AGENTS.md` and `.claude/rules/openwolf.md`.
- **Publish:** the Güven Sınırı trigger and the template forbid committing, pushing and deploying;
  in the AI and BOUN series the handoffs leave commits to you. Either way you review, commit and
  push; the deployment flow below takes it from there.

What a run cannot do for you: guarantee factual accuracy. The contracts make the agent check
sources and mark corrections, and maintenance runs have found and fixed real errors — read the
diffs.

## 5. Deploy your fork

1. Create a Vercel project from your fork and add a Neon database (the Vercel integration sets
   `DATABASE_URL`). If previews should use their own database branch, set
   `MIGRATE_ON_PREVIEW=1` for the Preview environment; otherwise previews skip migrations.
2. Set `SITE_PASSWORD_SHA256`, `AUTH_COOKIE_SECRET` (and `OWNER_USERNAME` if not `anil`) for
   Production, and for Preview too if previews should be usable (without them every page sends
   you to `/login` with a configuration error). The build (`pnpm vercel-build`) applies
   migrations, then builds.
3. Keep `PUBLIC_LAUNCH` unset until you are ready: the deployment then behaves as a private
   library. Before setting it, fill in `DATA_CONTROLLER` in `src/lib/site.ts`, review
   `src/app/gizlilik/page.tsx` for your jurisdiction, and set `SITE_URL` to your domain.

## Verified on a clean clone

The steps in sections 1 and 3 were run on a fresh clone of this repository (2026-11-03,
Windows, Node 24, pnpm 10.22): install, `pnpm check`, the content tools, the three local modes
(open, closed, launched), and a series `demo` added by following section 3 step by step — its
content tools, `pnpm check`, migration and pages all passed, and the existing series' content,
catalogs and docs were unchanged (`git diff` empty). Three gaps that run found are fixed in this
guide and the templates: the one-line roadmap layout, the article structure the checker requires,
and the test that pins the series list. A summary of that run — what was run, the results and
the adjustments — is in [docs/platform/ACIK-KAYNAK.md](platform/ACIK-KAYNAK.md) (Turkish). The
script that applied section 3 for the test lived outside the repository; the checklist above is
what it did.
