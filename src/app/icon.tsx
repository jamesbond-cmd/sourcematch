import { ImageResponse } from "next/og"

// Image metadata
export const size = {
    width: 32,
    height: 32,
}
export const contentType = "image/png"

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: "transparent",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "3px",
                }}
            >
                {/* Top Pill - Blue */}
                <div
                    style={{
                        width: "100%",
                        height: "6px",
                        borderRadius: "9999px",
                        background: "#3b82f6", // blue-500
                    }}
                />
                {/* Middle Pill - Indigo (Primary) */}
                <div
                    style={{
                        width: "100%",
                        height: "6px",
                        borderRadius: "9999px",
                        background: "#4F46E5", // primary
                    }}
                />
                {/* Bottom Pill - Purple (Secondary) */}
                <div
                    style={{
                        width: "75%", // w-3/4
                        height: "6px",
                        borderRadius: "9999px",
                        background: "#7C3AED", // secondary
                        alignSelf: "flex-start", // Align to left like the logo
                    }}
                />
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
        }
    )
}
