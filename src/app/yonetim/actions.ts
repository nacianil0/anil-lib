"use server";

import { revalidatePath } from "next/cache";
import { getOwnerUser } from "@/lib/auth/session-user";
import { createUserSchema } from "@/lib/auth/user-schema";
import { createStandardUser, DuplicateUsernameError } from "@/lib/auth/users";
import { getDatabaseClient } from "@/lib/db/client";

export type CreateUserState =
  | { status: "idle" }
  | { status: "success"; username: string }
  | { status: "error"; message: string };

export const initialCreateUserState: CreateUserState = { status: "idle" };

/**
 * Renders a failure into something the owner can act on. This screen is owner-only,
 * so the underlying Postgres code and message are shown rather than swallowed — a
 * bare 500 gives nobody anything to work with. Never includes a stack or the
 * connection string.
 */
function describeError(error: unknown): string {
  const candidate = error as {
    code?: unknown;
    message?: unknown;
    sourceError?: { code?: unknown; message?: unknown };
  } | null;
  const code = candidate?.code ?? candidate?.sourceError?.code;
  const message = candidate?.message ?? candidate?.sourceError?.message ?? String(error);
  return code ? `${String(code)}: ${String(message)}` : String(message);
}

/**
 * Owner-only account creation.
 *
 * The authorization check is repeated here on purpose: a server action is a public
 * endpoint, so it must not rely on the page that rendered the form having checked.
 * The submitted password is hashed and discarded — it is never logged, never echoed
 * back in the returned state, and never stored in readable form.
 *
 * The whole body is guarded: an uncaught throw here becomes an opaque 500 in the
 * browser, which tells the owner nothing.
 */
export async function createUserAction(
  _previous: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  try {
    const owner = await getOwnerUser();
    if (!owner) {
      return { status: "error", message: "Bu işlem için yetkin yok." };
    }

    const parsed = createUserSchema.safeParse({
      username: formData.get("username") ?? "",
      password: formData.get("password") ?? "",
    });
    if (!parsed.success) {
      return {
        status: "error",
        message: parsed.error.issues[0]?.message ?? "Girdiğin bilgiler geçersiz.",
      };
    }

    const sql = getDatabaseClient();
    if (!sql) {
      return {
        status: "error",
        message: "Veritabanı yapılandırılmamış; kullanıcı oluşturulamıyor.",
      };
    }

    let created;
    try {
      created = await createStandardUser(sql, {
        username: parsed.data.username,
        password: parsed.data.password,
        createdBy: owner.id,
      });
    } catch (error) {
      if (error instanceof DuplicateUsernameError) {
        return { status: "error", message: "Bu kullanıcı adı zaten var." };
      }
      console.error("[yonetim] user creation failed", error);
      return { status: "error", message: `Kullanıcı oluşturulamadı — ${describeError(error)}` };
    }

    // Refreshing the list must not undo a successful create: report the success
    // even if the revalidation itself fails.
    try {
      revalidatePath("/yonetim");
    } catch (error) {
      console.error("[yonetim] revalidate failed after create", error);
    }

    return { status: "success", username: created.username };
  } catch (error) {
    console.error("[yonetim] createUserAction failed", error);
    return { status: "error", message: `Beklenmeyen hata — ${describeError(error)}` };
  }
}
