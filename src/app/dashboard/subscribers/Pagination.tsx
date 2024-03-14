import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function Pagination({ pageSize, currentPage, totalPages, nextPage, prevPage }: { 
    totalPages: number,
    pageSize: number,
    currentPage: number,
    nextPage: string | null,
    prevPage: string | null,

}) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { replace } = useRouter();

    const setPagination = (index: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('p', index.toString());
        replace(`${pathname}?${params.toString()}`);
    }

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('p', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }
    return (
        <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-{pageSize}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalPages} Page(s)</span></span>
                    <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <button onClick={() => setPagination(currentPage - 1)} disabled={prevPage === null} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-light rounded-s-lg bg-gray-700 dark:bg-primary border border-gray-300 hover:bg-primary/30 dark:hover:bg-dark/30 hover:text-secondary disabled:bg-gray-400 disabled:text-gray-700`}>Previous</button>
                        </li>
                        {
                            currentPage > 1 && (
                                <li>
                                    <button onClick={() => setPagination(1)} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-light bg-gray-700 dark:bg-primary border border-gray-300 hover:bg-primary/30 dark:hover:bg-dark/30 hover:text-secondary disabled:bg-gray-400 disabled:text-gray-700`}>1</button>
                                </li>
                            )
                        }

                        {currentPage > 3 && (
                            <li>
                                <button onClick={() => setPagination(currentPage - 1)} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-light bg-gray-700 dark:bg-primary border border-gray-300 hover:bg-primary/30 dark:hover:bg-dark/30 hover:text-secondary disabled:bg-gray-400 disabled:text-gray-700`}>{currentPage - 1}</button>
                            </li>
                        )}
                        {currentPage > 2 && (
                            <li>
                                <button onClick={() => setPagination(currentPage - 2)} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-light bg-gray-700 dark:bg-primary border border-gray-300 hover:bg-primary/30 dark:hover:bg-dark/30 hover:text-secondary disabled:bg-gray-400 disabled:text-gray-700`}>{currentPage - 2}</button>
                            </li>
                        )}
                        <li>
                            <button disabled={true} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-light bg-gray-700 dark:bg-primary border border-gray-300 hover:bg-primary/30 dark:hover:bg-dark/30 hover:text-secondary disabled:bg-gray-400 disabled:text-gray-700`}>{currentPage}</button>
                        </li>
                        {currentPage < totalPages - 1 && (
                            <li>
                                <button onClick={() => setPagination(currentPage + 1)} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-light bg-gray-700 dark:bg-primary border border-gray-300 hover:bg-primary/30 dark:hover:bg-dark/30 hover:text-secondary disabled:bg-gray-400 disabled:text-gray-700`}>{currentPage + 1}</button>
                            </li>
                        )}
                        {currentPage < totalPages - 2 && (
                            <li>
                                <button onClick={() => setPagination(currentPage + 2)} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-light bg-gray-700 dark:bg-primary border border-gray-300 hover:bg-primary/30 dark:hover:bg-dark/30 hover:text-secondary disabled:bg-gray-400 disabled:text-gray-700`}>{currentPage + 2}</button>
                            </li>
                        )}
                        {
                            currentPage < totalPages && (
                                <li>
                                    <button onClick={() => setPagination(totalPages)} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-light bg-gray-700 dark:bg-primary border border-gray-300 hover:bg-primary/30 dark:hover:bg-dark/30 hover:text-secondary disabled:bg-gray-400 disabled:text-gray-700`}>{totalPages}</button>
                                </li>
                            )
                        }
                        <li>
                            <button onClick={() => setPagination(currentPage + 1)} disabled={nextPage === null} className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-light rounded-e-lg bg-gray-700 dark:bg-primary border border-gray-300 hover:bg-primary/30 dark:hover:bg-dark/30 hover:text-secondary disabled:bg-gray-400 disabled:text-gray-700`}>Next</button>
                        </li>
                    </ul>
                </nav>
    )
}
