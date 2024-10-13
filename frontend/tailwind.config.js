/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royalBlue: '#1E3A8A', // Primary Color
        white: '#FFFFFF',     // Secondary Color
        gold: '#FFD700',      // Accent Color 1
        yellowAccent: '#FFCC00', // Accent Color 2 (alternative)
      },
    },
  },
  plugins: [],
}

