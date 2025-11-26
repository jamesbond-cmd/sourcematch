import { NextResponse } from 'next/server';
import { Resend } from 'resend';

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

        const { data, error } = await resend.emails.send({
            from: 'Batch Sourcing <onboarding@resend.dev>', // Use verified domain in production
            to: [contactEmail],
            subject: `New Contact Form Submission: ${subject}`,
            html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
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
