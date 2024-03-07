/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const nextConfig = {};

// Configuration object tells the next-pwa plugin
const pwaConfig = {
    scope: '/',
    dest: "/public", // Destination directory for the PWA files
    disable: false, // process.env.NODE_ENV === "development", // Disable PWA in development mode
    register: true, // Register the PWA service worker
    skipWaiting: true, // Skip waiting for service worker activation
};

export default withPWA(nextConfig, pwaConfig);
