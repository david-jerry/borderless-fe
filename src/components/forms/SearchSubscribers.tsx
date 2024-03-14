"use client";

import React from 'react'
import { Icon } from '@iconify-icon/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchSubscribers() {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback(async (term: string) => {
        console.group(term);
        // if (auth !== null) {
        //     await apiService.get(`/users/waiters/?q=${term}`, auth.accessToken)
        // }
        const params = new URLSearchParams(searchParams);
        params.set('p', '1');
        params.set('page_size', '50');
        if (term) {
            params.set("q", term);
        } else {
            params.delete('q');
        }
        replace(`${pathName}?${params.toString()}`);
    }, 100)

    return (
        <div className="px-3 overflow-hidden w-32 lg:w-56 rounded-xl border-2 flex items-center space-x-0 hover:border-2 hover:border-secondary duration-300 ease-in-out">
            <Icon icon="iconamoon:search-duotone" width="1.2em" height="1.2em" />
            <input defaultValue={searchParams.get("q")?.toString()} onChange={(e) => handleSearch(e.target.value)} placeholder='Search' type="search" name="q" id="subscribers_search" className="bg-transparent focus:bg-transparent border-0 focus:ring-0 focus:border-0 focus:outline-none text-dark placeholder:text-gray-300 dark:text-secondary" />
        </div>
    )
}
