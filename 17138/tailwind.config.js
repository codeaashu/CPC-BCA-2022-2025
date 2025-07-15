/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": '#1E40AF', // Blue
        "secondary-color": '#ffe6e6',// Yellow
        "glass": 'rgba(255, 255, 255, 0.08)',
    }
  },
  },
  plugins: [],
}

