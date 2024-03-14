"use client";

import React, { useState, useEffect } from 'react'
import InputComponent from './InputComponent'
import { useAuth } from '@/hooks/useAuth';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function ForgotPasswordForm() {
    const auth = useAuth();
    const [emailInput, setEmailInput] = useState<string>("")
    const [error, setError] = useState<string | undefined>()
    const [sent, setSent] = useState(false)

    const submitForm = async () => {
        const res = await auth!.sendPasswordResetEmail(emailInput!)
        console.log(res);

        if (res.error_message) {
            const string = res.error_message
            const match = string.match(/ErrorDetail\(string='([^']*)'/);
            const errorMessage = match ? match[1] : null;
            setError(errorMessage)
        } else if (res.detail) {
            setSent(true)
        }
    }

    useEffect(() => {
        const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-z]{2,}$/;
        if (emailInput !== undefined && emailInput?.length > 0) {
            if (!regex.test(emailInput)) {
                setError("please provide a valid email address")
            } else if (regex.test(emailInput)) {
                setError(undefined);
            }
        } else if (emailInput !== undefined && emailInput?.length <= 0) {
            setError(undefined)
        }
    }, [emailInput])

    return (
        <>
            {
                !sent ? <form className="pt-8 max-w-xs lg:max-w-md w-full space-y-6">
                    <InputComponent  autocomplete={false} setStateProp={setEmailInput} type="email" id="id_email" name="email" text="Email Address" />

                    {error !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{error}</span>}
                    <button type="button" onClick={submitForm} className="rounded-xl hover:scale-105 duration-300 ease-linear hover:shadow-lg w-full py-2 px-6 bg-primary dark:bg-secondary text-light dark:text-dark">{auth!.isLoading ? 'Loading...' : 'Submit'}</button>
                </form> : <div className="mt-8 max-w-xs lg:max-w-md w-full gap-6 text-center flex flex-row items-center bg-green-300 text-green-700 rounded-xl p-6">
                    <Icon icon="mdi:email-sent" width="1.2em" height="1.2em" className="w-16 h-16 flex-none" />

                    <p className="font-semibold text-sm flex-grow">
                        We have sent an email to you, please click the link to reset your password.
                    </p>

                </div>
            }
        </>
    )
}
