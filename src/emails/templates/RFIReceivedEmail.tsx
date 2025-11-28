import { Heading, Hr, Text } from '@react-email/components';
import * as React from 'react';
import { EmailButton } from '../components/EmailButton';
import { EmailLayout } from '../components/EmailLayout';
import { EmailSection } from '../components/EmailSection';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

export interface RFIReceivedEmailProps {
    agentName: string;
    productName: string;
    rfiId: string;
    buyerName: string;
    buyerEmail: string;
    buyerCompany?: string;
    estimatedVolume?: string;
    destinationMarkets?: string[];
    adminUrl: string;
}

export default function RFIReceivedEmail({
    agentName,
    productName,
    rfiId,
    buyerName,
    buyerEmail,
    buyerCompany,
    estimatedVolume,
    destinationMarkets,
    adminUrl,
}: RFIReceivedEmailProps) {
    return (
        <EmailLayout preview={`New RFI: ${productName} from ${buyerName}`}>
            <EmailSection>
                <Heading style={h1}>🎯 New RFI Received</Heading>
                <Text style={paragraph}>
                    Hi {agentName},
                </Text>
                <Text style={paragraph}>
                    A new Request for Information has been submitted and requires your attention.
                </Text>
            </EmailSection>

            <EmailSection>
                <div style={infoBox}>
                    <Heading style={h2}>RFI Details</Heading>
                    <Hr style={divider} />
                    <table style={table}>
                        <tbody>
                            <tr>
                                <td style={labelCell}>RFI ID:</td>
                                <td style={valueCell}>{rfiId.substring(0, 8).toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Product:</td>
                                <td style={valueCell}><strong>{productName}</strong></td>
                            </tr>
                            {estimatedVolume && (
                                <tr>
                                    <td style={labelCell}>Est. Volume:</td>
                                    <td style={valueCell}>{estimatedVolume}</td>
                                </tr>
                            )}
                            {destinationMarkets && destinationMarkets.length > 0 && (
                                <tr>
                                    <td style={labelCell}>Markets:</td>
                                    <td style={valueCell}>{destinationMarkets.join(', ')}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </EmailSection>

            <EmailSection>
                <div style={buyerBox}>
                    <Heading style={h2}>Buyer Information</Heading>
                    <Hr style={divider} />
                    <table style={table}>
                        <tbody>
                            <tr>
                                <td style={labelCell}>Name:</td>
                                <td style={valueCell}>{buyerName}</td>
                            </tr>
                            <tr>
                                <td style={labelCell}>Email:</td>
                                <td style={valueCell}>
                                    <a href={`mailto:${buyerEmail}`} style={link}>
                                        {buyerEmail}
                                    </a>
                                </td>
                            </tr>
                            {buyerCompany && (
                                <tr>
                                    <td style={labelCell}>Company:</td>
                                    <td style={valueCell}>{buyerCompany}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </EmailSection>

            <EmailSection>
                <Heading style={h2}>Next Steps</Heading>
                <Text style={paragraph}>
                    • Review the complete RFI details in the admin panel<br />
                    • Run AI analysis to check for missing information<br />
                    • Assign yourself or another agent to this RFI<br />
                    • Reach out to the buyer to introduce yourself
                </Text>
            </EmailSection>

            <EmailSection>
                <EmailButton href={adminUrl}>
                    Review RFI in Admin Panel
                </EmailButton>
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
    backgroundColor: '#eff6ff',
    borderRadius: '6px',
    padding: '20px',
    marginBottom: '24px',
    border: `1px solid ${colors.primary}`,
};

const buyerBox = {
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
    verticalAlign: 'top' as const,
};

const valueCell = {
    padding: '8px 0',
    color: colors.text.primary,
    verticalAlign: 'top' as const,
};

const link = {
    color: colors.primary,
    textDecoration: 'underline',
};
