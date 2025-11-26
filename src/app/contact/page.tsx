import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { ContactForm } from "@/components/contact/ContactForm"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact Us - Batch Sourcing",
    description: "Get in touch with our team for support, partnerships, or general inquiries.",
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
                        <p className="text-xl text-muted-foreground">
                            Have questions? We'd love to hear from you.
                        </p>
                    </div>

                    <ContactForm />
                </div>
            </main>
            <Footer />
        </div>
    )
}
