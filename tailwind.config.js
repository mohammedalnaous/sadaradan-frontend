/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,ts,jsx,tsx}'], // ✅ Full project scan
  safelist: ['animate-spin-slow'],     // ✅ Force this class to be included
  theme: {
    extend: {
      colors: {
        gold: '#C8A165',
        golden: '#FFD700'
      },
      keyframes: {
        'car-from-left': {
          '0%': { left: '-400px', opacity: '0.1' },
          '50%': { opacity: '1' },
          '100%': { left: '100vw', opacity: '0' }
        },
        'car-from-right': {
          '0%': { left: '100vw', opacity: '0.1' },
          '50%': { opacity: '1' },
          '100%': { left: '-400px', opacity: '0' }
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'car-from-left': 'car-from-left 4s ease-in-out forwards',
        'car-from-right': 'car-from-right 4s ease-in-out forwards',
        'spin-slow': 'rotate-slow 6s linear infinite'
      }
    }
  },
  plugins: []
};
