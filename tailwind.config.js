/** @type {import('tailwindcss').Config} */
export default {
  content: [ './index.html','./src/App.jsx', './src/components/Tab.jsx', './src/components/Buttons.jsx', './src/components/Display.jsx', './src/Calculator.jsx'],
  theme: {
    extend: {
      colors: {
        'calculator-lightBg': '#F7F8FB',
        'calculator-darkBg': '#17181A',
      }
    },
  },
  plugins: [],
}

