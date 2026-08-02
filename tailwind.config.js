/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fdf3e4",
        ink: "#1c0b0d",
        primary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        gold: {
          50: "#fefbea",
          100: "#fdf4c9",
          200: "#fce897",
          300: "#fad654",
          400: "#f5c518",
          500: "#d4a017",
          600: "#b9860a",
          700: "#946409",
          800: "#7a5310",
          900: "#664713",
          950: "#3a2606",
        },
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        body: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 24px rgba(28, 11, 13, 0.06)",
        card: "0 16px 40px rgba(28, 11, 13, 0.1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
        fadeUp: "fadeUp 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "spin-slow": "spin-slow 2.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
