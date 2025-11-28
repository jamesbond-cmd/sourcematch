import { Hr, Link, Section, Text } from '@react-email/components';
import * as React from 'react';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

export function EmailFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <Section style={footer}>
            <Hr style={divider} />
            <Text style={footerText}>
                © {currentYear} Batch Sourcing. All rights reserved.
            </Text>
            <Text style={footerLinks}>
                <Link href="https://batchsourcing.com/privacy" style={link}>
                    Privacy Policy
                </Link>
                {' | '}
                <Link href="https://batchsourcing.com/terms" style={link}>
                    Terms of Service
                </Link>
                {' | '}
                <Link href="https://batchsourcing.com/contact" style={link}>
                    Contact Us
                </Link>
            </Text>
            <Text style={footerAddress}>
                Batch Sourcing<br />
                Your trusted B2B sourcing partner
            </Text>
        </Section>
    );
}

const footer = {
    padding: '40px',
    textAlign: 'center' as const,
    backgroundColor: colors.muted,
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
};

const divider = {
    borderColor: colors.border,
    margin: '0 0 30px',
};

const footerText = {
    margin: '0 0 10px',
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.lineHeight.normal,
};

const footerLinks = {
    margin: '0 0 20px',
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
    lineHeight: typography.lineHeight.normal,
};

const link = {
    color: colors.text.muted,
    textDecoration: 'none',
};

const footerAddress = {
    margin: '0',
    fontSize: typography.fontSize.xs,
    color: colors.text.muted,
    lineHeight: typography.lineHeight.relaxed,
};
