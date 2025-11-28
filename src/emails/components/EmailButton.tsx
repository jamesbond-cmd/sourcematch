import { Button as ReactEmailButton } from '@react-email/components';
import * as React from 'react';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

interface EmailButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
}

export function EmailButton({ href, children, variant = 'primary' }: EmailButtonProps) {
    const buttonStyle = variant === 'primary' ? primaryButton : secondaryButton;

    return (
        <ReactEmailButton href={href} style={buttonStyle}>
            {children}
        </ReactEmailButton>
    );
}

const baseButton = {
    display: 'inline-block',
    padding: '14px 28px',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    textDecoration: 'none',
    borderRadius: '6px',
    textAlign: 'center' as const,
    lineHeight: typography.lineHeight.tight,
};

const primaryButton = {
    ...baseButton,
    backgroundColor: colors.primary,
    color: colors.background,
};

const secondaryButton = {
    ...baseButton,
    backgroundColor: colors.background,
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
};
