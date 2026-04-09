import { hex } from 'framer-motion';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#ffae00",
                "background-light": "#f8f7f5",
                "background-dark": "#0a0a0b",
                "accent-blue": "#00d2ff",
                "accent-red":"#FF0000",
                "accent-orange":"#FFA500",
                "accent-purple": "#9d50bb",
            },
            fontFamily: {
                "sans": ["Inter", "sans-serif"],
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}
