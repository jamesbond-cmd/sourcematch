import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2 } from "lucide-react"
import { type RFIFormData } from "@/lib/validators/rfi"

export function Step3ProductOverview() {
    const { register, formState: { errors }, watch } = useFormContext<RFIFormData>()
    const [isChecking, setIsChecking] = useState(false)
    const [aiFeedback, setAiFeedback] = useState<string | null>(null)

    const productName = watch("productName")
    const productDescription = watch("productDescription")

    const handleAICheck = async () => {
        if (!productName && !productDescription) return

        setIsChecking(true)
        setAiFeedback(null)

        try {
            const response = await fetch("/api/rfi/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_name: productName,
                    product_description: productDescription,
                }),
            })

            if (!response.ok) throw new Error("Failed to check RFI")

            const data = await response.json()

            if (data.key_issues && data.key_issues.length > 0) {
                setAiFeedback(data.key_issues[0]) // Just show the first issue as a hint
            } else {
                setAiFeedback("Great start! Your description looks clear.")
            }
        } catch (error) {
            console.error("AI check failed:", error)
        } finally {
            setIsChecking(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">What are you looking for?</h2>
                <p className="text-muted-foreground">
                    Describe the product you want to source.
                </p>
            </div>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="productName">Product name*</Label>
                    <Input
                        id="productName"
                        placeholder="e.g. Organic Oat Milk"
                        {...register("productName")}
                    />
                    {errors.productName && (
                        <p className="text-sm text-red-500">{errors.productName.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="productDescription">Product description</Label>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-primary hover:bg-transparent hover:text-primary/80"
                            onClick={handleAICheck}
                            disabled={isChecking || (!productName && !productDescription)}
                        >
                            {isChecking ? (
                                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            ) : (
                                <Sparkles className="mr-1 h-3 w-3" />
                            )}
                            Check with AI
                        </Button>
                    </div>
                    <Textarea
                        id="productDescription"
                        placeholder="Describe the product in detail (ingredients, packaging, quality standards)..."
                        className="min-h-[120px]"
                        {...register("productDescription")}
                    />
                    {aiFeedback && (
                        <div className="rounded-md bg-primary/5 p-3 text-sm text-primary">
                            <div className="flex items-start gap-2">
                                <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
                                <p>{aiFeedback}</p>
                            </div>
                        </div>
                    )}
                    {errors.productDescription && (
                        <p className="text-sm text-red-500">{errors.productDescription.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
