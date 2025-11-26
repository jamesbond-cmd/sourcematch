'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import amplitude from "@/lib/amplitude"

export function Hero() {
    const handleStartSourcingClick = () => {
        amplitude.track('CTA Clicked', {
            ctaLocation: 'Hero',
            ctaText: 'Start Sourcing',
            destination: '/rfi'
        })
    }

    const handleTalkToSalesClick = () => {
        amplitude.track('CTA Clicked', {
            ctaLocation: 'Hero',
            ctaText: 'Talk to Sales',
            destination: '/contact'
        })
    }

    return (
        <section className="relative overflow-hidden pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-500/10 blur-[100px] rounded-full -z-10"></div>

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="space-y-6">
                            <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400 backdrop-blur-sm">
                                <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                                Trusted by 100+ food & beverage brands
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl xl:text-7xl leading-tight">
                                Find verified F&B manufacturers in Europe — <br />
                                <span className="text-gradient">fast, safe, transparent</span>
                            </h1>
                            <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl leading-relaxed">
                                Stop relying on guesswork. Use our AI-powered intelligence to source qualified manufacturers, compare quotes instantly, and secure the best deals.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button size="lg" className="w-full sm:w-auto shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] transition-all duration-300 text-base px-8 h-12 bg-primary hover:bg-primary/90" asChild onClick={handleStartSourcingClick}>
                                <Link href="/rfi">
                                    Start Sourcing <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-12 border-white/10 hover:bg-white/5 glass" asChild onClick={handleTalkToSalesClick}>
                                <Link href="/contact">
                                    Talk to Sales
                                </Link>
                            </Button>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                                <span>Verified Suppliers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                                <span>AI Analysis</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                                <span>Free to Start</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000 delay-200">
                        <div className="relative mx-auto w-full max-w-[600px] aspect-square flex items-center justify-center">
                            {/* Abstract Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

                            {/* Central Hub */}
                            <div className="relative z-10 w-32 h-32 rounded-full bg-background border-2 border-indigo-500/50 flex items-center justify-center shadow-[0_0_50px_rgba(79,70,229,0.5)]">
                                <div className="absolute inset-0 rounded-full border border-indigo-400/30 animate-[spin_10s_linear_infinite]"></div>
                                <div className="absolute inset-2 rounded-full border border-purple-400/30 animate-[spin_15s_linear_infinite_reverse]"></div>
                                <div className="text-4xl">🌍</div>
                            </div>

                            {/* Orbiting Nodes */}
                            <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-12 h-12 glass rounded-xl flex items-center justify-center border-indigo-500/30 -rotate-[0deg]">
                                    <span className="text-xl">🏭</span>
                                </div>
                                <div className="absolute bottom-20 right-20 w-10 h-10 glass rounded-full flex items-center justify-center border-purple-500/30 -rotate-[120deg]">
                                    <span className="text-lg">📦</span>
                                </div>
                                <div className="absolute bottom-20 left-20 w-14 h-14 glass rounded-lg flex items-center justify-center border-green-500/30 -rotate-[240deg]">
                                    <span className="text-2xl">🚢</span>
                                </div>
                            </div>

                            {/* Connecting Lines (SVG) */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 600 600">
                                <circle cx="300" cy="300" r="150" fill="none" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_30s_linear_infinite]" />
                                <circle cx="300" cy="300" r="250" fill="none" stroke="url(#gradient)" strokeWidth="1" opacity="0.5" />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#4F46E5" />
                                        <stop offset="100%" stopColor="#7C3AED" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            {/* Floating Cards */}
                            <div className="absolute -bottom-10 -left-10 glass p-4 rounded-xl border border-white/10 shadow-2xl animate-bounce duration-[3000ms]">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <CheckCircle2 className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">Supplier Verified</div>
                                        <div className="text-xs text-gray-400">ISO 9001 Certified</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-10 -right-5 glass p-4 rounded-xl border border-white/10 shadow-2xl animate-bounce duration-[4000ms] delay-700">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <span className="font-bold text-xs">AI</span>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-white">Quote Analyzed</div>
                                        <div className="text-xs text-gray-400">Best value match found</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

