# Contributing

Thanks for looking. Two kinds of change land here — code and content — and they have different
gates. Please read the [Licensing](README.md#licensing) section first: no license has been chosen
yet, so the terms under which a contribution would be accepted are not settled. Opening an issue
before larger work is the safest start.

## Setup

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

No environment variables are needed for most work; see `.env.example` for the rest.

## Code changes

- `pnpm check` (typecheck, lint, unit tests, production build) must pass. Run `pnpm test:e2e`
  when you touch routing, the reader, sign-in or anything the browser tests cover.
- Access control lives in `src/lib/auth/access.ts` and is enforced on the server in the
  middleware, the pages and the API routes. A change to who can read what needs tests at those
  layers, not only in the UI.
- Database changes are new SQL files in `drizzle/`, additive where possible, applied by
  `scripts/migrate.mjs`. Never edit a migration that has shipped.
- Match the surrounding code: its comment density, naming and idioms. `pnpm format` runs Prettier.

## Content changes

Articles follow their series contract (`docs/seri*/SOZLESME.md`). For any change to an article:

```bash
node tools/series/sync-series-hashes.cjs --series=<ai|boun|guvenlik> --write
node tools/series/check-series-content.cjs --series=<ai|boun|guvenlik>
node tools/series/check-series-svg.cjs content/<series-dir>/assets
```

A factual correction needs the source that supports it (link, and page or table where it helps).
A correction that changes what a reader takes away is marked with `revised_at` and
`revision_note` in the frontmatter and catalog (see §12 of the AI series contract). Article ids,
slugs and reading orders never change once published.

## Pull requests

Keep a pull request to one concern, describe how you verified it, and say if any part is
untested. The template asks for exactly that.
