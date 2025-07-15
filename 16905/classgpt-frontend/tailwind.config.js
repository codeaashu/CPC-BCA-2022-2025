/** @type {import('tailwindcss').Config} */


module.exports = {
  darkMode: 'class', // ✅ mandatory!
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0d0c1d',
        card: '#1a182d',
        primary: '#8b5cf6',
      },
    },
  },
  plugins: [],
};
