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
        "ira-teal": "var(--teal)",
        "ira-gold": "var(--gold)",
        "ira-ivory": "var(--ivory)",
        "ira-pale-teal": "var(--pale-teal)",
        "ira-gold-beige": "var(--gold-beige)",
        "ira-text": "var(--text-dark)",
        "ira-muted": "var(--text-muted)",
        "ira-border": "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-cormorant-normal)", "var(--font-cormorant-italic)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
