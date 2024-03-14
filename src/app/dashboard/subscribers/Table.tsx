import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth';
import apiService from '@/services/apiService';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Subscribers from './Subscribers';
import Pagination from './Pagination';

export default function Table({ totalSubscribers }: {
    // searchParams?: {
    //     q?: string;
    //     page_size?: string;
    //     p?: string;
    // },
    totalSubscribers: Dispatch<SetStateAction<number>>;
}) {
    const [subscribers, setSubscribers] = useState([])
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [prevPage, setPrevPage] = useState<string | null>(null);
    const auth = useAuth();
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const currentPage = Number(searchParams.get('p')) || 1;
    const page_size = Number(searchParams.get('page_size')) || 50;
    const totalPages = Math.ceil(subscribers.length / page_size)

    

    useEffect(() => {
        const fetchSubscribers = async () => {
            const res = await apiService.get(`/users/waiters/?q=${query}&p${currentPage}&page_size=${page_size}`, auth!.accessToken)
            console.log(res)
            if (res.error_message === "Authentication credentials were not provided.") {
                await auth!.rfreshToken(auth!.refreshToken!)
                fetchSubscribers();
            }
            setNextPage(res.next)
            setPrevPage(res.previous)
            totalSubscribers(res.results.length)
            setSubscribers(res.results)
        }

        if (auth !== null && auth.accessToken !== undefined) {
            fetchSubscribers();

            // Optionally, you can set up a timer to fetch data periodically
            const intervalId = setInterval(fetchSubscribers, 60000); // Fetch data every minute

            // Clean up function to clear the interval when the component unmounts
            return () => clearInterval(intervalId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth, page_size, currentPage, query])

    return (
        <>
            <div className="relative overflow-x-auto h-full">
                <div className="w-full h-[calc(100%_-_5.5rem)] overflow-y-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-100 uppercase bg-primary dark:bg-dark dark:text-light h-16">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 truncate text-nowrap">
                                    Email Address
                                </th>
                                <th scope="col" className="px-6 py-3 truncate text-nowrap">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3 truncate text-nowrap">
                                    Country
                                </th>
                                <th scope="col" className="px-6 py-3 truncate text-nowrap">
                                    Signup Date & Time
                                </th>
                            </tr>
                        </thead>
                        <tbody className="overflow-y-auto h-fit">
                            <Subscribers subscribers={subscribers} />
                        </tbody>
                    </table>
                </div>
                <Pagination pageSize={page_size} currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage}/>
            </div>

        </>
    )
}
