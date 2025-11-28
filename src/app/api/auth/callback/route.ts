import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const cookieStore = await cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options)
                        })
                    },
                },
            }
        )

        const { data, error } = await supabase.auth.exchangeCodeForSession(code)

        // Send welcome email for new users (Google OAuth)
        if (data?.user && !error) {
            // Check if this is a new user by checking created_at timestamp
            const userCreatedAt = new Date(data.user.created_at)
            const now = new Date()
            const timeDiff = now.getTime() - userCreatedAt.getTime()
            const isNewUser = timeDiff < 10000 // User created within last 10 seconds

            if (isNewUser) {
                try {
                    // Extract first name from user metadata or email
                    const firstName =
                        data.user.user_metadata?.full_name?.split(' ')[0] ||
                        data.user.user_metadata?.name?.split(' ')[0] ||
                        data.user.email?.split('@')[0] ||
                        'User'

                    // Send welcome email (don't block OAuth flow if it fails)
                    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || requestUrl.origin}/api/emails/send-welcome`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: data.user.email,
                            firstName: firstName,
                        }),
                    })

                    console.log('Welcome email sent for new OAuth user:', data.user.email)
                } catch (emailError) {
                    console.error('Failed to send welcome email for OAuth user:', emailError)
                    // Don't throw - email failure shouldn't block OAuth flow
                }
            }
        }
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(new URL('/dashboard', request.url))
}
