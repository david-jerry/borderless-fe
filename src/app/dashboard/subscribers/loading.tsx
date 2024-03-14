import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function TableSkeleton() {
    return (
        <>
            <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                <thead className="text-white">
                    <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Phone Number</th>
                        <th className="p-3 text-left">Country</th>
                        <th className="p-3 text-left">Signup Date & Time</th>
                    </tr>
                    <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Phone Number</th>
                        <th className="p-3 text-left">Country</th>
                        <th className="p-3 text-left">Signup Date & Time</th>
                    </tr>
                    <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Phone Number</th>
                        <th className="p-3 text-left">Country</th>
                        <th className="p-3 text-left">Signup Date & Time</th>
                    </tr>
                    <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Phone Number</th>
                        <th className="p-3 text-left">Country</th>
                        <th className="p-3 text-left">Signup Date & Time</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="flex-1 sm:flex-none">
                    <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                        <td className="border-grey-light border hover:bg-gray-100 p-3"><Skeleton height={30} width={280} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3"><Skeleton height={30} width={180} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate"><Skeleton height={30} width={280} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3"><Skeleton height={30} width={280} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate"><Skeleton height={30} width={280} /></td>
                    </tr>
                    <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                        <td className="border-grey-light border hover:bg-gray-100 p-3"><Skeleton height={30} width={280} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3"><Skeleton height={30} width={180} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate"><Skeleton height={30} width={280} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3"><Skeleton height={30} width={280} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate"><Skeleton height={30} width={280} /></td>
                    </tr>
                    <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                        <td className="border-grey-light border hover:bg-gray-100 p-3"><Skeleton height={30} width={280} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3"><Skeleton height={30} width={180} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate"><Skeleton height={30} width={280} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3"><Skeleton height={30} width={280} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate"><Skeleton height={30} width={280} /></td>
                    </tr>
                    <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                        <td className="border-grey-light border hover:bg-gray-100 p-3"><Skeleton height={30} width={280} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3"><Skeleton height={30} width={180} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate"><Skeleton height={30} width={280} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3"><Skeleton height={30} width={280} /></td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate"><Skeleton height={30} width={280} /></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
