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
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      /* App color palette: 0A0908 Text | F2F4F3 Text/Bg | 22333B Accent | A9927D 5E503F Borders */
      colors: {
        'text-primary': '#0A0908',
        'text-background': '#F2F4F3',
        'accent-header': '#22333B',
        'border-accent': '#A9927D',
        'border-accent-dark': '#5E503F',
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F2F4F3',
        'text-secondary': '#6B7280',
        'border-color': '#A9927D',
        'error': '#EF4444',
        'success': '#10B981',
        'warning': '#F59E0B',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'base': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
export default config;