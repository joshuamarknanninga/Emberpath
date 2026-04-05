import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const hmrHost = process.env.VITE_HMR_HOST || '127.0.0.1';
const hmrPort = Number(process.env.VITE_HMR_PORT || 5173);
const hmrClientPort = Number(process.env.VITE_HMR_CLIENT_PORT || hmrPort);

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: hmrHost,
      port: hmrPort,
      clientPort: hmrClientPort
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
