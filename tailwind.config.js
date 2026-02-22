/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        abyssal: "#0d1f17",
        "abyssal-light": "#132a1f",
        cream: "#f5f0e8",
      },
    },
  },
  plugins: [],
};
