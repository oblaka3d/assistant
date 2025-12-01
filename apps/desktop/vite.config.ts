import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const vendorChunkPatterns: Array<[string, RegExp]> = [
  ['three', /[/\\]three[/\\]/],
  // MUI выносим отдельно, но @emotion/react оставляем рядом с React в основном bundle
  // Важно: проверяем @emotion/react ПЕРЕД MUI, чтобы он не попал в mui chunk
  ['mui', /[/\\]@mui[/\\]/],
  ['markdown', /react-markdown|remark|react-syntax-highlighter/],
];

// React и react-redux должны быть в основном bundle, чтобы избежать проблем с порядком загрузки
// и ошибок типа "Cannot read properties of undefined (reading 'useSyncExternalStore')"
// Также держим @emotion/react рядом с React
// ВАЖНО: @emotion/react должен быть исключен из всех vendor chunks
const reactPattern = /react(-dom|-redux)?[/\\]|@emotion[/\\]react[/\\]/;

export default defineConfig(({ command }) => ({
  plugins: [react()],
  root: 'ui-electron',
  base: './', // Используем относительные пути для работы в Electron
  build: {
    // Sourcemap только в dev (serve), чтобы не раздувать прод-сборку
    sourcemap: command === 'serve',
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

          // React, react-dom, react-redux и @emotion/react должны оставаться в основном bundle
          // чтобы избежать ошибок с useSyncExternalStore и __SECRET_INTERNALS
          // ВАЖНО: проверяем это ПЕРВЫМ, до всех других проверок
          if (reactPattern.test(id)) {
            return undefined;
          }

          // Проверяем vendor chunks
          // ВАЖНО: @emotion/react не должен попадать в mui chunk
          for (const [chunkName, pattern] of vendorChunkPatterns) {
            // Пропускаем @emotion/react даже если он попадает под паттерн MUI
            if (chunkName === 'mui' && id.includes('@emotion/react')) {
              continue;
            }
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
      '@assistant/shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  publicDir: 'public', // Относительно root (ui-electron)
}));
