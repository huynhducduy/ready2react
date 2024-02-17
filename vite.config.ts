import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import legacy from '@vitejs/plugin-legacy'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    process.env.VITEST
      ? undefined
      : checker({
          typescript: true,
          eslint: {
            lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
          },
          // TODO: enable stylelint
          // stylelint: {
          //   lintCommand: 'stylelint ./src/**/*.{scss,sass,css}',
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
