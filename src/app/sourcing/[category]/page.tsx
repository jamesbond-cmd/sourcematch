import { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

// This would typically come from a CMS or database
const categories = {
    "private-label-beverages": {
        title: "Source Private Label Beverages",
        description: "Connect with verified European beverage manufacturers for your private label brand. From energy drinks to organic juices.",
        features: ["Low MOQs available", "IFS/BRC certified factories", "Custom formulation support"],
    },
    "food-packaging": {
        title: "Sustainable Food Packaging Sourcing",
        description: "Find eco-friendly and custom food packaging suppliers. Boxes, pouches, and sustainable alternatives.",
        features: ["Recyclable materials", "Custom printing", "Fast prototyping"],
    },
    "organic-supplements": {
        title: "Organic Supplement Manufacturing",
        description: "Partner with GMP-certified supplement manufacturers. Capsules, powders, and functional foods.",
        features: ["GMP Certified", "Organic certified ingredients", "Lab testing included"],
    },
}

type Props = {
    params: { category: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const category = categories[params.category as keyof typeof categories]
    if (!category) return { title: "Category Not Found" }

    return {
        title: `${category.title} | Batch Sourcing`,
        description: category.description,
    }
}

export default function CategoryPage({ params }: Props) {
    const category = categories[params.category as keyof typeof categories]

    if (!category) {
        return notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"></div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center space-y-8">
                            <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400 backdrop-blur-sm">
                                <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                                Verified {category.title.replace("Source ", "").replace("Sourcing", "")} Manufacturers
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                                {category.title}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {category.description}
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12 bg-primary hover:bg-primary/90 shadow-glow" asChild>
                                    <Link href="/rfi">
                                        Get Quotes Now <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-12 border-white/10 hover:bg-white/5" asChild>
                                    <Link href="/contact">
                                        Talk to an Expert
                                    </Link>
                                </Button>
                            </div>
                            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground pt-8">
                                {category.features.map((feature) => (
                                    <div key={feature} className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Trust Section */}
                <section className="py-16 border-y bg-muted/30">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-8">
                            Trusted by brands sourcing {category.title.replace("Source ", "").replace("Sourcing", "")}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                            {["ISO 9001", "HACCP", "GMP", "Organic"].map((cert) => (
                                <div key={cert} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border border-white/5">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <span className="text-sm font-medium text-foreground">{cert}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
