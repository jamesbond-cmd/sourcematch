import { RFIWizard } from "@/components/rfi/RFIWizard"
import Link from "next/link"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Create RFI - Batch Sourcing",
    description: "Submit your Request for Information (RFI) and let our AI match you with the best suppliers for your needs.",
}

export default function RFIPage() {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="font-bold text-xl">
                        Batch Sourcing
                    </Link>
                </div>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                <RFIWizard />
            </main>
        </div>
    )
}

