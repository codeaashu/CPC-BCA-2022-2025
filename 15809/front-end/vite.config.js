import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv';
import path from "path"
dotenv.config();


export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL_ROOT,
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), tailwindcss()],
  resolve:
    {
      alias: { "@": path.resolve(__dirname, "src") },
    }
  
});

