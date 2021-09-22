module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'comic': ['Comic Neue']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
