"use client"

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link'
import React, { useState } from 'react'

export default function ProfileMenu() {
    const [openMenu, setOpenMenu] = useState(false);
    const auth = useAuth();

    const toggleOpenMenu = () => {
        const newState = !openMenu
        setOpenMenu(newState)
    };

    return (
        <>
            <div onClick={toggleOpenMenu} className="text-center cursor-pointer duration-300 ease-linear relative rounded-full p-2 flex items-center bg-secondary group">
                <div className="rounded-full bg-primary w-8 h-8 flex-none flex flex-col items-center justify-center font-bold text-sm">
                    <span className="block">{auth!.user !== null && auth!.user.name !== null && auth!.user.name.length > 0 ? auth!.user.name.charAt(0):'N'}</span>
                </div>

                <div className={`${openMenu ? "w-0 md:w-fit md:p-2 md:ml-2" : "w-0"} group-hover:w-fit group-hover:p-2 group-hover:ml-2 overflow-hidden duration-300 text-sm font-bold ease-linear bg-primary rounded-full`}>
                    <span className="w-fit flex-none text-nowrap">{auth!.user !== null && auth!.user.name !== null && auth!.user.name.length > 0 ? auth!.user.name : "John Doe"}</span>
                </div>

                <div className={`${openMenu ? "-right-20 " : "-right-96 lg:-right-[600px]"} absolute top-[4.3rem] duration-300 ease-in-out w-40 bg-primary/60 bg-blur dark:bg-white/60 rounded-xl p-4 h-fit flex flex-col gap-4 shadow-md`}>
                    <div className="divide-y-2 divide-light dark:divide-primary flex flex-col space-y-4">
                        <Link className="hover:text-secondary dark:text-primary duration-300 ease-linear" href="/dashboard">Profile</Link>
                        <Link className="pt-2 hover:text-secondary dark:text-primary duration-300 ease-linear" href="/auth/change-password">Settings</Link>
                    </div>
                    <button onClick={auth!.logout} className="w-full text-center pt-2 text-light bg-red-500 dark:bg-red-800 py-3 px-6 rounded-b-xl hover:scale-105 duration-300 ease-linear">Logout</button>
                </div>
            </div>
        </>
    )
}
