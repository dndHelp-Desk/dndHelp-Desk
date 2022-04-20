module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "520px",
      md: "768px",
      lg: "1024px",
      xl: "1160px",
      "2xl": "1350px",
      "3xl": "1700px",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Manrope", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
