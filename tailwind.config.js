/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'youtube-black': '#0F0F0F',
        'youtube-gray': '#272727',
        'youtube-gray-hover': '#3F3F3F',
        'youtube-red': '#FF0000',
      },
      animation: {
        'welcome': 'welcome 1.5s ease-in-out',
        'fade-in': 'fade-in 1s ease-in-out',
        'blink-new': 'blink-new 1s ease-in-out infinite',
      },
      keyframes: {
        welcome: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'blink-new': {
          '0%, 100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0',
            transform: 'scale(0.95)'
          },
        },
      },
    },
  },
  plugins: [],
} 