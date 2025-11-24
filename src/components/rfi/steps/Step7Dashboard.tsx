import { Button } from "@/components/ui/button"
import { CheckCircle2, LayoutDashboard, Plus } from "lucide-react"
import Link from "next/link"

interface Step7DashboardProps {
    onReset?: () => void
}

export function Step7Dashboard({ onReset }: Step7DashboardProps = {}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background px-4">
            <div className="max-w-2xl w-full space-y-8 text-center">
                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
                        <div className="relative bg-green-500/10 p-6 rounded-full">
                            <CheckCircle2 className="h-20 w-20 text-green-500" />
                        </div>
                    </div>
                </div>

                {/* Success Message */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">RFI Submitted Successfully!</h1>
                    <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                        Your Request for Information has been sent to our team. We will review your requirements and match you with the best suppliers for your needs.
                    </p>
                </div>

                {/* What Happens Next */}
                <div className="bg-card border rounded-lg p-6 text-left max-w-lg mx-auto">
                    <h3 className="font-semibold mb-4">What happens next?</h3>
                    <ol className="space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-3">
                            <span className="font-semibold text-foreground">1.</span>
                            <span>Our AI agent analyzes your requirements</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-semibold text-foreground">2.</span>
                            <span>We match you with verified suppliers</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-semibold text-foreground">3.</span>
                            <span>You receive quotes and profiles within 48 hours</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-semibold text-foreground">4.</span>
                            <span>You can chat with our agent anytime for updates</span>
                        </li>
                    </ol>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button asChild className="w-full sm:w-auto h-11 px-8">
                        <Link href="/dashboard">
                            <LayoutDashboard className="mr-2 h-4 w-4" /> Go to Dashboard
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={onReset || (() => window.location.href = '/rfi')}
                        className="w-full sm:w-auto h-11 px-8"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Create Another RFI
                    </Button>
                </div>
            </div>
        </div>
    )
}
