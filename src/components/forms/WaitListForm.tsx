/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react'

export default function WaitListForm({ isWaitlist }: { isWaitlist: boolean }) {
    const [isOpen, setOpen] = useState(false)

    useEffect(() => {
        setOpen(isWaitlist);
    },[isWaitlist]);

    return (
        isOpen && (
            <div className="flex flex-col space-y-8 bg-secondary rounded-tr-3xl rounded-bl-xl md:absolute fixed top-[6.3rem] p-6 w-[calc(100vw_-_2rem)] lg:w-full right-x md:max-w-xl duration-300 ease-linear">
                <div className="flex-col space-y-3">
                    <h2 className="font-black text-primary text-2xl lg:text-4xl">Don't miss out on the future of travel</h2>
                    <span className="text-lg">Join the waitlist today!</span>
                </div>

                <div className="w-full border-b border-b-primary"></div>
            </div>
        )
    )
}

