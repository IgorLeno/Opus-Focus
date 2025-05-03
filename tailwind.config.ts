import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        cinzel: ["var(--font-cinzel)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        aoe: {
          gold: "#d4b374",
          darkBrown: "#2a2416",
          lightBrown: "#3a3426",
          darkBlue: "#0a1929",
          panel: "#0f2135",
          border: "#3a4b5c",
          light: "#e0e0e0",
          muted: "#8a9bab",
          button: "#1a3045",
          buttonHover: "#254055",
          black: "#0d1117",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundColor: {
        "aoe-dark-blue": "var(--aoe-dark-blue)",
        "aoe-panel": "var(--aoe-panel)",
        "aoe-button": "var(--aoe-button)",
        "aoe-button-hover": "var(--aoe-button-hover)",
      },
      textColor: {
        "aoe-gold": "var(--aoe-gold)",
        "aoe-light": "var(--aoe-light)",
        "aoe-muted": "var(--aoe-muted)",
      },
      borderColor: {
        "aoe-border": "var(--aoe-border)",
        "aoe-gold": "var(--aoe-gold)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
