import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    // Public routes
    const publicPaths = ["/", "/login", "/register"]

    const isPublicPath = publicPaths.some((p) => path.startsWith(p))
    const token = request.cookies.get("auth-token")?.value || ""

    if (isPublicPath && token && (path === "/login" || path === "/register")) {
        return NextResponse.redirect(new URL("/dashboard", request.nextUrl))
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}
