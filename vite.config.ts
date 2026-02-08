import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/generateBoard': {
        target: 'http://localhost:18080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
