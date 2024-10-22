/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        funky: "-3px 3px 0 0.5px rgba(10,10,10,0.8)",
        "funky-circle": "-3px 3px 0 0.5px rgba(10,10,10,0.8)",
      },
    },
  },
  plugins: [],
};
