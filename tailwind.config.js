/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      colors: {
        forest: {
          50:  '#f0f7f0',
          100: '#d9edd9',
          200: '#b3dbb3',
          300: '#7ec27e',
          400: '#4ea34e',
          500: '#2d7d2d',   // main brand green
          600: '#236023',
          700: '#1c4d1c',
          800: '#163c16',
          900: '#0f2b0f',
          950: '#081508',
        },
      },
    },
  },
  plugins: [],
}
