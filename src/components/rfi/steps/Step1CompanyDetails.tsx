import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type RFIFormData } from "@/lib/validators/rfi"

export function Step1CompanyDetails() {
    const { register, formState: { errors } } = useFormContext<RFIFormData>()

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">Tell us about your company</h2>
                <p className="text-muted-foreground">
                    We use this information only to contact you and to present your RFI to manufacturers.
                </p>
            </div>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="companyName">Company name*</Label>
                    <Input
                        id="companyName"
                        placeholder="e.g. Acme Foods Ltd."
                        {...register("companyName")}
                    />
                    {errors.companyName && (
                        <p className="text-sm text-red-500">{errors.companyName.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="companyWebsite">Company website*</Label>
                    <Input
                        id="companyWebsite"
                        placeholder="e.g. www.acmefoods.com"
                        {...register("companyWebsite")}
                    />
                    {errors.companyWebsite && (
                        <p className="text-sm text-red-500">{errors.companyWebsite.message}</p>
                    )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="firstName">First name*</Label>
                        <Input
                            id="firstName"
                            placeholder="John"
                            {...register("firstName")}
                        />
                        {errors.firstName && (
                            <p className="text-sm text-red-500">{errors.firstName.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastName">Last name*</Label>
                        <Input
                            id="lastName"
                            placeholder="Doe"
                            {...register("lastName")}
                        />
                        {errors.lastName && (
                            <p className="text-sm text-red-500">{errors.lastName.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="workEmail">Work email*</Label>
                    <Input
                        id="workEmail"
                        type="email"
                        placeholder="john@acmefoods.com"
                        {...register("workEmail")}
                    />
                    {errors.workEmail && (
                        <p className="text-sm text-red-500">{errors.workEmail.message}</p>
                    )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone number*</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+44 7700 900000"
                            {...register("phone")}
                        />
                        {errors.phone && (
                            <p className="text-sm text-red-500">{errors.phone.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="country">Country*</Label>
                        <Input
                            id="country"
                            placeholder="e.g. United Kingdom"
                            {...register("country")}
                        />
                        {errors.country && (
                            <p className="text-sm text-red-500">{errors.country.message}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
