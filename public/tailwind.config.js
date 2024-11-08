/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./**/*.{html,js}"],
  theme: {
    colors: {
      transparent: 'transparent',
      'background': '#170F23',
      'side_bar_background':'#231B2E'
    },
    extend: {
      textStrokeWidth: {
        '1':'1px',
        '2':'2px',
      }
    },
  },
  plugins: [
     function ({ addUtilities }) {
      addUtilities({
        '.text-stroke': {
          '-webkit-text-stroke': '1px white',
        },
        '.text-stroke-2': {
          '-webkit-text-stroke': '2px white',
        },
      })
    }, 

  ],
}

