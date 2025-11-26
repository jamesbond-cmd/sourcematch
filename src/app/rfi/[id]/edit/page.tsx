"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabaseClient } from "@/lib/supabase/client"
import { EditRFI } from "@/components/rfi/EditRFI"
import { toast } from "sonner"
import { HubSpot } from "@/components/HubSpot"

export default function EditRFIPage() {
    const { id } = useParams()
    const { user, loading } = useAuth()
    const router = useRouter()
    const [rfiData, setRfiData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading, router])

    useEffect(() => {
        const loadRFI = async () => {
            if (!id || !user) return

            try {
                const data = await supabaseClient.getRFIById(id as string)
                if (!data) {
                    toast.error("RFI not found")
                    router.push("/dashboard")
                    return
                }

                // Check ownership
                if (data.created_by !== user.id) {
                    toast.error("You don't have permission to edit this RFI")
                    router.push("/dashboard")
                    return
                }

                setRfiData(data)
            } catch (error) {
                console.error("Error loading RFI:", error)
                toast.error("Failed to load RFI details")
            } finally {
                setIsLoading(false)
            }
        }

        loadRFI()
    }, [id, user, router])

    if (loading || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!rfiData) return null

    return (
        <div className="min-h-screen bg-muted/30 py-8">
            <HubSpot />
            <div className="container mx-auto px-4">
                <EditRFI rfi={rfiData} />
            </div>
        </div>
    )
}
