import axios from "axios";
import { headers } from 'next/headers'
import { NextRequest } from "next/server";


/**
 * Retrieves the country name based on the given latitude and longitude coordinates.
 * If the country name is already stored, it returns the stored data.
 * If not, it makes an API call to retrieve the country name and stores it for future use.
 *
 * @param {number} latitude - The latitude coordinate.
 * @param {number} longitude - The longitude coordinate.
 * @param {string} storedData - The previously stored country name or "Unknown".
 * @returns {Promise<string>} A Promise that resolves to the country name.
 * @throws {Error} If there is an error fetching the country data.
 *
 * @example
 * const latitude = 37.7749;
 * const longitude = -122.4194;
 * const storedData = 'Unknown';
 * const countryName = await getCountryFromCoordinates(latitude, longitude, storedData);
 * console.log('Country Name:', countryName);
 */
export async function getCountryFromCoordinates(latitude: number, longitude: number, storedData: string): Promise<string> {

    if (storedData === "Unknown" && storedData === undefined) {
        const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                console.error('Error fetching IP location:', response);
                throw new Error("Failed to fetch geo data")
            }

            const data = await response.json();

            const countryName: string = data.country_name;

            return countryName;

        } catch (error) {
            console.error('Error fetching country data:', error);
            return 'Unknown'; // Handle the error gracefully
        }
    }
    return storedData
}

/**
 * Retrieves the country name based on the IP address from the request.
 * If the country name is already stored, it returns the stored data.
 * If not, it makes an API call to retrieve the country name and stores it for future use.
 *
 * @param {NextApiRequest} req - The Next.js API request object.
 * @param {string} storedData - The previously stored country name or "Unknown".
 * @returns {Promise<string>} A Promise that resolves to the country name.
 * @throws {Error} If there is an error fetching the IP location.
 *
 * @example
 * const req = // ... (Next.js API request object);
 * const storedData = 'Unknown';
 * const countryName = await getCountryFromIP(req, res, storedData);
 * console.log('Country Name:', countryName);
 */
export async function getCountryFromIP(req: NextRequest, storedData: string | undefined): Promise<string> {

    try {
        let ip: string = req.ip || headers().get('x-real-ip')?.split(',')[0] || headers().get('x-forwarded-for')?.split(',')[0] || "127.0.0.1";

        if (storedData === "Unknown" || storedData === undefined) {
            // Replace the following URL with the actual API endpoint that provides longitude and latitude from an IP address
            const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPADDRESS_API_CHECK}&ip=${ip}`;

            const response = await fetch(apiUrl);

            if (!response.ok) {
                const res = await response.json()
                console.error('Error fetching IP location:', res);
                throw new Error("Failed to fetch geo data")
            }


            try {
                const data = await response.json();
                console.log(data)

                const countryName: string = data.country_name;

                return countryName;
            } catch (error) {
                console.log(error)
                return "Nigeria";
            }

        }
        return storedData
    } catch (error) {
        console.error('Error fetching IP location:', error);
        return "Nigeria"
    }
};