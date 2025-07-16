// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#121212",      // dark background
        secondary: "#1e1e1e",    // slightly lighter
        accent: "#f43f5e",       // rose-500 (for buttons)
        textLight: "#ffffff",    // text color
        textMuted: "#cbd5e1",    // slate-300
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
