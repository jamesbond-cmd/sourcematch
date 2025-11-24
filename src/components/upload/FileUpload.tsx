"use client"

import { useState, useRef } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { supabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Upload, X, FileText, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

interface FileUploadProps {
    rfiId: string
    onUploadComplete: () => void
}

export function FileUpload({ rfiId, onUploadComplete }: FileUploadProps) {
    const { user } = useAuth()
    const [isUploading, setIsUploading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0])
        }
    }

    const handleClearFile = () => {
        setSelectedFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleUpload = async () => {
        if (!selectedFile || !user) return

        setIsUploading(true)
        try {
            // 1. Upload file to storage
            const filePath = `${rfiId}/${Date.now()}-${selectedFile.name}`
            const uploadData = await supabaseClient.uploadFile("rfi-attachments", filePath, selectedFile)

            // Get public URL
            const publicUrl = await supabaseClient.getFileUrl("rfi-attachments", filePath)

            // 2. Create attachment record in database
            await supabaseClient.createAttachment({
                rfi_id: rfiId,
                file_name: selectedFile.name,
                file_path: filePath,
                file_size: selectedFile.size,
                file_type: selectedFile.type,
                file_url: publicUrl,
                uploaded_by: user!.id
            })

            toast.success("File uploaded successfully")
            handleClearFile()
            onUploadComplete()
        } catch (error) {
            console.error("Error uploading file:", error)
            toast.error("Failed to upload file")
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="space-y-4">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
            />

            {!selectedFile ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                >
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click to upload a file</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, Word, Excel, Images (max 10MB)</p>
                </div>
            ) : (
                <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                                <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</p>
                                <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleClearFile} disabled={isUploading}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button onClick={handleUpload} disabled={isUploading} className="w-full">
                        {isUploading ? "Uploading..." : "Upload File"}
                    </Button>
                </div>
            )}
        </div>
    )
}
