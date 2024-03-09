"use client"

import AuthContext from '@/contexts/AuthContext';
import useProvideAuth from '@/hooks/useProvideAuth';
import React from 'react';

/**
 * Provides authentication context to its children using the provided authentication hook.
 * @param {Object} props - Props for the AuthProvider component.
 * @param {React.ReactNode} props.children - The child components that need access to the authentication context.
 * @returns {React.ReactNode} - The children with access to the authentication context.
 * @example
 * // Wrap your application with AuthProvider in your root component
 * // App.js or layout.tsx in Next.js
 * import React from 'react';
 * import AuthProvider from '@/components/AuthProvider'; // Assuming the path is correct
 *
 * function App() {
 *     return (
 *         <AuthProvider>
 *             {/\* Your app components \*\/}
 *         </AuthProvider>
 *     );
 * }
 *
 * export default App;
 */
export default function AuthProvider({ children }: Readonly<{
    children: React.ReactNode;
}>): React.ReactNode {
    const auth = useProvideAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

