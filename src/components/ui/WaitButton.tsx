"use client";

import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import WaitListForm from '../forms/WaitListForm';

export default function WaitButton() {
    const [isOpened, setOpened] = useState(false);

    const openWaitlist = () => {
        const newMode = !isOpened;

        setOpened(newMode);
    }

    return (
        <>
            <button onClick={openWaitlist} type="button" className="flex items-center space-x-3 rounded-full py-2 px-5 bg-secondary dark:bg-primary text-primary dark:text-secondary">
                <Icon className="w-6 h-6" icon="solar:home-smile-angle-bold-duotone" width="1.2em" height="1.2em" />

                <span className="font-semibold dark:font-bold">Join Waitlist</span>
            </button>
            <WaitListForm isWaitlist={isOpened} />
        </>

    )
}
