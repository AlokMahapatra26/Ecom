import { ADMIN_DASHBOARD } from "@/routes/AdminPanleRoute";
import { USER_DASHBOARD, WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) { // Use NextRequest for extended features
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get("access_token")?.value; // Safely get token value

    // If the SECRET_KEY is not set, throw an error immediately.
    const secret = process.env.SECRET_KEY;
    if (!secret) {
        console.error("Missing SECRET_KEY environment variable");
        // In a real app, you might want to handle this more gracefully.
        return new NextResponse("Internal Server Error: Missing server configuration", { status: 500 });
    }

    // --- User is NOT logged in ---
    if (!accessToken) {
        // Allow access to auth pages if the user is not logged in
        if (pathname.startsWith("/auth")) {
            return NextResponse.next();
        }
        // For any other protected route, redirect to login
        return NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
    }

    // --- User IS logged in ---
    try {
        const { payload } = await jwtVerify(accessToken, new TextEncoder().encode(secret));
        console.log(payload)
        const role = payload.role as 'admin' | 'user';

        // Prevent logged-in users from accessing auth pages (e.g., /auth/login)
        if (pathname.startsWith("/auth")) {
            const url = role === "admin" ? ADMIN_DASHBOARD : USER_DASHBOARD;
            return NextResponse.redirect(new URL(url, request.url));
        }

        // Protect admin routes from non-admin users
        if (pathname.startsWith("/admin") && role !== "admin") {
            return NextResponse.redirect(new URL(USER_DASHBOARD, request.url)); // Redirect to user dashboard
        }

        // Protect user routes from non-user roles (e.g., admin)
        if (pathname.startsWith("/my-account") && role !== "user") {
            return NextResponse.redirect(new URL(ADMIN_DASHBOARD, request.url)); // Redirect to admin dashboard
        }

        // If all checks pass, allow the request to proceed
        return NextResponse.next();

    } catch (error) {
        // This block catches errors from jwtVerify (e.g., expired or invalid token)
        console.error("JWT Verification Error:", error);

        // Clear the invalid token and redirect to the login page
        const response = NextResponse.redirect(new URL(WEBSITE_LOGIN, request.url));
        response.cookies.delete("access_token");
        return response;
    }
}

export const config = {
    matcher: ["/admin/:path*", "/my-account/:path*", "/auth/:path*"],
};