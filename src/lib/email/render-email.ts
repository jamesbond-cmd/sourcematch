import { render } from '@react-email/render';
import * as React from 'react';

/**
 * Renders a React Email component to HTML string
 * @param component - React Email component to render
 * @returns HTML string ready to send via email
 */
export async function renderEmail(component: React.ReactElement): Promise<string> {
    return await render(component, {
        pretty: false, // Minify for production
    });
}
