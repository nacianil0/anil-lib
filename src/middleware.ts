import { NextResponse, type NextRequest } from "next/server";
import { isPublicPath, publicLaunchEnabled } from "@/lib/auth/access";
import {
  AUTH_COOKIE_NAME,
  getGateConfig,
  isGateIntended,
  safeNextPath,
  verifySignedSession,
} from "@/lib/auth/password-gate";

const PUBLIC_FILE = /\.(?:avif|gif|ico|jpg|jpeg|png|svg|webp|woff2?)$/i;

/**
 * Once launched (`PUBLIC_LAUNCH=1`), public pages (the AI series, the home page,
 * sign-up and the policy page) pass without a session; the page itself decides what an
 * anonymous visitor sees. Before that only the sign-in page does. Every other path —
 * the other series, management, the reader APIs — always needs a session.
 */
function passesWithoutSession(pathname: string): boolean {
  return (
    isPublicPath(pathname, publicLaunchEnabled()) ||
    pathname.startsWith("/_next/") ||
    PUBLIC_FILE.test(pathname)
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (passesWithoutSession(pathname)) return NextResponse.next();

  const config = getGateConfig();

  if (!config) {
    if (isGateIntended() || process.env.NODE_ENV === "production") {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("error", "config");
      url.searchParams.set("next", safeNextPath(pathname));
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const cookieValue = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (await verifySignedSession(cookieValue, config.cookieSecret)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("next", safeNextPath(`${pathname}${request.nextUrl.search}`));
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
