import { Building2, ShoppingBag, Store, Truck } from "lucide-react"

const clients = [
    { name: "Retailers and wholesalers", icon: Store },
    { name: "D2C brands", icon: ShoppingBag },
    { name: "Coffee chains and gyms", icon: Building2 },
    { name: "Importers and distributors", icon: Truck },
]

export function SocialProof() {
    return (
        <section className="border-y bg-background py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Used by buyers across Europe
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                        {clients.map((client, index) => (
                            <div key={index} className="flex items-center gap-2 text-muted-foreground">
                                <client.icon className="h-5 w-5" />
                                <span className="font-medium">{client.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
