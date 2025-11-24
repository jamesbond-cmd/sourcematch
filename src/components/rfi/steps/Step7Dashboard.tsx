import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, MessageSquare, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

export function Step7Dashboard() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Manage your RFIs and supplier communications.</p>
                </div>
                <Button asChild>
                    <Link href="/rfi">
                        New RFI <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content - Active RFIs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="rounded-xl border bg-card shadow-sm">
                        <div className="border-b p-6">
                            <h2 className="font-semibold">Active RFIs</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-6">
                                {/* RFI Item */}
                                <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">Organic Oat Milk</span>
                                            <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                                In Review
                                            </span>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Submitted on {new Date().toLocaleDateString()} • ID: #RFI-2024-001
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            <span>Est. completion: 5 days</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm">View Details</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-xl border bg-card shadow-sm">
                        <div className="border-b p-6">
                            <h2 className="font-semibold">Recent Activity</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">RFI Submitted Successfully</p>
                                        <p className="text-sm text-muted-foreground">
                                            Your request for &quot;Organic Oat Milk&quot; has been received and is being reviewed by our team.
                                        </p>
                                        <p className="text-xs text-muted-foreground">Just now</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Agent & Support */}
                <div className="space-y-6">
                    <div className="rounded-xl border bg-card shadow-sm">
                        <div className="border-b p-6">
                            <h2 className="font-semibold">Your Sourcing Agent</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                                    JD
                                </div>
                                <div>
                                    <div className="font-medium">John Doe</div>
                                    <div className="text-sm text-muted-foreground">Senior Sourcing Specialist</div>
                                </div>
                            </div>
                            <div className="mt-6 space-y-4">
                                <div className="rounded-lg bg-muted/50 p-3 text-sm">
                                    &quot;Hi! I&apos;ll be reviewing your RFI shortly. I specialize in plant-based beverages and have some great suppliers in mind for your oat milk project.&quot;
                                </div>
                                <Button className="w-full" variant="outline">
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card shadow-sm">
                        <div className="border-b p-6">
                            <h2 className="font-semibold">Quick Actions</h2>
                        </div>
                        <div className="p-2">
                            <Button variant="ghost" className="w-full justify-start">
                                <FileText className="mr-2 h-4 w-4" />
                                Upload Documents
                            </Button>
                            <Button variant="ghost" className="w-full justify-start">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
