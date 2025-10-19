import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F62FE",
        secondary: "#111827",
        accent: "#22C55E"
      },
      fontFamily: {
        sans: ["'InterVariable'", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
