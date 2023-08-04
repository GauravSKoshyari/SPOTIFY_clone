/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],   // this tells tailwind to look for html and js files in src folder 
  theme: {
    extend: {
      colors: {          // these hex codes are taken from spotify design guidelines ; tailwind will use this value of green , when u use class like bg-green , text-gray ,etc 
        "green": "#1DB954",
        "black-base": "#121212",
        "black-primary": "#191414",
        "black-secondary": "#171818",
        "light-black": "#282828",
        "primary": "#FFFFFF",
        "secondary": "#b3b3b3",
        "gray": "#535353"
      },
      gridTemplateColumns: {            // custom class in tailwind 
        'auto-fill-cards': 'repeat(auto-fill, minmax(200px, 1fr))'
      },

    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],      // restricts no of lines 
}
