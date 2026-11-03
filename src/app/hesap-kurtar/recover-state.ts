export type RecoverState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      field?: "password" | "confirm";
      /** Put back into the form after a failed attempt. Never a password or a code. */
      username?: string;
    }
  /** The replacement recovery code travels to the browser exactly once, in this state. */
  | { status: "recovered"; username: string; recoveryCode: string };

export const initialRecoverState: RecoverState = { status: "idle" };
