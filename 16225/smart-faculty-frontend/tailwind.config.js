module.exports = {
  darkMode: "class", // ✅ VERY IMPORTANT
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F97316",
        dark: "#1E293B",
        light: "#F1F5F9",
      },
    },
  },
  plugins: [],
};
