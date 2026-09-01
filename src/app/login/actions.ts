"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authenticateUser } from "@/lib/auth/authenticate";
import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  AUTH_COOKIE_NAME,
  buildSignedSession,
  getGateConfig,
  safeNextPath,
} from "@/lib/auth/password-gate";
import { normalizeUsername } from "@/lib/auth/user-schema";

type LoginError = "config" | "invalid" | "unavailable";

function loginPath(next: string, error?: LoginError): string {
  const params = new URLSearchParams({ next });
  if (error) params.set("error", error);
  return `/login?${params.toString()}`;
}

export async function login(formData: FormData): Promise<void> {
  const username = formData.get("username");
  const password = formData.get("password");
  const next = safeNextPath(formData.get("next")?.toString());
  const config = getGateConfig();

  if (!config) {
    redirect(loginPath(next, "config"));
  }

  if (typeof username !== "string" || typeof password !== "string") {
    redirect(loginPath(next, "invalid"));
  }

  const result = await authenticateUser(
    normalizeUsername(username),
    password,
    config.passwordHash,
  );

  if (result.status === "unavailable") {
    redirect(loginPath(next, "unavailable"));
  }
  if (result.status !== "ok") {
    redirect(loginPath(next, "invalid"));
  }

  const cookieStore = await cookies();
  cookieStore.set(
    AUTH_COOKIE_NAME,
    await buildSignedSession(config.cookieSecret, {
      userId: result.user.id,
      workspaceId: result.user.workspaceId,
    }),
    {
      httpOnly: true,
      maxAge: AUTH_COOKIE_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  );

  // Drop anything the previous account rendered so a switch inside one tab cannot
  // serve their pages from the router cache.
  revalidatePath("/", "layout");
  redirect(next);
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  revalidatePath("/", "layout");
  redirect("/login");
}
