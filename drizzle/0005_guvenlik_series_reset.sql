-- Widens the per-series reset check to the third series ("Güven Sınırı", id 'guvenlik').
-- Additive: every existing row ('ai', 'boun') still satisfies the new check, so no reader's
-- reset epoch or progress changes. One statement on purpose: scripts/migrate.mjs runs each
-- statement on its own, so a separate DROP and ADD could leave the table without any check
-- if the ADD failed in between. As a single ALTER TABLE the drop and the re-add commit
-- together, and a re-run (the runner records the file only after it succeeds) is harmless.
ALTER TABLE "reading_series_resets"
  DROP CONSTRAINT IF EXISTS "reading_series_resets_series_check",
  ADD CONSTRAINT "reading_series_resets_series_check" CHECK ("series_id" IN ('ai', 'boun', 'guvenlik'));
