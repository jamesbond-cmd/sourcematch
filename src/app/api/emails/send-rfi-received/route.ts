import { NextResponse } from 'next/server';
import { renderEmail } from '@/lib/email/render-email';
import { sendEmail } from '@/lib/email/send-email';
import RFIReceivedEmail from '@/emails/templates/RFIReceivedEmail';

export async function POST(request: Request) {
    try {
        const {
            productName,
            rfiId,
            buyerName,
            buyerEmail,
            buyerCompany,
            estimatedVolume,
            destinationMarkets,
        } = await request.json();

        if (!productName || !rfiId || !buyerName || !buyerEmail) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@batchsourcing.com';
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

        // Render email template
        const html = await renderEmail(
            RFIReceivedEmail({
                agentName: 'Team', // Default, can be customized later
                productName,
                rfiId,
                buyerName,
                buyerEmail,
                buyerCompany,
                estimatedVolume,
                destinationMarkets,
                adminUrl: `${baseUrl}/admin/rfis/${rfiId}`,
            })
        );

        // Send email to admin
        const { data, error } = await sendEmail({
            to: adminEmail,
            subject: `New RFI: ${productName} from ${buyerName}`,
            html,
            replyTo: buyerEmail,
        });

        if (error) {
            console.error('Failed to send RFI received email:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('RFI received email API error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send RFI received email' },
            { status: 500 }
        );
    }
}
