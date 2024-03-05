import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react(), visualizer()],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      '@tauri/': `${path.resolve(__dirname, 'src-tauri')}/`
    }
  },
  envPrefix: [
    'VITE_',
    'TAURI_PLATFORM',
    'TAURI_ARCH',
    'TAURI_FAMILY',
    'TAURI_PLATFORM_VERSION',
    'TAURI_PLATFORM_TYPE',
    'TAURI_DEBUG'
  ],
  server: {
    port: 1421,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**']
    }
  },
  build: {
    target: ['es2021', 'chrome100', 'safari13'],
    minify: (process.env.TAURI_DEBUG ? false : 'esbuild') as 'esbuild' | boolean,
    sourcemap: !!process.env.TAURI_DEBUG
  }
}))
