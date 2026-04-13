import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          faker: ['@faker-js/faker'],
          vendor: ['react', 'react-dom', 'react-select'],
        },
      },
    },
  },
});
