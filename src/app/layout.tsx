import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import { CookieBanner } from "@/components/CookieBanner";
import { Amplitude } from "@/lib/amplitude";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL('https://batchsourcing.com'),
    title: {
        default: "Batch Sourcing - The Operating System for Modern Sourcing",
        template: "%s | Batch Sourcing"
    },
    description: "Connect with top food and beverage suppliers worldwide using AI-driven matching. Streamline your B2B sourcing process today.",
    keywords: ["B2B sourcing", "food and beverage", "supplier matching", "AI sourcing", "manufacturing partners", "RFI platform"],
    authors: [{ name: "Batch Sourcing Team" }],
    creator: "Batch Sourcing",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://batchsourcing.com",
        title: "Batch Sourcing - The Operating System for Modern Sourcing",
        description: "Connect with top food and beverage suppliers worldwide using AI-driven matching.",
        siteName: "Batch Sourcing",
        images: [
            {
                url: "/og-image.jpg", // We should ensure this image exists or use a placeholder path
                width: 1200,
                height: 630,
                alt: "Batch Sourcing Platform",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Batch Sourcing - AI-Driven B2B Sourcing",
        description: "Connect with top food and beverage suppliers worldwide using AI-driven matching.",
        images: ["/og-image.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Batch Sourcing",
    "url": "https://batchsourcing.com",
    "logo": "https://batchsourcing.com/logo.png",
    "sameAs": [
        "https://twitter.com/batchsourcing",
        "https://linkedin.com/company/batchsourcing"
    ],
    "description": "The Operating System for Modern Sourcing in the Food & Beverage Industry."
};

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

// ... existing imports

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${jakarta.variable} ${outfit.variable} font-sans bg-background text-foreground`}>
                <Amplitude />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <AuthProvider>
                    {children}
                    <SpeedInsights />
                    <Analytics />
                    <Toaster position="top-right" theme="dark" />
                    <CookieBanner />
                </AuthProvider>
            </body>
        </html>
    )
};
