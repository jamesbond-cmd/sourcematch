import {
    Body,
    Container,
    Head,
    Html,
    Preview,
    Section,
} from '@react-email/components';
import * as React from 'react';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { EmailHeader } from './EmailHeader';
import { EmailFooter } from './EmailFooter';

interface EmailLayoutProps {
    children: React.ReactNode;
    preview?: string;
}

export function EmailLayout({ children, preview }: EmailLayoutProps) {
    return (
        <Html>
            <Head />
            {preview && <Preview>{preview}</Preview>}
            <Body style={main}>
                <Container style={container}>
                    <EmailHeader />
                    <Section style={content}>{children}</Section>
                    <EmailFooter />
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: colors.muted,
    fontFamily: typography.fontFamily,
};

const container = {
    margin: '0 auto',
    padding: '40px 20px',
    maxWidth: '600px',
};

const content = {
    backgroundColor: colors.background,
    borderRadius: '8px',
    padding: '40px',
};
