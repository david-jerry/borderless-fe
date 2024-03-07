"use client"

import { requestGeolocationPermission } from '@/utils/permissions';
import React, { useEffect, useState } from 'react';

export default function MainLayout({ children }: {
    children: React.ReactNode
}) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedPreference = window.localStorage.getItem('darkMode');
            return storedPreference ? JSON.parse(storedPreference) : false;
        }
        return false;
    });

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

        const html = document.querySelector('html');

        const initializeDarkMode = () => {
            if (typeof window !== 'undefined' && window.localStorage) {
                const storedDarkMode = localStorage.getItem('darkMode');
                setIsDarkMode(storedDarkMode ? JSON.parse(storedDarkMode) : false);
            }
        };

        initializeDarkMode();

        if (html) {
            isDarkMode ? html.classList.add('dark', "duration-300") : html.classList.remove('dark', "duration-300");
        }

    }, [isDarkMode]);

    return (
        <main className='min-h-screen flex-col w-screen relative z-0 text-primary dark:text-secondary'>
            {children}
        </main>
    )
}
