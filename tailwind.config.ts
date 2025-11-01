import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // keep this too, just in case
    "./content/**/*.{md,mdx}", // if you render MD/MDX
  ],
  theme: {
    extend: {
      // keep Tailwind's default green; use your neon as a separate palette
      colors: {
        brand: {
          300: "#66ff66",
          400: "#00ff00",
          500: "#00cc00",
          600: "#009900", // primary?
          900: "#003300",
        },
      },
      fontFamily: {
        mono: ["var(--font-space-mono)", "Courier New", "monospace"],
      },
    },
  },
  plugins: [
    // if you're using shadcn/ui animations, keep this:
    // require("tailwindcss-animate")
  ],
  // If you build dynamic classes like `bg-${color}-500`, safelist them:
  // safelist: [{ pattern: /(bg|text|border|from|via|to)-(green|brand)-(50|100|200|300|400|500|600|700|800|900)/ }],
};
export default config;
