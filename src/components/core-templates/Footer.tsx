/* eslint-disable @next/next/no-img-element */
"use client"

import React from 'react'
import Image from 'next/image'
import { usePathname } from "next/navigation"
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Footer() {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");
    const isAuth = pathname.startsWith("/auth");

    return (
        (!isDashboard || !isAuth ? (
            <footer className="relative w-screen padding-x bg-primary py-8 space-y-6 overflow-hidden">
                <div className="z-0 w-screen h-full absolute bottom-0 left-0" style={{backgroundImage: "/footer-background.svg",  backgroundRepeat: "repeat", backgroundSize: "cover"}}>
                </div>
                <div className="z-[4] w-screen h-screen absolute bottom-0 left-0 bg-primary/60">
                </div>

                <div className="relative z-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 w-full">
                    <div className="order-2 lg:order-1 grid grid-cols-2 col-span-2 divide-x-2 lg:divide-x-0 divide-gray-200 w-full">
                        <div className="flex flex-col justify-between w-full">
                            <Image src="/logo.png" alt="footer logo" width="159" height="64" className="h-16" />
                        </div>
                        <div className="flex-col items-end justify-end lg:justify-center h-full w-full pt-4">
                            <div className="items-center flex justify-end lg:justify-center gap-4">
                                <Link href=""><Icon className="hover:text-secondary duration-300 ease-linear w-8 h-8" icon="cib:facebook" width="1.2em" height="1.2em" /></Link>
                                <Link href=""><Icon className="hover:text-secondary duration-300 ease-linear w-8 h-8" icon="entypo-social:instagram-with-circle" width="1.2em" height="1.2em" /></Link>
                                <Link href=""><Icon className="hover:text-secondary duration-300 ease-linear w-8 h-8" icon="arcticons:x-twitter" width="1.2em" height="1.2em" /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="pb-7 order-1 lg:order-2 lg:pt-0 flex items-center lg:justify-end justify-center col-span-2 lg:col-span-1">
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <Link href="">
                                    <img src="/appstore/playstore.png" alt="playstore icon" className="h-10 md:h-14 w-auto" />
                                </Link>
                            </div>
                            <div>
                                <Link href="">
                                    <img src="/appstore/applestore.png" alt="applestore icon" className="h-10 md:h-14 w-full lg:w-auto" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 border-t-[1px] border-t-gray-200 flex item-center gap-4 justify-between text-xs w-full pt-6">
                    <p className="block">© Borderless.</p>

                    <div className="flex items-center text-xs space-x-5">
                        <Link className="hover:text-secondary duration-300 ease-linear" href="">Terms of Use</Link>
                        <Link className="hover:text-secondary duration-300 ease-linear" href="">Privacy</Link>
                    </div>
                </div>
            </footer>
        ) : null)
    )
}
