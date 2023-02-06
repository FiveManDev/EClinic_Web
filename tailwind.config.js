/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  corePlugins: {
    preflight: false
  },
  theme: {
    fontFamily: {
      primary: ['"Lexend Deca"', "sans-serif"]
    },
    extend: {
      colors: {
        primary: "#024ED5",
        error: "#d32f2f",
        h1: "#2E2C49"
      }
    }
  },
  plugins: [require("@tailwindcss/line-clamp")]
}
