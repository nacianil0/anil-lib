/**
 * Versioned identifiers for the reader application and its persisted state.
 * Bumping a storage key version intentionally discards older incompatible data.
 */
export const READER_APP = "anil-lib-reader" as const;

export const PROGRESS_STORAGE_KEY = "anil-lib:reader-progress:v1" as const;

/**
 * Pre-multi-user key. Kept only so the owner's existing local data can be adopted
 * into their namespaced key on first load; nothing writes to it any more.
 */
export const LEGACY_READER_DATA_STORAGE_KEY = "anil-lib:reader-data:v2" as const;

/**
 * Reader state is stored per account. The workspace suffix keeps the pending outbox
 * separate too, so one account's unsent mutations can never be flushed under
 * another account's session.
 */
export function readerDataStorageKey(workspaceId: string): string {
  return `${LEGACY_READER_DATA_STORAGE_KEY}:${workspaceId}`;
}

export const THEME_STORAGE_KEY = "anil-lib:theme" as const;

export const PREFERENCES_STORAGE_KEY = "anil-lib:reader-preferences:v1" as const;

/** Distance from the top of the viewport to the bottom of the sticky toolbar. */
export const TOOLBAR_OFFSET_PX = 76;

/** Scroll fraction at which an article is automatically marked complete. */
export const COMPLETION_THRESHOLD = 0.9;

/**
 * Scroll fraction above which an unfinished article counts as started. Shared by the
 * reader UI and the owner statistics so both report the same number.
 */
export const STARTED_RATIO = 0.02;
