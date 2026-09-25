"use server";

import { z } from "zod";
import { getOwnerUser } from "@/lib/auth/session-user";
import { createUserSchema } from "@/lib/auth/user-schema";
import { createStandardUser, DuplicateUsernameError, findUserById } from "@/lib/auth/users";
import { getDatabaseClient } from "@/lib/db/client";
import { resetReadingProgress } from "@/lib/reader-data/server/reset-service";
import type { CreateUserState } from "./create-user-state";
import type { ResetReadingState } from "./reset-reading-state";

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

    // Deliberately no revalidatePath here. Revalidating makes Next re-render this
    // page as part of the action's response, so a rendering problem would surface
    // as a 500 on the create request and hide whether the account was actually
    // written. The client refreshes the list separately once it has the result.
    return { status: "success", username: created.username };
  } catch (error) {
    console.error("[yonetim] createUserAction failed", error);
    return { status: "error", message: `Beklenmeyen hata — ${describeError(error)}` };
  }
}

const resetReadingSchema = z.object({
  userId: z.string().uuid(),
  savedPlaces: z.boolean(),
  highlights: z.boolean(),
});

/**
 * Owner-only: starts one account's reading over (see `resetReadingProgress`).
 *
 * The target is resolved from the database by id, so the workspace that is cleared
 * is never taken from the form. Authorization is checked here and again inside the
 * reset service, before any query runs.
 */
export async function resetReadingAction(
  _previous: ResetReadingState,
  formData: FormData,
): Promise<ResetReadingState> {
  try {
    const owner = await getOwnerUser();
    if (!owner) {
      return { status: "error", message: "Bu işlem için yetkin yok." };
    }

    const parsed = resetReadingSchema.safeParse({
      userId: formData.get("userId") ?? "",
      savedPlaces: formData.get("savedPlaces") === "on",
      highlights: formData.get("highlights") === "on",
    });
    if (!parsed.success) {
      return { status: "error", message: "Geçersiz kullanıcı." };
    }

    const sql = getDatabaseClient();
    if (!sql) {
      return {
        status: "error",
        message: "Veritabanı yapılandırılmamış; okuma geçmişi sıfırlanamıyor.",
      };
    }

    const user = await findUserById(sql, parsed.data.userId);
    if (!user) {
      return { status: "error", message: "Kullanıcı bulunamadı." };
    }

    const result = await resetReadingProgress(sql, owner, user.workspaceId, {
      savedPlaces: parsed.data.savedPlaces,
      highlights: parsed.data.highlights,
    });
    // Audit trail for a destructive owner action: who, for whom, how much. Ids and
    // counts only; no reader-authored text.
    console.info("[yonetim] reading reset", {
      actorId: owner.id,
      targetUserId: user.id,
      resetVersion: result.resetVersion,
      progress: result.progress,
      savedPlaces: result.savedPlaces,
      highlights: result.highlights,
    });

    // As with account creation, no revalidatePath: the client refreshes the page once
    // it has this result, so a rendering problem cannot hide whether the reset ran.
    return {
      status: "success",
      progress: result.progress,
      savedPlaces: result.savedPlaces,
      highlights: result.highlights,
    };
  } catch (error) {
    console.error("[yonetim] resetReadingAction failed", error);
    return { status: "error", message: `Sıfırlanamadı — ${describeError(error)}` };
  }
}
