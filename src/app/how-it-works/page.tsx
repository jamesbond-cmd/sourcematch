import Link from "next/link"
import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, FileText, Sparkles, Users } from "lucide-react"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "How It Works - Batch Sourcing",
    description: "Discover how our AI-driven platform connects you with the perfect food and beverage manufacturers in simple steps.",
}

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">How Batch Sourcing Works</h1>
                        <p className="text-xl text-muted-foreground">
                            Connect with top food and beverage manufacturers in three simple steps
                        </p>
                    </div>

                    <div className="space-y-12">
                        {/* Step 1 */}
                        <Card className="p-8">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                        <FileText className="w-8 h-8 text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-sm font-semibold text-primary">STEP 1</span>
                                        <div className="h-px flex-1 bg-border" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3">Submit Your RFI</h2>
                                    <p className="text-muted-foreground mb-4">
                                        Tell us what you're looking for. Our intelligent form guides you through specifying your product requirements,
                                        volume needs, timeline, and destination markets. The more details you provide, the better we can match you
                                        with the right suppliers.
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-primary" />
                                            Takes only 5-10 minutes to complete
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-primary" />
                                            Upload specifications and documents
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-primary" />
                                            No commitment required
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Card>

                        {/* Step 2 */}
                        <Card className="p-8">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="w-8 h-8 text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-sm font-semibold text-primary">STEP 2</span>
                                        <div className="h-px flex-1 bg-border" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3">AI-Powered Matching</h2>
                                    <p className="text-muted-foreground mb-4">
                                        Our AI analyzes your requirements and matches you with the most suitable manufacturers from our global network.
                                        We consider factors like production capabilities, certifications, past performance, and geographic location to
                                        find your perfect match.
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-primary" />
                                            Intelligent matching algorithm
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-primary" />
                                            Pre-vetted supplier network
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-primary" />
                                            Typically 3-5 qualified matches
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Card>

                        {/* Step 3 */}
                        <Card className="p-8">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Users className="w-8 h-8 text-primary" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-sm font-semibold text-primary">STEP 3</span>
                                        <div className="h-px flex-1 bg-border" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3">Connect & Negotiate</h2>
                                    <p className="text-muted-foreground mb-4">
                                        Review supplier profiles, compare quotes, and communicate directly through our platform. Our sourcing agents
                                        are available to assist with negotiations, quality checks, and logistics coordination to ensure a smooth
                                        procurement process.
                                    </p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-primary" />
                                            Direct messaging with suppliers
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-primary" />
                                            Expert sourcing agent support
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-4 h-4 text-primary" />
                                            Transparent pricing and terms
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
                        <p className="text-muted-foreground mb-6">
                            Submit your first RFI today and discover qualified suppliers for your products.
                        </p>
                        <Link href="/rfi">
                            <Button size="lg" className="gap-2">
                                Submit an RFI
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
