import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        display: ["Playfair Display", ...defaultTheme.fontFamily.serif],
        handwriting: ["Shadows Into Light", ...defaultTheme.fontFamily.serif],
      },
      backgroundImage: {
        "scenic-view":
          "url('https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg')",
        connected:
          "url('https://images.pexels.com/photos/7832620/pexels-photo-7832620.jpeg')",
      },
      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.25)",
        DEFAULT: "2px 2px 6px rgba(0, 0, 0, 0.8)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.75)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwindcss-textshadow"),
  ],
} satisfies Config;
