/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeButton from '../ui/ThemeButton';
import WaitButton from '../ui/WaitButton';
import ProfileMenu from '../ui/ProfileMenu';
import { useAuth } from '@/hooks/useAuth';
import { requestGeolocationPermission } from '@/utils/permissions';
import { Icon } from '@iconify/react';



export default function Navbar({ countryName }: NavbarProps) {
    const auth = useAuth();

    const pathname = usePathname();
    const isAuth = pathname.startsWith('/auth');

    useEffect(() => {
        const initializeGeolocation = async () => {
            try {
                await requestGeolocationPermission();
                // Additional logic after geolocation permission is granted can be added here
            } catch (error) {
                console.log(error)
            }
        };

        initializeGeolocation();
    }, []);

    return (
        <>
            {!isAuth && (
                <header className={`z-50 padding-x w-screen fixed top-0 left-0 py-4`}>
                    <nav className={`shadow rounded-tl-3xl rounded-br-3xl flex items-center py-2 px-6 justify-between ${pathname.startsWith("/dashboard") ? "bg-primary text-;ight" : "bg-primary text-light"}`}>
                        <Link href="/" className='h-16'>
                            <img src='/logo.png' alt="logo" className="h-16 hidden md:block flex-none" />
                            <img src='/logo-mobile.png' alt="logo" className="h-16 md:hidden block flex-none" />
                        </Link>


                        <div className="flex items-center gap-4">
                            <div className="pr-4 border-r flex items-center space-x-4">
                                {!pathname.startsWith('/dashboard') && (
                                    <Link href="/#about" className={`flex items-center space-x-2 hover:text-secondary dark:hover:text-secondary focus:text-secondary dark:focus:text-secondary: ${pathname.startsWith("/#about") ? "text-secondary dark:text-secondary" : "text-white"} duration-200 ease-linear`}>
                                        <span>About</span> <span className="hidden">{countryName}</span>
                                    </Link>
                                )}


                                {!auth?.user?.is_staff ?
                                    <WaitButton /> :
                                    <>
                                        <Link className={`flex items-center space-x-2 hover:text-secondary dark:hover:text-secondary focus:text-secondary dark:focus:text-secondary: ${pathname === "/dashboard/subscribers" ? "text-secondary dark:text-secondary" : "text-white"} duration-200 ease-linear`} title="subscribers" href="/dashboard/subscribers"><span className="hidden lg:block w-fit">Subscribers</span><Icon className="lg:hidden" icon="mingcute:group-3-fill" width="1.4rem" height="1.4rem" /></Link>

                                        {auth!.user !== null ?
                                            <ProfileMenu />
                                            :
                                            <>
                                                <Link className={`flex items-center space-x-2 hover:text-secondary dark:hover:text-secondary focus:text-secondary dark:focus:text-secondary: ${pathname === "/auth/login" ? "text-secondary dark:text-secondary" : "text-white"} duration-200 ease-linear`} href="/auth/login" >Login</Link>
                                            </>
                                        }
                                    </>
                                }
                            </div>
                            <ThemeButton />
                        </div>
                    </nav>
                </header >
            )
            }
        </>
    )
}
