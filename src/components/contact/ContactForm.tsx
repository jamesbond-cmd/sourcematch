"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone } from "lucide-react"
import { toast } from "sonner"

export function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        toast.success("Message sent successfully! We'll get back to you soon.")
        setIsSubmitting(false)

        // Reset form
        const form = e.target as HTMLFormElement
        form.reset()
    }

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
                <Card className="p-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Email</h3>
                            <p className="text-sm text-muted-foreground mb-2">Our friendly team is here to help.</p>
                            <a href="mailto:hello@batchsourcing.com" className="text-primary hover:underline">
                                hello@batchsourcing.com
                            </a>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Office</h3>
                            <p className="text-sm text-muted-foreground mb-2">Come say hello at our office HQ.</p>
                            <p className="text-sm text-muted-foreground">
                                100 Smith Street<br />
                                Collingwood VIC 3066 AU
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Phone</h3>
                            <p className="text-sm text-muted-foreground mb-2">Mon-Fri from 8am to 5pm.</p>
                            <a href="tel:+15550000000" className="text-primary hover:underline">
                                +1 (555) 000-0000
                            </a>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Contact Form */}
            <Card className="lg:col-span-2 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first-name">First name</Label>
                            <Input id="first-name" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-name">Last name</Label>
                            <Input id="last-name" placeholder="Doe" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" placeholder="How can we help?" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Tell us more about your inquiry..."
                            className="min-h-[150px]"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </Card>
        </div>
    )
}
