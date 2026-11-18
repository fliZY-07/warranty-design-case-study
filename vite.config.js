import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' so the built site works from any folder (or straight from disk via a static server)
export default defineConfig({
  base: './',
  plugins: [react()],
})
