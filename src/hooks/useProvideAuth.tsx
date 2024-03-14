/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import apiService from "@/services/apiService";
import { useEffect, useState } from "react";
import GetAuthAccessToken from "./getAccessToken";
import SetAuthAccessToken from "./setAccessToken";
import { useRouter } from "next/navigation";
import DeleteAuthAccessToken from "./deleteAccessTokens";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sleep } from "@/utils/utils";

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
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | undefined>(undefined)
    const [refreshToken, setRefreshToken] = useState<string | undefined>(undefined)
    const [tokens, setTokens] = useState<(string | undefined)[]>([]);

    const checkUser = async (at: string|undefined, rt: string|undefined) => {
        if (at !== undefined && rt !== undefined) {
            const data = await apiService.get("/users/me/", at)
            if (data.error_message) {
                setUser(null)
            } else if (!data.error_message) {
                setUser(data)
            }
        } else if (at === undefined && rt !== undefined) {
            const ast = await rfreshToken(rt)
            if (ast !== undefined && !ast.error_message) {
                const data = await apiService.get("/users/me/", ast)
                if (data.error_message) {
                    setUser(null)
                } else if (!data.error_message) {
                    setUser(data)
                }
            } else if (ast === undefined && ast.error_message) {
                DeleteAuthAccessToken()
                setUser(null)
            } else {
                setUser(null);
            }
        } else if (at === undefined && rt === undefined) {
            DeleteAuthAccessToken()
            setUser(null)
        }
    };

    const rfreshToken = async (token: string): Promise<any> => {
        setRefreshToken(token)
        setIsLoading(true)
        const body = {
            "refresh": token
        }
        const response = await apiService.post('/auth/token-refresh/', body, undefined);
        setIsLoading(false)
        if (response.tokenData) {
            setAccessToken(response.tokenData.access)
            await SetAuthAccessToken(response.tokenData.access)
        } else if (response.error_message === "Token is invalid or expired") {
            router.push('/auth/login')
            return response
        } else {
            return response.tokenData.access
        }
    }


    const login = async (email: string, password: string) => {
        setIsLoading(true)
        const body = {
            "email": email,
            "password": password
        }
        const response = await apiService.post("/auth/login/", body, undefined);
        if (response.access) {
            setAccessToken(response.access)
            setRefreshToken(response.refresh)
            setUser(response.user)
            SetAuthAccessToken(response.access, response.refresh, response.user.id)
        }
        setIsLoading(false)
        return response;
    };


    const register = async (name: string, email: string, password1: string, password2: string, phone: string, country: string) => {
        setIsLoading(true)
        const body = {
            "email": email,
            "name": name,
            "phone": phone,
            "country": country,
            "password1": password1,
            "password2": password2,
        }
        const res = await apiService.post("/auth/register/", body, undefined);
        setIsLoading(false)
        return res
    };


    const logout = async () => {
        const res = await apiService.get("/auth/logout/", undefined);
        setUser(null);
        setAccessToken(undefined)
        setRefreshToken(undefined);
        DeleteAuthAccessToken();
        toast.success("Successfully Logged Out!")
        sleep(2000);
        router.push("/");
        return res
    };


    const sendPasswordResetEmail = async (email: string): Promise<any> => {
        setIsLoading(true)
        const res = await apiService.post("/auth/password/reset/", { 'email': email }, undefined);
        setIsLoading(false)
        return res
    };


    const resendVerificationEmail = async (email: string): Promise<any> => {
        setIsLoading(true)
        const res = await apiService.post("/auth/resend-email-verification/", { 'email': email }, undefined);
        setIsLoading(false)
        return res
    };


    const resetPassword = async (password1: string, password2: string): Promise<any> => {
        setIsLoading(true)
        const body = { 'new_password1': password1, "new_password2": password2 };
        console.log(`access ${accessToken}`)
        console.log(`refresh ${refreshToken}`)
        if (accessToken !== undefined) {
            const response = await apiService.post("/auth/password/change-password/", body, accessToken);
            setIsLoading(false);
            return response;
        } else if (accessToken === undefined && refreshToken !== undefined) {
            const at = await rfreshToken(refreshToken)
            const response = await apiService.post("/auth/password/change-password/", body, at);
            setIsLoading(false);
            return response;
        } else {
            setIsLoading(false)
            return "Network Error"
        }
    };

    const verifyEmail = async (key: string): Promise<any> => {
        setIsLoading(true);
        const body = {
            'key': key
        };
        const res = await apiService.post("/auth/email/verify-email/", body, undefined)
        setIsLoading(false);
        return res
    }


    const confirmPasswordReset = async (token: string, uid: string, new_password1: string, new_password2: string) => {
        setIsLoading(true)
        const body = {
            "token": token,
            "uid": uid,
            "new_password1": new_password1,
            "new_password2": new_password2,
        }
        const res = apiService.post("/auth/password/reset/confirm/", body, undefined);
        setIsLoading(false)
        return res
    };

    const checkUserExists = async (email: string) => {
        const res = apiService.get(`/validate/check-user-exists/?email=${email}`, undefined);
        setIsLoading(false)
        return res
    };

    const checkPhoneExists = async (phone: string) => {
        const res = apiService.get(`/validate/check-phone-exists/?phone=${phone}`, undefined);
        setIsLoading(false)
        return res
    };

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const getCookies = async () => {
            const res = await GetAuthAccessToken()
            setTokens(res)
            setAccessToken(res[0])
            setRefreshToken(res[1])
            await checkUser(res[0], res[1]);
        }
        getCookies();
    }, []);


    // Return the user object and auth methods
    return {
        user,
        accessToken,
        refreshToken,
        register,
        login,
        logout,
        sendPasswordResetEmail,
        resetPassword,
        confirmPasswordReset,
        verifyEmail,
        resendVerificationEmail,
        checkUserExists,
        checkPhoneExists,
        rfreshToken,
        isLoading,
    };
}

export default useProvideAuth