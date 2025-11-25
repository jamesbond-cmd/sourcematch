import Link from "next/link"
import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, TrendingUp, Shield, Clock } from "lucide-react"

export default function BuyersPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">For Buyers</h1>
                        <p className="text-xl text-muted-foreground">
                            Source smarter, faster, and with confidence
                        </p>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        <Card className="p-6">
                            <TrendingUp className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Access Global Suppliers</h3>
                            <p className="text-muted-foreground">
                                Connect with pre-vetted food and beverage manufacturers worldwide. Our network spans across continents,
                                giving you access to the best suppliers for your specific needs.
                            </p>
                        </Card>

                        <Card className="p-6">
                            <Clock className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Save Time</h3>
                            <p className="text-muted-foreground">
                                Skip the endless research and cold outreach. Our AI-powered platform matches you with qualified suppliers
                                in minutes, not weeks.
                            </p>
                        </Card>

                        <Card className="p-6">
                            <Shield className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                            <p className="text-muted-foreground">
                                All suppliers in our network are verified and rated. Review certifications, past performance, and buyer
                                feedback before making contact.
                            </p>
                        </Card>

                        <Card className="p-6">
                            <CheckCircle2 className="w-10 h-10 text-primary mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
                            <p className="text-muted-foreground">
                                Our sourcing agents are available to assist with negotiations, quality checks, logistics, and any
                                challenges that arise during the procurement process.
                            </p>
                        </Card>
                    </div>

                    {/* How It Works for Buyers */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    1
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Submit Your Requirements</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Fill out a simple RFI form detailing your product specifications, volume needs, and timeline.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    2
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Receive Qualified Matches</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Our AI analyzes your needs and presents you with 3-5 pre-vetted suppliers that match your criteria.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    3
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Compare & Connect</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Review supplier profiles, compare quotes, and communicate directly through our secure platform.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    4
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Close the Deal</h3>
                                    <p className="text-muted-foreground text-sm">
                                        Negotiate terms, finalize contracts, and begin production with your chosen supplier.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center bg-primary/5 rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4">Start Sourcing Today</h2>
                        <p className="text-muted-foreground mb-6">
                            Join hundreds of buyers who have found their perfect manufacturing partners through Batch Sourcing.
                        </p>
                        <Link href="/rfi">
                            <Button size="lg" className="gap-2">
                                Submit Your First RFI
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
