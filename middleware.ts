import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    // Get the pathname of the request (e.g. /, /dashboard, /login)
    const path = request.nextUrl.pathname

    // Define public paths that don't require authentication
    const publicPaths = ["/", "/login", "/register", "/about", "/contact"]

    // Check if the path is public
    const isPublicPath = publicPaths.includes(path)

    // Get the token from cookies (you might need to adjust this based on your auth implementation)
    const token = request.cookies.get("auth-token")?.value || ""

    // If user is on a public path and has a token, redirect to dashboard
    if (isPublicPath && token && (path === "/login" || path === "/register")) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
    }

    // If user is not on a public path and doesn't have a token, redirect to login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }

    // For protected routes, we'll need to check user type on the client side
    // since we can't easily decode the Firebase token in middleware

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}
