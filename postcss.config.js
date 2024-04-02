module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-svgo': {

      plugins: [
        { removeViewBox: true },
        { removeDimensions: true }
      ]
    }
  }
}
