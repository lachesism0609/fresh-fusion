/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black": "#000000",
        "pink700": "#be185d",
        "pink600": "#B05366",
        "white": "#ffffff",
      },
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
        'josefin': ['Josefin Sans', 'sans-serif']
      },
      fontSize: {
        'xl': ['1.25rem', { lineHeight: 'normal' }],
        '5xl': ['3rem', { lineHeight: 'normal' }],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
      },
    },
  },
  plugins: [],
}

