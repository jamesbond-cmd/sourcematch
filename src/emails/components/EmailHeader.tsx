import { Heading, Section, Text } from '@react-email/components';
import * as React from 'react';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

interface EmailHeaderProps {
    logoUrl?: string;
}

export function EmailHeader({ logoUrl }: EmailHeaderProps) {
    return (
        <Section style={header}>
            <table style={logoTable}>
                <tr>
                    <td style={linesCell}>
                        <div style={lineBlue}></div>
                        <div style={lineIndigo}></div>
                        <div style={linePurple}></div>
                    </td>
                    <td style={textCell}>
                        <Heading style={brandName}>
                            Batch <Text style={sourcingText}>Sourcing</Text>
                        </Heading>
                    </td>
                </tr>
            </table>
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

const logoTable = {
    margin: '0 auto',
    borderCollapse: 'collapse' as const,
};

const linesCell = {
    paddingRight: '12px',
    verticalAlign: 'middle' as const,
};

const textCell = {
    verticalAlign: 'middle' as const,
};

const lineBlue = {
    width: '32px',
    height: '6px',
    backgroundColor: '#3b82f6', // blue-500
    borderRadius: '999px',
    marginBottom: '3px',
};

const lineIndigo = {
    width: '32px',
    height: '6px',
    backgroundColor: '#4f46e5', // indigo-600 (primary)
    borderRadius: '999px',
    marginBottom: '3px',
};

const linePurple = {
    width: '24px', // 3/4 of 32px
    height: '6px',
    backgroundColor: '#7c3aed', // purple-600 (secondary)
    borderRadius: '999px',
};

const brandName = {
    margin: '0',
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    letterSpacing: '-0.5px',
    display: 'inline',
};

const sourcingText = {
    color: colors.text.muted,
    fontWeight: typography.fontWeight.bold,
    fontSize: typography.fontSize['2xl'],
};
