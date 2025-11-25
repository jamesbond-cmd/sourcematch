import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#020817",
                foreground: "#F8FAFC",
                primary: {
                    DEFAULT: "#3B82F6",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#7C3AED",
                    foreground: "#FFFFFF",
                },
                muted: {
                    DEFAULT: "#1E293B",
                    foreground: "#94A3B8",
                },
                accent: {
                    DEFAULT: "#1E293B",
                    foreground: "#F8FAFC",
                },
                destructive: {
                    DEFAULT: "#EF4444",
                    foreground: "#FFFFFF",
                },
                border: "#1E293B",
                input: "#1E293B",
                ring: "#3B82F6",
            },
            boxShadow: {
                glow: "0 0 20px rgba(59, 130, 246, 0.5)",
            },
            fontFamily: {
                sans: ["var(--font-jakarta)"],
                heading: ["var(--font-outfit)"],
            },
        },
    },
    plugins: [],
};
export default config;
