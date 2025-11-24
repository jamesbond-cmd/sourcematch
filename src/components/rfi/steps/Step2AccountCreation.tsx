import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { type RFIFormData } from "@/lib/validators/rfi"

export function Step2AccountCreation() {
    const { register, formState: { errors }, setValue, watch } = useFormContext<RFIFormData>()
    const termsAccepted = watch("termsAccepted")

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
                <p className="text-muted-foreground">
                    Your RFIs and supplier responses will be stored in your personal dashboard.
                </p>
            </div>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="password">Password*</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Minimum 8 characters"
                        {...register("password")}
                    />
                    <p className="text-xs text-muted-foreground">
                        Minimum 8 characters, at least one capital letter and one number.
                    </p>
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                </div>

                <div className="flex items-start space-x-2 pt-4">
                    <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked: boolean | "indeterminate") => setValue("termsAccepted", checked === true, { shouldValidate: true })}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <Label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree to the Terms of Service and Privacy Policy
                        </Label>
                        {errors.termsAccepted && (
                            <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
