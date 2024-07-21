/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Look for Tailwind classes in JS/TS files
    './public/index.html', // Look for Tailwind classes in your HTML file
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
