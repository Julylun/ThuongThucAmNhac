/** @type {import('tailwindcss').Config} */
module.exports = {
  content:["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      Nunito: ['Nunito'],
    },
    colors: {
      transparent: 'transparent',
      'background': '#170F23',
      'side_bar_background':'#231B2E'
    },
    extend: {
      dropShadow: {
        'pink-sm': '0px 3px 7px rgba(166, 54, 110, 0.15)'
      },
      height: {
        '0.1':'0.01rem',
        '0.2':'0.025rem', 
        '0.3':'0.05rem',
        '25':'5.5rem',
        '26':'6rem',
        '27':'6.5rem',
        '28':'7rem',
        '29':'7.5rem',
        '30':'8rem',
        '100':'30rem',
        '103':'34rem'
      },
      textStrokeWidth: {
        '1':'1px',
        '2':'2px',
      },
      borderWidth: {
        '1.5':'1.5px',

      },
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

