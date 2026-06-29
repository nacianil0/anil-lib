/**
 * Versioned identifiers for the reader application and its persisted state.
 * Bumping a storage key version intentionally discards older incompatible data.
 */
export const READER_APP = "anil-lib-reader" as const;

export const PROGRESS_STORAGE_KEY = "anil-lib:reader-progress:v1" as const;

export const READER_DATA_STORAGE_KEY = "anil-lib:reader-data:v2" as const;

export const THEME_STORAGE_KEY = "anil-lib:theme" as const;

export const PREFERENCES_STORAGE_KEY = "anil-lib:reader-preferences:v1" as const;

/** Distance from the top of the viewport to the bottom of the sticky toolbar. */
export const TOOLBAR_OFFSET_PX = 76;

/** Scroll fraction at which an article is automatically marked complete. */
export const COMPLETION_THRESHOLD = 0.9;
