import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F5F5F5",
          100: "#E5E5E5",
          600: "#14213D",
          700: "#000000",
          900: "#000000",
        },
        accent: {
          50: "#FEF3E6",
          100: "#FCEA99",
          400: "#FCA311",
          500: "#FCA311",
          600: "#E08D00",
          700: "#CC7700",
        },
        "text-primary": "#000000",
        "text-background": "#FFFFFF",
        "accent-header": "#14213D",
        "border-accent": "#FCA311",
        "border-accent-dark": "#000000",
        "bg-primary": "#FFFFFF",
        "bg-secondary": "#E5E5E5",
        "border-color": "#E5E5E5",
        "text-secondary": "#666666",
        success: "#10B981",
        pending: "#F59E0B",
      },
      fontFamily: {
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
        poppins: ["'Poppins'", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1.5" }],
        sm: ["14px", { lineHeight: "1.5" }],
        base: ["16px", { lineHeight: "1.5" }],
        lg: ["18px", { lineHeight: "1.5" }],
        xl: ["20px", { lineHeight: "1.3" }],
        "2xl": ["24px", { lineHeight: "1.3" }],
        "3xl": ["32px", { lineHeight: "1.2" }],
        "4xl": ["40px", { lineHeight: "1.1" }],
        "5xl": ["48px", { lineHeight: "1.1" }],
        "6xl": ["56px", { lineHeight: "1.0" }],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "48px",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
        sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
        md: "0 4px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
export default config;