"use client"

import { requestGeolocationPermission } from '@/utils/permissions';
import React, { useEffect } from 'react';

export default function MainLayout({ children }: {
    children: React.ReactNode
}) {
    useEffect(() => {
        const initializeGeolocation = async () => {
            try {
                await requestGeolocationPermission();
                // Additional logic after geolocation permission is granted can be added here
            } catch (error) {
                // Handle errors or log messages if needed
            }
        };

        initializeGeolocation();
    }, []);

    return (
        <main className='min-h-screen flex-col w-screen relative z-0 text-primary dark:text-secondary'>
            {children}
        </main>
    )
}
