import { NextRequest, NextResponse } from "next/server";
import { getCountryFromIP } from "./utils/geolocationRequests";
import localStorageService from "./services/storeToLocalStorage";
import { useAuth } from "./hooks/useAuth";
import apiService from "./services/apiService";

export async function middleware(request: NextRequest) {
    let country: string;
    const response = NextResponse.next();
    const ip: string = request.headers.get('x-forwarded-for')?.split(',')[0] || request.ip || "127.0.0.1";;

    const storedCounty = request.cookies.has(`${ip}:country`)
    const refresh_token = request.cookies.has(`authRefreshToken`)
    const access_token = request.cookies.has(`authAccessToken`)

    console.log(` has refresh token in cookies: ${refresh_token}`)
    console.log(` has access token in cookies: ${access_token}`)

    if (!access_token && refresh_token && request.nextUrl.pathname !== "/auth/login") {
        const token = request.cookies.get('authRefreshToken')
        const body = {
            "refresh": token
        }
        const response = await apiService.post('/auth/token-refresh/', body, undefined);
        if (response.tokenData) {
            request.cookies.set('authAccessToken', response.tokenData.access)
        }
    }

    if (request.nextUrl.pathname === "/auth") {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (request.nextUrl.pathname === "/dashboard") {
        return NextResponse.redirect(new URL("/dashboard/subscribers", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/dashboard") && !refresh_token || request.nextUrl.pathname === "/auth/change-password" && !refresh_token) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (request.nextUrl.pathname.startsWith("/auth/login") && refresh_token) {
        return NextResponse.redirect(new URL("/dashboard/subscribers", request.url));
    }

    // if (!storedCounty || storedCounty === undefined) {
    //     country = await getCountryFromIP(request, undefined)
    //     response.cookies.set(`${ip}:country`, country);
    //     console.log(request.cookies.has("country"))
    // }

    return response;
}