"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { supabaseClient } from "@/lib/supabase/client"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    Users,
    Building2,
    FileText,
    MessageSquare,
    Bot,
    Settings,
    LogOut,
    Menu
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface AdminLayoutProps {
    children: React.ReactNode
}

function SidebarContent({ pathname, signOut }: { pathname: string, signOut: () => void }) {
    const navigation = [
        { name: "Overview", href: "/admin", icon: LayoutDashboard },
        { name: "Users", href: "/admin/users", icon: Users },
        { name: "Companies", href: "/admin/companies", icon: Building2 },
        { name: "RFIs", href: "/admin/rfis", icon: FileText },
        { name: "Chat Monitoring", href: "/admin/chat", icon: MessageSquare },
        { name: "Agents", href: "/admin/agents", icon: Bot },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ]

    return (
        <div className="flex flex-col h-full">
            <div className="p-6 border-b">
                <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>
            <nav className="flex-1 p-4 space-y-1">
                {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link key={item.name} href={item.href}>
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className="w-full justify-start"
                            >
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.name}
                            </Button>
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t">
                <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    )
}

export function AdminLayout({ children }: AdminLayoutProps) {
    const { user, signOut, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    useEffect(() => {
        const checkAdminRole = async () => {
            if (!user) return

            try {
                const profile = await supabaseClient.getProfile(user.id)
                if (profile?.role !== 'admin') {
                    router.push('/dashboard')
                }
            } catch (error) {
                console.error("Error checking admin role:", error)
                router.push('/dashboard')
            }
        }

        if (!loading && user) {
            checkAdminRole()
        } else if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading, router])

    if (loading) return null

    return (
        <div className="min-h-screen bg-muted/30 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 bg-background border-r">
                <SidebarContent pathname={pathname} signOut={signOut} />
            </aside>

            {/* Mobile Sidebar */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetContent side="left" className="p-0 w-64">
                    <SidebarContent pathname={pathname} signOut={signOut} />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                <header className="md:hidden h-16 border-b bg-background flex items-center px-4">
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(true)}>
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <span className="ml-4 font-semibold">Admin Panel</span>
                </header>
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
