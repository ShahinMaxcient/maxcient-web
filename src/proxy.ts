import { NextResponse, type NextRequest } from "next/server";

/**
 * First line of defence for the admin area: a page request that carries no
 * sign-in cookie is sent to the login page before any admin code runs.
 *
 * It only looks for the cookie and does not verify it. Verifying is done
 * where the data is: every admin page calls requireAdmin()
 * (src/lib/admin-auth.ts), and every server action and admin API route calls
 * auth(). A forged cookie gets past this check and no further. Its job is to
 * keep anonymous requests away from admin code altogether, including any page
 * added later without its own check.
 *
 * Only GET and HEAD are redirected. Server actions are POSTs to the page that
 * uses them; they check the session themselves and report an expired one in
 * their own result, which a redirect here would replace with a broken
 * response.
 */

// Auth.js's session cookie: "__Secure-" on https, and split into ".0", ".1"…
// when it is too large for one cookie.
const SESSION_COOKIE = /^(__Secure-)?authjs\.session-token(\.\d+)?$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next();
  }
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const hasSession = request.cookies.getAll().some((c) => SESSION_COOKIE.test(c.name));
  if (hasSession) return NextResponse.next();

  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
