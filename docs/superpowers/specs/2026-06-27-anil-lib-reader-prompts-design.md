# anil-lib Reader Prompts Design

Date: 2026-06-27
Status: Approved for prompt authoring by the user's "taski tamamla" instruction

## 1. Objective

Create two Claude Code prompts inside the repository:

1. A repeatable article-ingestion prompt that classifies, renames, organizes, and orders Markdown articles without reprocessing completed articles.
2. A one-time implementation prompt that builds a polished reading application around the generated content catalog.

The prompts are deliverables. This task does not implement the reader application or reorganize the articles itself.

## 2. Context

The repository currently contains 18 Turkish AI research articles at the root. None has frontmatter. Several articles cover related subjects at different depth, so topical overlap must not be treated as an exact duplicate.

The reference project, `nacianilcom`, uses Node.js 20+, pnpm workspaces, TypeScript, Next.js 15, React 19, Tailwind CSS, MDX, Zod, Vitest, and Playwright. Its local Vite/Fastify Studio is not required for this reader.

OpenWolf 1.0.4 is initialized in this repository. Both prompts must obey `CLAUDE.md` and `.wolf/OPENWOLF.md`.

## 3. Considered Approaches

### A. Full `nacianilcom` monorepo with Studio

This would reproduce `apps/web`, `apps/studio`, and shared packages. It offers a dedicated authoring interface but adds a server, local API, and workspace boundaries that are not needed for a personal reading application.

### B. Static reader plus independent content pipeline (selected)

Use a single Next.js application and a file-based content contract. The repeatable prompt owns ingestion and catalog maintenance; the one-time prompt owns the reader implementation. This preserves the strongest parts of `nacianilcom` while keeping the system understandable and inexpensive to maintain.

### C. Generic documentation generator

A docs framework would provide navigation quickly, but progress restoration, pedagogical ordering, and the intended premium reading experience would be constrained by the framework's information architecture.

## 4. Repository Contract

The repeatable prompt establishes this layout:

```text
content/
  articles/
    foundations/
    models-and-training/
    reasoning-and-memory/
    agents-and-retrieval/
    safety-and-evaluation/
    multimodal-and-future/
    case-studies/
  catalog.json
  ingestion-report.md
inbox/
prompts/
  01-classify-and-order-articles.md
  02-build-reader-app.md
```

The initial run scans legacy root-level Markdown articles. Later runs scan `inbox/**/*.md`. Infrastructure documents such as `CLAUDE.md`, `README.md`, `prompts/**`, `docs/**`, `.wolf/**`, and `.claude/**` are always excluded.

Processed articles are moved with `git mv` into `content/articles/<category>/<slug>.md`. The article body is preserved, apart from adding normalized frontmatter and fixing the first heading only when necessary to match the title.

## 5. Article Identity and Idempotence

Every processed article receives frontmatter with at least:

```yaml
article_id: article_<persistent-uuid>
title: Human-readable title
slug: stable-kebab-case-slug
category: foundations
level: beginner
reading_order: 1
summary: One concise sentence
tags:
  - ai-history
content_hash: sha256:<normalized-body-hash>
classification_version: 1
```

`article_id` is generated once and never derived again. `content_hash` detects exact duplicates. `content/catalog.json` is the machine-readable source of truth and mirrors the relevant metadata plus the relative article path.

A file is already processed only when all of these are true:

- it has a valid `article_id` and `classification_version`;
- its `article_id` exists exactly once in the catalog;
- the catalog path resolves to the same file;
- the content hash matches the normalized article body.

Normal reruns never reclassify valid processed articles. A category change requires an explicit user instruction to reclassify a named `article_id`. New articles may cause numeric `reading_order` values to be recalculated, but identity, slug, and category remain stable.

Before scanning new candidates, each run audits existing cataloged articles. If an existing article body was intentionally edited, the prompt preserves its identity, slug, category, and level, then refreshes only its normalized content hash and derived summary when needed. This maintenance path is not reclassification.

Exact duplicate content is not added. It is left in `inbox/` and reported. Topically overlapping short and long articles remain separate and may reference one another.

## 6. Classification and Reading Order

The controlled category list is:

- `foundations`
- `models-and-training`
- `reasoning-and-memory`
- `agents-and-retrieval`
- `safety-and-evaluation`
- `multimodal-and-future`
- `case-studies`

The classifier assigns `beginner`, `intermediate`, or `advanced`. It derives a pedagogical order from prerequisites rather than filename order or creation date. History and basic language-model concepts precede architecture and training; those precede reasoning, memory, agents, safety, evaluation, and frontier topics. Case studies are placed after the concepts they depend on.

The prompt performs a dry analysis first, prints a move and metadata plan, then executes it. Ambiguous category decisions use the closest controlled category and are documented in `content/ingestion-report.md`; the prompt does not invent a new category silently.

## 7. Reader Architecture

The one-time prompt builds a single Next.js 15 App Router application using:

