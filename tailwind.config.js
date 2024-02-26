/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark_card: "#1c1c1e",
        light_card: "#f2f2f7",
        background_color: "#18181b",
      },
      width: {
        "163px": "163px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};