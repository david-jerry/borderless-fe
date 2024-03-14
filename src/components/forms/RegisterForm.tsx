"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import InputComponent from './InputComponent'
import { useAuth } from '@/hooks/useAuth';
import { extractErrorMessages, sleep } from '@/utils/utils'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDebouncedCallback } from 'use-debounce';

export default function RegisterForm() {
    const auth = useAuth();
    const router = useRouter();
    const [nameInput, setNameInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");
    const [phoneInput, setPhoneInput] = useState<string>("");
    const [countryInput, setCountryInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [passwordConfirmInput, setPasswordConfirmInput] = useState<string>("");
    const [error, setError] = useState<string | undefined>()
    const [nameError, setNameError] = useState<string | undefined>();
    const [emailError, setEmailError] = useState<string | undefined>();
    const [phoneError, setPhoneError] = useState<string | undefined>();
    const [countryError, setCountryError] = useState<string | undefined>();
    const [passwordError, setPasswordError] = useState<string | undefined>();
    const [passwordConfirmError, setPasswordConfirmError] = useState<string | undefined>();

    const submitForm = async () => {
        if (passwordInput.length >= 8 && passwordConfirmInput === passwordInput && auth !== null) {
            const res = await auth.register(nameInput, emailInput, passwordInput, passwordConfirmInput, phoneInput, countryInput)
            console.log(res);

            if (res.error_message) {
                const string = res.error_message
                const errorMessage = extractErrorMessages(string);
                console.log(errorMessage)
                if (res.error_message.includes("non_field_errors")) {
                    setError(errorMessage[0])
                } else if (res.error_message.includes("name")) {
                    setNameError(errorMessage[0])
                } else if (res.error_message.includes("email")) {
                    setEmailError(errorMessage[0])
                } else if (res.error_message.includes("name") && res.error_message.includes("email")) {
                    setNameError(errorMessage[0])
                    setEmailError(errorMessage[1])
                } else if (res.error_message.includes("phone")) {
                    setPhoneError(errorMessage[0])
                } else if (res.error_message.includes("country")) {
                    setCountryError(errorMessage[0])
                } else if (res.error_message.includes("password1") && res.error_message.includes("password2")) {
                    setPasswordError(errorMessage[1])
                    setPasswordConfirmError(errorMessage[0])
                } else if (res.error_message.includes("password2")) {
                    setPasswordConfirmError(errorMessage[0])
                } else if (res.error_message.includes("password1")) {
                    setPasswordError(errorMessage[0])
                } else {
                    setError(undefined)
                    setPasswordError(undefined)
                    setPasswordConfirmError(undefined)
                    setNameError(undefined)
                    setEmailError(undefined)
                    setPhoneError(undefined)
                    setCountryError(undefined)
                }
            } else if (res.detail === "Verification e-mail sent.") {
                toast.success(res.detail)
                await sleep(3000)
                router.replace("/dashboard/subscribers")
            }
        } else {
            setError("All fields are required.")
        }
    }


    const nameValidation = useDebouncedCallback(() => {
        if (nameInput.length > 0 && nameInput.length < 5) {
            setNameError("Your name must be longer than 5 characters")
            return;
        } else {
            setNameError(undefined)
        }
    }, 300)

    const emailValidation = useDebouncedCallback(() => {
        const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-z]{2,}$/;
        const userEmailExists = async () => {
            if (auth !== null && emailInput.length > 0) {
                const check = await auth.checkUserExists(emailInput)

                if (emailInput.length < 1) {
                    setEmailError("This is a required field")
                } else if (!regex.test(emailInput)) {
                    setEmailError("This must be a valid email address")
                    return;
                } else if (emailInput.length > 5 && regex.test(emailInput) && check.detail !== 'Ok.') {
                    setEmailError(check.detail)
                    return;
                } else {
                    setEmailError(undefined)
                }
            }
        }
        userEmailExists();
    }, 300)

    const phoneValidation = useDebouncedCallback(() => {
        const phoneRegex = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;
        const userPhoneExists = async () => {
            if (auth !== null && phoneInput.length > 0) {
                const check = await auth.checkPhoneExists(phoneInput)
                if (phoneInput.length < 1) {
                    setPhoneError("This is a required field")
                    return;
                } else if (!phoneRegex.test(phoneInput)) {
                    setPhoneError("Phone numbers must be in this format: <plus sign><countrycode> <phone number>")
                    return;
                } else if (phoneRegex.test(phoneInput) && phoneInput.length > 5 && check.detail !== 'Ok.') {
                    setPhoneError(check.detail)
                    return;
                } else {
                    setPhoneError(undefined)
                }
            }
        }
        userPhoneExists();
    }, 300)

    const countryValidation = useDebouncedCallback(() => {
        if (countryInput.length > 0) {
            if (countryInput !== undefined && countryInput.length < 1) {
                setCountryError("This is a required field")
                return;
            } else {
                setCountryError(undefined)
            }
        }
    }, 300)

    useEffect(() => {

        nameValidation();

        emailValidation();

        phoneValidation();

        countryValidation();


        const regex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-z]{2,}$/;

        const phoneRegex = /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/;

        const isPasswordTooShort = passwordInput !== undefined && passwordInput.length < 8;
        const containsOneDigit = /\d/.test(passwordInput);
        const containsOneCapitalLetter = /[A-Z]/.test(passwordInput);
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
        } else {
            setPasswordError(undefined);
        }

        if (!doPasswordsMatch) {
            setPasswordConfirmError("Your passwords do not match");
            return
        } else {
            setPasswordConfirmError(undefined);
        }



        const isValidInputs = passwordInput !== undefined && passwordInput.length >= 8 &&
            passwordConfirmInput !== undefined && passwordConfirmInput.length > 0 &&
            containsOneDigit && containsOneCapitalLetter && nameInput.length > 5 && emailInput.length > 1 && phoneInput.length > 1 && countryInput.length > 1 && regex.test(emailInput) && phoneRegex.test(phoneInput);

        if (isValidInputs) {
            setError(undefined);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countryError, countryInput, emailError, emailInput, nameError, nameInput.length, passwordConfirmInput, passwordInput, phoneError, phoneInput]);
    return (
        <form action={submitForm} className="mb-16 pt-8 max-w-xs lg:max-w-md w-full space-y-6">
            {error !== undefined && <span className="relative w-full bg-red-300 py-2 px-6 text-center text-red-700 text-xs font-semibold rounded-lg flex">{error}</span>}

            <div>
                <InputComponent autocomplete={false} setStateProp={setNameInput} type="text" id="id_name" name="name" text="Full Name" />
                {nameError !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{nameError}</span>}
            </div>

            <div>
                <InputComponent autocomplete={false} setStateProp={setEmailInput} type="email" id="id_email" name="email" text="Email Address" />
                {emailError !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{emailError}</span>}
            </div>

            <div>
                <InputComponent autocomplete={false} setStateProp={setPhoneInput} type="tel" id="id_phone" name="phone" text="Mobile Number" />
                {phoneError !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{phoneError}</span>}
            </div>

            <div>
                <InputComponent autocomplete={false} setStateProp={setCountryInput} type="text" id="id_country" name="country" text="Country" />
                {countryError !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{countryError}</span>}
            </div>

            <div>
                <InputComponent autocomplete={false} setStateProp={setPasswordInput} type="password" id="id_password" name="password" text="Password" />
                {passwordError !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{passwordError}</span>}
            </div>

            <div>
                <InputComponent autocomplete={false} setStateProp={setPasswordConfirmInput} type="password" id="id_password_confirm" name="password_confirm" text="Confirm Password" />
                {passwordConfirmError !== undefined && <span className="relative bg-red-300 py-2 px-6 w-full text-center text-red-700 text-xs font-semibold rounded-lg flex">{passwordConfirmError}</span>}
            </div>

            <button type="submit" disabled={error || passwordError || passwordConfirmError || nameError || emailError || phoneError || countryError ? true : false} className={`rounded-xl hover:scale-105 duration-300 ease-linear hover:shadow-lg w-full py-2 px-6 ${error || passwordError || passwordConfirmError || nameError || emailError || phoneError || countryError ? "bg-gray-300 text-gray-900" : "bg-primary dark:bg-secondary text-light dark:text-dark"}`}>{auth !== null && auth.isLoading ? "Loading..." : "Submit"}</button>
        </form>
    )
}
