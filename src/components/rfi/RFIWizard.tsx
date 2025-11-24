"use client"

import { useState, useEffect } from "react"
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
    const { user, signUp, loading } = useAuth()
    const router = useRouter()

    // Initialize state from localStorage if available, otherwise default based on auth
    const [currentStep, setCurrentStep] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoadingProfile, setIsLoadingProfile] = useState(true)
    const [isInitialized, setIsInitialized] = useState(false)

    const methods = useForm<RFIFormData>({
        resolver: zodResolver(rfiSchema),
        mode: "onChange",
    })

    // Handle initialization and persistence
    useEffect(() => {
        if (loading) return

        const savedStep = localStorage.getItem("rfi_wizard_step")
        const savedData = localStorage.getItem("rfi_wizard_data")

        // Determine correct starting step
        let step = 1
        if (savedStep) {
            step = parseInt(savedStep)
        } else if (user) {
            step = 3
        }

        // Ensure logged-in users don't see steps 1-2
        if (user && step < 3) {
            step = 3
        }

        setCurrentStep(step)

        // Restore form data
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData)
                if (parsedData) {
                    Object.keys(parsedData).forEach((key) => {
                        const fieldKey = key as keyof RFIFormData
                        const currentValue = methods.getValues(fieldKey)
                        if (!currentValue || currentValue === "") {
                            methods.setValue(fieldKey, parsedData[key])
                        }
                    })
                }
            } catch (e) {
                console.error("Failed to parse saved wizard data", e)
            }
        }

        setIsInitialized(true)

        // If user is logged in, fetch profile data
        if (user) {
            setIsLoadingProfile(true)
            const loadUserData = async () => {
                try {
                    // Fetch user profile
                    const profile = await supabaseClient.getProfile(user.id)

                    if (profile) {
                        // Pre-populate form with user data
                        const [firstName, ...lastNameParts] = (profile.full_name || '').split(' ')
                        methods.setValue('firstName', firstName || '')
                        methods.setValue('lastName', lastNameParts.join(' ') || '')
                        methods.setValue('workEmail', profile.email || user.email || '')

                        // Fetch company data if user has a company
                        if (profile.company_id) {
                            const { data: company } = await supabaseClient.supabase
                                .from('companies')
                                .select('*')
                                .eq('id', profile.company_id)
                                .single()

                            if (company) {
                                methods.setValue('companyName', company.name || '')
                                methods.setValue('companyWebsite', company.website || '')
                                methods.setValue('country', company.country || '')
                            }
                        }
                    }
                } catch (error) { // Changed from profileError to error
                    console.log('No profile found for user, will create on RFI submission')
                    if (user.email) {
                        methods.setValue('workEmail', user.email)
                    }
                } finally {
                    setIsLoadingProfile(false)
                }
            }
            loadUserData()
        } else {
            setIsLoadingProfile(false)
        }
    }, [loading, user, methods])

    // Save step to localStorage
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("rfi_wizard_step", currentStep.toString())
        }
    }, [currentStep, isInitialized])

    // Save form data to localStorage
    useEffect(() => {
        if (isInitialized) {
            const subscription = methods.watch((value) => {
                localStorage.setItem("rfi_wizard_data", JSON.stringify(value))
            })
            return () => subscription.unsubscribe()
        }
    }, [methods, isInitialized])

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
        // Don't go back past step 3 if user is logged in
        const minStep = user ? 3 : 1
        if (currentStep > minStep) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const onSubmit = async (data: RFIFormData) => {
        setIsSubmitting(true)
        try {
            // Step 1: Get or create user account
            let userId = user?.id
            if (!userId) {
                if (!data.password) {
                    throw new Error("Password is required for new account creation")
                }
                await signUp(data.workEmail, data.password, {
                    full_name: `${data.firstName} ${data.lastName}`,
                })
                // Get the newly created user
                const { createClient } = await import("@/lib/supabase/client")
                const supabase = createClient()
                const { data: { user: newUser } } = await supabase.auth.getUser()
                userId = newUser?.id
            }

            if (!userId) throw new Error("Failed to create user account")

            // Step 2: Get or create company
            let companyId: string | undefined

            if (user) {
                // User is logged in, fetch their profile to get company_id
                const profile = await supabaseClient.getProfile(userId)
                companyId = profile?.company_id || undefined
            }

            // Create company if user doesn't have one
            if (!companyId) {
                const company = await supabaseClient.createCompany({
                    name: data.companyName,
                    website: data.companyWebsite,
                    country: data.country,
                })
                companyId = company.id

                // Update profile with company_id if user already exists
                if (user) {
                    await supabaseClient.supabase
                        .from('profiles')
                        .update({ company_id: companyId })
                        .eq('id', userId)
                }
            }

            // Step 3: Create or update profile (only for new users, existing users already have profile via trigger)
            if (!user) {
                await supabaseClient.createProfile({
                    id: userId,
                    email: data.workEmail,
                    full_name: `${data.firstName} ${data.lastName}`,
                    role: "buyer",
                    company_id: companyId,
                })
            }

            // Step 4: Create RFI
            await supabaseClient.createRFI({
                company_id: companyId!,
                created_by: userId,
                product_name: data.productName,
                requirements: data.requirements,
                estimated_volume: data.estimatedVolume,
                target_price: data.guidancePrice || "",
                timeline: data.timeline,
                destination_markets: data.destinationMarkets,
                status: "submitted",
                ai_status: "pending",
                product_description: data.productDescription,
                volume_unit: data.volumeUnit,
            })

            toast.success("RFI submitted successfully!")
            // Clear saved data
            localStorage.removeItem("rfi_wizard_data")
            localStorage.removeItem("rfi_wizard_step")
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

    // Show loading state while initializing or fetching profile data
    if (!isInitialized || loading || (user && isLoadingProfile)) {
        return (
            <div className="mx-auto max-w-3xl py-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    // Calculate step numbers for display (logged-in users skip steps 1-2)
    const totalSteps = user ? 4 : 6 // Steps 3-6 for logged in, 1-6 for new users
    const displayStep = user ? currentStep - 2 : currentStep // Adjust display for logged-in users
    const progressPercent = (displayStep / totalSteps) * 100

    return (
        <div className="mx-auto max-w-3xl py-12 px-4">
            {/* Progress Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h2 className="text-2xl font-bold">Submit an RFI</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Step {displayStep} of {totalSteps}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{Math.round(progressPercent)}%</div>
                        <p className="text-xs text-muted-foreground">Complete</p>
                    </div>
                </div>
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                        className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out shadow-sm"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            {/* Form Card */}
            <Card className="p-8 md:p-10 shadow-lg border-2">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
                        {!user && currentStep === 1 && <Step1CompanyDetails />}
                        {!user && currentStep === 2 && <Step2AccountCreation />}
                        {currentStep === 3 && <Step3ProductOverview />}
                        {currentStep === 4 && <Step4Requirements />}
                        {currentStep === 5 && <Step5Volumes />}
                        {currentStep === 6 && <Step6Review />}

                        <div className="flex justify-between pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === (user ? 3 : 1)}
                                className={`${currentStep === (user ? 3 : 1) ? "invisible" : ""} h-11 px-6`}
                            >
                                ← Back
                            </Button>
                            <Button
                                type="button"
                                onClick={currentStep === 6 ? methods.handleSubmit(onSubmit) : nextStep}
                                disabled={isSubmitting}
                                className="h-11 px-8 shadow-md hover:shadow-lg transition-all"
                            >
                                {currentStep === 6 ? (
                                    isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                            Submitting...
                                        </>
                                    ) : (
                                        "Submit RFI →"
                                    )
                                ) : (
                                    "Continue →"
                                )}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}
