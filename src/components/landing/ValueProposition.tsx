import { CheckCircle2, Clock, FileSpreadsheet, Users } from "lucide-react"

const features = [
    {
        title: "Verified manufacturers",
        description: "We screen suppliers for certifications, production capacity, and export history.",
        icon: CheckCircle2,
    },
    {
        title: "Time saved",
        description: "One RFI instead of dozens of cold emails and calls.",
        icon: Clock,
    },
    {
        title: "Transparent comparisons",
        description: "Clear tables showing prices, MOQs, lead times, and quality notes.",
        icon: FileSpreadsheet,
    },
    {
        title: "Human and AI combined",
        description: "AI helps structure your brief. Humans handle negotiation, follow up, and risk checks.",
        icon: Users,
    },
]

export function ValueProposition() {
    return (
        <section className="bg-muted/50 py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Why buyers trust our sourcing support
                    </h2>
                </div>
                <div className="mx-auto mt-16 grid max-w-5xl gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold">{feature.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
