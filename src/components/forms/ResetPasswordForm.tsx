"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import InputComponent from './InputComponent'
import { useAuth } from '@/hooks/useAuth';
import { extractErrorMessages, sleep } from '@/utils/utils'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPasswordForm() {
    const auth = useAuth();
    const router = useRouter();
    const [oldPasswordInput, setOldPasswordInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [passwordConfirmInput, setPasswordConfirmInput] = useState<string>("");
    const [error, setError] = useState<string | undefined>()
    const [passwordError, setPasswordError] = useState<string | undefined>();
    const [passwordConfirmError, setPasswordConfirmError] = useState<string | undefined>();

    const submitForm = async () => {
        console.log(`Auth: ${auth}`)
        console.log(passwordConfirmInput)
        console.log(passwordInput)

        if (passwordInput.length >= 8 && passwordConfirmInput === passwordInput && auth !== null) {
            const res = await auth.resetPassword(passwordInput, passwordConfirmInput)
            console.log(res);

            if (res.error_message) {
                const string = res.error_message
                const errorMessage = extractErrorMessages(string);
                console.log(errorMessage)
                if (res.error_message.includes("non_field_errors")) {
                    setError(errorMessage[0])
                    setPasswordError(undefined)
                    setPasswordConfirmError(undefined)
                } else if (res.error_message.includes("new_password1") && res.error_message.includes("new_password2")) {
                    setError(undefined)
                    setPasswordError(errorMessage[1])
                    setPasswordConfirmError(errorMessage[0])
                }
                else if (res.error_message.includes("new_password2")) {
                    setError(undefined)
                    setPasswordError(undefined)
                    setPasswordConfirmError(errorMessage[0])
                } else if (res.error_message.includes("new_password1")) {
                    setError(undefined)
                    setPasswordError(errorMessage[0])
                    setPasswordConfirmError(undefined)
                }
            } else if (res.detail === "New password has been saved.") {
                toast.success(res.detail)
                await sleep(3000)
                router.replace("/dashboard/subscribers")
            }
        } else {
            setError("All fields are required.")
        }
    }

    useEffect(() => {
        const isPasswordTooShort = passwordInput !== undefined && passwordInput.length < 8;
        const containsOneDigit = /\d/.test(passwordInput);
        const containsOneCapitalLetter = /[A-Z]/.test(passwordInput);
        const isSameAsOldPassword = passwordInput !== undefined && passwordInput.length > 0 && passwordInput === oldPasswordInput;
        const doPasswordsMatch = passwordInput !== undefined && passwordInput.length > 0 &&
            passwordConfirmInput !== undefined && passwordInput === passwordConfirmInput;

        if (isPasswordTooShort && !containsOneCapitalLetter && !containsOneDigit) {
            setPasswordError("Password must contain at least: one CAPITAL LETTER, 1 digit, 8 characters or longer");
            return
        } else if (isPasswordTooShort) {
            setPasswordError("Password is too short");
            return
        } else if (!containsOneCapitalLetter) {
            setPasswordError("Password must contain at least one capital letter");
            return
        } else if (!containsOneDigit) {
            setPasswordError("Password must contain at least one digit");
            return
        } else if (isSameAsOldPassword) {
            setPasswordError("You must set a new password entirely different from your old password");
            return
        } else {
            setPasswordError(undefined);
        }

        if (!doPasswordsMatch) {
            setPasswordConfirmError("Your passwords do not match");
            return
        } else {
            setPasswordConfirmError(undefined);
        }

        const isValidInputs = oldPasswordInput !== undefined && oldPasswordInput.length > 0 &&
            passwordInput !== undefined && passwordInput.length >= 8 &&
            passwordConfirmInput !== undefined && passwordConfirmInput.length > 0 &&
            containsOneDigit && containsOneCapitalLetter;

        if (isValidInputs) {
            setError(undefined);
        }
    }, [oldPasswordInput, passwordConfirmInput, passwordInput, router]);
    return (
        <>
            <form autoComplete="off" action={submitForm} className="pt-8 max-w-xs lg:max-w-md w-full space-y-6">
                {error !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{error}</span>}
                <div>
                    <InputComponent autocomplete={false} setStateProp={setOldPasswordInput} type="password" id="id_old_password" name="old_password" text="Old Password" />
                </div>

                <div>
                    <InputComponent autocomplete={false} setStateProp={setPasswordInput} type="password" id="id_password" name="password" text="Password" />
                    {passwordError !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{passwordError}</span>}
                </div>

                <div>
                    <InputComponent autocomplete={false} setStateProp={setPasswordConfirmInput} type="password" id="id_password_confirm" name="password_confirm" text="Confirm Password" />
                    {passwordConfirmError !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{passwordConfirmError}</span>}
                </div>

                <button type="submit" disabled={error || passwordError || passwordConfirmError ? true : false} className={`rounded-xl hover:scale-105 duration-300 ease-linear hover:shadow-lg w-full py-2 px-6 ${error || passwordError || passwordConfirmError ? "bg-gray-300 text-gray-900" : "bg-primary dark:bg-secondary text-light dark:text-dark"}`}><span className={`${auth?.isLoading ? "animate-ping" : "animate-none"}`}>{auth?.isLoading ? "Submitting..." : "Submit"}</span></button>
            </form>
        </>
    )
}
