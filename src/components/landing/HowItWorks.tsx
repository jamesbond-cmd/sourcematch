import { FileText, Search, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
    {
        title: "1. Share your RFI",
        description: "Describe the product, volume, target markets, and timelines. You can attach specs, labels, or reference products.",
        icon: FileText,
    },
    {
        title: "2. We source and screen suppliers",
        description: "We search our network, confirm capabilities and certifications, and request quotes on your behalf.",
        icon: Search,
    },
    {
        title: "3. You compare offers and order",
        description: "You receive a shortlist of suppliers with pricing, MOQs, lead times, and samples so you can decide with confidence.",
        icon: ShoppingCart,
    },
]

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-16 md:py-24 lg:py-32 bg-muted/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        How it works
                    </h2>
                </div>
                <div className="mx-auto mt-16 max-w-5xl">
                    <div className="grid gap-12 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <step.icon className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold">{step.title}</h3>
                                <p className="mt-4 text-muted-foreground">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 flex justify-center">
                        <Button variant="outline" size="lg" asChild>
                            <Link href="/rfi">
                                See example RFI
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
