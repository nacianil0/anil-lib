# Classification Batches Design

Date: 2026-06-27
Status: Approved for specification by the user's "uygula" instruction

## 1. Objective

Add permanent ingestion-batch grouping to the classified article library.

- The 18 currently classified articles become `Sınıflandırma 1`.
- Every future run of `prompts/01-classify-and-order-articles.md` that imports at least one new, non-duplicate article creates exactly one next batch.
- A no-op, duplicate-only, maintenance-only, or explicit reclassification run does not create a batch.
- The reader sidebar presents batches as the primary grouping, categories as the secondary grouping, and articles in append-only reading order.

This change must preserve article identity, article body hashes, local reading progress, and the existing uncommitted application work.

## 2. Current State

The repository has:

- 18 articles with `classification_version: 1` and no batch field;
- `content/catalog.json` with `schemaVersion: 1` and 18 ordered records;
- a Next.js 15 reader whose sidebar groups articles only by category;
- progress keyed by stable `article_id`, not reading order;
- `frontend-design` installed from `anthropics/skills` and recorded in `skills-lock.json`.

`classification_version` describes the classifier/metadata contract version. It must not be reused as an ingestion-batch number.

## 3. Considered Approaches

### A. Derive batches from Git commits or ingestion timestamps

This avoids a schema change, but history can be rebased, timestamps can be rewritten, and the UI would depend on repository metadata unavailable at runtime. Rejected as brittle.

### B. Add a separate run registry and reference run IDs from articles

A `classification-runs.json` file could store every execution. It supports richer audit metadata but creates another source of truth, synchronization rules, and failure modes that are unnecessary for numbered grouping. Rejected as over-designed for the requested behavior.

### C. Store a positive batch number on every article (selected)

Add `classification_batch` to frontmatter and `classificationBatch` to catalog records. The next batch is derived from the maximum existing value. This is explicit, statically available to the UI, easy to validate, and remains stable across Git operations.

## 4. Data Contract

The catalog becomes schema version 2 because a new required field is added:

```json
{
  "schemaVersion": 2,
  "classificationVersion": 1,
  "generatedAt": "ISO-8601 timestamp",
  "articles": [
    {
      "articleId": "article_<uuid>",
      "classificationBatch": 1,
      "readingOrder": 1
    }
  ]
}
```

Each article frontmatter gains:

```yaml
classification_batch: 1
classification_version: 1
```

The meanings are deliberately separate:

- `schemaVersion`: JSON/frontmatter contract compatibility;
- `classificationVersion`: classifier logic/metadata version;
- `classificationBatch`: immutable ingestion cohort.

### Invariants

- Every article has one positive integer batch.
- Existing article batches never change during normal ingestion, body maintenance, or explicit reclassification.
- Batch numbers are contiguous from 1 through the current maximum.
- Reading order is non-decreasing by batch.
- Articles in each batch occupy one contiguous reading-order block.
- Reading order remains globally unique and contiguous from 1 through N.
- All new, non-duplicate candidates processed by one prompt run receive the same next batch.
- An exact duplicate does not create or consume a batch number.
- A run without a newly imported article does not increment the maximum batch.

## 5. Batch 1 Migration

The migration is mechanical and limited:

1. Set `schemaVersion` from 1 to 2 in `content/catalog.json`.
2. Add `classificationBatch: 1` to all 18 catalog records.
3. Add `classification_batch: 1` to all 18 Markdown frontmatter blocks.
4. Keep all `article_id`, slug, category, level, `reading_order`, summary, tags, paths, related IDs, and body text unchanged.
5. Do not recalculate `content_hash`: its algorithm excludes frontmatter, so the normalized body is unchanged.
6. Update `content/ingestion-report.md` to identify the initial cohort as `Sınıflandırma 1` without rewriting its unrelated analysis.

Progress remains valid because localStorage uses `article_id`. No progress migration is required.

## 6. Repeatable Prompt Behavior

`prompts/01-classify-and-order-articles.md` must define batch assignment explicitly.

### Preflight

- Audit and validate all existing batch values before reading new candidates.
- If legacy processed articles have no batch and the catalog contains only the initial cohort, migrate them to Batch 1.
- If only some processed records lack a batch or batches conflict/interleave, stop with an actionable consistency error instead of guessing.

### Next-batch allocation

1. Analyze all candidates and remove exact duplicates from the import plan.
2. Determine whether at least one genuinely new article will be imported.
3. Only then calculate `nextBatch = max(existing classificationBatch) + 1`.
4. Assign that one value to every new article in the run.
5. Preserve every existing article's batch.

The allocation is part of the dry plan and is not persisted until the complete proposed state passes validation.

### Reading order

- Existing batches and their internal relative order remain unchanged.
- The new batch is appended after the final article of the previous batch.
- New articles are pedagogically ordered within their own batch using category, prerequisites, and level.
- Global reading-order values remain 1..N.
- A foundational article arriving in Batch 3 remains in Batch 3; append-only cohort history takes priority over global pedagogical insertion.

### Reporting and idempotence

