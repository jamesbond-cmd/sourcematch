import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const data = await request.json()

        // Initialize Supabase Admin Client
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseServiceKey) {
            return NextResponse.json(
                { error: 'Server configuration error: Missing Service Role Key. Please add SUPABASE_SERVICE_ROLE_KEY to your .env file.' },
                { status: 500 }
            )
        }

        if (!supabaseServiceKey.startsWith('ey') || supabaseServiceKey === 'your-service-role-key-here') {
            console.error('Invalid Supabase Service Role Key format');
            return NextResponse.json(
                { error: 'Server configuration error: Invalid Service Role Key. Please check your environment variables.' },
                { status: 500 }
            )
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        })

        // 1. Create user
        let userId
        const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
            email: data.workEmail,
            password: data.password,
            email_confirm: true, // Auto-confirm so they can login immediately
            user_metadata: {
                full_name: `${data.firstName} ${data.lastName}`
            }
        })

        if (createError) {
            if (createError.message.includes('already registered')) {
                return NextResponse.json(
                    { error: 'Account already exists. Please login to submit RFI.' },
                    { status: 400 }
                )
            }
            throw createError
        }
        userId = newUser.user.id

        // 2. Create Company
        const { data: company, error: companyError } = await supabase
            .from('companies')
            .insert({
                name: data.companyName,
                website: data.companyWebsite,
                country: data.country
            })
            .select()
            .single()

        if (companyError) throw companyError

        // 3. Create/Update Profile
        // Try to update first (in case trigger created it), otherwise upsert
        const { error: profileError } = await supabase
            .from('profiles')
            .update({
                company_id: company.id,
                role: 'buyer',
                full_name: `${data.firstName} ${data.lastName}`,
                first_name: data.firstName,
                last_name: data.lastName,
                phone: data.phone,
                terms_accepted: data.termsAccepted
            })
            .eq('id', userId)

        if (profileError) {
            // Fallback to upsert if update failed (though update shouldn't fail if user exists)
            await supabase.from('profiles').upsert({
                id: userId,
                email: data.workEmail,
                full_name: `${data.firstName} ${data.lastName}`,
                first_name: data.firstName,
                last_name: data.lastName,
                phone: data.phone,
                terms_accepted: data.termsAccepted,
                company_id: company.id,
                role: 'buyer'
            })
        }

        // 4. Create RFI
        const { data: rfi, error: rfiError } = await supabase
            .from('rfis')
            .insert({
                company_id: company.id,
                created_by: userId,
                product_name: data.productName,
                requirements: data.requirements,
                estimated_volume: data.estimatedVolume,
                annual_volume: data.targetAnnualVolume || data.estimatedVolume, // Map to annual_volume as well
                target_price: data.guidancePrice || "",
                guidance_price: data.guidancePrice || "", // Map to guidance_price
                timeline: data.timeline,
                destination_markets: data.destinationMarkets,
                status: "submitted",
                ai_status: "pending",
                product_description: data.productDescription,
                volume_unit: data.volumeUnit,
            })
            .select()
            .single()

        if (rfiError) throw rfiError

        return NextResponse.json({
            success: true,
            rfiId: rfi.id,
            userId: userId
        })

    } catch (error: any) {
        console.error('RFI Submission Error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to submit RFI' },
            { status: 500 }
        )
    }
}
