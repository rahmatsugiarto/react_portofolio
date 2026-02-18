/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#2563EB", // Hyper Blue for accents
        "background-light": "#FAFAFA", // Warm White
        "background-dark": "#050505", // Deep Matte Black
        "surface-light": "#F4F4F5", // Zinc 100
        "surface-dark": "#121212", // Just off-black
        "card-light": "#ffffff",
        "card-dark": "#1A1A1A",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"],
        "body": ["Inter", "sans-serif"],
      },
      borderRadius: { "lg": "0.5rem", "xl": "1rem", "2xl": "1.5rem" },
      letterSpacing: {
        "tighter": "-0.05em",
        "tight": "-0.025em",
      }
    },
  },
  plugins: [],
}

