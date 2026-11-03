import { LOCAL_WORKSPACE_ID } from "@/lib/auth/access";
import { readerDataStorageKey } from "@/lib/reader/version";

/**
 * The visitor's own switch for reading without an account. On (the default), the
 * reader keeps the last article and position in this browser's `localStorage` so the
 * next visit can offer to continue; off, nothing is written and what was kept is
 * removed. Neither state ever reaches the server.
 */
export const LOCAL_TRACKING_STORAGE_KEY = "anil-lib:local-reading:v1";

export function isLocalTrackingEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return window.localStorage.getItem(LOCAL_TRACKING_STORAGE_KEY) !== "off";
  } catch {
    // Blocked storage keeps nothing either way; the switch reads as on.
    return true;
  }
}

/** Removes everything the anonymous reader kept in this browser. Best effort. */
export function clearLocalReadingData(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(readerDataStorageKey(LOCAL_WORKSPACE_ID));
  } catch {
    // Nothing to remove when storage is blocked.
  }
}

/** Turning tracking off also forgets what was already kept. */
export function setLocalTrackingEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (enabled) {
      window.localStorage.removeItem(LOCAL_TRACKING_STORAGE_KEY);
    } else {
      window.localStorage.setItem(LOCAL_TRACKING_STORAGE_KEY, "off");
      clearLocalReadingData();
    }
  } catch {
    // Storage blocked: there is nothing kept to forget, and nothing to remember the choice in.
  }
}
