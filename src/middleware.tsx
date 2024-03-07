import { NextRequest, NextResponse } from "next/server";
import { getCountryFromIP } from "./utils/geolocationRequests";

export async function middleware(request: NextRequest) {
    let country: string;
    const response = NextResponse.next();
    const ip = request.ip;

    const storedCounty = request.cookies.has(`${ip}:country`)

    if (request.nextUrl.pathname === "/auth") {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (!storedCounty || storedCounty === undefined) {
        country = await getCountryFromIP(request, undefined)
        response.cookies.set(`${ip}:country`, country);
        console.log(request.cookies.has("country"))
    }

    return response;
}