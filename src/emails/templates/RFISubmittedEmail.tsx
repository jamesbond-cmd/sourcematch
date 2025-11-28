import { Heading, Hr, Text } from '@react-email/components';
import * as React from 'react';
import { EmailButton } from '../components/EmailButton';
import { EmailLayout } from '../components/EmailLayout';
import { EmailSection } from '../components/EmailSection';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

export interface RFISubmittedEmailProps {
    firstName: string;
    productName: string;
    rfiId: string;
    submittedAt: string;
    estimatedVolume?: string;
    dashboardUrl: string;
}

export default function RFISubmittedEmail({
    firstName,
    productName,
    rfiId,
    submittedAt,
    estimatedVolume,
    dashboardUrl,
}: RFISubmittedEmailProps) {
    const formattedDate = new Date(submittedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <EmailLayout preview={`Your RFI for ${productName} has been submitted`}>
            <EmailSection>
                <Heading style={h1}>RFI Submitted Successfully!</Heading>
                <Text style={paragraph}>
                    Hi {firstName},
                </Text>
                <Text style={paragraph}>
                    Great news! Your Request for Information (RFI) for <strong>{productName}</strong> has been
                    successfully submitted and is now being reviewed by our sourcing team.
                </Text>
            </EmailSection>

            <EmailSection>
                <div style={infoBox}>
                    <Heading style={h2}>RFI Summary</Heading>
                    <Hr style={divider} />
                    <table style={table}>
                        <tbody>
                            <tr>
                                <td style={labelCell}>RFI ID:</td>
                                <td style={valueCell}>{rfiId.substring(0, 8).toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Product:</td>
                                <td style={valueCell}>{productName}</td>
                            </tr>
                            {estimatedVolume && (
                                <tr>
                                    <td style={labelCell}>Volume:</td>
                                    <td style={valueCell}>{estimatedVolume}</td>
                                </tr>
                            )}
                            <tr>
                                <td style={labelCell}>Submitted:</td>
                                <td style={valueCell}>{formattedDate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </EmailSection>

            <EmailSection>
                <Heading style={h2}>What Happens Next?</Heading>
                <Text style={paragraph}>
                    <strong>1. AI Analysis (24 hours)</strong><br />
                    Our AI will analyze your RFI to ensure all necessary information is included.
                    We'll notify you if any clarifications are needed.
                </Text>
                <Text style={paragraph}>
                    <strong>2. Agent Assignment (1-2 business days)</strong><br />
                    A dedicated sourcing agent will be assigned to your RFI and will reach out to introduce themselves.
                </Text>
                <Text style={paragraph}>
                    <strong>3. Supplier Matching (3-5 business days)</strong><br />
                    We'll identify and vet suppliers that match your requirements and present you with the best options.
                </Text>
            </EmailSection>

            <EmailSection>
                <EmailButton href={dashboardUrl}>
                    View RFI in Dashboard
                </EmailButton>
            </EmailSection>

            <EmailSection>
                <Text style={footerNote}>
                    You can track the progress of your RFI anytime in your dashboard. If you have any questions,
                    feel free to reply to this email.
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

const footerNote = {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
    margin: '0',
    lineHeight: typography.lineHeight.relaxed,
};
