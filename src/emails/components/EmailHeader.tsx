import { Img, Section } from '@react-email/components';
import * as React from 'react';
import { colors } from '../styles/colors';

interface EmailHeaderProps {
    logoUrl?: string;
}

export function EmailHeader({ logoUrl }: EmailHeaderProps) {
    const defaultLogoUrl = 'https://batchsourcing.com/logo.png';

    return (
        <Section style={header}>
            <Img
                src={logoUrl || defaultLogoUrl}
                alt="Batch Sourcing"
                width="150"
                height="auto"
                style={logo}
            />
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

const logo = {
    margin: '0 auto',
};
