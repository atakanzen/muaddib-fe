/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        funky: "-3px 3px 0 0.5px rgba(10,10,10,0.8)",
        "funky-circle": "-3px 3px 0 0.5px rgba(10,10,10,0.8)",
      },
      fontSize: {
        xss: ["0.65rem", "0.90rem"],
      },
    },
  },
  plugins: [],
};
