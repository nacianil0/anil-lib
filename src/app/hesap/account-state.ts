export type AccountActionState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "done"; message: string; recoveryCode?: string; username?: string };

export const initialAccountActionState: AccountActionState = { status: "idle" };
