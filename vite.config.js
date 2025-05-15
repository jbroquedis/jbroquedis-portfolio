import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ['p5.sound'], // Prevent rollup from trying to bundle p5.sound
    },
  },
  optimizeDeps: {
    exclude: ['p5.sound'], // Exclude p5.sound from dependency optimization
  },
  resolve: {
    alias: {
      // Remove alias if causing issues with CDN approach
    },
  },
});