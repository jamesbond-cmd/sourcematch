'use client'

import Script from 'next/script'

export function HubSpot() {
    return (
        <Script
            id="hs-script-loader"
            src="//js-eu1.hs-scripts.com/147328491.js"
            strategy="afterInteractive"
            async
            defer
        />
    )
}
