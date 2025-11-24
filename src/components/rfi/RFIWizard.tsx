"use client"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { rfiSchema, type RFIFormData } from "@/lib/validators/rfi"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Step1CompanyDetails } from "./steps/Step1CompanyDetails"
import { Step2AccountCreation } from "./steps/Step2AccountCreation"
import { Step3ProductOverview } from "./steps/Step3ProductOverview"
import { Step4Requirements } from "./steps/Step4Requirements"
import { Step5Volumes } from "./steps/Step5Volumes"
import { Step6Review } from "./steps/Step6Review"
import { Step7Dashboard } from "@/components/rfi/steps/Step7Dashboard"
import { useAuth } from "@/contexts/AuthContext"
import { supabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function RFIWizard() {
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { user, signUp } = useAuth()
    const router = useRouter()
    const methods = useForm<RFIFormData>({
        resolver: zodResolver(rfiSchema),
        mode: "onChange",
    })

    const nextStep = async () => {
        // Validate current step fields before moving
        let fieldsToValidate: (keyof RFIFormData)[] = []

        switch (currentStep) {
            case 1:
                fieldsToValidate = ["companyName", "companyWebsite", "firstName", "lastName", "workEmail", "phone", "country"]
                break
            case 2:
                fieldsToValidate = ["password", "termsAccepted"]
                break
            case 3:
                fieldsToValidate = ["productName"]
                break
            case 4:
                fieldsToValidate = ["requirements"]
                break
            case 5:
                fieldsToValidate = ["estimatedVolume", "volumeUnit", "destinationMarkets", "timeline"]
                break
            case 6:
                fieldsToValidate = ["rfiConfirmed"]
                break
        }

        const isValid = await methods.trigger(fieldsToValidate)
        if (isValid) {
            if (currentStep < 7) {
                setCurrentStep((prev) => prev + 1)
            }
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const onSubmit = async (data: RFIFormData) => {
        setIsSubmitting(true)
        try {
            // Step 1: Create user account if not logged in
            let userId = user?.id
            if (!userId) {
                await signUp(data.workEmail, data.password, {
                    first_name: data.firstName,
                    last_name: data.lastName,
                    phone: data.phone,
                })
                // Get the newly created user
                const { createClient } = await import("@/lib/supabase/client")
                const supabase = createClient()
                const { data: { user: newUser } } = await supabase.auth.getUser()
                userId = newUser?.id
            }

            if (!userId) throw new Error("Failed to create user account")

            // Step 2: Create company
            const company = await supabaseClient.createCompany({
                name: data.companyName,
                website: data.companyWebsite,
                country: data.country,
            })

            // Step 3: Create or update profile
            await supabaseClient.createProfile({
                id: userId,
                email: data.workEmail,
                full_name: `${data.firstName} ${data.lastName}`,
                role: "buyer",
                company_id: company.id,
            })

            // Step 4: Create RFI
            await supabaseClient.createRFI({
                company_id: company.id,
                created_by: userId,
                product_name: data.productName,
                requirements: data.requirements,
                estimated_volume: data.estimatedVolume,
                target_price: data.guidancePrice || "",
                timeline: data.timeline,
                destination_markets: data.destinationMarkets,
                status: "submitted",
                ai_status: "pending",
                // Additional fields that might be in the form but not in the interface strict definition
                // can be added if the interface allows [key: string]: any
                product_description: data.productDescription,
                volume_unit: data.volumeUnit,
            })

            toast.success("RFI submitted successfully!")
            // Success! Move to dashboard
            setCurrentStep(7)
        } catch (error) {
            console.error("Error submitting RFI:", error)
            toast.error("Failed to submit RFI. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // If we are on the dashboard step, render full width without the card wrapper/progress bar
    if (currentStep === 7) {
        return <Step7Dashboard />
    }

    return (
        <div className="mx-auto max-w-3xl py-12">
            <div className="mb-8">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Step {currentStep} of 6</span>
                    <span>{Math.round((currentStep / 6) * 100)}% completed</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                        className="h-full bg-primary transition-all duration-300 ease-in-out"
                        style={{ width: `${(currentStep / 6) * 100}%` }}
                    />
                </div>
            </div>

            <Card className="p-6 md:p-8">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
                        {currentStep === 1 && <Step1CompanyDetails />}
                        {currentStep === 2 && <Step2AccountCreation />}
                        {currentStep === 3 && <Step3ProductOverview />}
                        {currentStep === 4 && <Step4Requirements />}
                        {currentStep === 5 && <Step5Volumes />}
                        {currentStep === 6 && <Step6Review />}

                        <div className="flex justify-between pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={currentStep === 1 ? "invisible" : ""}
                            >
                                Back
                            </Button>
                            <Button
                                type="button"
                                onClick={currentStep === 6 ? methods.handleSubmit(onSubmit) : nextStep}
                                disabled={isSubmitting}
                            >
                                {currentStep === 6 ? (isSubmitting ? "Submitting..." : "Submit RFI") : "Continue"}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}
