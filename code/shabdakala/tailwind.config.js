module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {colors: {
      'custom-light-gray': '#efefe6',
      'custom-dark-gray': '#5a594e',
    },},
    fontFamily: {
      karnak: ['NYTKarnakCondensed', 'sans-serif'], // Add custom font here
    },
  },
  plugins: [],
}
