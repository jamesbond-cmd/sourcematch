import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    from?: string;
    replyTo?: string;
}

/**
 * Sends an email via Resend
 * @param options - Email sending options
 * @returns Resend API response
 */
export async function sendEmail({
    to,
    subject,
    html,
    from,
    replyTo,
}: SendEmailOptions) {
    const defaultFrom = process.env.FROM_EMAIL || 'Batch Sourcing <hello@updates.batchsourcing.com>';

    try {
        const result = await resend.emails.send({
            from: from || defaultFrom,
            to: Array.isArray(to) ? to : [to],
            subject,
            html,
            replyTo,
        });

        return result;
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
}
