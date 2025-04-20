/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#6C63FF",   // purple/indigo (main buttons)
          accent: "#38BDF8",    // soft sky blue
          background: "#111827", // almost-black
          surface: "#1F2937",   // dark gray cards
          text: "#F9FAFB",      // white-ish text
          muted: "#9CA3AF"      // for subtext
        }
      },
    },
  },
  plugins: [],
}