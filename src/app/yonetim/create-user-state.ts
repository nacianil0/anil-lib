/**
 * Shared shape for the create-user form result.
 *
 * Deliberately NOT in `actions.ts`: a `"use server"` module may only export async
 * functions, so exporting a value from there fails at module load — which takes the
 * whole route down with an opaque 500 rather than a build error.
 */
export type CreateUserState =
  | { status: "idle" }
  | { status: "success"; username: string }
  | { status: "error"; message: string };

export const initialCreateUserState: CreateUserState = { status: "idle" };
