import { NextResponse } from "next/server";

const COOKIE_NAME = "ta_admin_session";

function getSessionToken() {
  const token = process.env.ADMIN_SESSION_TOKEN;
  if (token) return token;
  if (process.env.NODE_ENV !== "production") return "dev_admin_session_token";
  return null;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();
  if (pathname.startsWith("/admin/login/")) return NextResponse.next();

  const expectedToken = getSessionToken();
  if (!expectedToken) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("error", "server_not_configured");
    return NextResponse.redirect(url);
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (token === expectedToken) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
