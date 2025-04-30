import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [  tailwindcss()],
  server: {
    allowedHosts: ['8cee-39-60-177-29.ngrok-free.app', 'localhost', '127.0.0.1'], // Add your ngrok domain here
  },

})
// vite.config.js
