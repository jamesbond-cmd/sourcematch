import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Batch Sourcing - AI-Powered Batch Sourcing Platform",
    description: "Connect with top suppliers worldwide using AI-driven matching.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <AuthProvider>
                    {children}
                </AuthProvider>
                <Toaster />
            </body>
        </html>
    );
}
