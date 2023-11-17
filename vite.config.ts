import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      ui: path.resolve(__dirname, './src/shared/ui'),
      api: path.resolve(__dirname, './src/api'),
      pages: path.resolve(__dirname, './src/pages'),
      assets: path.resolve(__dirname, './src/assets'),
      resources: path.resolve(__dirname, './src/resources'),
      shared: path.resolve(__dirname, './src/shared'),
      context: path.resolve(__dirname, './src/shared/context'),
    },
  },
  plugins: [react()],
});
