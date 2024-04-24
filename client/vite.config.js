import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import dotenv from 'dotenv'
// dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api':{
        target: 'http://localhost:5002',
        changeOrigin: false,
        secure: false,
      },
      '/api/**':{
        target: 'http://localhost:5002',
        changeOrigin: false,
        secure: false,      
        ws: true,
      },
      '/auth/google':{
        target: 'http://localhost:5002',
      },
      '/auth/**':{
        target: 'http://localhost:5002',
        changeOrigin: false,
        secure: false,      
        ws: true,
      },
      '/socket.io/': {
        target: 'http://localhost:5002',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [react()],
})
