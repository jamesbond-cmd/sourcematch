"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editRfiSchema, type EditRFIFormData } from "@/lib/validators/rfi"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { supabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface EditRFIProps {
    rfi: any
}

export function EditRFI({ rfi }: EditRFIProps) {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Map RFI data to form data
    const defaultValues: Partial<EditRFIFormData> = {
        productName: rfi.product_name,
        productDescription: rfi.product_description || "",
        requirements: rfi.requirements,
        estimatedVolume: rfi.estimated_volume,
        volumeUnit: rfi.volume_unit,
        timeline: rfi.timeline,
        destinationMarkets: rfi.destination_markets || [],
        guidancePrice: rfi.target_price || "",
    }

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<EditRFIFormData>({
        resolver: zodResolver(editRfiSchema),
        defaultValues,
    })

    // Watch fields for controlled inputs
    const watchedVolumeUnit = watch("volumeUnit")
    const watchedTimeline = watch("timeline")

    const onSubmit = async (data: EditRFIFormData) => {
        console.log("=== EDIT RFI SUBMISSION STARTED ===")
        console.log("Form data:", data)
        setIsSubmitting(true)
        try {
            await supabaseClient.updateRFI(rfi.id, {
                product_name: data.productName,
                product_description: data.productDescription,
                requirements: data.requirements,
                estimated_volume: data.estimatedVolume,
                volume_unit: data.volumeUnit,
                timeline: data.timeline,
                destination_markets: data.destinationMarkets,
                target_price: data.guidancePrice,
            })

            toast.success("RFI updated successfully")
            router.push(`/rfi/${rfi.id}`)
            router.refresh()
        } catch (error) {
            console.error("Error updating RFI:", error)
            toast.error("Failed to update RFI")
        } finally {
            setIsSubmitting(false)
            console.log("=== EDIT RFI SUBMISSION ENDED ===")
        }
    }

    const onInvalid = (errors: any) => {
        console.error("Form validation failed:", errors)
        toast.error("Please check the form for errors")
    }

    const markets = [
        "United Kingdom", "Germany", "France", "Spain", "Italy",
        "Netherlands", "Poland", "USA", "Canada", "UAE",
        "Australia", "Japan", "China"
    ]
    const selectedMarkets = watch("destinationMarkets") || []

    const [otherMarket, setOtherMarket] = useState("")
    const [isOtherChecked, setIsOtherChecked] = useState(false)

    // Initialize other state
    useEffect(() => {
        if (rfi.destination_markets) {
            const other = rfi.destination_markets.find((m: string) => !markets.includes(m))
            if (other) {
                setIsOtherChecked(true)
                setOtherMarket(other)
            }
        }
    }, [rfi.destination_markets])

    const toggleMarket = (market: string) => {
        const current = new Set(selectedMarkets)

        if (market === "Other") {
            const newChecked = !isOtherChecked
            setIsOtherChecked(newChecked)
            if (!newChecked) {
                if (otherMarket) current.delete(otherMarket)
                setOtherMarket("")
            } else if (otherMarket) {
                current.add(otherMarket)
            }
        } else {
            if (current.has(market)) {
                current.delete(market)
            } else {
                current.add(market)
            }
        }

        setValue("destinationMarkets", Array.from(current), { shouldValidate: true })
    }

    const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setOtherMarket(newValue)

        const current = new Set(selectedMarkets)
        // Remove old custom value
        selectedMarkets.forEach(m => {
            if (!markets.includes(m)) current.delete(m)
        })

        if (newValue) {
            current.add(newValue)
        }

        setValue("destinationMarkets", Array.from(current), { shouldValidate: true })
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" asChild>
                    <Link href={`/rfi/${rfi.id}`}>
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Edit RFI</h1>
                    <p className="text-muted-foreground">Update your sourcing request details</p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-8">
                {/* Product Overview */}
                <Card className="p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Product Overview</h2>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="productName">Product Name</Label>
                            <Input id="productName" {...register("productName")} />
                            {errors.productName && (
                                <p className="text-sm text-red-500">{errors.productName.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="productDescription">Description</Label>
                            <Textarea
                                id="productDescription"
                                {...register("productDescription")}
                                className="min-h-[100px]"
                            />
                        </div>
                    </div>
                </Card>

                {/* Requirements */}
                <Card className="p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Requirements</h2>
                    <div className="grid gap-2">
                        <Label htmlFor="requirements">Detailed Requirements</Label>
                        <Textarea
                            id="requirements"
                            {...register("requirements")}
                            className="min-h-[200px]"
                        />
                        {errors.requirements && (
                            <p className="text-sm text-red-500">{errors.requirements.message}</p>
                        )}
                    </div>
                </Card>

                {/* Volumes & Markets */}
                <Card className="p-6 space-y-6">
                    <h2 className="text-xl font-semibold">Volumes & Markets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="estimatedVolume">Estimated Annual Volume</Label>
                            <Input id="estimatedVolume" {...register("estimatedVolume")} />
                            {errors.estimatedVolume && (
                                <p className="text-sm text-red-500">{errors.estimatedVolume.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="volumeUnit">Unit</Label>
                            <Select
                                onValueChange={(value: string) => setValue("volumeUnit", value, { shouldValidate: true })}
                                value={watchedVolumeUnit}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="units">Units</SelectItem>
                                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                    <SelectItem value="mt">Metric Tonnes (MT)</SelectItem>
                                    <SelectItem value="liters">Liters (L)</SelectItem>
                                    <SelectItem value="pallets">Pallets</SelectItem>
                                    <SelectItem value="containers">Containers (20ft/40ft)</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.volumeUnit && (
                                <p className="text-sm text-red-500">{errors.volumeUnit.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="timeline">Target Timeline</Label>
                            <Input
                                id="timeline"
                                {...register("timeline")}
                                placeholder="e.g. 3-6 months, ASAP"
                            />
                            {errors.timeline && (
                                <p className="text-sm text-red-500">{errors.timeline.message}</p>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="guidancePrice">Guidance Price (Optional)</Label>
                            <Input id="guidancePrice" {...register("guidancePrice")} placeholder="e.g. $5.00/unit" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Destination Markets</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {markets.map((market) => (
                                <div key={market} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`market-${market}`}
                                        checked={selectedMarkets.includes(market)}
                                        onCheckedChange={() => toggleMarket(market)}
                                    />
                                    <Label htmlFor={`market-${market}`} className="font-normal cursor-pointer">
                                        {market}
                                    </Label>
                                </div>
                            ))}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="market-other"
                                    checked={isOtherChecked}
                                    onCheckedChange={() => toggleMarket("Other")}
                                />
                                <Label htmlFor="market-other" className="font-normal cursor-pointer">
                                    Other
                                </Label>
                            </div>
                        </div>

                        {isOtherChecked && (
                            <div className="mt-2">
                                <Input
                                    placeholder="Enter other market"
                                    value={otherMarket}
                                    onChange={handleOtherInputChange}
                                    className="max-w-xs"
                                />
                            </div>
                        )}
                        {errors.destinationMarkets && (
                            <p className="text-sm text-red-500">{errors.destinationMarkets.message}</p>
                        )}
                    </div>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" asChild>
                        <Link href={`/rfi/${rfi.id}`}>Cancel</Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}
