import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: "10px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
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
          light01: "hsl(var(--primary-light-01))",
          light02: "hsl(var(--primary-light-02))",
          normal01: "hsl(var(--primary-normal-01))",
          normal02: "hsl(var(--primary-normal-02))",
          normal03: "hsl(var(--primary-normal-03))",
          dark01: "hsl(var(--primary-dark-01))",
          dark02: "hsl(var(--primary-dark-02))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          light02: "hsl(var(--secondary-light-02))",
          light03: "hsl(var(--secondary-light-03))",
          main: "hsl(var(--secondary-main))",
          normal01: "hsl(var(--secondary-normal-01))",
          normal02: "hsl(var(--secondary-normal-02))",
          dark01: "hsl(var(--secondary-dark-01))",
          dark02: "hsl(var(--secondary-dark-02))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        tertiary: {
          1: "hsl(var(--tertiary-01))",
          2: "hsl(var(--tertiary-02))",
          3: "hsl(var(--tertiary-03))",
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
        green: {
          DEFAULT: "hsl(var(--green))",
          normal01: "hsl(var(--green-normal-01))",
        },
        star: "hsl(var(--star))",
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
    },
  },
  plugins: [tailwindcssAnimate],
};
