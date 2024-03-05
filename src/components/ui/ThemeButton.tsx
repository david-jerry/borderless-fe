/**
 * ThemeButton component allows users to toggle between dark and light modes.
 * It uses local storage to remember the user's theme preference.
 *
 * @component
 * @example
 * // Usage in a parent component:
 * import ThemeButton from './ThemeButton';
 *
 * function App() {
 *   return (
 *     <div>
 *       <ThemeButton />
 *     </div>
 *   );
 * }
 */
"use client";

import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';

export default function ThemeButton() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const storedPreference = window.localStorage.getItem('darkMode');
            return storedPreference ? JSON.parse(storedPreference) : false;
        }
        return false;
    });

    useEffect(() => {
        const html = document.querySelector('html');

        const initializeDarkMode = () => {
            if (typeof window !== 'undefined' && window.localStorage) {
                const storedDarkMode = localStorage.getItem('darkMode');
                setIsDarkMode(storedDarkMode ? JSON.parse(storedDarkMode) : false);
            }
        };

        initializeDarkMode();

        if (html) {
            isDarkMode ? html.classList.add('dark') : html.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;

        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('darkMode', JSON.stringify(newMode));
        }

        setIsDarkMode(newMode);
    };


    return (
        <>
            <button type="button" onClick={toggleDarkMode} className='hidden md:flex'>
                {isDarkMode ? (
                    <Icon className='ml-4 h-6 w-6' icon="line-md:sun-rising-twotone-loop" width="1.2em" height="1.2em" />
                ) : (
                    <Icon className='ml-4 h-6 w-6' icon="line-md:moon-rising-loop" width="1.2em" height="1.2em" />
                )}
            </button>
        </>
    )
}
