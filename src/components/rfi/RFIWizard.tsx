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
    const [hasCompany, setHasCompany] = useState(false) // Track if user has a company
    const [files, setFiles] = useState<File[]>([]) // Track selected files

    const methods = useForm<RFIFormData>({
        resolver: zodResolver(rfiSchema),
        mode: "onChange",
    })

    // Handle initialization and persistence
    useEffect(() => {
        if (loading) return

        const savedStep = localStorage.getItem("rfi_wizard_step")
        const savedData = localStorage.getItem("rfi_wizard_data")

        // Restore form data first
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

        // If user is logged in, fetch profile data
        if (user) {
            setIsLoadingProfile(true)
            const loadUserData = async () => {
                try {
                    // Fetch user profile
                    const profile = await supabaseClient.getProfile(user.id)
                    console.log("Loaded profile:", profile)

                    if (profile) {
                        // Pre-populate form with user data
                        const fullName = profile.full_name || user.email?.split('@')[0] || ''
                        const [firstName, ...lastNameParts] = fullName.split(' ')

                        methods.setValue('firstName', firstName || 'User')
                        methods.setValue('lastName', lastNameParts.join(' ') || '')
                        methods.setValue('workEmail', profile.email || user.email || '')

                        console.log("Set form values - firstName:", firstName, "lastName:", lastNameParts.join(' '))

                        // Fetch company data if user has a company
                        if (profile.company_id) {
                            const { data: company } = await supabaseClient.supabase
                                .from('companies')
                                .select('*')
                                .eq('id', profile.company_id)
                                .single()

                            if (company) {
                                setHasCompany(true) // User has a company
                                methods.setValue('companyName', company.name || '')
                                methods.setValue('companyWebsite', company.website || '')
                                methods.setValue('country', company.country || '')
                            }
                        }
                    }
                } catch (error) {
                    console.log('No profile found for user, will create on RFI submission')
                    if (user.email) {
                        methods.setValue('workEmail', user.email)
                        // Set basic name from email
                        const emailName = user.email.split('@')[0]
                        methods.setValue('firstName', emailName)
                    }
                } finally {
                    setIsLoadingProfile(false)

                    // Determine correct starting step AFTER we know if user has company
                    let step = 1
                    if (savedStep) {
                        step = parseInt(savedStep)
                    } else if (user) {
                        // If user has company, skip to product step (step 2), otherwise start at company step (step 1)
                        step = hasCompany ? 2 : 1
                    }

                    setCurrentStep(step)
                    setIsInitialized(true)
                }
            }
            loadUserData()
        } else {
            setIsLoadingProfile(false)
            // For non-logged-in users, start at step 1
            const step = savedStep ? parseInt(savedStep) : 1
            setCurrentStep(step)
            setIsInitialized(true)
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

    // Helper to get the actual step mapping based on user state
    const getStepMapping = () => {
        if (!user) {
            // Non-logged-in: 1=Company, 2=Account, 3=Product, 4=Requirements, 5=Volumes, 6=Review
            return { maxStep: 6, hasCompanyStep: true, hasAccountStep: true }
        } else if (hasCompany) {
            // Logged-in with company: 1=Product, 2=Requirements, 3=Volumes, 4=Review
            return { maxStep: 4, hasCompanyStep: false, hasAccountStep: false }
        } else {
            // Logged-in without company: 1=Company, 2=Product, 3=Requirements, 4=Volumes, 5=Review
            return { maxStep: 5, hasCompanyStep: true, hasAccountStep: false }
        }
    }

    const nextStep = async () => {
        const mapping = getStepMapping()

        // Validate current step fields before moving
        let fieldsToValidate: (keyof RFIFormData)[] = []

        // Determine which fields to validate based on actual step content
        if (!user) {
            // Non-logged-in user flow
            switch (currentStep) {
                case 1: fieldsToValidate = ["companyName"]; break
                case 2: fieldsToValidate = ["firstName", "lastName", "workEmail", "password", "termsAccepted"]; break
                case 3: fieldsToValidate = ["productName"]; break
                case 4: fieldsToValidate = ["requirements"]; break
                case 5: fieldsToValidate = ["estimatedVolume", "volumeUnit", "destinationMarkets", "timeline"]; break
                case 6: fieldsToValidate = ["rfiConfirmed"]; break
            }
        } else if (hasCompany) {
            // Logged-in with company: skip company step
            switch (currentStep) {
                case 1: fieldsToValidate = ["productName"]; break
                case 2: fieldsToValidate = ["requirements"]; break
                case 3: fieldsToValidate = ["estimatedVolume", "volumeUnit", "destinationMarkets", "timeline"]; break
                case 4: fieldsToValidate = ["rfiConfirmed"]; break
            }
        } else {
            // Logged-in without company: show company step
            switch (currentStep) {
                case 1: fieldsToValidate = ["companyName"]; break
                case 2: fieldsToValidate = ["productName"]; break
                case 3: fieldsToValidate = ["requirements"]; break
                case 4: fieldsToValidate = ["estimatedVolume", "volumeUnit", "destinationMarkets", "timeline"]; break
                case 5: fieldsToValidate = ["rfiConfirmed"]; break
            }
        }

        const isValid = await methods.trigger(fieldsToValidate)
        if (isValid && currentStep < mapping.maxStep) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1)
        }
    }

    const onSubmit = async (data: RFIFormData) => {
        console.log("=== RFI SUBMISSION STARTED ===")
        console.log("Form data:", data)
        console.log("Current user:", user)

        setIsSubmitting(true)
        try {
            // Step 1: Get or create user account
            let userId = user?.id
            if (!userId) {
                console.log("Creating new user account...")
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
                console.log("New user created:", userId)
            } else {
                console.log("Using existing user:", userId)
            }

            if (!userId) throw new Error("Failed to create user account")

            // Step 2: Get or create company
            let companyId: string | undefined

            if (user) {
                // User is logged in, fetch their profile to get company_id
                console.log("Fetching user profile...")
                const profile = await supabaseClient.getProfile(userId)
                companyId = profile?.company_id || undefined
                console.log("Profile company_id:", companyId)
            }

            // Create company if user doesn't have one
            if (!companyId) {
                console.log("Creating new company...")
                const company = await supabaseClient.createCompany({
                    name: data.companyName,
                    website: data.companyWebsite,
                    country: data.country,
                })
                companyId = company.id
                console.log("Company created:", companyId)

                // Update profile with company_id if user already exists
                if (user) {
                    console.log("Updating profile with company_id...")
                    await supabaseClient.supabase
                        .from('profiles')
                        .update({ company_id: companyId })
                        .eq('id', userId)
                }
            }

            // Step 3: Create or update profile (only for new users, existing users already have profile via trigger)
            if (!user) {
                console.log("Creating new profile...")
                await supabaseClient.createProfile({
                    id: userId,
                    email: data.workEmail,
                    full_name: `${data.firstName} ${data.lastName}`,
                    role: "buyer",
                    company_id: companyId,
                })
            }

            // Step 4: Create RFI
            console.log("Creating RFI...")
            const rfiData = {
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
            }
            console.log("RFI data:", rfiData)

            const createdRFI = await supabaseClient.createRFI(rfiData)
            console.log("RFI created successfully:", createdRFI)

            // Step 5: Upload attachments if any
            if (files.length > 0 && createdRFI.id) {
                console.log(`Uploading ${files.length} files...`)

                for (const file of files) {
                    try {
                        const fileExt = file.name.split('.').pop()
                        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
                        const filePath = `${createdRFI.id}/${fileName}`

                        // Upload file to storage
                        await supabaseClient.uploadFile("rfi-attachments", filePath, file)

                        // Get public URL
                        const publicUrl = await supabaseClient.getFileUrl("rfi-attachments", filePath)

                        // Create attachment record
                        await supabaseClient.createAttachment({
                            rfi_id: createdRFI.id,
                            file_name: file.name,
                            file_path: filePath,
                            file_size: file.size,
                            file_type: file.type,
                            file_url: publicUrl
                        })
                        console.log(`Uploaded ${file.name}`)
                    } catch (uploadError) {
                        console.error(`Failed to upload file ${file.name}:`, uploadError)
                        // Continue with other files even if one fails
                    }
                }
            }

            toast.success("RFI submitted successfully!")
            // Clear saved data
            localStorage.removeItem("rfi_wizard_data")
            localStorage.removeItem("rfi_wizard_step")
            // Success! Move to dashboard
            console.log("Moving to step 7 (success page)")
            setCurrentStep(7)
        } catch (error) {
            console.error("=== RFI SUBMISSION ERROR ===")
            console.error("Error details:", error)
            console.error("Error message:", error instanceof Error ? error.message : String(error))
            toast.error(error instanceof Error ? error.message : "Failed to submit RFI. Please try again.")
        } finally {
            setIsSubmitting(false)
            console.log("=== RFI SUBMISSION ENDED ===")
        }
    }

    const resetWizard = () => {
        // Clear saved data
        localStorage.removeItem("rfi_wizard_data")
        localStorage.removeItem("rfi_wizard_step")

        // Reset form
        methods.reset()

        // Reset state
        setCurrentStep(hasCompany ? 1 : 1) // Will be recalculated in useEffect
        setIsSubmitting(false)
        setFiles([]) // Clear files

        // Trigger re-initialization
        setIsInitialized(false)

        // Re-run initialization after a brief delay
        setTimeout(() => {
            setIsInitialized(true)
        }, 100)
    }

    // If we are on the dashboard step, render full width without the card wrapper/progress bar
    if (currentStep === 7) {
        return <Step7Dashboard onReset={resetWizard} />
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

    // Calculate step numbers for display based on user state
    const mapping = getStepMapping()
    const totalSteps = mapping.maxStep
    const displayStep = currentStep
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
                        {/* Wizard Steps - render based on user state and current step */}
                        {!user && (
                            <>
                                {currentStep === 1 && <Step1CompanyDetails />}
                                {currentStep === 2 && <Step2AccountCreation />}
                                {currentStep === 3 && <Step3ProductOverview />}
                                {currentStep === 4 && <Step4Requirements selectedFiles={files} onFilesChange={setFiles} />}
                                {currentStep === 5 && <Step5Volumes />}
                                {currentStep === 6 && <Step6Review />}
                            </>
                        )}
                        {user && hasCompany && (
                            <>
                                {currentStep === 1 && <Step3ProductOverview />}
                                {currentStep === 2 && <Step4Requirements selectedFiles={files} onFilesChange={setFiles} />}
                                {currentStep === 3 && <Step5Volumes />}
                                {currentStep === 4 && <Step6Review />}
                            </>
                        )}
                        {user && !hasCompany && (
                            <>
                                {currentStep === 1 && <Step1CompanyDetails />}
                                {currentStep === 2 && <Step3ProductOverview />}
                                {currentStep === 3 && <Step4Requirements selectedFiles={files} onFilesChange={setFiles} />}
                                {currentStep === 4 && <Step5Volumes />}
                                {currentStep === 5 && <Step6Review />}
                            </>
                        )}

                        <div className="flex justify-between pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`${currentStep === 1 ? "invisible" : ""} h-11 px-6`}
                            >
                                ← Back
                            </Button>
                            <Button
                                type="button"
                                onClick={() => {
                                    console.log("=== SUBMIT BUTTON CLICKED ===")
                                    console.log("Current step:", currentStep)
                                    console.log("Max step:", getStepMapping().maxStep)
                                    console.log("Is submitting:", isSubmitting)
                                    console.log("Form errors:", methods.formState.errors)
                                    console.log("Form values:", methods.getValues())

                                    if (currentStep === getStepMapping().maxStep) {
                                        console.log("Calling handleSubmit...")
                                        methods.handleSubmit(
                                            (data) => {
                                                console.log("Form validation passed, calling onSubmit")
                                                onSubmit(data)
                                            },
                                            (errors) => {
                                                console.error("Form validation FAILED:", errors)
                                            }
                                        )()
                                    } else {
                                        nextStep()
                                    }
                                }}
                                disabled={isSubmitting}
                                className="h-11 px-8 shadow-md hover:shadow-lg transition-all"
                            >
                                {currentStep === getStepMapping().maxStep ? (
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
