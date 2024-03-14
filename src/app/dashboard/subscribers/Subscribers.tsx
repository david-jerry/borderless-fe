import React from 'react';

const Subscribers: React.FC<SubscribersProps> = ({ subscribers }) => {
    return (
        <>
            {subscribers.length > 0 ? (
                subscribers.map((user: User) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-dark/20">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white truncate text-nowrap">
                            {user.name}
                        </th>
                        <td className="px-6 py-4">
                            {user.email}
                        </td>
                        <td className="px-6 py-4">
                            {user.phone}
                        </td>
                        <td className="px-6 py-4 truncate text-nowrap">
                            {user.country}
                        </td>
                        <td className="px-6 py-4 truncate text-nowrap">
                            {user.date_joined}
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={5} className="text-center py-4">No subscribers found</td>
                </tr>
            )}
        </>
    );
}

export default Subscribers;
