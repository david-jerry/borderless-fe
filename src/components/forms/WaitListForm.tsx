/* eslint-disable react-hooks/exhaustive-deps */
"use client";

/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import anime from 'animejs/lib/anime.es.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputComponent from './InputComponent';
import apiService from '@/services/apiService';
import { useAuth } from '@/hooks/useAuth';
import { useDebouncedCallback } from 'use-debounce';

export default function WaitListForm({ isWaitlist }: { isWaitlist: boolean }) {
    const auth = useAuth()
    const [animejs, setAnimejs] = useState<any>(null);
    const [isUsed, setIsUsed] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [nameInput, setNameInput] = useState<string>("")
    const [phoneInput, setPhoneInput] = useState<string>("")
    const [emailInput, setEmailInput] = useState<string>("")
    const [countryInput, setCountryInput] = useState<string>("")
    const [error, setError] = useState<string | undefined>()
    const [nameError, setNameError] = useState<string | undefined>();
    const [emailError, setEmailError] = useState<string | undefined>();
    const [phoneError, setPhoneError] = useState<string | undefined>();
    const [countryError, setCountryError] = useState<string | undefined>();

    const fadeOut = {
        targets: '#wait',
        opacity: [1, 0],
        translateY: -10,
        duration: 300, // Set your desired duration (in milliseconds)
        easing: 'linear', // Use linear easing for consistent timing
    }

    const fadeIn = {
        targets: '#wait',
        opacity: [0, 1],
        translateY: 10,
        duration: 300, // Set your desired duration (in milliseconds)
        easing: 'linear', // Use linear easing for consistent timing
    }

    const submitWaiting = async () => {
        setIsLoading(true)
        const body = {
            "name": nameInput,
            "phone": phoneInput,
            "email": emailInput,
            "country": countryInput,
        }

        console.log(auth)
        const response = await apiService.post("/waiters/", body, undefined)
        if (!response.error_message) {
            setIsLoading(false)
            setOpen(false);
            animejs.add(fadeOut)
            toast.success("Successfully joined our waiting list", {
                toastId: "waiting"

            });
        } else {
            setIsLoading(false)
            toast.error("There was an error joining our waiting list", {
                toastId: "waiting"

            })
        }
    };


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


        const isValidInputs = nameInput.length > 5 && emailInput.length > 1 && phoneInput.length > 1 && countryInput.length > 1 && regex.test(emailInput) && phoneRegex.test(phoneInput);

        if (isValidInputs) {
            setError(undefined);
        }

    }, [nameInput, phoneInput, emailInput, countryInput]);

    useEffect(() => {
        setOpen(isWaitlist);
        const animeLoad = anime.timeline({
            autoplay: true,
            delay: 0,
        });

        setAnimejs(animeLoad)

        const animation = isOpen ? fadeIn : fadeOut

        animeLoad.add(animation);
    }, [isWaitlist])

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                limit={3}
            />
            {isOpen ? (
                <div id="wait" className={`shadow-md space-y-6 bg-light/40 dark:bg-primary/70 bg-blur  rounded-tr-3xl rounded-bl-xl md:absolute fixed top-[6.3rem] p-6 w-[calc(100vw_-_2rem)] lg:w-full right-x md:max-w-md duration-300 ease-linear ${!isOpen ? 'hidden duration-300' : "flex flex-col"}`}>
                    <div className="flex-col space-y-3">
                        <h2 className="font-black text-dark dark:text-white text-xl md:text-2xl lg:text-3xl">Don't miss out on the future of travel</h2>
                        <span className="text-lg text-gray-600 dark:text-secondary">Join the wait list today!</span>
                    </div>

                    <div className="w-full border-b-dark dark:border-b-gray-500 border-b-[0.5px]"></div>

                    <form action={submitWaiting} method="post" className="space-y-4">
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
                        <button className={`py-3 hover:shadow-lg hover:scale-105 duration-300 ease-linear px-6 rounded-lg bg-dark text-light dark:bg-secondary dark:text-dark w-full`} type="submit">
                            <span className={`${isLoading ? "animate-ping" : "animate-none"}`}>{isLoading ? "Submitting..." : "Submit"}</span>
                        </button>
                    </form>
                </div>
            ) : null}
        </>
    )
}

