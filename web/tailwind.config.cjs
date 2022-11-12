/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
    './index.html'
  ],
  theme: {
    extend: {
      colors:{
        'duosy-black-400': '#2B2B2B',
        'duosy-black-500': '#18181B',
        'duosy-red-300': '#F56476',
        'duosy-red-400': '#E43F6F',
        'duosy-red-500': '#BE3E82',
        'duosy-violet-300': '#CFBCDF',
        'duosy-violet-400': '#AB87FF',
        'duosy-beige-400': '#DFBBB1',
        'duosy-blue-400': '#94ECD3',
        'duosy-blue-500': '#020024',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        blackGradient: 'linear-gradient(180deg, #020024 , #18181B )',
      },
      animation: {
        fade: 'fade 1s ease-in-out',
        slideup: 'slideup 1s ease-in-out',
        slidedown: 'slidedown 1s ease-in-out',
        slideright: 'slideright 1s ease-in-out',
        slideleft: 'slideleft 1s ease-in-out',
        ball: 'ball 0.5s ease infinite alternate',
      },
      keyframes: {
        fade: {
          from: { opacity: 0},
          to: { opacity: 1}
        },
        slideup: {
          from: { opacity: 0, transform: 'translateY(25%)'},
          to: { opacity: 1, transform: 'none' }
        },
        slidedown: {
          from: { opacity: 0, transform: 'translateY(-25%)'},
          to: { opacity: 1, transform: 'none' }
        },
        slideright: {
          from: { opacity: 0, transform: 'translateX(-100%)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideleft: {
          from: { opacity: 1, transform: 'translateX(0)' },
          to: { opacity: 0, transform: 'translateX(-100%)' },
        },
        ball: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}
