"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/AuthContext"
import { Logo } from "@/components/ui/logo"
import { GoogleButton } from "@/components/ui/google-button"

export default function SignupPage() {
    const router = useRouter()
    const { signUp, signInWithGoogle } = useAuth()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [oauthLoading, setOauthLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters")
            return
        }

        setLoading(true)

        try {
            await signUp(email, password)
            router.push("/dashboard")
        } catch (err: any) {
            setError(err.message || "Failed to create account")
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setError("")
        setOauthLoading(true)

        try {
            await signInWithGoogle()
            // Redirect is handled by Supabase OAuth flow
        } catch (err: any) {
            setError(err.message || "Failed to sign in with Google")
            setOauthLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <Logo />
                    </Link>
                    <h2 className="text-2xl font-bold">Create an account</h2>
                    <p className="text-muted-foreground mt-2">Start sourcing smarter today</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <GoogleButton onClick={handleGoogleSignIn} loading={oauthLoading} />

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-muted-foreground/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-background px-4 text-muted-foreground">Or continue with email</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4 rounded-lg border bg-card p-8 shadow-lg">
                        {error && (
                            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="h-11"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="h-11"
                            />
                            <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="h-11"
                            />
                        </div>

                        <Button type="submit" className="w-full h-11 text-base shadow-md hover:shadow-lg transition-all" disabled={loading || oauthLoading}>
                            {loading ? "Creating account..." : "Create account"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
