import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BadgeCheck, Send } from "lucide-react"

export function RFIDashboard() {
    return (
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">RFI #1024: Organic Oat Milk</h1>
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-100 text-blue-800">
                        In Review
                    </span>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>RFI Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground">Product</label>
                                <div className="font-medium">Organic Oat Milk Barista Edition</div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground">Volume</label>
                                <div className="font-medium">20,000 units / month</div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground">Target Markets</label>
                                <div className="font-medium">Germany, Austria</div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-muted-foreground">Timeline</label>
                                <div className="font-medium">Launch Q3 2024</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Guidance Price</label>
                            <div className="flex gap-2">
                                <Input defaultValue="€1.20 - €1.45 per unit (DDP)" className="max-w-xs" />
                                <Button variant="outline" size="sm">Update</Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground">Reference Product</label>
                            <div className="flex gap-2">
                                <Input defaultValue="https://oatly.com/products/barista" className="max-w-md" />
                                <Button variant="outline" size="sm">Update</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="rounded-lg border bg-muted/50 p-6">
                    <h3 className="font-semibold mb-4">How your RFI moves forward</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                                <BadgeCheck className="h-4 w-4" />
                            </div>
                            <div className="text-sm">
                                <span className="font-medium">Confirmation:</span> Your RFI is shared with manufacturers.
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                <div className="h-2 w-2 rounded-full bg-current" />
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <span className="font-medium">Supplier Questions:</span> Manufacturers may ask for more details.
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">
                                <div className="h-2 w-2 rounded-full bg-current" />
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <span className="font-medium">Shortlist:</span> You receive offers with transparent comparison.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="space-y-6">
                <Card className="h-full flex flex-col">
                    <CardHeader>
                        <CardTitle>Your Sourcing Agent</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src="/placeholder-agent.jpg" />
                                <AvatarFallback>SO</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">Sofia Martinez</div>
                                <div className="text-sm text-muted-foreground">Senior Sourcing Specialist</div>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground">
                            I will review your RFI, reach out to manufacturers, and update you with offers and questions. You can message me at any time.
                        </p>

                        <div className="flex-1 min-h-[200px] rounded-lg border bg-muted/30 p-4 space-y-4">
                            <div className="flex gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>SO</AvatarFallback>
                                </Avatar>
                                <div className="rounded-lg bg-muted p-3 text-sm">
                                    Hi! I&apos;ve received your RFI. I&apos;ll start contacting suppliers in Italy and Spain today.
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Input placeholder="Ask a question..." />
                            <Button size="icon">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
