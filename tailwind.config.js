/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "background-2": "url('/src/assets/pokemon-bg2.jpg')",
      },
    },
  },
  plugins: [],
};
