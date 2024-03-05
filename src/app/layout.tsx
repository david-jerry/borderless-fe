import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import NavBar from "@/components/core-templates/NavBar";
import Footer from "@/components/core-templates/Footer";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Borderless | Next gen travels and tourism",
    template: "%s | Borderless"
  },
  description: "We're a one-stop shop for all your travel needs, from booking flights and hotels to finding the perfect activities and experiences. With Borderless, you can explore the world seamlessly and stress-free",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["borderless", "tourism", "tour and tourism", "travel guide", "best travel agency in nigeria", "tourism agency"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "Jeremiah David",
      url: "https://bytestreaminnovators.ltd/"
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "/pwa/ios/128.png" },
    { rel: "icon", url: "/logo-mobile.png" },
  ],

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} font-medium text-base bg-light dark:bg-dark relative z-0 w-screen scrollbar-thin scrollbar-thumb-secondary overflow-x-hidden overflow-y-auto`}>
        <NavBar countryName="Borderless" />
        <MainLayout>
          {children}
        </MainLayout>
        <Footer />
      </body>
    </html>
  );
}
