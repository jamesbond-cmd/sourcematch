import { NextResponse } from 'next/server';
import { renderEmail } from '@/lib/email/render-email';
import { sendEmail } from '@/lib/email/send-email';
import RFISubmittedEmail from '@/emails/templates/RFISubmittedEmail';

export async function POST(request: Request) {
    try {
        const { email, firstName, productName, rfiId, submittedAt, estimatedVolume } = await request.json();

        if (!email || !firstName || !productName || !rfiId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        // Render email template
        const html = await renderEmail(
            RFISubmittedEmail({
                firstName,
                productName,
                rfiId,
                submittedAt: submittedAt || new Date().toISOString(),
                estimatedVolume,
                dashboardUrl: `${baseUrl}/dashboard`,
            })
        );

        // Send email
        const { data, error } = await sendEmail({
            to: email,
            subject: `Your RFI for ${productName} has been submitted`,
            html,
        });

        if (error) {
            console.error('Failed to send RFI submitted email:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('RFI submitted email API error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send RFI submitted email' },
            { status: 500 }
        );
    }
}
