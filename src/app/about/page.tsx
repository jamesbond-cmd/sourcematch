import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { Card } from "@/components/ui/card"
import { Target, Lightbulb, Heart } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Batch Sourcing</h1>
                        <p className="text-xl text-muted-foreground">
                            Revolutionizing how food and beverage companies connect with manufacturers
                        </p>
                    </div>

                    {/* Mission Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-lg text-muted-foreground mb-4">
                            At Batch Sourcing, we believe that finding the right manufacturing partner shouldn't be a months-long
                            process filled with uncertainty. Our mission is to streamline B2B sourcing in the food and beverage
                            industry by leveraging AI technology to connect buyers with the perfect suppliers.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            We're building a transparent, efficient marketplace where quality manufacturers can showcase their
                            capabilities and innovative brands can find reliable production partners to bring their products to market.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <Card className="p-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Target className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Transparency</h3>
                                <p className="text-sm text-muted-foreground">
                                    We believe in open communication and clear pricing. No hidden fees, no surprises.
                                </p>
                            </Card>

                            <Card className="p-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Lightbulb className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                                <p className="text-sm text-muted-foreground">
                                    We continuously improve our AI matching technology to deliver better results faster.
                                </p>
                            </Card>

                            <Card className="p-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2">Partnership</h3>
                                <p className="text-sm text-muted-foreground">
                                    Your success is our success. We're committed to supporting you throughout your sourcing journey.
                                </p>
                            </Card>
                        </div>
                    </div>

                    {/* Story Section */}
                    <div className="mb-16">
                        <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                        <p className="text-lg text-muted-foreground mb-4">
                            Batch Sourcing was founded by a team of food industry veterans and technology experts who experienced
                            firsthand the challenges of finding reliable manufacturing partners. After spending countless hours
                            researching suppliers, negotiating terms, and managing quality issues, we knew there had to be a better way.
                        </p>
                        <p className="text-lg text-muted-foreground">
                            Today, we're proud to serve hundreds of brands and connect them with top-tier manufacturers across the globe.
                            Our platform has facilitated millions in production deals and continues to grow as more companies discover
                            the power of intelligent sourcing.
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">500+</div>
                            <div className="text-sm text-muted-foreground">Verified Suppliers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                            <div className="text-sm text-muted-foreground">RFIs Processed</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">50+</div>
                            <div className="text-sm text-muted-foreground">Countries</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-primary mb-2">95%</div>
                            <div className="text-sm text-muted-foreground">Match Success Rate</div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
