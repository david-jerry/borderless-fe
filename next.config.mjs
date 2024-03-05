/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {
    // swcMinify: true,      // Enable SWC minification for improved performance
    // compiler: {
    //     removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
    // },
};

// Configuration object tells the next-pwa plugin
const pwaConfig = {
    dest: "public", // Destination directory for the PWA files
    // disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
    register: true, // Register the PWA service worker
    skipWaiting: true, // Skip waiting for service worker activation
};

export default withPWA(nextConfig, pwaConfig);