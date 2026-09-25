/**
 * Shared shape for the reset-reading form result. Kept out of `actions.ts` for the
 * same reason as `create-user-state.ts`: a `"use server"` module may only export
 * async functions.
 */
export type ResetReadingState =
  | { status: "idle" }
  | { status: "success"; progress: number; savedPlaces: number; highlights: number }
  | { status: "error"; message: string };

export const initialResetReadingState: ResetReadingState = { status: "idle" };
