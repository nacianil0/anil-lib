import { PROGRESS_STORAGE_KEY, READER_DATA_STORAGE_KEY } from "@/lib/reader/version";
import { migrateLegacyProgress } from "./migration";
import { readerDataSchema, type ReaderData } from "./schema";

export function isReaderDataStorageAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const key = "__anil_reader_data_probe__";
    window.localStorage.setItem(key, "1");
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function parseReaderData(value: string | null): ReaderData | null {
  if (!value) return null;
  try {
    const parsed = readerDataSchema.safeParse(JSON.parse(value));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function readReaderData(): ReaderData {
  if (typeof window === "undefined") return migrateLegacyProgress(null);
  const current = parseReaderData(window.localStorage.getItem(READER_DATA_STORAGE_KEY));
  if (current) return current;
  return migrateLegacyProgress(window.localStorage.getItem(PROGRESS_STORAGE_KEY));
}

export function writeReaderData(data: ReaderData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(READER_DATA_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Reading remains available when storage is full or blocked.
  }
}

export function finishLegacyMigration(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
  } catch {
    // Best effort after the cloud has acknowledged the migrated records.
  }
}
