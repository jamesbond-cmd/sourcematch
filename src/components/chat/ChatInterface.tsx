"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { supabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, User as UserIcon, Bot } from "lucide-react"
import { toast } from "sonner"

interface Message {
    id: string
    text: string
    sender_id: string
    created_at: string
    profiles?: {
        first_name: string
        last_name: string
        role: string
    }
}

interface ChatInterfaceProps {
    rfiId: string
}

export function ChatInterface({ rfiId }: ChatInterfaceProps) {
    const { user } = useAuth()
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isSending, setIsSending] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    const loadMessages = useCallback(async () => {
        if (!rfiId) return

        try {
            const data = await supabaseClient.getMessages(rfiId)
            setMessages(data || [])
        } catch (error) {
            console.error("Error loading messages:", error)
        } finally {
            setIsLoading(false)
        }
    }, [rfiId])

    useEffect(() => {
        loadMessages()

        // Set up polling for new messages every 5 seconds
        // In a production app, we would use Supabase Realtime subscriptions
        const interval = setInterval(loadMessages, 5000)
        return () => clearInterval(interval)
    }, [rfiId, loadMessages])

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newMessage.trim() || !user) return

        setIsSending(true)
        try {
            await supabaseClient.sendMessage(rfiId, user.id, newMessage.trim())
            setNewMessage("")
            await loadMessages()
        } catch (error) {
            console.error("Error sending message:", error)
            toast.error("Failed to send message")
        } finally {
            setIsSending(false)
        }
    }

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.length === 0 ? (
                        <div className="text-center text-muted-foreground py-8">
                            <p>No messages yet.</p>
                            <p className="text-sm">Start the conversation with your sourcing agent.</p>
                        </div>
                    ) : (
                        messages.map((message) => {
                            const isMe = message.sender_id === user?.id
                            return (
                                <div
                                    key={message.id}
                                    className={`flex items-start gap-3 ${isMe ? "flex-row-reverse" : ""}`}
                                >
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                                        }`}>
                                        {isMe ? <UserIcon className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                    </div>
                                    <div className={`flex flex-col max-w-[80%] ${isMe ? "items-end" : "items-start"}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-medium">
                                                {isMe ? "You" : (message.profiles ? `${message.profiles.first_name} ${message.profiles.last_name}` : "Agent")}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground">
                                                {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <div className={`rounded-lg p-3 text-sm ${isMe ? "bg-primary text-primary-foreground" : "bg-muted"
                                            }`}>
                                            {message.text}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>
            <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={isSending}
                    />
                    <Button type="submit" size="icon" disabled={isSending || !newMessage.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </div>
        </div>
    )
}
