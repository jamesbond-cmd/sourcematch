import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { renderEmail } from '@/lib/email/render-email';
import ContactFormEmail from '@/emails/templates/ContactFormEmail';

export async function POST(request: Request) {
    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || 'hello@batchsourcing.com';

    if (!apiKey) {
        console.error('Resend API key is missing');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    try {
        const { firstName, lastName, email, subject, message } = await request.json();

        // Render email template
        const html = await renderEmail(
            ContactFormEmail({
                firstName,
                lastName,
                email,
                subject,
                message,
            })
        );

        const { data, error } = await resend.emails.send({
            from: 'Batch Sourcing <hello@updates.batchsourcing.com>',
            to: [contactEmail],
            replyTo: email,
            subject: `New Contact Form Submission: ${subject}`,
            html,
        });

        if (error) {
            console.error('Resend API Error:', error);
            return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
        }

        return NextResponse.json({ data });
    } catch (error) {
        console.error('Internal Contact API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

