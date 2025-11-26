import { Hero } from "@/components/landing/Hero"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { ProductCategories } from "@/components/landing/ProductCategories"
import { ValueProposition } from "@/components/landing/ValueProposition"
import { SocialProof } from "@/components/landing/SocialProof"
import { RFIPreview } from "@/components/landing/RFIPreview"
import { FAQ } from "@/components/landing/FAQ"
import { Footer } from "@/components/landing/Footer"
import { Header } from "@/components/landing/Header"
import { LatestResources } from "@/components/landing/LatestResources"
import { HubSpot } from "@/components/HubSpot"

export default function Home() {
    return (
        <main className="min-h-screen">
            <HubSpot />
            <Header />
            <Hero />
            <SocialProof />
            <HowItWorks />
            <ProductCategories />
            <ValueProposition />
            <RFIPreview />
            <FAQ />
            <LatestResources />
            <Footer />
        </main>
    )
}
