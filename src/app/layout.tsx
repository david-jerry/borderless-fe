import type { Metadata, Viewport } from "next";
import { Raleway, Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layouts/MainLayout";
import NavBar from "@/components/core-templates/NavBar";
import Footer from "@/components/core-templates/Footer";
import AuthProvider from "@/providers/AuthProviders";

const raleway = Raleway({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Borderless | Next gen travels and tourism",
    template: "%s | Borderless"
  },
  description: "We're a one-stop shop for all your travel needs, from booking flights and hotels to finding the perfect activities and experiences. With Borderless, you can explore the world seamlessly and stress-free",
  generator: "Next.js",
  category: "tourism",
  manifest: "/manifest.json",
  keywords: ["borderless", "tourism", "tour and tourism", "travel guide", "best travel agency in nigeria", "tourism agency"],
  authors: [
    {
      name: "Jeremiah David",
      url: "https://bytestreaminnovators.ltd/"
    },
  ],
  creator: "Jeremiah David",
  publisher: "Jeremiah David",
  alternates: {
    canonical: '/%s',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    images: 'https://borderless.com/logo-mobile.png',
    title: 'Borderless',
    description: "We're a one-stop shop for all your travel needs, from booking flights and hotels to finding the perfect activities and experiences. With Borderless, you can explore the world seamlessly and stress-free",
    url: 'https://borderless.com',
    siteName: 'Next.js',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Borderless',
    description: "We're a one-stop shop for all your travel needs, from booking flights and hotels to finding the perfect activities and experiences. With Borderless, you can explore the world seamlessly and stress-free",
    creator: '@jeremiahedavid',
    images: ['https://borderless.com/logo-mobile.png'], // Must be an absolute URL
  },
  icons: {
    icon: [
      { url: "/pwa/ios/128.png" },
      { url: "/logo-mobile.png", media: '(prefers-color-scheme: dark)' },
    ],
    shortcut: ['/logo-mobile.png'],
    apple: [
      { url: '/pwa/ios/32.png' },
      { url: '/pwa/ios/180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${raleway.className} font-medium text-base bg-gray-100 dark:bg-dark relative z-0 w-screen scrollbar-thin scrollbar-thumb-secondary overflow-x-hidden overflow-y-auto`}>
        <AuthProvider>
          <NavBar countryName="Borderless" />
          <MainLayout>
            {children}
          </MainLayout>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
