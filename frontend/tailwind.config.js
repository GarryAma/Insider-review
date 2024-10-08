import { M } from "vite/dist/node/types.d-aGj9QkWt";

/** @type {import('tailwindcss').Config} */
export default {
  safelist: ["bg-[rgb(71,147,233)]"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#F7F8F9",
        primary: "#222222",
        accent: "#34495E",
      },
    },
  },
  plugins: [],
};
