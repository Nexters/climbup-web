import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-vite-plugin';

export default defineConfig({
  plugins: [react(), tanstackRouter()],
  server: {
    allowedHosts: ['0cfb2f639498.ngrok-free.app']
  }
});
