/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx'
  ],
  theme: {
    extend: {
      colors: {
        'purple-blue': '#6366F1',
        'dark-purple-blue': '#494ce5'
      }
    }
  },
  plugins: []
}
