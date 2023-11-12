/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#FFD100",
        yellow: "#FFEE32",
        darkBlack: "#202020",
        darkGray: "#333533",
        lightGray: "#D6D6D6",
        gray: "#F0F0F0",
        lightlightGray: "#F6F7F8",
        text: "#3C4049",
      },
    },
  },
  plugins: [],
};
