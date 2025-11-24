import { RFIWizard } from "@/components/rfi/RFIWizard"
import Link from "next/link"

export default function RFIPage() {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="font-bold text-xl">
                        B2B Sourcing
                    </Link>
                </div>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8">
                <RFIWizard />
            </main>
        </div>
    )
}
