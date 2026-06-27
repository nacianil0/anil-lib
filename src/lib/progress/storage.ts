import { PROGRESS_STORAGE_KEY } from "@/lib/reader/version";
import { emptyProgress, readerProgressSchema, type ReaderProgress } from "./schema";

/** Feature-detect a writable localStorage (private mode / blocked storage returns false). */
export function isStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const probe = "__anil_lib_probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

/** Parse a raw JSON string into progress, falling back to empty state on any fault. */
export function parseProgress(value: string | null): ReaderProgress {
  if (!value) return emptyProgress();
  try {
    const parsed = readerProgressSchema.safeParse(JSON.parse(value));
    return parsed.success ? parsed.data : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function readProgress(): ReaderProgress {
  if (typeof window === "undefined") return emptyProgress();
  try {
    return parseProgress(window.localStorage.getItem(PROGRESS_STORAGE_KEY));
  } catch {
    return emptyProgress();
  }
}

export function writeProgress(progress: ReaderProgress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    /* Storage full or blocked — persistence is best-effort and never fatal. */
  }
}
