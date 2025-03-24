/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        shadow: "#333333",
        midtone: "#666666",
        accent: "#999999",
        highlight: "#FFFFFF",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      noto: ["Noto Sans TC", "sans-serif"],
      orbitron: ["Orbitron", "sans-serif"],
    },
  },
  plugins: [],
};
