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
 * Owner-only account creation.
 *
 * The authorization check is repeated here on purpose: a server action is a public
 * endpoint, so it must not rely on the page that rendered the form having checked.
 * The submitted password is hashed and discarded — it is never logged, never echoed
 * back in the returned state, and never stored in readable form.
 */
export async function createUserAction(
  _previous: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
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

  try {
    const created = await createStandardUser(sql, {
      username: parsed.data.username,
      password: parsed.data.password,
      createdBy: owner.id,
    });
    revalidatePath("/yonetim");
    return { status: "success", username: created.username };
  } catch (error) {
    if (error instanceof DuplicateUsernameError) {
      return { status: "error", message: "Bu kullanıcı adı zaten var." };
    }
    console.error("[yonetim] user creation failed", error);
    return { status: "error", message: "Kullanıcı oluşturulamadı. Tekrar dene." };
  }
}
