import { Heading, Section } from '@react-email/components';
import * as React from 'react';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

interface EmailHeaderProps {
    logoUrl?: string;
}

export function EmailHeader({ logoUrl }: EmailHeaderProps) {
    return (
        <Section style={header}>
            <Heading style={brandName}>Batch Sourcing</Heading>
        </Section>
    );
}

const header = {
    padding: '40px 40px 30px',
    textAlign: 'center' as const,
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
};

const brandName = {
    margin: '0',
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    letterSpacing: '-0.5px',
};
