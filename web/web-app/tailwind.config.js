/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}",
    "./src/components/elements/*.{js, ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    //require("@tailwindcss"),
  ],
}
