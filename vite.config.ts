import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const vendorChunkPatterns: Array<[string, RegExp]> = [
  ['three', /[/\\]three[/\\]/],
  ['mui', /[/\\]@mui[/\\]|[/\\]@emotion[/\\]/],
  ['react-vendor', /react(-dom|-redux)?[/\\]/],
  ['markdown', /react-markdown|remark|react-syntax-highlighter/],
];

export default defineConfig({
  plugins: [react()],
  root: 'ui-electron',
  base: './', // Используем относительные пути для работы в Electron
  build: {
    outDir: '../dist/ui-electron',
    emptyOutDir: true,
    copyPublicDir: true, // Явно указываем, что нужно копировать public директорию
    chunkSizeWarningLimit: 1000, // Увеличиваем лимит для THREE.js
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'ui-electron/index.html'),
      },
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          for (const [chunkName, pattern] of vendorChunkPatterns) {
            if (pattern.test(id)) {
              return chunkName;
            }
          }

          return 'vendor';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'ui-electron/src'),
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  publicDir: 'public', // Относительно root (ui-electron)
});
