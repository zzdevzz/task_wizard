import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This will enable access from the network
    port: 5173,
  },
  build: {
    outDir: 'dist', // Output the build files to 'dist'
  },
  publicDir: 'public', // Keep serving static assets from 'public'
})
