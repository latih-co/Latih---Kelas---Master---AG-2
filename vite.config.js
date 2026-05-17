import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // listen di 0.0.0.0 (semua interface: localhost + IPv4)
    port: 5173,
  },
})
