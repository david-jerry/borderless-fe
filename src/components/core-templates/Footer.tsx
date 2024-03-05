"use client"

import React from 'react'
import Image from 'next/image'
import { usePathname } from "next/navigation"

export default function Footer() {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");

    return (
        <>
            {!isDashboard  && (
                <footer className="w-screen padding-x bg-primary py-8">
                    <div className={`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}>
                        <div className="flex flex-col justify-between gap-7">
                            <Image src="/logo.png" alt="footer logo" width="159" height="64" className="h-16" />
                        </div>
                    </div>
                </footer>
            )}
        </>
    )
}
