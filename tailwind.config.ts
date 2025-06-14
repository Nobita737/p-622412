
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1A3E5C", // Deep blue
          foreground: "#ffffff",
          50: "#f0f7ff",
          100: "#e0efff",
          200: "#b8dcff",
          300: "#7bb8ff",
          400: "#3693ff",
          500: "#0066CC", // Accent blue
          600: "#0052a3",
          700: "#004085",
          800: "#003366",
          900: "#1A3E5C", // Deep blue
        },
        secondary: {
          DEFAULT: "#f8fafc",
          foreground: "#1A3E5C",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#475569",
        },
        accent: {
          DEFAULT: "#0066CC", // Accent blue
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1A3E5C",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1A3E5C",
        },
        success: {
          DEFAULT: "#059669",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#d97706",
          foreground: "#ffffff",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-blue": {
          "0%, 100%": { backgroundColor: "#0066CC" },
          "50%": { backgroundColor: "#3693ff" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "pulse-blue": "pulse-blue 2s infinite",
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(26, 62, 92, 0.1), 0 2px 4px -1px rgba(26, 62, 92, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(26, 62, 92, 0.1), 0 4px 6px -2px rgba(26, 62, 92, 0.05)',
        'elevation': '0 20px 25px -5px rgba(26, 62, 92, 0.1), 0 10px 10px -5px rgba(26, 62, 92, 0.04)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
