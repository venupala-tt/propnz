// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const user = req.nextauth?.token; // NextAuth JWT token payload

    // 🔑 Protect /admin → only allow admins
    if (pathname.startsWith("/admin") && user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url)); // redirect non-admins to home
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Run only if the user has a valid session
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/", // redirect if not signed in
    },
  }
);

// ✅ Protect only these routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
