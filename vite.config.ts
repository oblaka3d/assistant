import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  root: 'app/ui',
  base: './', // Используем относительные пути для работы в Electron
  build: {
    outDir: '../../dist/app/ui',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'app/ui/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app/ui/src'),
    },
  },
  server: {
    port: 3000,
  },
  publicDir: 'app/ui/public',
});
