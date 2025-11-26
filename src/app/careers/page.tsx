import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { Card } from "@/components/ui/card"
import { Briefcase } from "lucide-react"

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers at Batch Sourcing</h1>
                        <p className="text-xl text-muted-foreground">
                            Join us in revolutionizing B2B sourcing
                        </p>
                    </div>

                    {/* Company Culture */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Why Work With Us</h2>
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <Card className="p-6">
                                <h3 className="font-semibold text-lg mb-2">Innovative Environment</h3>
                                <p className="text-muted-foreground">
                                    Work with cutting-edge AI technology and help shape the future of B2B sourcing in the food industry.
                                </p>
                            </Card>
                            <Card className="p-6">
                                <h3 className="font-semibold text-lg mb-2">Growth Opportunities</h3>
                                <p className="text-muted-foreground">
                                    We invest in our team's development with continuous learning opportunities and clear career progression paths.
                                </p>
                            </Card>
                            <Card className="p-6">
                                <h3 className="font-semibold text-lg mb-2">Flexible Work</h3>
                                <p className="text-muted-foreground">
                                    Remote-first culture with flexible hours. We focus on results, not where or when you work.
                                </p>
                            </Card>
                            <Card className="p-6">
                                <h3 className="font-semibold text-lg mb-2">Impact</h3>
                                <p className="text-muted-foreground">
                                    Your work directly impacts hundreds of businesses and helps bring innovative products to market.
                                </p>
                            </Card>
                        </div>
                    </div>

                    {/* Open Positions */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Open Positions</h2>
                        <Card className="p-12 text-center">
                            <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No Open Positions</h3>
                            <p className="text-muted-foreground">
                                We don't have any open positions at the moment, but we're always looking for talented individuals.
                                Check back soon or send us your resume at{" "}
                                <a href="mailto:hello@batchsourcing.com" className="text-primary hover:underline">
                                    hello@batchsourcing.com
                                </a>
                            </p>
                        </Card>
                    </div>

                    {/* Perks & Benefits */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Perks & Benefits</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                <div>
                                    <p className="font-medium">Competitive Salary</p>
                                    <p className="text-sm text-muted-foreground">Market-rate compensation with equity options</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                <div>
                                    <p className="font-medium">Health Insurance</p>
                                    <p className="text-sm text-muted-foreground">Comprehensive medical, dental, and vision coverage</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                <div>
                                    <p className="font-medium">Unlimited PTO</p>
                                    <p className="text-sm text-muted-foreground">Take time off when you need it</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                <div>
                                    <p className="font-medium">Learning Budget</p>
                                    <p className="text-sm text-muted-foreground">Annual budget for courses, conferences, and books</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                <div>
                                    <p className="font-medium">Remote Work</p>
                                    <p className="text-sm text-muted-foreground">Work from anywhere in the world</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                                <div>
                                    <p className="font-medium">Latest Equipment</p>
                                    <p className="text-sm text-muted-foreground">Top-of-the-line laptop and accessories</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
