import { NextResponse, type NextRequest } from "next/server";
import {
  AUTH_COOKIE_NAME,
  getGateConfig,
  isGateIntended,
  safeNextPath,
  verifySignedSession,
} from "@/lib/auth/password-gate";

const PUBLIC_FILE = /\.(?:avif|gif|ico|jpg|jpeg|png|svg|webp|woff2?)$/i;

function isPublicPath(pathname: string): boolean {
  return pathname === "/login" || pathname.startsWith("/_next/") || PUBLIC_FILE.test(pathname);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) return NextResponse.next();

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
