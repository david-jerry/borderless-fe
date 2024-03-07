/* eslint-disable react/no-unescaped-entities */
// "use server";

import CustomButton from "@/components/ui/Button";
import NotFoundArt from "@/components/ui/NotFoundArt";
import { Metadata, Viewport } from "next";
import { headers } from "next/headers";


export const metadata: Metadata = {
    title: "404 Page not found",
};

export const viewport: Viewport = {
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#040876" }],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    interactiveWidget: 'resizes-visual',
    colorScheme: 'dark',
}


export default async function NotFound() {
    const headersList = headers()
    const domain = headersList.get('host')
    return (
        <>
            <div className="z-0 not-found-dark w-screen h-screen flex flex-col justify-center relative text-white">
                <div className="flex flex-col items-center max-w-2xl lg:max-w-6xl space-y-14 mx-auto">
                    <NotFoundArt />
                    <p className="text-base font-semibold bg-white/30 p-4 rounded-lg">Error 404: "Page not found"</p>
                </div>
                <div className="absolute z-40 top-10 md:top-28 left-x max-w-md flex flex-col items-center text-sm md:text-lg ">
                    <CustomButton />
                </div>
            </div>
        </>
    )
}
