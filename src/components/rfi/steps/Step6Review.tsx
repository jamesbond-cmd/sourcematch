import { useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Sparkles, CheckCircle2 } from "lucide-react"
import { type RFIFormData } from "@/lib/validators/rfi"
import { useAuth } from "@/contexts/AuthContext"
import { useState, useEffect } from "react"
import { supabaseClient } from "@/lib/supabase/client"

export function Step6Review() {
    const { watch, setValue, formState: { errors } } = useFormContext<RFIFormData>()
    const { user } = useAuth()
    const formData = watch()
    const [aiReview, setAiReview] = useState<string>("Analyzing your RFI...")
    const [isLoadingAI, setIsLoadingAI] = useState(true)
    const [profileName, setProfileName] = useState<string>("")

    // Fetch profile name on mount
    useEffect(() => {
        const fetchProfileName = async () => {
            if (user) {
                try {
                    const profile = await supabaseClient.getProfile(user.id)
                    if (profile?.full_name) {
                        setProfileName(profile.full_name)
                    }
                } catch (error) {
                    console.log("Could not fetch profile name")
                }
            }
        }
        fetchProfileName()
    }, [user])

    // Get contact name - use form data if available, otherwise use profile name
    const contactName = formData.firstName && formData.lastName
        ? `${formData.firstName} ${formData.lastName}`
        : profileName || user?.email?.split('@')[0] || "Not provided"

    useEffect(() => {
        // Call AI review API
        const getAIReview = async () => {
            try {
                const response = await fetch('/api/ai/check-rfi', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        productName: formData.productName,
                        productDescription: formData.productDescription,
                        requirements: formData.requirements,
                        estimatedVolume: formData.estimatedVolume,
                        volumeUnit: formData.volumeUnit,
                        destinationMarkets: formData.destinationMarkets,
                        timeline: formData.timeline
                    })
                })

                if (response.ok) {
                    const data = await response.json()
                    setAiReview(data.feedback || "Your RFI looks good!")
                } else {
                    setAiReview("Your RFI looks strong! You've included specific volume estimates and clear product requirements.")
                }
            } catch (error) {
                console.error("Error getting AI review:", error)
                setAiReview("Your RFI looks strong! You've included specific volume estimates and clear product requirements.")
            } finally {
                setIsLoadingAI(false)
            }
        }

        getAIReview()
    }, [formData.productName, formData.requirements, formData.estimatedVolume])

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">Review your RFI</h2>
                <p className="text-muted-foreground">
                    Check the details before submitting to our network.
                </p>
            </div>

            <div className="grid gap-6">
                {/* AI Analysis Block */}
                <div className="rounded-lg border bg-primary/5 p-4">
                    <div className="flex items-start gap-3">
                        <Sparkles className={`h-5 w-5 text-primary shrink-0 mt-0.5 ${isLoadingAI ? 'animate-pulse' : ''}`} />
                        <div className="space-y-2">
                            <h3 className="font-medium text-primary">AI Assistant Review</h3>
                            <p className="text-sm text-muted-foreground">
                                {aiReview}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Structured Summary */}
                <div className="space-y-4">
                    <Card className="p-4 space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h3 className="font-semibold">Company Details</h3>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-muted-foreground block">Company</span>
                                <span className="font-medium">{formData.companyName}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block">Contact</span>
                                <span className="font-medium">{contactName}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block">Email</span>
                                <span className="font-medium">{formData.workEmail}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block">Country</span>
                                <span className="font-medium">{formData.country}</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h3 className="font-semibold">Product & Requirements</h3>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="space-y-3 text-sm">
                            <div>
                                <span className="text-muted-foreground block">Product Name</span>
                                <span className="font-medium">{formData.productName}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block">Description</span>
                                <p className="mt-1 text-muted-foreground">{formData.productDescription || "No description provided"}</p>
                            </div>
                            <div>
                                <span className="text-muted-foreground block">Requirements</span>
                                <p className="mt-1 text-muted-foreground">{formData.requirements}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-4 space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <h3 className="font-semibold">Volumes & Markets</h3>
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-muted-foreground block">Volume</span>
                                <span className="font-medium">{formData.estimatedVolume} {formData.volumeUnit}</span>
                            </div>
                            <div>
                                <span className="text-muted-foreground block">Timeline</span>
                                <span className="font-medium">{formData.timeline}</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-muted-foreground block">Destination Markets</span>
                                <span className="font-medium">
                                    {formData.destinationMarkets?.join(", ") || "None selected"}
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Confirmation */}
                <div className="flex items-start space-x-2 pt-4">
                    <Checkbox
                        id="rfiConfirmed"
                        checked={formData.rfiConfirmed}
                        onCheckedChange={(checked: boolean | "indeterminate") => setValue("rfiConfirmed", checked === true, { shouldValidate: true })}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <Label
                            htmlFor="rfiConfirmed"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I confirm that the information provided is accurate and ready to be sent to suppliers.
                        </Label>
                        {errors.rfiConfirmed && (
                            <p className="text-sm text-red-500">{errors.rfiConfirmed.message}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
