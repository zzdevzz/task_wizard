import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This will enable access from the network
    port: 5173,
  },
  build: {
    outDir: 'public' // Ensure this is the same directory Rails uses for static files
  }
})
