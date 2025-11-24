"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { user, signOut } = useAuth()
    const router = useRouter()

    const handleSignOut = async () => {
        await signOut()
        router.push("/")
    }

    const getUserInitials = () => {
        if (user?.email) {
            return user.email.substring(0, 2).toUpperCase()
        }
        return "U"
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold">B</span>
                        </div>
                        <span className="text-xl font-bold">Batch Sourcing</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            How it works
                        </Link>
                        <Link href="/#categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Categories
                        </Link>
                        <Link href="/#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            FAQ
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                            <Avatar className="h-10 w-10">
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    {getUserInitials()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 bg-background border shadow-lg" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">My Account</p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard" className="cursor-pointer">
                                                <User className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/rfi" className="cursor-pointer">
                                                <User className="mr-2 h-4 w-4" />
                                                Create RFI
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Sign out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" asChild>
                                    <Link href="/login">Sign in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/rfi">Post RFI</Link>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t py-4">
                        <nav className="flex flex-col space-y-4">
                            <Link
                                href="/#how-it-works"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                How it works
                            </Link>
                            <Link
                                href="/#categories"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Categories
                            </Link>
                            <Link
                                href="/#faq"
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                FAQ
                            </Link>
                            <div className="flex flex-col space-y-2 pt-4 border-t">
                                {user ? (
                                    <>
                                        <div className="px-2 py-2 text-sm">
                                            <p className="font-medium">Signed in as</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                        <Button variant="ghost" asChild>
                                            <Link href="/dashboard">Dashboard</Link>
                                        </Button>
                                        <Button asChild>
                                            <Link href="/rfi">Create RFI</Link>
                                        </Button>
                                        <Button variant="ghost" onClick={handleSignOut} className="text-red-600">
                                            Sign out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="ghost" asChild>
                                            <Link href="/login">Sign in</Link>
                                        </Button>
                                        <Button asChild>
                                            <Link href="/rfi">Post RFI</Link>
                                        </Button>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