- The dry plan names the target batch and lists every included article.
- `content/ingestion-report.md` groups each run under `Sınıflandırma N`.
- The no-op simulation must prove that the same files would not create `N+1` on rerun.
- Duplicate-only and maintenance-only runs report their outcome without rewriting batch metadata or timestamps unnecessarily.

The one-time build prompt must also be updated to document schema version 2 and the batch-grouped reader so a clean rebuild produces the same behavior.

## 7. Reader Architecture

Add `classificationBatch` to:

- the Zod catalog and frontmatter schemas;
- `ArticleDescriptor` and server-to-client article data;
- test fixtures and catalog validation;
- the sidebar grouping model.

The content loader continues sorting by global `readingOrder`. The `ReadingList` then groups this ordered array by `classificationBatch`, and within each batch by contiguous category.

No progress-storage schema change is needed. Previous/next navigation remains global and crosses batch boundaries naturally.

## 8. UI Design

### Subject and job

The subject is a private, sequenced AI research library. The reader's single job is to understand where a group of articles entered the curriculum and continue reading without losing position.

### Existing visual system

Keep the current palette and typography:

- paper `#faf9f7` / ink `#1b1d1f`;
- burgundy `#8a2e43` for curriculum progress;
- cool steel blue `#2f5d74` for in-progress state;
- Newsreader for editorial content, Inter for UI, JetBrains Mono for indices.

No new dependency, gradient, decorative card, pill system, or competing accent is introduced.

### Hierarchy

The sidebar hierarchy becomes:

```text
Sınıflandırma 01 · 18 makale
  Temeller
    01  Modern Yapay Zeka...
    02  LLM'ler ve Sonraki Token...
  Modeller ve Eğitim
    03  Anlamın Temsili...

Sınıflandırma 02 · 4 makale
  ...
```

The batch header is a compact archival folio marker integrated into the existing reading spine. It uses a two-digit monospaced index, a plain Turkish label, article count, and a restrained rule. This is the one signature addition: the spine now records ingestion eras rather than being only a progress line.

Category headings remain secondary and visually quieter. Article rows, active state, status nodes, overall progress, mobile drawer behavior, and keyboard navigation remain consistent.

The same hierarchy renders in desktop and mobile lists. Batch headers are not sticky; avoiding nested sticky layers keeps the compact reader predictable.

### Copy

- Batch heading: `Sınıflandırma 01`
- Count: `18 makale`
- Screen-reader navigation label remains `Bölümler` or becomes the clearer `Sınıflandırılmış okuma listesi`.

UI copy describes the reader's model, not implementation details such as `classificationBatch`.

## 9. Error Handling

- Schema parsing rejects missing, zero, negative, fractional, or non-numeric batch values.
- Catalog validation rejects gaps such as batches 1 and 3 without 2.
- Validation rejects batch interleaving in reading order, for example 1, 2, 1.
- Validation rejects a batch split into multiple reading-order blocks.
- A malformed catalog fails at build time with the offending article/path and batch rule.
- The UI never infers a default batch for invalid data; invalid content must be fixed at the source.

## 10. Testing

### Unit tests

- Accept schema version 2 and valid positive batch values.
- Reject missing/invalid batch values.
- Reject missing batch numbers and interleaved blocks.
- Confirm all 18 real articles are Batch 1 after migration.
- Confirm descriptors expose `classificationBatch`.

### Component behavior

- Batch grouping preserves global order.
- A batch header renders once per batch with the correct article count.
- Categories remain grouped inside the correct batch.
- IDs used by desktop and mobile headings remain unique.

### End-to-end

- Desktop sidebar shows `Sınıflandırma 01` and `18 makale`.
- Mobile drawer shows the same batch hierarchy.
- Navigation across the last article of one batch to the first of the next follows global order.
- Existing progress and completion behavior still pass.

### Quality gates

- `pnpm format:check`
- `pnpm typecheck`
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- `pnpm test:e2e`
- desktop and mobile screenshots plus OpenWolf design QC

## 11. Files Expected to Change

- all 18 `content/articles/**/*.md` frontmatter blocks;
- `content/catalog.json`;
- `content/ingestion-report.md`;
- `prompts/01-classify-and-order-articles.md`;
- `prompts/02-build-reader-app.md`;
- `src/lib/content/schema.ts`;
- `src/lib/content/types.ts`;
- `src/lib/content/labels.ts`;
- `src/lib/content/catalog.test.ts`;
- `src/lib/content/schema.test.ts`;
- `src/components/reader/reading-list.tsx`;
- `src/app/globals.css` only for the folio/spine treatment;
- `tests/e2e/reader.spec.ts`;
- OpenWolf anatomy, memory, cerebrum, and buglog when required by actual results.

No progress hook, localStorage key, article body, or route contract should change.

## 12. Acceptance Criteria

- All current articles and catalog records are visibly and structurally Batch 1.
- A future successful import creates exactly one next batch shared by all new articles.
- No-op, duplicate-only, maintenance, and reclassification runs do not create a batch.
- Batches are append-only contiguous reading-order blocks.
- Sidebar and mobile drawer group batch, then category, then article.
- Existing reader progress remains intact.
- Prompt, data, runtime schema, UI, and tests agree on the same field names and rules.
- The full quality and visual-verification suite passes without reverting unrelated work.
