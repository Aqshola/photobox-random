/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add custom colors to match the frame theme
        'photo-pink': '#FF6B9D',
        'photo-blue': '#4DABF7',
        'photo-purple': '#9775FA',
        'photo-green': '#69DB7C',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
