import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Editorial Cartography color system
        ink:          "#0A1628",
        paper:        "#FBF7F0",
        "paper-warm": "#F4ECE0",
        "blue-deep":  "#1E40AF",
        "blue-bright":"#3B82F6",
        "blue-sky":   "#DBEAFE",
        "gold-leaf":  "#C4873B",
        "gold-accent":"#FCD34D",
        ruby:         "#B91C1C",
        moss:         "#166534",
        // Legacy bluespot aliases for data components
        bluespot: {
          DEFAULT: "#1E40AF",
          50:  "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        accent: {
          DEFAULT: "#FCD34D",
          50:  "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
        },
        bg: "#FBF7F0",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        garamond: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Pretendard Variable", "Pretendard", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
      },
      letterSpacing: {
        "wider-mono": "0.05em",
      },
      backgroundImage: {
        "contour-pattern": "url('/contour-pattern.svg')",
        "paper-texture": "url('/paper-texture.svg')",
      },
      boxShadow: {
        "ink-sm":  "0 1px 4px rgba(10,22,40,0.12)",
        "ink-md":  "0 4px 16px rgba(10,22,40,0.12)",
        "ink-lg":  "0 12px 40px rgba(10,22,40,0.15)",
        "gold":    "0 0 0 1px #C4873B, 0 4px 16px rgba(196,135,59,0.18)",
      },
      animation: {
        "reveal-up":       "reveal-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "reveal-fade":     "reveal-fade 0.6s ease-out both",
        "contour-draw":    "contour-draw 2.4s ease-out both",
        "pulse-marker":    "pulse-marker 2.2s ease-in-out infinite",
        "gold-shimmer":    "gold-shimmer 3s ease-in-out infinite",
        "underline-draw":  "underline-draw 0.35s ease-out forwards",
      },
      keyframes: {
        "reveal-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-fade": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "contour-draw": {
          "0%":   { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "pulse-marker": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%":      { transform: "scale(1.25)", opacity: "1" },
        },
        "gold-shimmer": {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
        "underline-draw": {
          "0%":   { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
