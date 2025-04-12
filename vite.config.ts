import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // or '0.0.0.0'
    port: 5173
  },
  plugins: [react(),tailwindcss()],
})
