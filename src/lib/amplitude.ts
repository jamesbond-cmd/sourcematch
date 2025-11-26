'use client';

import * as amplitude from '@amplitude/analytics-browser';

function initAmplitude() {
    if (typeof window !== 'undefined') {
        amplitude.init('e7116b7cdc4b49859f32b6c5756b7505', {
            autocapture: true,
            serverZone: 'EU'
        });
    }
}

initAmplitude();

export const Amplitude = () => null;
export default amplitude;
