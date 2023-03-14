/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#eaeaea",
          200: "#5e2e53",
          300: "#e1a1e9",
          400: "#000000",
        },
        extra: {
          100: "#431567",
          200: "#E856EB",
          300: "#913693",
        },
      },
    },
  },
  plugins: [],
};
