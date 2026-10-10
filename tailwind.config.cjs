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
          orange: '#C2410C',
          navy: '#18181B',
          teal: '#C2410C',
          surface: '#F4F5F7'
        }
      }
    }
  },
  plugins: []
}
