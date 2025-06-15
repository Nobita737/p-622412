
import type { Config } from "tailwindcss";

// Palette derived from Campayn logo (Teal/Aqua: #37C8AB, Navy: #203149, White, Greys)
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
        background: {
          DEFAULT: "#f6fcfa",
          50: "#f6fcfa",
        },
        foreground: "#203149",
        // Main Campayn Teal (Logo): #37C8AB
        primary: {
          DEFAULT: "#37C8AB",
          foreground: "#ffffff",
          25: "#e6faf4",
          50: "#d0f5ec",
          100: "#baf0e4",
          200: "#87e4d0",
          300: "#53d7bb",
          400: "#37c8ab", // Logo base
          500: "#2dad95",
          600: "#20997f",
          700: "#18866c",
          800: "#146759",
          900: "#203149",
        },
        // Campayn Navy: #203149
        secondary: {
          DEFAULT: "#203149",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#20b8c6", // A vivid aqua accent drawn from logo gradients.
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#e6f3f1",
          foreground: "#57696c",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#203149",
        },
        destructive: {
          DEFAULT: "#F04438",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#203149",
        },
        success: {
          DEFAULT: "#53D7BB",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#F5C244",
          foreground: "#203149",
        },
        slate: {
          25: "#fcfcfd",
          50: "#f8fafc",
          100: "#eef3f4",
          200: "#dbe9ea",
          300: "#b9d8d9",
          400: "#81bfbf", // For borders
          500: "#719fab",
          600: "#517989",
          700: "#365060",
          800: "#24303a",
          900: "#20262c",
        },
      },
      fontFamily: {
        // Add a modern rounded font stack (Roboto/Inter/Fallback)
        'sans': ['Inter', 'Roboto', 'Arial', 'Helvetica', 'sans-serif'],
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
        "pulse-campayn": {
          "0%, 100%": { backgroundColor: "#37C8AB" },
          "50%": { backgroundColor: "#20b8c6" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "pulse-campayn": "pulse-campayn 2s infinite",
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(32,49,73,0.07), 0 2px 4px -1px rgba(32,49,73,0.04)',
        'card-hover': '0 10px 15px -3px rgba(32,49,73,0.10), 0 4px 6px -2px rgba(32,49,73,0.03)',
        'elevation': '0 20px 25px -5px rgba(32,49,73,0.10), 0 10px 10px -5px rgba(32,49,73,0.04)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

