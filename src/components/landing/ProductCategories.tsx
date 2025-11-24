import { Coffee, Cookie, GlassWater, Package, UtensilsCrossed, Wine } from "lucide-react"
import Link from "next/link"

const categories = [
    {
        title: "Beverages",
        description: "Energy drinks, iced coffee, RTD cocktails, juices",
        icon: GlassWater,
    },
    {
        title: "Coffee and tea",
        description: "Beans, capsules, ground, bottled coffee",
        icon: Coffee,
    },
    {
        title: "Snacks",
        description: "Bars, chips, nuts, confectionery",
        icon: Cookie,
    },
    {
        title: "Condiments and sauces",
        description: "Oils, vinegars, spices, dips",
        icon: UtensilsCrossed,
    },
    {
        title: "Supplements",
        description: "Sports nutrition, vitamins, powders",
        icon: Wine, // Using Wine as a placeholder for supplements/bottles
    },
    {
        title: "Packaging",
        description: "For food and drinks",
        icon: Package,
    },
]

export function ProductCategories() {
    return (
        <section id="categories" className="py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Product categories we cover
                    </h2>
                </div>
                <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl border bg-background p-6 transition-shadow hover:shadow-md"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary/10">
                                <category.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold">{category.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {category.description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <p className="text-muted-foreground">
                        Looking for something else?{" "}
                        <Link href="/rfi" className="font-medium text-primary hover:underline">
                            Add it to your RFI
                        </Link>{" "}
                        and we will confirm feasibility.
                    </p>
                </div>
            </div>
        </section>
    )
}
