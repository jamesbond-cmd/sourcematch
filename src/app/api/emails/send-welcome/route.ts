import { NextResponse } from 'next/server';
import { renderEmail } from '@/lib/email/render-email';
import { sendEmail } from '@/lib/email/send-email';
import WelcomeEmail from '@/emails/templates/WelcomeEmail';

export async function POST(request: Request) {
    try {
        const { email, firstName } = await request.json();

        if (!email || !firstName) {
            return NextResponse.json(
                { error: 'Email and firstName are required' },
                { status: 400 }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        // Render email template
        const html = await renderEmail(
            WelcomeEmail({
                firstName,
                dashboardUrl: `${baseUrl}/dashboard`,
                howItWorksUrl: `${baseUrl}/how-it-works`,
            })
        );

        // Send email
        const { data, error } = await sendEmail({
            to: email,
            subject: `Welcome to Batch Sourcing, ${firstName}!`,
            html,
        });

        if (error) {
            console.error('Failed to send welcome email:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('Welcome email API error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send welcome email' },
            { status: 500 }
        );
    }
}
