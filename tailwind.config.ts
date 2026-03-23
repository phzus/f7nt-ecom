import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          red: "#ae0303",
          "red-cta": "#f72c3d",
          "red-bright": "#ff0000",
          "cart-badge": "#fa2d2d",
          "neon-green": "#00ff00",
          "neon-yellow": "#e3fc02",
          cyan: "#00fced",
        },
        page: {
          bg: "#f2f2f2",
          "bg-dark": "#1a1a1a",
        },
        surface: {
          DEFAULT: "#ffffff",
          dark: "#1a1a1a",
        },
        text: {
          DEFAULT: "#1a1a1a",
          muted: "rgba(26,26,26,0.75)",
          gray: "#8e8e8e",
          "dark-gray": "#555555",
        },
        border: {
          light: "#f0f0f0",
        },
        // Color schemes from Shopify theme
        scheme: {
          "1-bg": "#f2f2f2",
          "1-btn": "#000000",
          "2-bg": "#000000",
          "2-btn": "#fa2d2d",
          "4-bg": "#ae0303",
          "4-btn": "#e3fc02",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        "10": "10px",
        "13": "13px",
        "14": "14px",
        "15": "15px",
        "16": "16px",
        "18": "18px",
        "22": "22px",
        "25": "25.2px",
        "40": "40px",
        "46": "46px",
        "48": "48px",
        "56": "56px",
        "72": "72.8px",
      },
      maxWidth: {
        container: "1200px",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "750px",
        lg: "990px",
        xl: "1200px",
        "2xl": "1440px",
      },
      boxShadow: {
        card: "0 4px 15px rgba(0,0,0,0.08)",
        "card-hover": "0 8px 20px rgba(0,0,0,0.12)",
        "testimonial-hover": "0 10px 25px rgba(0,0,0,0.05)",
        faq: "0 4px 6px rgba(0,0,0,0.02)",
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        "pulse-green": "pulse-green 2s ease-in-out infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out forwards",
        "slide-up": "slide-up 0.3s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { left: "-100%" },
          "100%": { left: "150%" },
        },
        "pulse-green": {
          "0%, 100%": {
            boxShadow: "0 0 5px #00ff00, 0 0 10px #00ff00",
          },
          "50%": {
            boxShadow: "0 0 15px #00ff00, 0 0 30px #00ff00, 0 0 45px #00cc00",
          },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
