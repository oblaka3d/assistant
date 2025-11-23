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
    copyPublicDir: true, // Явно указываем, что нужно копировать public директорию
    chunkSizeWarningLimit: 1000, // Увеличиваем лимит для THREE.js
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'app/ui/index.html'),
      },
      output: {
        manualChunks: {
          // Выделяем THREE.js в отдельный чанк
          three: ['three'],
          // Выделяем Material-UI в отдельный чанк
          mui: ['@mui/material', '@mui/icons-material'],
          // Выделяем React в отдельный чанк
          'react-vendor': ['react', 'react-dom', 'react-redux'],
        },
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
  publicDir: 'public', // Относительно root (app/ui)
});
