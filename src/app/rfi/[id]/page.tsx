"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Package, Clock, FileText, MessageSquare } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { ChatInterface } from "@/components/chat/ChatInterface"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FileUpload } from "@/components/upload/FileUpload"

import { type RFI as BaseRFI } from "@/lib/supabase/client"

interface Attachment {
    id: string
    file_name: string
    file_size: number
    created_at: string
    file_url: string
}

interface RFI extends BaseRFI {
    id: string
    status: string
    created_at: string
    volume_unit: string
    guidance_price: string
    attachments: Attachment[]
    companies: { name: string }
}

export default function RFIDetailsPage() {
    const { id } = useParams()
    const { user, loading } = useAuth()
    const router = useRouter()
    const [rfi, setRfi] = useState<RFI | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isUploadOpen, setIsUploadOpen] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading, router])

    const loadRFI = useCallback(async () => {
        if (!id) return

        try {
            const data = await supabaseClient.getRFIById(id as string)
            if (!data) {
                toast.error("RFI not found")
                router.push("/dashboard")
                return
            }
            setRfi(data as unknown as RFI)
        } catch (error) {
            console.error("Error loading RFI:", error)
            toast.error("Failed to load RFI details")
        } finally {
            setIsLoading(false)
        }
    }, [id, router])

    useEffect(() => {
        if (user && id) {
            loadRFI()
        }
    }, [user, id, loadRFI])

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!rfi) return null

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header */}
            <header className="bg-background border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/dashboard">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold">{rfi.product_name}</h1>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>ID: {rfi.id.slice(0, 8)}</span>
                            <span>•</span>
                            <span>Created {new Date(rfi.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <Badge variant={rfi.status === "submitted" ? "default" : "secondary"} className="capitalize">
                            {rfi.status.replace("_", " ")}
                        </Badge>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Overview Card */}
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Overview</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Package className="h-4 w-4" /> Estimated Volume
                                    </div>
                                    <div className="font-medium">{rfi.estimated_volume} {rfi.volume_unit}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Clock className="h-4 w-4" /> Timeline
                                    </div>
                                    <div className="font-medium">{rfi.timeline}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                        <MapPin className="h-4 w-4" /> Destination Markets
                                    </div>
                                    <div className="font-medium">{rfi.destination_markets?.join(", ")}</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                                        <Calendar className="h-4 w-4" /> Guidance Price
                                    </div>
                                    <div className="font-medium">{rfi.guidance_price || "Not specified"}</div>
                                </div>
                            </div>
                        </Card>

                        {/* Requirements Card */}
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Product Requirements</h2>
                            <div className="prose max-w-none">
                                <p className="whitespace-pre-wrap">{rfi.requirements}</p>
                            </div>
                        </Card>

                        {/* Attachments Card */}
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Attachments</h2>
                                <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">
                                            <FileText className="h-4 w-4 mr-2" />
                                            Upload File
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Upload Document</DialogTitle>
                                        </DialogHeader>
                                        <FileUpload
                                            rfiId={id as string}
                                            onUploadComplete={() => {
                                                setIsUploadOpen(false)
                                                // Call loadRFI from the effect to refresh data
                                                // This will trigger the useEffect again
                                                setRfi(null) // Clear RFI to show loading state again
                                                setIsLoading(true)
                                            }}
                                        />
                                    </DialogContent>
                                </Dialog>
                            </div>
                            {rfi.attachments && rfi.attachments.length > 0 ? (
                                <div className="space-y-2">
                                    {rfi.attachments.map((file: any) => (
                                        <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-muted rounded flex items-center justify-center">
                                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-sm">{file.file_name}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {(file.file_size / 1024 / 1024).toFixed(2)} MB • {new Date(file.created_at).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" asChild>
                                                <a href={file.file_url} target="_blank" rel="noopener noreferrer">Download</a>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground text-sm border-2 border-dashed rounded-lg">
                                    No attachments uploaded yet
                                </div>
                            )}
                        </Card>
                    </div>

                    {/* Sidebar - Chat & Actions */}
                    <div className="space-y-6">
                        <Card className="h-[600px] flex flex-col">
                            <div className="p-4 border-b">
                                <h2 className="font-semibold flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Agent Chat
                                </h2>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <ChatInterface rfiId={id as string} />
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    )
}
