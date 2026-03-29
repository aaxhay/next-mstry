// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const url = request.nextUrl;

//   if (
//     token &&
//     (url.pathname.startsWith("/sign-in") ||
//       url.pathname.startsWith("/sign-up") ||
//       url.pathname.startsWith("/"))
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (!token && url.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }
//   return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     "/sign-in",
//     "/sign-up",
//     "/verify",
//     "/dashboard/:path*",
//     "/verify/:path*",
//   ],
// };

// proxy.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// The exported function must be named 'proxy' (or used as default export)
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request });
  // 1. Basic Redirect Example
  if (
    token &&
    (pathname === "/sign-in" || pathname === "/sign-up" || pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Return the response with modified headers
  return NextResponse.next({});
}

// Limit the proxy to specific routes
export const config = {
  matcher: ["/sign-in", "/sign-up", "/verify/:path*", "/dashboard/:path*"],
};
