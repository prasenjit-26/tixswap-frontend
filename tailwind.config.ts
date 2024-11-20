import { nextui } from "@nextui-org/react";
import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      padding: "2rem",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-primary)"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
