"use client"

import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import { supabaseClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ChatInterface } from "@/components/chat/ChatInterface"

export default function AdminChatPage() {
    const [conversations, setConversations] = useState<any[]>([])
    const [selectedRfiId, setSelectedRfiId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        loadConversations()
    }, [])

    const loadConversations = async () => {
        try {
            // Fetch RFIs that have messages
            // This is a bit complex with Supabase simple client, so we'll fetch RFIs and then check for messages
            // In a real app, we'd have a 'conversations' table or a view
            const { data: rfis, error } = await supabaseClient.supabase
                .from('rfis')
                .select(`
                    id,
                    product_name,
                    status,
                    created_at,
                    profiles (
                        first_name,
                        last_name,
                        email
                    ),
                    companies (
                        name
                    )
                `)
                .order('created_at', { ascending: false })

            if (error) throw error

            // For now, we'll just show all RFIs as potential conversations
            // In a real implementation, we would filter for those with actual messages
            setConversations(rfis || [])
        } catch (error) {
            console.error("Error loading conversations:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredConversations = conversations.filter(conv =>
        conv.product_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.companies?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (conv.profiles?.first_name + ' ' + conv.profiles?.last_name).toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <AdminLayout>
            <div className="h-[calc(100vh-8rem)] flex flex-col">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold tracking-tight">Chat Monitoring</h2>
                    <p className="text-muted-foreground">Monitor agent-buyer interactions.</p>
                </div>

                <div className="flex-1 grid grid-cols-12 gap-6 h-full overflow-hidden">
                    {/* Conversation List */}
                    <Card className="col-span-4 flex flex-col h-full">
                        <CardHeader className="p-4 border-b">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search conversations..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 flex-1 overflow-hidden">
                            <ScrollArea className="h-full">
                                {isLoading ? (
                                    <div className="p-4 text-center text-muted-foreground">Loading...</div>
                                ) : filteredConversations.length === 0 ? (
                                    <div className="p-4 text-center text-muted-foreground">No conversations found</div>
                                ) : (
                                    <div className="flex flex-col">
                                        {filteredConversations.map((conv) => (
                                            <button
                                                key={conv.id}
                                                onClick={() => setSelectedRfiId(conv.id)}
                                                className={cn(
                                                    "flex items-start gap-3 p-4 text-left border-b transition-colors hover:bg-muted/50",
                                                    selectedRfiId === conv.id && "bg-muted"
                                                )}
                                            >
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback>
                                                        {conv.profiles?.first_name?.[0]}
                                                        {conv.profiles?.last_name?.[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 overflow-hidden">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="font-semibold truncate">{conv.product_name}</span>
                                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                            {new Date(conv.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground truncate">
                                                        {conv.companies?.name} • {conv.profiles?.first_name} {conv.profiles?.last_name}
                                                    </div>
                                                    <div className="mt-2">
                                                        <Badge variant="outline" className="text-[10px] py-0 h-5">
                                                            {conv.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </ScrollArea>
                        </CardContent>
                    </Card>

                    {/* Chat View */}
                    <Card className="col-span-8 flex flex-col h-full">
                        {selectedRfiId ? (
                            <>
                                <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                            <MessageSquare className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">
                                                {conversations.find(c => c.id === selectedRfiId)?.product_name}
                                            </CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                Conversation History
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <div className="flex-1 overflow-hidden">
                                    <ChatInterface rfiId={selectedRfiId} />
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
                                <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
                                <p>Select a conversation to view history</p>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </AdminLayout>
    )
}
