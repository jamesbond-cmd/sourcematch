import { z } from "zod"

export const rfiSchema = z.object({
    // Step 1: Company Details
    companyName: z.string().min(1, "Company name is required"),
    companyWebsite: z.string().url("Please enter a valid company website"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    workEmail: z.string().email("Please enter a valid work email"),
    phone: z.string().min(1, "Phone number is required"),
    country: z.string().min(1, "Country is required"),

    // Step 2: Account Creation (Optional for logged in users)
    password: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
    termsAccepted: z.boolean().optional().refine((val) => val === true || val === undefined, {
        message: "You must accept the terms and conditions",
    }),

    // Step 3: Product Overview
    productName: z.string().min(2, "Product name is required"),
    productDescription: z.string().optional(),

    // Step 4: Requirements
    requirements: z.string().min(10, "Please provide more details about your requirements"),
    // Attachments will be handled separately or as file objects

    // Step 5: Volumes, Markets, Pricing
    estimatedVolume: z.string().min(1, "Estimated volume is required"),
    volumeUnit: z.string().min(1, "Unit is required"),
    targetAnnualVolume: z.string().optional(),
    destinationMarkets: z.array(z.string()).min(1, "Select at least one market"),
    guidancePrice: z.string().optional(),
    budgetType: z.string().optional(),
    timeline: z.string().min(1, "Timeline is required"),

    // Step 6: Review
    rfiConfirmed: z.boolean().refine((val) => val === true, {
        message: "Please confirm the RFI details",
    }),
})

export type RFIFormData = z.infer<typeof rfiSchema>
