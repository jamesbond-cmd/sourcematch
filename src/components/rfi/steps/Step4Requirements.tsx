import { useFormContext } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FileText, AlertCircle, Upload, X } from "lucide-react"
import { type RFIFormData } from "@/lib/validators/rfi"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"

export function Step4Requirements() {
    const { register, formState: { errors } } = useFormContext<RFIFormData>()
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files)
            setSelectedFiles(prev => [...prev, ...newFiles])
        }
    }

    const handleRemoveFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold tracking-tight">Detailed Requirements</h2>
                <p className="text-muted-foreground">
                    Specifics about ingredients, packaging, and quality standards.
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="requirements">Key Requirements*</Label>
                        <Textarea
                            id="requirements"
                            placeholder="e.g. Must be organic certified, shelf life minimum 12 months, glass packaging preferred..."
                            className="min-h-[200px]"
                            {...register("requirements")}
                        />
                        {errors.requirements && (
                            <p className="text-sm text-red-500">{errors.requirements.message}</p>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label>Attachments (Optional)</Label>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                        <div
                            onClick={handleUploadClick}
                            className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <Upload className="h-6 w-6" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Click to upload or drag and drop</p>
                                    <p className="text-xs text-muted-foreground">PDF, PNG, JPG up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        {selectedFiles.length > 0 && (
                            <div className="mt-2 space-y-2">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm p-2 rounded bg-muted">
                                        <FileText className="h-4 w-4 text-primary" />
                                        <span className="flex-1 truncate">{file.name}</span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleRemoveFile(index)}
                                            className="h-6 w-6 p-0"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-lg border bg-muted/50 p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <h4 className="font-medium text-sm">Things suppliers need to know</h4>
                                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                                    <li>Target shelf life</li>
                                    <li>Storage conditions (Ambient/Chilled)</li>
                                    <li>Allergen restrictions</li>
                                    <li>Specific certifications (Organic, Halal, etc.)</li>
                                    <li>Packaging material preferences</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border bg-card p-4">
                        <h4 className="font-medium text-sm mb-3">Common Attachments</h4>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded hover:bg-muted/50">
                                <FileText className="h-4 w-4" />
                                <span>Product Specification</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded hover:bg-muted/50">
                                <FileText className="h-4 w-4" />
                                <span>Label Design</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded hover:bg-muted/50">
                                <FileText className="h-4 w-4" />
                                <span>Packaging Dielines</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