- Node.js 20+
- pnpm
- TypeScript 5.7 in strict mode
- React 19
- Tailwind CSS 3.4
- MDX/Markdown rendering with `next-mdx-remote`, `gray-matter`, and `remark-gfm`
- Zod validation for frontmatter and `content/catalog.json`
- Vitest for unit tests
- Playwright for responsive workflow tests
- ESLint 9 and Prettier 3

There is no database, account system, CMS, API server, Vite Studio, or cloud synchronization in the first version.

The main route is `/read/[slug]`. `/` redirects to the last-read article when valid, otherwise to the first article. Content is statically generated from the catalog.

## 8. Reading Experience

Desktop uses a stable left sidebar and a centered reading column. Mobile uses an icon button to open the reading list as a drawer. The interface includes:

- category groups in pedagogical order;
- numbered articles in one global reading sequence;
- unread, in-progress, and completed states;
- current article emphasis and overall progress;
- previous and next article controls;
- a compact reading-progress indicator;
- semantic Markdown typography, code blocks, tables, links, and heading anchors;
- keyboard focus visibility and WCAG AA contrast;
- reduced-motion support.

The visual direction is a quiet premium reading tool, not a marketing page. Use Newsreader for editorial text, Inter for UI, and JetBrains Mono for code. The palette combines neutral surfaces, graphite text, a restrained burgundy accent, and a distinct cool secondary accent. Avoid gradients, decorative blobs, excessive cards, pill-heavy controls, and oversized headings.

The reading column targets roughly 68-74 characters per line. Sidebar and toolbar dimensions remain stable so progress indicators and long titles do not shift the layout.

## 9. Progress Persistence

Progress is stored under the versioned localStorage key `anil-lib:reader-progress:v1`:

```ts
type ReaderProgress = {
  currentArticleId: string | null;
  articles: Record<string, {
    headingId: string | null;
    scrollRatio: number;
    completed: boolean;
    lastReadAt: string;
  }>;
};
```

The reader saves progress on a throttled scroll handler and on visibility/page exit. Restoration uses `headingId` first and `scrollRatio` as fallback after content layout is ready. Progress is keyed by `article_id`, so renumbering the reading list does not lose the user's place. Completion is set automatically near the end of an article and can also be toggled explicitly.

Malformed or unavailable localStorage data falls back safely to an empty state. Unknown article IDs are ignored. A storage event keeps multiple tabs reasonably synchronized.

## 10. Data Flow

1. The user adds Markdown files to `inbox/` or runs the first import against legacy root files.
2. The repeatable prompt scans only unprocessed candidates, computes hashes, classifies them, performs `git mv`, adds frontmatter, validates the catalog, and writes a report.
3. The Next.js build validates and reads `content/catalog.json` plus each referenced article.
4. Static routes render the ordered reading experience.
5. Browser progress remains local and is joined to catalog entries by `article_id`.

The content pipeline and UI communicate only through the validated file contract. Neither prompt should make assumptions about undocumented in-memory state from a previous Claude session.

## 11. Error Handling

The repeatable prompt must:

- stop before mutation when Git has unrelated conflicting changes;
- allow intended untracked candidates in `inbox/` and legacy root article paths while treating unrelated changes elsewhere as conflicts;
- never use destructive Git commands;
- never delete an article;
- reject duplicate IDs, paths, slugs, hashes, or reading-order positions;
- leave exact duplicate candidates in `inbox/` and report them;
- avoid partial catalog updates by validating the proposed final state before writing;
- summarize every move, skipped file, warning, and validation result.

The one-time prompt must:

- refuse to overwrite an existing reader implementation unless the user explicitly requests migration;
- fail the build with actionable errors for invalid catalog entries or missing files;
- provide reader-level error boundaries and a not-found page;
- handle unavailable localStorage without breaking rendering;
- avoid rendering unsanitized raw HTML from Markdown.

## 12. Verification

The repeatable prompt succeeds when:

- a second unchanged run produces no file or catalog changes;
- every catalog entry resolves to one article and every article resolves to one entry;
- IDs, slugs, paths, hashes, and order positions are unique;
- all articles retain their body content;
- exact duplicates are reported rather than imported.

The one-time prompt succeeds when:

- typecheck, lint, unit tests, and production build pass;
- Playwright verifies desktop sidebar navigation and the mobile drawer;
- previous/next navigation follows catalog order;
- refresh restores the active article and reading position;
- completion status survives reload;
- invalid stored progress falls back cleanly;
- desktop and mobile screenshots show no overlap, clipped text, or layout shift.

## 13. Prompt Quality Requirements

Both prompts instruct Claude Code to inspect the current repository, follow OpenWolf, state its plan, make the requested changes, run verification, and report concrete results. They prohibit placeholders and unverified completion claims.

The ingestion prompt is explicitly repeatable and idempotent. The reader prompt is explicitly one-time and stops when an implementation already exists. Each prompt is self-contained and references real repository paths rather than relying on this design document being in context.
