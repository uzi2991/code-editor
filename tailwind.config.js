/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        code: 'Fira Code'
      },
      colors: {
        css: '#1572B6',
        html: '#E44D26',
        javascript: '#F0DB4F'
      }
    }
  },
  plugins: []
};
