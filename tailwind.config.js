/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070b16',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155'
        },
        cyan: {
          400: '#38bdf8',
          500: '#0ea5e9'
        },
        violet: {
          500: '#8b5cf6',
          600: '#7c3aed'
        }
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
