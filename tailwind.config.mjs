/** @type {import("tailwindcss").Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{json}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: "#fffaf2",
          100: "#f8f2e8",
          200: "#f3eee5",
        },
        graphite: "#24251f",
        graphiteSoft: "#2f302b",
        copper: "#b46a3c",
        olive: "#596342",
        muted: "#777365",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-instrument)", "Georgia", "serif"],
      },
      borderRadius: {
        card: "8px",
      },
      boxShadow: {
        lab: "0 24px 70px rgba(47, 48, 43, 0.08)",
        copper: "0 18px 42px rgba(180, 106, 60, 0.24)",
      },
      backgroundImage: {
        grain: "url('/placeholders/grain.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
