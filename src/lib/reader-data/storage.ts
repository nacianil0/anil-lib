import {
  LEGACY_READER_DATA_STORAGE_KEY,
  PROGRESS_STORAGE_KEY,
  readerDataStorageKey,
} from "@/lib/reader/version";
import { OWNER_WORKSPACE_ID } from "@/lib/auth/user-schema";
import { migrateLegacyProgress } from "./migration";
import { emptyReaderData, readerDataSchema, type ReaderData } from "./schema";

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

/**
 * Parses a stored blob for a specific account. A blob whose `workspaceId` does not
 * match is treated as absent, so a stale or hand-edited entry can never surface
 * another account's reading state.
 */
export function parseReaderData(value: string | null, workspaceId: string): ReaderData | null {
  if (!value) return null;
  try {
    const parsed = readerDataSchema.safeParse(JSON.parse(value));
    if (!parsed.success) return null;
    return parsed.data.workspaceId === workspaceId ? parsed.data : null;
  } catch {
    return null;
  }
}

/**
 * Reads the account's blob, falling back to the pre-multi-user local data.
 *
 * The fallback is owner-only and deliberately so: those keys were written when the
 * app had a single account, so they are the owner's. A standard user never reads
 * them and always starts empty.
 */
export function readReaderData(workspaceId: string): ReaderData {
  if (typeof window === "undefined") return emptyReaderData(workspaceId);

  const current = parseReaderData(
    window.localStorage.getItem(readerDataStorageKey(workspaceId)),
    workspaceId,
  );
  if (current) return current;

  if (workspaceId !== OWNER_WORKSPACE_ID) return emptyReaderData(workspaceId);

  const legacyRaw = window.localStorage.getItem(LEGACY_READER_DATA_STORAGE_KEY);
  if (legacyRaw) {
    try {
      // The legacy blob predates the workspace field, so validate it with that
      // field injected rather than rejecting it for being incomplete.
      const parsed = readerDataSchema.safeParse({
        ...(JSON.parse(legacyRaw) as Record<string, unknown>),
        workspaceId,
      });
      if (parsed.success) return parsed.data;
    } catch {
      // Fall through to the even older progress-only key.
    }
  }

  return migrateLegacyProgress(
    window.localStorage.getItem(PROGRESS_STORAGE_KEY),
    workspaceId,
  );
}

export function writeReaderData(data: ReaderData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      readerDataStorageKey(data.workspaceId),
      JSON.stringify(data),
    );
  } catch {
    // Reading remains available when storage is full or blocked.
  }
}

/**
 * Clears the pre-multi-user keys once the cloud has acknowledged the migrated
 * records. Only the owner ever adopted them, so only the owner clears them.
 */
export function finishLegacyMigration(workspaceId: string): void {
  if (typeof window === "undefined") return;
  if (workspaceId !== OWNER_WORKSPACE_ID) return;
  try {
    window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_READER_DATA_STORAGE_KEY);
  } catch {
    // Best effort.
  }
}
