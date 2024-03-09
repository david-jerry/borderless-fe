import { NextRequest, NextResponse } from "next/server";
import { getCountryFromIP } from "./utils/geolocationRequests";
import localStorageService from "./services/storeToLocalStorage";

export async function middleware(request: NextRequest) {
    let country: string;
    const response = NextResponse.next();
    const ip: string = request.headers.get('x-forwarded-for')?.split(',')[0] || request.ip || "127.0.0.1";;

    const storedCounty = request.cookies.has(`${ip}:country`)
    const refresh_token = request.cookies.has(`authRefreshToken`)

    if (!refresh_token) {
        localStorageService.delete('authRefreshToken')
        localStorageService.delete('authAccessToken')
        localStorageService.delete('authUserId')
    }

    if (request.nextUrl.pathname === "/auth") {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // if (request.nextUrl.pathname.startsWith("/dashboard") || request.nextUrl.pathname === "/auth/reset-password" && !refresh_token) {
    //     return NextResponse.redirect(new URL("/auth/login", request.url));
    // }

    if (!storedCounty || storedCounty === undefined) {
        country = await getCountryFromIP(request, undefined)
        response.cookies.set(`${ip}:country`, country);
        console.log(request.cookies.has("country"))
    }

    return response;
}