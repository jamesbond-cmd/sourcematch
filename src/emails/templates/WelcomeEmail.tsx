import { Heading, Text } from '@react-email/components';
import * as React from 'react';
import { EmailButton } from '../components/EmailButton';
import { EmailLayout } from '../components/EmailLayout';
import { EmailSection } from '../components/EmailSection';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

export interface WelcomeEmailProps {
    firstName: string;
    dashboardUrl: string;
    howItWorksUrl: string;
}

export default function WelcomeEmail({
    firstName,
    dashboardUrl,
    howItWorksUrl,
}: WelcomeEmailProps) {
    return (
        <EmailLayout preview={`Welcome to Batch Sourcing, ${firstName}!`}>
            <EmailSection>
                <Heading style={h1}>Welcome to Batch Sourcing, {firstName}!</Heading>
                <Text style={paragraph}>
                    Thank you for joining Batch Sourcing, your trusted partner for B2B food and beverage sourcing.
                    We're excited to help you find the perfect suppliers for your products.
                </Text>
            </EmailSection>

            <EmailSection>
                <Heading style={h2}>Get Started in 3 Easy Steps</Heading>
                <Text style={paragraph}>
                    <strong>1. Create your first RFI</strong><br />
                    Tell us what you're looking for - product details, volumes, and requirements.
                </Text>
                <Text style={paragraph}>
                    <strong>2. AI-powered optimization</strong><br />
                    Our AI will analyze your RFI and suggest improvements to get better results.
                </Text>
                <Text style={paragraph}>
                    <strong>3. Get matched with suppliers</strong><br />
                    We'll connect you with vetted suppliers who match your needs.
                </Text>
            </EmailSection>

            <EmailSection>
                <EmailButton href={dashboardUrl}>
                    Go to Dashboard
                </EmailButton>
            </EmailSection>

            <EmailSection>
                <Text style={paragraph}>
                    Want to learn more about how Batch Sourcing works?{' '}
                    <a href={howItWorksUrl} style={link}>
                        Read our guide
                    </a>
                </Text>
            </EmailSection>

            <EmailSection>
                <Text style={footerNote}>
                    If you have any questions, feel free to reply to this email or visit our{' '}
                    <a href="https://batchsourcing.com/contact" style={link}>
                        contact page
                    </a>
                    .
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

const link = {
    color: colors.primary,
    textDecoration: 'underline',
};

const footerNote = {
    fontSize: typography.fontSize.sm,
    color: colors.text.muted,
    margin: '0',
    lineHeight: typography.lineHeight.relaxed,
};
