/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        shadow3: "#000000",
        shadow2: "#B1AABF",
        shadow: "#20591E",
        midtone: "#1A8C16",
        accent: "#0DF205",
        highlight: "#FFFFFF",
      },
      fontSize: {
        xxxs: "0.625rem", // 10px
        xxs: "1rem", // 16px
        xs: "1.25rem", // 20px
        sm: "1.5rem", // 24px
        base: "2rem", // 32px
        lg: "2.25rem", // 36px
        xlg: "2.5rem", // 40px
        lgg: "3.125rem", //50px
        xl: "4rem", // 64px
      },
      fontWeight: {
        regualar: 400,
        medium: 500,
        semibold: 590,
        extrabold: 800,
      },
    },
    fontFamily: {
      sf: ["SF Pro Display", "sans-serif"],
      cy: ["ChenYuluoyan", "sans-serif"],
      cy2: ["ChenYuluoyan2", "sans-serif"],
      han: ["Hannotate", "sans-serif"],
    },
  },
  plugins: [],
  darkMode: "class",
};
