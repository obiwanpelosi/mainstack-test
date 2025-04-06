/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#EFF1F6",
          400: "#56616B",
        },
        primary: "#131316",
        "primary-hover": "#333333",
        jade: {
          100: "#E3FCF2",
          500: "#075132",
        },
        red: {
          100: "#F9E3E0",
          400: "#961100",
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
