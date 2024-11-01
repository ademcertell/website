import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.300"),
            h1: { color: theme("colors.gray.100") },
            h2: { color: theme("colors.gray.200") },
            h3: { color: theme("colors.gray.300") },
            a: { color: theme("colors.blue.600"), textDecoration: "underline" },
            strong: { color: theme("colors.gray.900") },
            blockquote: {
              color: theme("colors.gray.500"),
              borderLeftColor: theme("colors.gray.300"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.200"),
            h1: { color: theme("colors.white") },
            h2: { color: theme("colors.gray.100") },
            h3: { color: theme("colors.gray.200") },
            a: { color: theme("colors.blue.400"), textDecoration: "underline" },
            strong: { color: theme("colors.gray.200") },
            blockquote: {
              color: theme("colors.gray.400"),
              borderLeftColor: theme("colors.gray.600"),
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;