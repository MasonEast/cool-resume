const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
    },
    fontSize: {
      localxs: "0.5rem",
      lg: "1.1rem",
      xl: "1.2rem",
      "2xl": "1.3rem",
    },
    boxShadow: {
      xl: "0 0 5px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
