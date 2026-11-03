export type RegisterState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      field?: "username" | "password" | "confirm";
      /** Put back into the form, which React clears after every submission. Never a password. */
      username?: string;
    }
  /** The recovery code travels to the browser exactly once, in this state. */
  | { status: "created"; username: string; recoveryCode: string; next: string };

export const initialRegisterState: RegisterState = { status: "idle" };
