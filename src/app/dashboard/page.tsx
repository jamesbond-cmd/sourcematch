"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { supabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Search, Filter, LogOut } from "lucide-react"

export default function DashboardPage() {
    const { user, loading, signOut } = useAuth()
    const router = useRouter()
    const [rfis, setRfis] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading, router])

    useEffect(() => {
        const loadRFIs = async () => {
            if (!user) return

            try {
                const data = await supabaseClient.getRFIs(user.id)
                setRfis(data || [])
            } catch (error) {
                console.error("Error loading RFIs:", error)
                // toast.error("Failed to load RFIs")
            } finally {
                setIsLoading(false)
            }
        }

        loadRFIs()
    }, [user])

    const handleSignOut = async () => {
        await signOut()
        router.push("/")
    }

    const filteredRFIs = rfis.filter(rfi =>
        rfi.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case "draft": return "bg-gray-100 text-gray-700"
            case "submitted": return "bg-blue-100 text-blue-700"
            case "in_review": return "bg-yellow-100 text-yellow-700"
            case "sent_to_suppliers": return "bg-purple-100 text-purple-700"
            case "closed": return "bg-green-100 text-green-700"
            default: return "bg-gray-100 text-gray-700"
        }
    }

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header */}
            <header className="border-b bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                                S
                            </div>
                            <span className="font-bold text-xl">SourceMatch</span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" onClick={handleSignOut}>
                                <LogOut className="h-4 w-4 mr-2" />
                                Sign out
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My RFIs</h1>
                        <p className="text-muted-foreground">Manage your sourcing requests</p>
                    </div>
                    <Button asChild>
                        <Link href="/rfi">
                            <Plus className="h-4 w-4 mr-2" />
                            New RFI
                        </Link>
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search RFIs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                </div>

                {/* RFI List */}
                {filteredRFIs.length === 0 ? (
                    <Card className="p-12 text-center">
                        <div className="mx-auto max-w-md">
                            <h3 className="text-lg font-semibold mb-2">No RFIs yet</h3>
                            <p className="text-muted-foreground mb-6">
                                Get started by creating your first sourcing request
                            </p>
                            <Button asChild>
                                <Link href="/rfi">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create RFI
                                </Link>
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {filteredRFIs.map((rfi) => (
                            <Card key={rfi.id} className="p-6 hover:shadow-md transition-shadow">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold">{rfi.product_name}</h3>
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(rfi.status)}`}>
                                                {rfi.status.replace("_", " ")}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                            <div>
                                                <span className="font-medium">Volume:</span> {rfi.estimated_volume} {rfi.volume_unit}
                                            </div>
                                            <div>
                                                <span className="font-medium">Timeline:</span> {rfi.timeline}
                                            </div>
                                            <div className="col-span-2">
                                                <span className="font-medium">Markets:</span> {rfi.destination_markets?.join(", ")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" asChild>
                                            <Link href={`/rfi/${rfi.id}`}>View Details</Link>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
