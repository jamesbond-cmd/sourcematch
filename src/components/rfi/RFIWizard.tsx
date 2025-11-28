"use client"

import { useState, useEffect, useRef } from "react"
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
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import amplitude from "@/lib/amplitude"

export function RFIWizard() {
    const { user, signUp, signIn, loading } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const isNewRFI = searchParams.get("new") === "true"
    const hasResetRef = useRef(false)

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
        if (loading || currentStep === 7) return

        // Clear storage if starting new RFI (only once)
        if (isNewRFI && !hasResetRef.current) {
            console.log("Starting new RFI, clearing saved data and resetting form")
            hasResetRef.current = true

            // Clear localStorage
            localStorage.removeItem("rfi_wizard_data")
            localStorage.removeItem("rfi_wizard_step")
            localStorage.removeItem("rfi_wizard_owner")

            // Reset the form completely
            methods.reset()

            // Reset state
            setCurrentStep(1)
            setFiles([])
            setIsLoadingProfile(false)
            setIsInitialized(true) // IMPORTANT: Set initialized to show the form

            // Remove the query param to prevent clearing on refresh
            router.replace("/rfi")
            return // Exit early to prevent restoration
        }

        const savedStep = localStorage.getItem("rfi_wizard_step")
        const savedData = localStorage.getItem("rfi_wizard_data")
        const savedOwner = localStorage.getItem("rfi_wizard_owner")
        const currentOwner = user?.id || "guest"

        // Check if the saved data belongs to the current user (or guest session)
        if (savedOwner && savedOwner !== currentOwner) {
            console.log("User changed, clearing saved wizard data")
            localStorage.removeItem("rfi_wizard_data")
            localStorage.removeItem("rfi_wizard_step")
            localStorage.removeItem("rfi_wizard_owner")
            // Do not restore data
        } else if (savedData && !isNewRFI) {
            // Restore form data if owner matches
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
    }, [loading, user, isNewRFI]) // Removed 'methods' from dependencies

    // Save step to localStorage and track step views
    useEffect(() => {
        if (isInitialized && currentStep !== 7) {
            localStorage.setItem("rfi_wizard_step", currentStep.toString())

            // Track step view
            amplitude.track('RFI Step Viewed', {
                step: currentStep,
                stepName: getStepName(currentStep),
                hasCompany,
                isLoggedIn: !!user
            })
        }
    }, [currentStep, isInitialized, hasCompany, user])

    // Helper to get step name for analytics
    const getStepName = (step: number) => {
        if (!user) {
            const steps = ['Company Details', 'Account Creation', 'Product Overview', 'Requirements', 'Volumes & Markets', 'Review']
            return steps[step - 1] || 'Unknown'
        } else if (hasCompany) {
            const steps = ['Product Overview', 'Requirements', 'Volumes & Markets', 'Review']
            return steps[step - 1] || 'Unknown'
        } else {
            const steps = ['Company Details', 'Product Overview', 'Requirements', 'Volumes & Markets', 'Review']
            return steps[step - 1] || 'Unknown'
        }
    }

    // Save form data to localStorage
    useEffect(() => {
        if (isInitialized) {
            const subscription = methods.watch((value) => {
                localStorage.setItem("rfi_wizard_data", JSON.stringify(value))
                localStorage.setItem("rfi_wizard_owner", user?.id || "guest")
            })
            return () => subscription.unsubscribe()
        }
    }, [methods, isInitialized, user])

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
            let rfiId: string | undefined
            let userId: string | undefined

            if (!user) {
                // GUEST FLOW: Use API to create account and RFI securely
                console.log("Guest submission: Calling API...")
                const response = await fetch('/api/rfi/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })

                const result = await response.json()

                if (!response.ok) {
                    throw new Error(result.error || 'Failed to submit RFI')
                }

                console.log("API Submission success:", result)
                rfiId = result.rfiId
                userId = result.userId

                // Auto-login to upload files
                console.log("Auto-logging in...")
                if (data.password) {
                    await signIn(data.workEmail, data.password)
                }
            } else {
                // LOGGED-IN FLOW: Use existing client-side logic
                userId = user.id

                // Step 2: Get or create company
                let companyId: string | undefined
                console.log("Fetching user profile...")
                const profile = await supabaseClient.getProfile(userId)
                companyId = profile?.company_id || undefined

                if (!companyId) {
                    console.log("Creating new company...")
                    const company = await supabaseClient.createCompany({
                        name: data.companyName,
                        website: data.companyWebsite,
                        country: data.country,
                    })
                    companyId = company.id

                    // Update profile with missing details
                    await supabaseClient.supabase
                        .from('profiles')
                        .update({
                            company_id: companyId,
                            first_name: data.firstName,
                            last_name: data.lastName,
                            phone: data.phone,
                            // terms_accepted is usually for new accounts, but we can update it if needed
                        })
                        .eq('id', userId)
                }

                // Step 4: Create RFI
                console.log("Creating RFI...")
                const rfiData = {
                    company_id: companyId!,
                    created_by: userId,
                    product_name: data.productName,
                    requirements: data.requirements,
                    estimated_volume: data.estimatedVolume,
                    annual_volume: data.targetAnnualVolume || data.estimatedVolume,
                    target_price: data.guidancePrice || "",
                    guidance_price: data.guidancePrice || "",
                    timeline: data.timeline,
                    destination_markets: data.destinationMarkets,
                    status: "submitted",
                    ai_status: "pending",
                    product_description: data.productDescription,
                    volume_unit: data.volumeUnit,
                }

                const createdRFI = await supabaseClient.createRFI(rfiData)
                rfiId = createdRFI.id
            }

            // Step 5: Upload attachments if any (Common for both flows)
            if (files.length > 0 && rfiId) {
                console.log(`Uploading ${files.length} files...`)

                for (const file of files) {
                    try {
                        const fileExt = file.name.split('.').pop()
                        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
                        const filePath = `${rfiId}/${fileName}`

                        // Upload file to storage
                        await supabaseClient.uploadFile("attachments", filePath, file)

                        // Get public URL
                        const publicUrl = await supabaseClient.getFileUrl("attachments", filePath)

                        // Create attachment record
                        await supabaseClient.createAttachment({
                            rfi_id: rfiId,
                            file_name: file.name,
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

            // Step 6: Send confirmation emails (don't block submission if emails fail)
            if (rfiId) {
                try {
                    // Send buyer confirmation email
                    await fetch('/api/emails/send-rfi-submitted', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: data.workEmail,
                            firstName: data.firstName,
                            productName: data.productName,
                            rfiId: rfiId,
                            submittedAt: new Date().toISOString(),
                            estimatedVolume: `${data.estimatedVolume} ${data.volumeUnit}`,
                        }),
                    })

                    // Send admin notification email
                    await fetch('/api/emails/send-rfi-received', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            productName: data.productName,
                            rfiId: rfiId,
                            buyerName: `${data.firstName} ${data.lastName || ''}`.trim(),
                            buyerEmail: data.workEmail,
                            buyerCompany: data.companyName,
                            estimatedVolume: `${data.estimatedVolume} ${data.volumeUnit}`,
                            destinationMarkets: data.destinationMarkets,
                        }),
                    })

                    console.log('Confirmation emails sent successfully')
                } catch (emailError) {
                    console.error('Failed to send confirmation emails:', emailError)
                    // Don't throw - email failure shouldn't block RFI submission
                }
            }

            toast.success("RFI submitted successfully!")

            // Track RFI submission
            amplitude.track('RFI Submitted', {
                productName: data.productName,
                hasFiles: files.length > 0,
                fileCount: files.length,
                isNewAccount: !user,
                destinationMarkets: data.destinationMarkets,
                volumeUnit: data.volumeUnit
            })

            // Track account creation if new user
            if (!user) {
                amplitude.track('Account Created', {
                    source: 'RFI Submission',
                    companyName: data.companyName
                })
            }

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
        localStorage.removeItem("rfi_wizard_owner")

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
        <div className="mx-auto max-w-5xl py-12 px-4">
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
