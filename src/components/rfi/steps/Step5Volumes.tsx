import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { type RFIFormData } from "@/lib/validators/rfi"

export function Step5Volumes() {
    const { register, formState: { errors }, watch, setValue } = useFormContext<RFIFormData>()
    const destinationMarkets = watch("destinationMarkets") || []

    const handleMarketChange = (market: string, checked: boolean) => {
        const current = new Set(destinationMarkets)
        if (checked) {
            current.add(market)
        } else {
            current.delete(market)
        }
        setValue("destinationMarkets", Array.from(current), { shouldValidate: true })
    }

    const markets = [
        "United Kingdom", "Germany", "France", "Spain", "Italy",
        "Netherlands", "Poland", "USA", "Canada", "UAE"
    ]

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">Volumes & Markets</h2>
                <p className="text-muted-foreground">
                    Help suppliers understand the scale of the opportunity.
                </p>
            </div>

            <div className="grid gap-6">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="estimatedVolume">Estimated Annual Volume*</Label>
                        <Input
                            id="estimatedVolume"
                            placeholder="e.g. 50,000"
                            {...register("estimatedVolume")}
                        />
                        {errors.estimatedVolume && (
                            <p className="text-sm text-red-500">{errors.estimatedVolume.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="volumeUnit">Unit*</Label>
                        <select
                            id="volumeUnit"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...register("volumeUnit")}
                        >
                            <option value="">Select unit</option>
                            <option value="units">Units</option>
                            <option value="kg">Kilograms</option>
                            <option value="liters">Liters</option>
                            <option value="pallets">Pallets</option>
                        </select>
                        {errors.volumeUnit && (
                            <p className="text-sm text-red-500">{errors.volumeUnit.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label>Destination Markets*</Label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {markets.map((market) => (
                            <div key={market} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`market-${market}`}
                                    checked={destinationMarkets.includes(market)}
                                    onCheckedChange={(checked) => handleMarketChange(market, checked === true)}
                                />
                                <Label htmlFor={`market-${market}`} className="font-normal cursor-pointer">
                                    {market}
                                </Label>
                            </div>
                        ))}
                    </div>
                    {errors.destinationMarkets && (
                        <p className="text-sm text-red-500">{errors.destinationMarkets.message}</p>
                    )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="guidancePrice">Guidance price (optional)</Label>
                        <Input
                            id="guidancePrice"
                            placeholder="e.g. up to €2.50 per unit ex works"
                            {...register("guidancePrice")}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="budgetType">Budget Type</Label>
                        <select
                            id="budgetType"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...register("budgetType")}
                        >
                            <option value="open">Open to offers</option>
                            <option value="target">Have a price target</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="timeline">Timeline *</Label>
                    <Input
                        id="timeline"
                        placeholder="When would you like to launch or receive the first shipment?"
                        {...register("timeline")}
                    />
                    {errors.timeline && (
                        <p className="text-sm text-red-500">{errors.timeline.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
