import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import checker from 'vite-plugin-checker'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		react(),
		!process.env.VITEST ? checker({ typescript: true }) : undefined,
		legacy({
      targets: ['defaults', 'not IE 11'],
    }),
	],
})
