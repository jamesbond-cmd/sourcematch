"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Cookie, Settings } from "lucide-react"

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)
    const [showCustomize, setShowCustomize] = useState(false)

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie_consent")
        if (!consent) {
            // Show banner after a short delay for better UX
            setTimeout(() => setIsVisible(true), 1000)
        }
    }, [])

    const handleAcceptAll = () => {
        localStorage.setItem("cookie_consent", JSON.stringify({
            essential: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        }))
        setIsVisible(false)
    }

    const handleRejectNonEssential = () => {
        localStorage.setItem("cookie_consent", JSON.stringify({
            essential: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        }))
        setIsVisible(false)
    }

    const handleCustomize = () => {
        setShowCustomize(!showCustomize)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
            <Card className="mx-auto max-w-4xl border-2 shadow-2xl bg-background border-border">
                <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <Cookie className="h-6 w-6 text-primary shrink-0 mt-1" />
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">We value your privacy</h3>
                                <p className="text-sm text-muted-foreground">
                                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                                    By clicking "Accept All", you consent to our use of cookies. You can manage your preferences or learn more in our{" "}
                                    <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsVisible(false)}
                            className="shrink-0"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {showCustomize && (
                        <div className="mt-4 space-y-3 border-t pt-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-sm">Essential Cookies</p>
                                    <p className="text-xs text-muted-foreground">Required for the website to function</p>
                                </div>
                                <span className="text-xs text-muted-foreground">Always Active</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-sm">Analytics Cookies</p>
                                    <p className="text-xs text-muted-foreground">Help us improve our website</p>
                                </div>
                                <input type="checkbox" className="h-4 w-4" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-sm">Marketing Cookies</p>
                                    <p className="text-xs text-muted-foreground">Used to deliver relevant ads</p>
                                </div>
                                <input type="checkbox" className="h-4 w-4" defaultChecked />
                            </div>
                        </div>
                    )}

                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <Button onClick={handleAcceptAll} className="flex-1">
                            Accept All
                        </Button>
                        <Button onClick={handleRejectNonEssential} variant="outline" className="flex-1">
                            Reject Non-Essential
                        </Button>
                        <Button onClick={handleCustomize} variant="ghost" className="flex-1">
                            <Settings className="h-4 w-4 mr-2" />
                            Customize
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
