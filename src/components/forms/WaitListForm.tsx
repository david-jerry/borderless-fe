/* eslint-disable react-hooks/exhaustive-deps */
"use client";

/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'
import anime from 'animejs/lib/anime.es.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputComponent from './InputComponent';

export default function WaitListForm({ isWaitlist }: { isWaitlist: boolean }) {
    const [animejs, setAnimejs] = useState<any>(null);
    const [isUsed, setIsUsed] = useState(false);
    const [isOpen, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    const submitWaiting = () => {
        setIsLoading(true)
        setIsLoading(false)
        setOpen(false);
        animejs.add(fadeOut)
        toast.info("Successfully joined our waiting list", {
            toastId: "waiting"

        });
    };

    useEffect(() => {

        setOpen(isWaitlist);
        const animeLoad = anime.timeline({
            autoplay: true,
            delay: 0,
        });

        setAnimejs(animeLoad)


        const animation = isOpen ? fadeIn : fadeOut

        animeLoad.add(animation);
    }, [isWaitlist]);

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                icon={true}
                limit={3}
            />
            {isOpen ? (
                <div id="wait" className={`shadow-md space-y-6 bg-light/40 dark:bg-primary/50 bg-blur  rounded-tr-3xl rounded-bl-xl md:absolute fixed top-[6.3rem] p-6 w-[calc(100vw_-_2rem)] lg:w-full right-x md:max-w-md duration-300 ease-linear ${!isOpen ? 'hidden duration-300' : "flex flex-col"}`}>
                    <div className="flex-col space-y-3">
                        <h2 className="font-black text-dark dark:text-white text-xl md:text-2xl lg:text-3xl">Don't miss out on the future of travel</h2>
                        <span className="text-lg text-gray-600 dark:text-secondary">Join the wait list today!</span>
                    </div>

                    <div className="w-full border-b-dark dark:border-b-gray-500 border-b-[0.5px]"></div>

                    <form action="" method="post" className="space-y-4">
                        <InputComponent type="text" id="id_full_name" name="full_name" text="Full Name"/>
                        <InputComponent type="tel" id="id_phone" name="phone" text="Mobile Number"/>
                        <InputComponent type="email" id="id_email" name="email" text="Email"/>
                        <InputComponent type="text" id="id_country" name="country" text="Country"/>
                        <button onClick={submitWaiting} className={`py-3 hover:shadow-lg hover:scale-105 duration-300 ease-linear px-6 rounded-lg bg-dark text-light dark:bg-secondary dark:text-dark w-full`} type="button">
                            <span className={`${isLoading ? "animate-ping" : "animate-none"}`}>{isLoading ? "Submitting..." : "Submit"}</span>
                        </button>
                    </form>
                </div>
            ) : null}
        </>
    )
}

