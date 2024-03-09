/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import apiService from "@/services/apiService";
import localStorageService from "@/services/storeToLocalStorage";
import { useEffect, useState } from "react";

/**
 * Custom hook for providing authentication functionality using client-side requests.
 * @returns {Object} - Object containing authentication methods and user information.
 * @property {User | null} user - The current user object if authenticated, otherwise null.
 * @property {Function} login - Function to log in the user with provided email and password.
 * @property {Function} register - Function to register a new user with provided details.
 * @property {Function} logout - Function to log out the current user.
 * @property {Function} sendPasswordResetEmail - Function to send a password reset email to the user.
 * @property {Function} resetPassword - Function to reset the user's password (updated).
 * @property {Function} confirmPasswordReset - Function to confirm password reset with code and new password.
 * @property {Function} checkUser - Function to check if the user is authenticated.
 * @property {Function} rfreshToken - Function to refresh the user's access token and store it in a session cookie.
 * @property {boolean} isLoading - Boolean indicating whether authentication actions are in progress.
 * @example
 * // Usage example:
 * import React, { useEffect } from 'react';
 * import useProvideAuth from '@/hooks/useAuth'; // Assuming the path is correct
 *
 * function YourComponent() {
 *     const {
 *         user,
 *         login,
 *         register,
 *         logout,
 *         sendPasswordResetEmail,
 *         resetPassword,
 *         confirmPasswordReset,
 *         checkUser,
 *         rfreshToken,
 *         isLoading,
 *     } = useProvideAuth();
 *
 *     useEffect(() => {
 *         checkUser();
 *     }, []);
 *
 *     // Use authentication methods and user information in your component
 *
 *     return (
 *         <div>
 *             {/* Your component content *\/}
 *         </div>
 *     );
 * }
 *
 * export default YourComponent;
 */
function useProvideAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(localStorageService.get('authAccessToken'))
    const [refreshToken, setRefreshToken] = useState<string | null>(localStorageService.get('authRefreshToken'))

    const checkUser = async () => {
        if (accessToken && refreshToken !== null) {
            await apiService.get("/users/me", accessToken)
                .then((data) => {
                    console.log(`User Endpoint data: ${data}`)
                    setUser(data);
                }).catch((error) => {
                    setUser(null)
                })
        } else if (accessToken === null && refreshToken !== null) {
            const at = await rfreshToken(refreshToken)
            if (at !== undefined) {
                await apiService.get("/users/me", at)
                    .then((data) => {
                        console.log(`User Endpoint data: ${data}`)
                        setUser(data);
                    }).catch((error) => {
                        setUser(null)
                    })
            } else {
                setUser(null)
            }
        }
        return null;
    };

    const rfreshToken = async (token: string): Promise<string | undefined> => {
        const body = {
            "refresh": token
        }
        await apiService.post('/auth/token-refresh', body, undefined)
            .then((response) => {
                setAccessToken(response.access)
                return response.access
            }).catch((error) => {
                console.log(error)
                return undefined
            })
        return undefined
    }


    const login = async (email: string, password: string) => {
        setIsLoading(true)
        const body = {
            "email": email,
            "password": password
        }
        await apiService.post("/auth/login", body, undefined).then((response) => {
            if (response.access) {
                setAccessToken(response.access)
                setRefreshToken(response.refresh)
                setUser(response.user)
            }
            setIsLoading(false)
            return response;
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
            return null
        })

    };


    const register = async (email: string, name: string, phone: string, country: string, password1: string, password2: string) => {
        setIsLoading(true)
        const body = {
            "email": email,
            "name": name,
            "phone": phone,
            "country": country,
            "password1": password1,
            "password2": password2,
        }
        await apiService.post("/auth/register", body, undefined);
        setIsLoading(false)
        return null
    };


    const logout = async () => {
        await apiService.get("/auth/logout", undefined).then((response) => {
            console.log(response)
            if (response.detail) {
                setUser(null);
                setAccessToken(null)
                setRefreshToken(null);
                return null
            }
        }).catch((err) => {
            console.log(err)
            return null
        })
        return null
    };


    const sendPasswordResetEmail = async (email: string) => {
        setIsLoading(true)
        const res = await apiService.post("/auth/password/reset", { 'email': email }, undefined);
        setIsLoading(false)
        return res
    };


    const resetPassword = async (password1: string, password2: string): Promise<any> => {
        setIsLoading(true)
        if (accessToken) {
            await apiService.post("/auth/password/change-password", { 'new_password1': password1, "new_password2": password2 }, accessToken).then((response) => {
                setIsLoading(false)
                return response
            }).catch((e) => {
                setIsLoading(false)
                return e
            })
        } else if (accessToken === undefined && refreshToken) {
            const at = await rfreshToken(refreshToken)
            const res = await apiService.post("/auth/password/change-password", { 'new_password1': password1, "new_password2": password2 }, at);
            setIsLoading(false)
            return res
        }
        return null
    };

    const verifyEmail = async (key: string): Promise<any> => {
        setIsLoading(true);
        const body = {
            'key': key
        };
        const res = await apiService.post("/auth/email/verify-email", body, undefined)
    }


    const confirmPasswordReset = async (token: string, uid: string, new_password1: string, new_password2: string) => {
        setIsLoading(true)
        const body = {
            "token": token,
            "uid": uid,
            "new_password1": new_password1,
            "new_password2": new_password2,
        }
        const res = apiService.post("/auth/password/reset/confirm", body, undefined);
        setIsLoading(false)
        return res
    };


    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        setAccessToken(localStorageService.get('authAccessToken'))
        setRefreshToken(localStorageService.get('authRefreshToken'))
        checkUser;
    }, []);


    // Return the user object and auth methods
    return {
        user,
        register,
        login,
        logout,
        sendPasswordResetEmail,
        resetPassword,
        confirmPasswordReset,
        checkUser,
        rfreshToken,
        isLoading,
    };
}

export default useProvideAuth