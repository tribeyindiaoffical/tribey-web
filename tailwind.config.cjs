module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FFAC59',
          navy: '#025277',
          teal: '#3883A3',
          surface: '#F9F9FB'
        }
      }
    }
  },
  plugins: []
}
