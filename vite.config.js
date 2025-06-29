import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Makes describe, it, expect, etc. available globally
    environment: 'jsdom', // Use the jsdom environment
    setupFiles: './src/tests/setup.js', // Point to your setup file
  },
});
