"use client"

import localStorageService from '@/services/storeToLocalStorage';
import { requestGeolocationPermission } from '@/utils/permissions';
import React, { useEffect, useState } from 'react';

export default function MainLayout({ children }: {
    children: React.ReactNode
}) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedPreference = localStorageService.get('darkMode');
            return storedPreference ? storedPreference : false;
        }
        return false;
    });

    useEffect(() => {
        
        const html = document.querySelector('html');

        const initializeDarkMode = () => {
            if (typeof window !== 'undefined' && window.localStorage) {
                const storedDarkMode = localStorageService.get('darkMode');
                setIsDarkMode(storedDarkMode ? storedDarkMode : false);
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
