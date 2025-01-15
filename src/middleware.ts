import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { auth } from "@/auth"
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@/routes"

export default async function middleware(request: NextRequest) {
    const session = await auth()
    const pathname = request.nextUrl.pathname

    if (pathname.startsWith('/api')) {
        if (pathname.startsWith('/api/auth')) {
            return NextResponse.next()
        }
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        return NextResponse.next()
    }

    if (!session?.user && PROTECTED_ROUTES.includes(pathname)) {
        const redirectUrl = new URL("/", request.url)
        return NextResponse.redirect(redirectUrl)
    }

    if (session?.user && AUTH_ROUTES.includes(pathname)) {
        const redirectUrl = new URL("/dashboard", request.url)
        return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [...PROTECTED_ROUTES, ...AUTH_ROUTES, '/api/:path*']
} 