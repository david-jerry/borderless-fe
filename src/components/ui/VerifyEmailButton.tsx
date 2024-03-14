"use client";

import React from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/hooks/useAuth';

export default function VerifyEmailButton({ key }: { key: string }) {
    const auth = useAuth();
    const router = useRouter();



    const verifyEmail = async () => {
        const res = await auth?.verifyEmail(decodeURIComponent(key))
        if (res.detail) {
            toast.success(res.detail)
            router.push("/auth/login")
        } else {
            toast.error(res.error_message)
            if (res.error_message === "Not found.") {
                router.replace("/accounts/resend-email")
            }
        }
    }

    return (
        <>
            <button onClick={verifyEmail} className="rounded-xl hover:scale-105 duration-300 ease-linear hover:shadow-lg w-full py-2 px-6 bg-primary dark:bg-secondary text-light dark:text-dark text-nowrap">
                {
                    auth!.isLoading ? (<span>Loading...</span>) : "Complete Verification"
                }
            </button>
        </>
    )
}
