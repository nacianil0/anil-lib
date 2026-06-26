# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-06-26

## User Preferences

<!-- How the user likes things done. Code style, tools, patterns, communication. -->

- Execute explicit setup and GitHub publishing requests promptly, and report the verified state directly.

## Key Learnings

- **Project:** anil-lib
- OpenWolf 1.0.4 resolves the project root from markers such as `.git` or `package.json`; without a local marker it may select a parent repository.
- GitHub publishing on this machine uses `gh` HTTPS credentials; SSH private keys are not configured.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

- [2026-06-27] Do not hold explicit install or publish operations behind creative-design brainstorming. Complete independent operational work first, then use the design gate for the generated prompt or application architecture.

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->

- [2026-06-27] Build a single Next.js reader backed by a file contract instead of copying the full nacianilcom Studio monorepo; authoring UI and API services are outside the requested scope.
- [2026-06-27] Make article ingestion idempotent with persistent `article_id` frontmatter, normalized content hashes, and `content/catalog.json`; normal reruns never reclassify existing articles.
