/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',      // Midnight Blue - trust, professionalism
        accent: '#3B82F6',       // Electric Blue - innovation, tech sophistication
        success: '#10B981',      // Emerald Green - growth, active systems
        purple: '#7C3AED',       // Deep Purple - AI/Agent branding
        warning: '#d97706',      // Warning amber (Amber-600)
        slate: '#64748B',        // Slate Gray - secondary text
        'light-gray': '#F8FAFC', // Light Gray - backgrounds
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}