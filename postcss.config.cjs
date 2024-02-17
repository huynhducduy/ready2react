module.exports = api => {
  return {
    plugins: [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        stage: 1,
      }),
      require('autoprefixer'),
      // require('postcss-normalize'), // Already using modern-normalize
      // require('cssnano'), // Already using esbuild minify
    ].filter(Boolean),
  }
}
