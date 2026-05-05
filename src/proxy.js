import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("accessToken")?.value;
  const path = request.nextUrl.pathname;

  if (path.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((path === "/login" || path === "/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
