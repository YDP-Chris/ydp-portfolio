/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./index.jsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['SF Mono', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', 'monospace']
      }
    },
  },
  plugins: [],
}