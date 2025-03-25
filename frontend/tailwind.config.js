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
      fontSize: {
        xs: "1.25rem", // 20px
        sm: "1.5rem", // 24px
        base: "2rem", // 32px
        lg: "2.25rem", // 36px
        xl: "4rem", // 64px
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
