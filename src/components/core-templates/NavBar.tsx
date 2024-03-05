/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeButton from '../ui/ThemeButton';
import WaitButton from '../ui/WaitButton';



export default function Navbar({ countryName }: NavbarProps) {
    const pathname = usePathname();
    const isAuth = pathname.startsWith('/auth');
    const router = useRouter();
   

    return (
        <>
            {!isAuth && (
                <header className={`z-50 padding-x w-screen fixed top-0 left-0 py-4`}>
                    <nav className={`shadow rounded-tl-3xl rounded-br-3xl flex items-center py-2 px-6 justify-between ${pathname.startsWith("/dashboard") ? "bg-primary" : "bg-primary text-light"}`}>
                        <Link href="/" className='h-16'>
                            <img src='/logo.png' alt="logo" className="h-16 hidden md:block flex-none" />
                            <img src='/logo-mobile.png' alt="logo" className="h-16 md:hidden block flex-none" />
                        </Link>


                        <div className="flex items-center gap-4">
                            <ThemeButton />

                            <div className="md:pl-4 md:border-l flex items-center space-x-4">
                                {!pathname.startsWith('/dashboard') ? (
                                    <>
                                        <Link href="#about" className={`dark:hover:text-primary hover:text-secondary focus:text-secondary ${pathname.startsWith("/#about") ? "text-secondary" : "text-white"} duration-200 ease-linear`}>
                                            About {countryName}
                                        </Link>
                                        <WaitButton/>
                                    </>
                                ) : (null

                                )}
                            </div>
                        </div>
                    </nav>
                </header >
            )
            }
        </>
    )
}
