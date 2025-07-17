import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 👇 Redirect API calls to your backend server
      '/api': 'http://localhost:5000',
    },
  },
});
