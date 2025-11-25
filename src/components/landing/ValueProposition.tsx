import { CheckCircle2, Clock, FileSpreadsheet, Users, Zap, ShieldCheck } from "lucide-react"
import { BentoGrid, BentoGridItem } from "@/components/landing/BentoGrid"

const features = [
    {
        title: "Verified Manufacturers",
        description: "We screen suppliers for certifications, production capacity, and export history.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center"><CheckCircle2 className="h-10 w-10 text-indigo-500" /></div>,
        icon: <ShieldCheck className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2",
    },
    {
        title: "Time Saved",
        description: "One RFI instead of dozens of cold emails and calls.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center"><Clock className="h-10 w-10 text-purple-500" /></div>,
        icon: <Zap className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-1",
    },
    {
        title: "Transparent Comparisons",
        description: "Clear tables showing prices, MOQs, lead times, and quality notes.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center"><FileSpreadsheet className="h-10 w-10 text-green-500" /></div>,
        icon: <FileSpreadsheet className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-1",
    },
    {
        title: "Human + AI Intelligence",
        description: "AI helps structure your brief. Humans handle negotiation, follow up, and risk checks.",
        header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 items-center justify-center"><Users className="h-10 w-10 text-orange-500" /></div>,
        icon: <Users className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2",
    },
]

export function ValueProposition() {
    return (
        <section className="bg-background py-16 md:py-24 lg:py-32 relative">
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px] -z-10" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Why buyers trust our <span className="text-gradient">sourcing support</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground text-lg">
                        We combine advanced technology with human expertise to deliver the best sourcing experience.
                    </p>
                </div>
                <BentoGrid className="max-w-4xl mx-auto">
                    {features.map((feature, i) => (
                        <BentoGridItem
                            key={i}
                            title={feature.title}
                            description={feature.description}
                            header={feature.header}
                            icon={feature.icon}
                            className={feature.className}
                        />
                    ))}
                </BentoGrid>
            </div>
        </section>
    )
}
