"use client"

import { useState } from "react"
import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000))

        toast.success("Message sent! We'll get back to you within 24 hours.")
        setIsSubmitting(false)

            // Reset form
            ; (e.target as HTMLFormElement).reset()
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-5xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                        <p className="text-xl text-muted-foreground">
                            Have questions? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" required placeholder="Your name" />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" required placeholder="you@company.com" />
                                </div>
                                <div>
                                    <Label htmlFor="company">Company</Label>
                                    <Input id="company" name="company" placeholder="Your company name" />
                                </div>
                                <div>
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input id="subject" name="subject" required placeholder="How can we help?" />
                                </div>
                                <div>
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        required
                                        placeholder="Tell us more about your inquiry..."
                                        rows={6}
                                    />
                                </div>
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
                            <div className="space-y-6">
                                <Card className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Mail className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Email</h3>
                                            <p className="text-muted-foreground text-sm mb-2">
                                                Our team is here to help
                                            </p>
                                            <a href="mailto:hello@batchsourcing.com" className="text-primary hover:underline">
                                                hello@batchsourcing.com
                                            </a>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <Phone className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Phone</h3>
                                            <p className="text-muted-foreground text-sm mb-2">
                                                Mon-Fri from 9am to 6pm EST
                                            </p>
                                            <a href="tel:+1234567890" className="text-primary hover:underline">
                                                +1 (234) 567-890
                                            </a>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                            <MapPin className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Office</h3>
                                            <p className="text-muted-foreground text-sm">
                                                123 Business Street<br />
                                                Suite 456<br />
                                                New York, NY 10001<br />
                                                United States
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            <div className="mt-8">
                                <h3 className="font-semibold mb-3">Follow us</h3>
                                <div className="flex gap-4">
                                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                        LinkedIn
                                    </a>
                                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                        Twitter
                                    </a>
                                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                        Facebook
                                    </a>
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
