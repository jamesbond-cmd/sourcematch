"use client"

import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { supabaseClient } from "@/lib/supabase/client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, FileText, ExternalLink } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import Link from "next/link"

export default function RFIsPage() {
    const [rfis, setRfis] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        loadRFIs()
    }, [])

    const loadRFIs = async () => {
        try {
            const { data, error } = await supabaseClient.supabase
                .from('rfis')
                .select(`
                    *,
                    companies (
                        name
                    ),
                    profiles (
                        first_name,
                        last_name
                    )
                `)
                .order('created_at', { ascending: false })

            if (error) throw error
            setRfis(data || [])
        } catch (error) {
            console.error("Error loading RFIs:", error)
            toast.error("Failed to load RFIs")
        } finally {
            setIsLoading(false)
        }
    }

    const filteredRFIs = rfis.filter(rfi =>
        rfi.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rfi.companies?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rfi.status?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'submitted': return 'default'
            case 'in_review': return 'secondary'
            case 'approved': return 'default' // green in future
            case 'rejected': return 'destructive'
            default: return 'outline'
        }
    }

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">RFIs</h2>
                        <p className="text-muted-foreground">Manage and review submitted RFIs.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search RFIs..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="rounded-md border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Submitted By</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8">
                                        Loading RFIs...
                                    </TableCell>
                                </TableRow>
                            ) : filteredRFIs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No RFIs found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredRFIs.map((rfi) => (
                                    <TableRow key={rfi.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                {rfi.product_name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{rfi.companies?.name || "-"}</TableCell>
                                        <TableCell>
                                            {rfi.profiles ? `${rfi.profiles.first_name} ${rfi.profiles.last_name}` : "-"}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusColor(rfi.status) as any} className="capitalize">
                                                {rfi.status.replace("_", " ")}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(rfi.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Actions</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(rfi.id)}>
                                                        Copy ID
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/rfi/${rfi.id}`} className="flex items-center">
                                                            View Details
                                                            <ExternalLink className="ml-2 h-3 w-3" />
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">
                                                        Delete RFI
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AdminLayout>
    )
}
