import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Search, ShoppingCart } from "lucide-react"

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 pt-16 md:pt-20 lg:pt-24">
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="space-y-6">
                            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                                Trusted by 100+ food & beverage brands
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl xl:text-6xl leading-tight">
                                Find the right food and beverage supplier{" "}
                                <span className="text-primary">without guesswork</span>
                            </h1>
                            <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl leading-relaxed">
                                Post one RFI and let us source qualified manufacturers, compare quotes, and guide you to the best option for your brand.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-all text-base px-8" asChild>
                                <Link href="/rfi">
                                    Submit an RFI <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 hover:bg-muted">
                                Talk to a sourcing specialist
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span>Free to submit. No obligation to buy.</span>
                        </div>
                    </div>
                    <div className="relative hidden lg:block">
                        {/* Simple UI mock of RFI card or "matching in progress" */}
                        <div className="relative mx-auto max-w-[500px] rounded-xl border bg-card p-6 shadow-2xl">
                            <div className="mb-6 flex items-center justify-between border-b pb-4">
                                <div className="space-y-1">
                                    <div className="h-4 w-32 rounded bg-muted"></div>
                                    <div className="h-3 w-24 rounded bg-muted/50"></div>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-primary/10"></div>
                            </div>

                            <div className="space-y-6">
                                {/* Step 1 */}
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                        <Search className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="font-medium">Analyzing Requirements</div>
                                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                            <div className="h-full w-full bg-blue-500"></div>
                                        </div>
                                    </div>
                                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                                </div>

                                {/* Step 2 */}
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                        <ShoppingCart className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="font-medium">Sourcing Suppliers</div>
                                        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                                            <div className="h-full w-3/4 bg-purple-500 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium text-purple-600">In Progress</div>
                                </div>

                                {/* Matches */}
                                <div className="pt-4">
                                    <div className="mb-3 text-sm font-medium text-muted-foreground">Recent Matches</div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 rounded-lg border p-3 bg-muted/20">
                                            <div className="h-8 w-8 rounded bg-white flex items-center justify-center text-xs font-bold border">IT</div>
                                            <div>
                                                <div className="text-sm font-medium">Premium Organic Manufacturer</div>
                                                <div className="text-xs text-muted-foreground">Italy • MOQ 5k units</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 rounded-lg border p-3 bg-muted/20">
                                            <div className="h-8 w-8 rounded bg-white flex items-center justify-center text-xs font-bold border">ES</div>
                                            <div>
                                                <div className="text-sm font-medium">High Volume Specialist</div>
                                                <div className="text-xs text-muted-foreground">Spain • MOQ 20k units</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

