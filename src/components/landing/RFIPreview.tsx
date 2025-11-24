import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function RFIPreview() {
    return (
        <section className="py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="flex flex-col justify-center space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                What a strong RFI looks like
                            </h2>
                            <p className="mt-4 text-lg text-muted-foreground">
                                When you submit an RFI, our assistant checks for missing details and helps you improve it before we send it to suppliers.
                            </p>
                        </div>

                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Sparkles className="h-4 w-4" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-medium">AI Assistant</p>
                                    <p className="text-sm text-muted-foreground">
                                        &quot;I noticed you didn&apos;t specify the packaging material. Suppliers will need to know if you prefer PET, glass, or aluminum cans to give an accurate quote.&quot;
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button size="lg" asChild>
                                <Link href="/rfi">
                                    Submit your first RFI <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="relative rounded-2xl border bg-muted/30 p-2">
                        <div className="rounded-xl border bg-card p-6 shadow-lg">
                            <div className="mb-6 flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium text-muted-foreground">RFI #1024</div>
                                    <div className="font-semibold">Organic Iced Tea - Private Label</div>
                                </div>
                                <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                    Ready to send
                                </div>
                            </div>

                            <div className="space-y-6 text-sm">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <div className="font-medium text-muted-foreground">Product</div>
                                        <div className="mt-1">Iced Tea (Peach & Lemon)</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-muted-foreground">Volume</div>
                                        <div className="mt-1">50,000 units / year</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-muted-foreground">Packaging</div>
                                        <div className="mt-1">330ml Sleek Can</div>
                                    </div>
                                    <div>
                                        <div className="font-medium text-muted-foreground">Target Market</div>
                                        <div className="mt-1">Germany, Austria</div>
                                    </div>
                                </div>

                                <div>
                                    <div className="font-medium text-muted-foreground">Certifications</div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <span className="inline-flex items-center rounded-md border bg-muted px-2 py-1 text-xs font-medium">
                                            Organic EU
                                        </span>
                                        <span className="inline-flex items-center rounded-md border bg-muted px-2 py-1 text-xs font-medium">
                                            IFS Food
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div className="font-medium text-muted-foreground">Budget Target</div>
                                    <div className="mt-1">€0.45 - €0.55 per unit (EXW)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
