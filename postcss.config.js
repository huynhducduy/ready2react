import autoprefixer from 'autoprefixer'
// eslint-disable-next-line import-x/default, import-x/no-named-as-default, import-x/no-named-as-default-member -- import-x error
import calc from 'postcss-calc'
import flexbugsFixes from 'postcss-flexbugs-fixes'
import presetEnv from 'postcss-preset-env'

export default () => {
  return {
    plugins: [
      flexbugsFixes,
      presetEnv({
        stage: 1,
      }),
      autoprefixer,
      calc,
      // require('postcss-inline-svg') // Use svg in css instead of react component?
      // require('postcss-normalize'), // Already using modern-normalize, or consider using postcss-initial + postcss-autoreset ?
      // require('cssnano'), // Vite already using esbuild minify
      // process.env.NODE_ENV === 'production'
      //   ? require('postcss-logical')({
      //       blockDirection: 'left-to-right',
      //       inlineDirection: 'top-to-bottom',
      //     })
      //   : false,
    ].filter(Boolean),
  }
}
