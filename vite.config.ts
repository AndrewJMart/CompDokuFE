import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      // Proxy requests starting with /generateBoard to your backend
      '/generateBoard': {
        target: 'http://localhost:18080',
        changeOrigin: true,
        secure: false, // only needed if you use https
      }
    }
  }
})
