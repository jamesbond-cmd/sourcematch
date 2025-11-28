import { Heading, Hr, Text } from '@react-email/components';
import * as React from 'react';
import { EmailLayout } from '../components/EmailLayout';
import { EmailSection } from '../components/EmailSection';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

export interface ContactFormEmailProps {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactFormEmail({
    firstName,
    lastName,
    email,
    subject,
    message,
}: ContactFormEmailProps) {
    return (
        <EmailLayout preview={`New Contact Form: ${subject}`}>
            <EmailSection>
                <Heading style={h1}>📬 New Contact Form Submission</Heading>
                <Text style={paragraph}>
                    You have received a new message from the Batch Sourcing contact form.
                </Text>
            </EmailSection>

            <EmailSection>
                <div style={infoBox}>
                    <Heading style={h2}>Contact Details</Heading>
                    <Hr style={divider} />
                    <table style={table}>
                        <tbody>
                            <tr>
                                <td style={labelCell}>Name:</td>
                                <td style={valueCell}>{firstName} {lastName}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Email:</td>
                                <td style={valueCell}>
                                    <a href={`mailto:${email}`} style={link}>
                                        {email}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Subject:</td>
                                <td style={valueCell}><strong>{subject}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </EmailSection>

            <EmailSection>
                <Heading style={h2}>Message</Heading>
                <div style={messageBox}>
                    <Text style={messageText}>{message}</Text>
                </div>
            </EmailSection>

            <EmailSection>
                <Text style={footerNote}>
                    Reply directly to this email to respond to {firstName}.
                </Text>
            </EmailSection>
        </EmailLayout>
    );
}

const h1 = {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    margin: '0 0 20px',
    lineHeight: typography.lineHeight.tight,
};

const h2 = {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text.primary,
    margin: '0 0 16px',
    lineHeight: typography.lineHeight.tight,
};

const paragraph = {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    margin: '0 0 16px',
    lineHeight: typography.lineHeight.relaxed,
};

const infoBox = {
    backgroundColor: colors.muted,
    borderRadius: '6px',
    padding: '20px',
    marginBottom: '24px',
};

const divider = {
    borderColor: colors.border,
    margin: '12px 0',
};

const table = {
    width: '100%',
    fontSize: typography.fontSize.sm,
};

const labelCell = {
    padding: '8px 0',
    color: colors.text.muted,
    fontWeight: typography.fontWeight.medium,
    width: '30%',
};

const valueCell = {
    padding: '8px 0',
    color: colors.text.primary,
};

const link = {
    color: colors.primary,
    textDecoration: 'underline',
};

const messageBox = {
    backgroundColor: colors.background,
    border: `1px solid ${colors.border}`,
    borderRadius: '6px',
    padding: '20px',
};

const messageText = {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    margin: '0',
    lineHeight: typography.lineHeight.relaxed,
    whiteSpace: 'pre-wrap' as const,
};

const footerNote = {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
    margin: '0',
    lineHeight: typography.lineHeight.relaxed,
};
