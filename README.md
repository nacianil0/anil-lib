# Anıl Lib

A Next.js reader for long-form, sequenced learning series — written in Markdown, cited at the
end of every article, validated by scripts, and read in a focused reader with progress,
bookmarks and highlights. This repository holds the application **and** the content it
currently serves, plus the written contracts and prompt files that keep the series consistent
when an AI coding agent writes or maintains them.

The series, the interface and the content tools' messages are in Turkish; identifiers, most
code comments, this README and the [fork guide](docs/FORKING.md) are in English.

> **Status:** private library, not yet publicly launched (see [Launch switch](#launch-switch)).
> **License:** none chosen yet — see [Licensing](#licensing) before reusing anything.

## What is in here

| Series | Route | Published | Who can read it |
| --- | --- | --- | --- |
| *Sıfırdan Yüze: Yapay Zekâ* — AI from first principles to research practice | `/seri` | 118 of 118 | anyone, once launched |
| *Güven Sınırı* — secure software and source control | `/guvenlik` | 10 of 25 planned | signed-in readers |
| *Mülakat Aynası: Boğaziçi CmpE* — CS fundamentals | `/boun` | 41 of 41 | accounts the owner creates |
| Archive (pre-series articles) | `/read` | 18 | the owner only |

The articles are **educational compilations, not original research or peer-reviewed work.**
They were written with large language models under a written series contract
(`docs/seri*/SOZLESME.md`) and are re-checked against their sources in maintenance runs;
corrections that change what a reader takes away are dated at the top of the article. Every
series article ends with a *Kaynakça* (bibliography) linking the works it relies on; the older
archive articles predate the contracts.

What the application does:

- Server-rendered articles with figures (inline SVG), tables, a table of contents, previous/next
  navigation and a phase-by-phase reading list.
- Reading progress, saved places and highlights. Signed-in readers sync them through
  `/api/reader-sync`; visitors without an account keep them only in their own browser
  (`localStorage`), never on the server.
- Accounts: the owner (from environment variables), owner-created users, and — once launched —
  self-registered readers with an offline recovery code (no e-mail), rate limiting and
  per-collection access (`src/lib/auth/access.ts`).
- Owner tools at `/yonetim`: create users, reset a user's reading, per-user statistics.
- Reader preferences: theme (light, dark, sepia), font, size, measure, paged or scrolling layout.
- No analytics, no third-party scripts, fonts or images; see `/gizlilik` for what is stored.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Postgres through Neon's
serverless HTTP driver (`@neondatabase/serverless`) with a Drizzle schema · Zod ·
unified/remark/rehype for Markdown · Vitest + Testing Library · Playwright.

Requirements: **Node.js 20.11 or later** and **pnpm 10** (`corepack enable` gives you the pinned
version). A database is optional for local work.

## Quick start

```bash
git clone https://github.com/<you>/anil-lib.git
cd anil-lib
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000>. With no environment variables the app runs **open, as the owner,
without a database**: every series and the archive are readable, progress stays in the browser.
That is the quickest way to look around.

To see the site the way an anonymous visitor would after launch, create `.env.local` from
[`.env.example`](.env.example) and set at least:

```bash
SITE_PASSWORD_SHA256=<sha256 hex of a password you choose>
AUTH_COOKIE_SECRET=<32+ random characters, e.g. openssl rand -hex 32>
PUBLIC_LAUNCH=1
```

A SHA-256 hex digest can be made with
`node -e "console.log(require('crypto').createHash('sha256').update(process.argv[1]).digest('hex'))" 'your password'`.
Sign in at `/login` with the owner username (`anil` unless `OWNER_USERNAME` is set) and that
password. Accounts other than the owner, sign-up and cross-device sync need `DATABASE_URL`: the
app uses Neon's serverless HTTP driver, so that means a Neon database (or a Neon-compatible HTTP
proxy in front of Postgres). Apply migrations with `pnpm db:apply`.

## Environment

All variables are documented in [`.env.example`](.env.example).

| Variable | Needed for | Default when unset |
| --- | --- | --- |
| `DATABASE_URL` | accounts, sync, sign-up, rate limits | single-owner mode, local-only progress |
| `SITE_PASSWORD_SHA256`, `AUTH_COOKIE_SECRET` | sign-in (set both) | open as the owner in `pnpm dev`; in production every non-public page redirects to `/login`, which reports the missing configuration |
| `OWNER_USERNAME` | owner's username | `anil` |
| `PUBLIC_LAUNCH` | opening the site to the public (`1`) | closed: everything but `/login` and `/robots.txt` needs an account |
| `SITE_URL` | canonical links, sitemap, previews | Vercel production domain, else `http://localhost:3000` |
| `MIGRATE_ON_PREVIEW` | migrations on Vercel preview builds (`1`) | previews skip migrations |

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | development server |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint over the repository |
| `pnpm test` | unit and component tests (Vitest) |
| `pnpm test:e2e` | browser tests (Playwright; starts its own dev server on port 3100; run `pnpm exec playwright install chromium` once) |
| `pnpm build` / `pnpm start` | production build and server |
| `pnpm check` | typecheck + lint + test + build — the gate to pass before a pull request |
| `pnpm db:apply` | apply pending SQL migrations from `drizzle/` (`scripts/migrate.mjs`) |
| `pnpm db:generate`, `pnpm db:check` | Drizzle Kit, for schema work (migrations `0004` onwards are hand-written SQL, so review what `db:generate` emits) |

Content tools (plain Node scripts, no database, nothing leaves the machine):

```bash
node tools/series/check-series-content.cjs --series=ai     # contract checks: length, structure, figures, required sections
node tools/series/check-series-svg.cjs content/series/assets
node tools/series/sync-series-hashes.cjs --series=ai       # verify content_hash; --write to update
node tools/series/entegre-batch.cjs --series=ai            # add new articles to catalog/roadmap; --write to apply
```

`--series` accepts `ai`, `boun` or `guvenlik`. Windows helpers for running and packaging live in
[`tools/`](tools/README.md).

## How content is organised

```
content/<series-dir>/
  catalog.json          published articles (id, slug, order, category, level, summary, content_hash)
  roadmap.json          phases and planned articles ("planlandi" → "yayinda" when published)
  articles/<category>/<slug>.md   Markdown with YAML frontmatter mirroring the catalog entry
  assets/<slug>/*.svg   figures, referenced as ![alt](assets/x.svg "Şekil N — title")
docs/<series-docs>/
  SOZLESME.md           the series contract: editorial, sourcing, figure and process rules
  HANDOFF.md            current state: what is published, what comes next, open debts
  YOL-HARITASI.md       plan, decisions and ledgers
  TRIGGER.md            the prompt that starts a production or maintenance run
```

Catalogs are schema-checked whenever they load (also during `next build`), and an article's
frontmatter is compared with its catalog entry when it renders; the content tools check hashes,
revision fields, roadmap consistency and the structural rules. Series are registered in code
(routes, schemas, access rules, a database check constraint) — adding one is a checklist,
described in the [fork guide](docs/FORKING.md#3-add-a-series).

## Agent-driven runs ("triggers")

Articles are produced and maintained in *runs*: sessions of an AI coding agent (this project
used Claude Code) started by handing the agent a series' `TRIGGER.md`. The trigger tells the
agent what to read (contract → handoff → plan), to reconcile the plan with what is actually
published, to produce the next batch or to maintain, to pass the gates, and to update the
handoff so the next run can resume. There is no scheduler or CLI behind it: the files are the
interface, and the run is only as good as the review of its diff. Committing, pushing and
deploying stay with you (the Güven Sınırı trigger forbids them outright). Details and a starter
template: [docs/FORKING.md](docs/FORKING.md#4-agent-driven-runs).

## Deployment

The project deploys to Vercel with a Neon database. `pnpm vercel-build` runs
`scripts/migrate.mjs` (pending migrations, idempotent, recorded in `app_migrations`) and then
`next build`. Preview builds skip migrations unless `MIGRATE_ON_PREVIEW=1`.

### Launch switch

Shipping code and opening the site are separate decisions. Without `PUBLIC_LAUNCH=1` the
middleware keeps every page but `/login` (and `/robots.txt`) behind an account, sign-up and
recovery refuse,
`robots.txt` disallows everything and the sitemap is empty — the site behaves as the private
library it was. Before setting it, fill in the data controller on the privacy page
(`DATA_CONTROLLER` in `src/lib/site.ts`); the remaining launch steps are in
[docs/platform/LANSMAN.md](docs/platform/LANSMAN.md) (Turkish).

## Security

Access control is enforced on the server — middleware, every page, the APIs and the sitemap all
read the same policy — and covered by unit tests (database calls mocked) and Playwright browser
tests (run without a database). Please report vulnerabilities privately as described in
[SECURITY.md](SECURITY.md).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). In short: `pnpm check` must pass, content changes must
pass the content tools, and article corrections follow the series contract.

## Licensing

**No license has been chosen for this repository yet.** Until one is added, the default
copyright applies: GitHub's terms let you view and fork it on GitHub, but grant no right to
reuse, modify or redistribute the code or the articles elsewhere. Code and article content may
end up under different licenses. Third-party material keeps its own terms: the articles quote
and cite external sources (see each *Kaynakça*); the fonts (Inter, Newsreader, JetBrains Mono),
fetched from Google Fonts at build time by `next/font`, are under the SIL Open Font License 1.1;
the direct npm dependencies are under MIT, ISC or Apache-2.0, and their transitive dependencies
add other licenses, including BSD, 0BSD, CC-BY-4.0 (`caniuse-lite`) and LGPL-3.0-or-later
(sharp's libvips binaries, an optional dependency of Next.js).
