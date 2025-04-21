/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // LIGHT MODE (default)
          primary: "#6C63FF",        // main accent purple
          accent: "#38BDF8",         // soft sky blue
          background: "#F9FAFB",     // light background
          surface: "#FFFFFF",        // card/section surface
          text: "#111827",           // dark text
          muted: "#6B7280",          // light subtext

          // DARK MODE
          dark: {
            primary: "#6C63FF",
            accent: "#38BDF8",
            background: "#111827",
            surface: "#1F2937",
            text: "#F9FAFB",
            muted: "#9CA3AF",
          }
        }
      },
    },
  },
  plugins: [],
};
