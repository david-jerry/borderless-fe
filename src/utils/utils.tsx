/**
 * Parse a date string to a JavaScript Date object.
 *
 * @param {string} datetimeString - The date string to be parsed.
 * @returns {Date} A JavaScript Date object representing the parsed date.
 *
 * @example
 * const dateFromString = parseDateTimeStringToDateTime('2023-11-12T12:00:00');
 * console.log(dateFromString); // Output: Sat Nov 12 2023 12:00:00 GMT+0000 (Coordinated Universal Time)
 *
 * // This function is useful for converting date strings received from APIs or elsewhere into Date objects.
 */
export function parseDateTimeStringToDateTime(datetimeString: string): Date {
    return new Date(datetimeString);
}



/**
 * Format a JavaScript Date object as a string using Intl.DateTimeFormat.
 *
 * @param {Date} date - The JavaScript Date object to be formatted.
 * @param {Intl.DateTimeFormatOptions} [options] - Optional formatting options.
 * @returns {string} A formatted date string.
 *
 * @example
 * const formattedDate = formatDateTime(new Date()); // default formatting
 * console.log(formattedDate); // Output: 3/5/2024
 *
 * const customFormattedDate = formatDateTime(new Date(), { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
 * console.log(customFormattedDate); // Output: Tuesday, March 5, 2024
 *
 * // This function is useful for displaying formatted date strings in a user-friendly way.
 */
export function formatDateTime(date: Date, options?: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat('en-US', options).format(date);
}



/**
 * Asynchronously sleep for a specified number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} A Promise that resolves after the specified sleep duration.
 *
 * @example
 * await sleep(2000); // Sleep for 2 seconds
 * console.log('After sleep'); // This line will be executed after the sleep duration
 *
 * // This function is useful for introducing delays in asynchronous code.
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}


