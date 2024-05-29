/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html}",
  ],
  theme: {
    extend: {
      colors: {
        'main': '#034AA6',
        'sub': '#F29F8D',
        'dark': '#020307',
        'light': '#E9EAF6',
        'mainScale': {
          'sub': '#8a95ce',
        },
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
}

