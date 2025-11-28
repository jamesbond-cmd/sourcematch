import { Section as ReactEmailSection } from '@react-email/components';
import * as React from 'react';

interface EmailSectionProps {
    children: React.ReactNode;
    backgroundColor?: string;
}

export function EmailSection({ children, backgroundColor }: EmailSectionProps) {
    return (
        <ReactEmailSection style={{ ...section, backgroundColor }}>
            {children}
        </ReactEmailSection>
    );
}

const section = {
    marginBottom: '24px',
};
