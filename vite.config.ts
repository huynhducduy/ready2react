import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// eslint-disable-next-line import/default
import checker from 'vite-plugin-checker'
import legacy from '@vitejs/plugin-legacy'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath, URL } from 'url'
import packageJson from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    process.env.VITEST
      ? undefined
      : checker({
          typescript: true,
          eslint: {
            lintCommand: packageJson.scripts['lint:script'],
          },
          // TODO: enable stylelint
          // stylelint: {
          //   lintCommand: packageJson.scripts['lint:style'],
          // },
        }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    svgr({
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          floatPrecision: 2,
        },
      },
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: fileURLToPath(new URL('src', import.meta.url)) }],
  },
})
