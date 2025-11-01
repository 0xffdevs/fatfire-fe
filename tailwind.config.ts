import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          300: "#66ff66",
          400: "#00ff00",
          500: "#00cc00",
          600: "#009900",
          900: "#003300",
        },
      },
      fontFamily: {
        mono: ["var(--font-space-mono)", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
