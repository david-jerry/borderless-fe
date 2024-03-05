import { useState } from 'react';

/**
 * Custom hook to retrieve a value from localStorage and parse it as JSON.
 *
 * @param {string} key - The key to retrieve from localStorage.
 * @param {any} initialValue - The initial value to use if the key is not found.
 * @returns {[any, (value: any) => void]} - A tuple containing the parsed value and a function to set the value in localStorage.
 *
 * @example
 * // Usage in a component:
 * const [storedData, setStoredData] = useLocalStorage('myKey', { name: 'John', age: 25 });
 * // Retrieve stored data
 * console.log(storedData);
 * // Update stored data
 * setStoredData({ name: 'Alice', age: 30 });
 *
 * This hook is useful for retrieving and storing data in localStorage after converting it to a JSON string.
 */
export function useLocalStorage(key: string, initialValue: any): [any, (value: any) => void] {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Error retrieving data from local storage:', error);
            return initialValue;
        }
    });

    const setValue = (value: any) => {
        try {
            setStoredValue(value);
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error storing data in local storage:', error);
        }
    };

    return [storedValue, setValue];
}
