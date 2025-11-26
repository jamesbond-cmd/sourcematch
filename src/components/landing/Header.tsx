"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
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
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { user, signOut } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

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
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 sm:px-6 lg:px-8 py-4",
                scrolled ? "py-2" : "py-4"
            )}
        >
            <div
                className={cn(
                    "mx-auto max-w-7xl rounded-full border border-transparent transition-all duration-300",
                    scrolled ? "bg-background/60 backdrop-blur-md border-white/10 shadow-lg" : ""
                )}
            >
                <div className="flex h-14 items-center justify-between px-4 sm:px-6">
                    {/* Logo */}
                    {/* Logo */}
                    <Link href="/" className="group">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform duration-200">
                            How it works
                        </Link>
                        <Link href="/#categories" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform duration-200">
                            Categories
                        </Link>
                        <Link href="/#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:scale-105 transform duration-200">
                            FAQ
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Button variant="ghost" asChild className="hover:bg-white/5">
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/5">
                                            <Avatar className="h-10 w-10 border border-white/10">
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    {getUserInitials()}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56 bg-background/95 backdrop-blur-xl border-white/10 shadow-xl" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">My Account</p>
                                                <p className="text-xs leading-none text-muted-foreground">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-white/10" />
                                        <DropdownMenuItem asChild className="focus:bg-white/10">
                                            <Link href="/dashboard" className="cursor-pointer">
                                                <User className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild className="focus:bg-white/10">
                                            <Link href="/rfi" className="cursor-pointer">
                                                <User className="mr-2 h-4 w-4" />
                                                Create RFI
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-white/10" />
                                        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-400 focus:text-red-300 focus:bg-red-900/20">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Sign out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Button variant="ghost" asChild className="hover:bg-white/5">
                                    <Link href="/login">Sign in</Link>
                                </Button>
                                <Button asChild className="bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300">
                                    <Link href="/rfi">Post RFI</Link>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-white/5"
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
                    <div className="md:hidden border-t border-white/10 py-4 px-4 bg-background/95 backdrop-blur-xl rounded-b-2xl absolute top-full left-0 right-0 mt-2 mx-4 border shadow-xl">
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
                            <div className="flex flex-col space-y-2 pt-4 border-t border-white/10">
                                {user ? (
                                    <>
                                        <div className="px-2 py-2 text-sm">
                                            <p className="font-medium">Signed in as</p>
                                            <p className="text-xs text-muted-foreground">{user.email}</p>
                                        </div>
                                        <Button variant="ghost" asChild className="justify-start hover:bg-white/5">
                                            <Link href="/dashboard">Dashboard</Link>
                                        </Button>
                                        <Button asChild className="justify-start bg-primary/20 text-primary hover:bg-primary/30">
                                            <Link href="/rfi">Create RFI</Link>
                                        </Button>
                                        <Button variant="ghost" onClick={handleSignOut} className="justify-start text-red-400 hover:bg-red-900/20 hover:text-red-300">
                                            Sign out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="ghost" asChild className="justify-start hover:bg-white/5">
                                            <Link href="/login">Sign in</Link>
                                        </Button>
                                        <Button asChild className="justify-start bg-primary hover:bg-primary/90">
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
