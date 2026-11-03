# "<Series title>" — production trigger

BATCH=2+1

Hand this file to your coding agent to start a run. It is idempotent: every call does the same
steps from the published state. Rules live in `SOZLESME.md`, the current state in `HANDOFF.md`.

1. **Read:** `docs/seri-<key>/SOZLESME.md` → `HANDOFF.md` → `YOL-HARITASI.md`.
2. **Reconcile:** compare `content/series-<key>/catalog.json`, the frontmatter and `roadmap.json`
   with the handoff's cursor. On any mismatch the published files win; resume from there.
3. **Check the workspace:** `git status`, parallel sessions, ports in use.
4. **Produce N articles** (N from the `BATCH=N+1` line above unless the request says otherwise):
   for the next `planlandi` entries in `roadmap.json`, verify sources, write, draw figures, run
   `node tools/series/check-series-content.cjs --series=<key>`,
   `node tools/series/check-series-svg.cjs content/series-<key>/assets`,
   `node tools/series/entegre-batch.cjs --series=<key> --write`,
   `node tools/series/sync-series-hashes.cjs --series=<key> --write` and `pnpm check`, then look at
   the rendered pages.
5. **+1, state only:** update `HANDOFF.md`, the plan and `roadmap.json`; write no further article.
   Then stop.

Committing, pushing, deploying and writing to live systems are not part of this trigger.
