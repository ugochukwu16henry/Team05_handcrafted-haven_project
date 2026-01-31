import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'text-primary': '#0A0908',
        'text-background': '#F2F4F3',
        'accent-header': '#22333B',
        'border-accent': '#A9927D',
        'border-accent-dark': '#5E503F',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'slide-in': 'slideIn 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;