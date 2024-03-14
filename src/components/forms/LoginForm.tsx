"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import InputComponent from './InputComponent'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth';
import { extractErrorMessages, sleep } from '@/utils/utils'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDebouncedCallback } from 'use-debounce';

export default function LoginForm() {
    const auth = useAuth();
    const router = useRouter();
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [error, setError] = useState<string | undefined>()
    const [passwordError, setPasswordError] = useState<string | undefined>();
    const [emailError, setEmailError] = useState<string | undefined>();

    const submitForm = async () => {
        const res = await auth!.login(emailInput!, passwordInput!)
        console.log(res);

        if (res.error_message) {
            const string = res.error_message
            const errorMessage = extractErrorMessages(string);
            console.log(errorMessage)
            if (res.error_message.includes("non_field_errors")) {
                setError(errorMessage[0])
                setPasswordError(undefined)
                setEmailError(undefined)
            } else if (res.error_message.includes("password") && res.error_message.includes("email")) {
                setError(undefined)
                setPasswordError(errorMessage[1])
                setEmailError(errorMessage[0])
            }
            else if (res.error_message.includes("email")) {
                setError(undefined)
                setPasswordError(undefined)
                setEmailError(errorMessage[0])
            } else if (res.error_message.includes("password")) {
                setError(undefined)
                setPasswordError(errorMessage[0])
                setEmailError(undefined)
            }
        } else if (res.access) {
            toast.success("Successfully Logged in!")
            sleep(2000);
    
            router.replace("/dashboard/subscribers")
        }
    }

    useEffect(() => {
        const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-z]{2,}$/;
        console.log(passwordInput)
        if (emailInput !== undefined && emailInput?.length > 0) {
            if (!regex.test(emailInput)) {
                setEmailError("please provide a valid email address")
            } else if (regex.test(emailInput)) {
                setEmailError(undefined);
            }
        } else if (emailInput !== undefined && emailInput?.length <= 0) {
            setError(undefined)
        }

        if (passwordInput !== undefined && passwordInput.length > 0) {
            setPasswordError(undefined)
        }

        if (passwordInput !== undefined && passwordInput.length > 0 && emailInput !== undefined && emailInput.length > 0) {
            setError(undefined)
        }

    }, [emailInput, passwordInput])
    return (
        <form action={submitForm} className="pt-8 max-w-xs lg:max-w-md w-full space-y-6" >
            {error !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{error}</span>}
            <div>
                <InputComponent autocomplete={true} setStateProp={setEmailInput} type="email" id="id_email" name="email" text="Email Address" />
                {emailError !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{emailError}</span>}
            </div>

            <div>
                <InputComponent autocomplete={true} setStateProp={setPasswordInput} type="password" id="id_password" name="password" text="Password" />
                {passwordError !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{passwordError}</span>}
            </div>

            <center><Link href="/auth/forgot-password" className="font-bold" type="button">Forgot password ?</Link></center>
            <button type="submit" disabled={auth?.isLoading || error || passwordError || emailError ? true : false} className={`rounded-xl hover:scale-105 duration-300 ease-linear hover:shadow-lg w-full py-2 px-6 ${error || passwordError || emailError ? "bg-gray-300 text-gray-900" : "bg-primary dark:bg-secondary text-light dark:text-dark"}`}><span className={`${auth?.isLoading ? "animate-ping" : "animate-none"}`}>{auth?.isLoading ? "Submitting..." : "Submit"}</span></button>
        </ form>
    )
}
