"use server"

import React from 'react'
import { cookies } from "next/headers"

export default async function useAuthAccessToken() {
    const accessToken: string | undefined = cookies().get('authAccessToken')?.value;
    const refreshToken: string | undefined = cookies().get('authRefreshToken')?.value;
    return [accessToken, refreshToken]
}
