
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
          DEFAULT: "#5B73F5", // Main blue from logo
          foreground: "#ffffff",
          25: "#f8faff",
          50: "#f0f4ff",
          100: "#e0eaff",
          200: "#c7d8ff",
          300: "#a3bfff",
          400: "#7a9bff",
          500: "#5B73F5", // Main blue
          600: "#4c5ee5",
          700: "#3d49d4",
          800: "#323bb8",
          900: "#2a3394",
        },
        secondary: {
          DEFAULT: "#f8faff",
          foreground: "#2a3394",
        },
        muted: {
          DEFAULT: "#f1f5fb",
          foreground: "#64748b",
        },
        accent: {
          DEFAULT: "#5B73F5",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#2a3394",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#2a3394",
        },
        success: {
          DEFAULT: "#10b981",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#f59e0b",
          foreground: "#ffffff",
        },
        slate: {
          25: "#fcfcfd",
        },
      },
      gridTemplateColumns: {
        '25': 'repeat(25, minmax(0, 1fr))',
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
          "0%, 100%": { backgroundColor: "#5B73F5" },
          "50%": { backgroundColor: "#7a9bff" },
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
        'card': '0 4px 6px -1px rgba(91, 115, 245, 0.1), 0 2px 4px -1px rgba(91, 115, 245, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(91, 115, 245, 0.1), 0 4px 6px -2px rgba(91, 115, 245, 0.05)',
        'elevation': '0 20px 25px -5px rgba(91, 115, 245, 0.1), 0 10px 10px -5px rgba(91, 115, 245, 0.04)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
