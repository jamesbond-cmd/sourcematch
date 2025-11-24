import { Button } from "@/components/ui/button"
import { CheckCircle2, LayoutDashboard, Plus } from "lucide-react"
import Link from "next/link"

export function Step7Dashboard() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
                <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight mb-4">RFI Submitted Successfully!</h1>
            <p className="text-muted-foreground text-lg mb-8">
                Your Request for Information has been sent to our team. We will review your requirements and match you with the best suppliers for your needs.
            </p>

            <div className="bg-card border rounded-xl p-6 mb-8 text-left shadow-sm">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Our AI agent analyzes your requirements</li>
                    <li>We match you with verified suppliers</li>
                    <li>You receive quotes and profiles within 48 hours</li>
                    <li>You can chat with our agent anytime for updates</li>
                </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Go to Dashboard
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <Link href="/rfi">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Another RFI
                    </Link>
                </Button>
            </div>
        </div>
    )
}
