import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import { CookieBanner } from "@/components/CookieBanner";

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
    title: "Batch Sourcing - The Operating System for Modern Sourcing",
    description: "Connect with top suppliers worldwide using AI-driven matching.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${jakarta.variable} ${outfit.variable} font-sans bg-background text-foreground`}>
                <AuthProvider>
                    {children}
                    <Toaster position="top-right" theme="dark" />
                    <CookieBanner />
                </AuthProvider>
            </body>
        </html>
    )
};
