import * as fs from 'fs';
import * as path from 'path';

import { app, BrowserWindow, dialog } from 'electron';

import {
  checkDependenciesOnStartup,
  checkDependencies,
} from '../backend-electron/dependency-checker';

import { setupIPC } from './ipc';
import { initializeFileLogger } from './utils/fileLogger';

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  // Проверка режима окна через переменную окружения
  const windowMode = process.env.WINDOW_MODE === 'true' || process.env.WINDOWED === 'true';

  mainWindow = new BrowserWindow({
    width: windowMode ? 1280 : 1920,
    height: windowMode ? 720 : 1080,
    fullscreen: !windowMode,
    kiosk: !windowMode,
    frame: windowMode,
    resizable: windowMode,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      // Отключаем webSecurity только в dev режиме для работы с локальными файлами (blob URLs для текстур THREE.js)
      // В production лучше использовать правильный CSP
      webSecurity: process.env.NODE_ENV === 'development' || !app.isPackaged ? false : true,
      allowRunningInsecureContent: process.env.NODE_ENV === 'development' || !app.isPackaged,
    },
    backgroundColor: '#1a1a1a',
  });

  // Hardware acceleration (работает на всех платформах)
  app.commandLine.appendSwitch('enable-gpu-rasterization');

  // Linux-специфичные настройки (только для Linux)
  if (process.platform === 'linux') {
    app.commandLine.appendSwitch('enable-features', 'WaylandWindowDecorations');
    app.commandLine.appendSwitch('enable-zero-copy');
  }

  // Определяем dev режим
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

  // Путь к UI файлам
  // Всегда используем собранный файл из dist (работает и в dev, и в production)
  const htmlPath = path.join(__dirname, '../ui-electron/index.html');

  console.log('Loading HTML from:', htmlPath);
  console.log('__dirname:', __dirname);
  console.log('File exists:', fs.existsSync(htmlPath));
  console.log('Is dev mode:', isDev);

  // Обработка OAuth callback - перехватываем навигацию на callback URL с токенами
  mainWindow.webContents.on('did-navigate', (_event, url) => {
    if (!mainWindow) return;

    try {
      const urlObj = new URL(url);
      const token = urlObj.searchParams.get('token');
      const refreshToken = urlObj.searchParams.get('refreshToken');

      // Если это OAuth callback с токенами, загружаем index.html с токенами
      if (token && refreshToken && urlObj.pathname.includes('/auth/')) {
        const htmlPath = path.join(__dirname, '../ui-electron/index.html');
        const callbackUrl = `file://${htmlPath}?token=${encodeURIComponent(token)}&refreshToken=${encodeURIComponent(refreshToken)}`;
        mainWindow.loadURL(callbackUrl).catch((error) => {
          console.error('Error loading OAuth callback:', error);
        });
      }
    } catch {
      // Игнорируем ошибки парсинга URL
    }
  });

  // Логирование ошибок загрузки
  mainWindow.webContents.on(
    'did-fail-load',
    (_event, errorCode, errorDescription, validatedURL) => {
      console.error('Failed to load:', validatedURL);
      console.error('Error code:', errorCode);
      console.error('Error description:', errorDescription);
    }
  );

  // Логирование консоли рендерера
  mainWindow.webContents.on('console-message', (_event, level, message) => {
    // Игнорируем ошибки fetch из DevTools (они не критичны)
    if (message.includes('devtools://') && message.includes('Failed to fetch')) {
      return; // Не логируем эти ошибки
    }
    console.log(`[Renderer ${level}]:`, message);
  });

  // Логирование ошибок рендерера
  mainWindow.webContents.on('render-process-gone', (_event, details) => {
    console.error('Render process gone:', details);
  });

  // В dev режиме можно использовать Vite dev server (раскомментировать если нужно):
  // if (isDev) {
  //   mainWindow.loadURL('http://localhost:3000');
  // } else {
  //   mainWindow.loadFile(htmlPath);
  // }

  mainWindow.loadFile(htmlPath).catch((error) => {
    console.error('Error loading file:', error);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Открываем DevTools только в dev режиме
  if (isDev) {
    mainWindow.webContents.once('did-finish-load', () => {
      console.log('Page loaded successfully');
      // Открываем DevTools с задержкой, чтобы избежать ошибок загрузки
      setTimeout(() => {
        mainWindow?.webContents.openDevTools();
      }, 500);
    });
  }
}

// Устанавливаем переменную окружения для подавления предупреждений CSP
// unsafe-eval может потребоваться для некоторых библиотек (например, THREE.js)
// В production можно включить предупреждения через: ELECTRON_ENABLE_SECURITY_WARNINGS=true
// Но для разработки предупреждения можно отключить, так как мы явно устанавливаем CSP
// Устанавливаем переменную только если она не установлена вручную
if (process.env.ELECTRON_ENABLE_SECURITY_WARNINGS !== 'true') {
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';
}

// Проверяем, что app доступен (код выполняется в контексте Electron)
if (!app || typeof app.whenReady !== 'function') {
  console.error('❌ Electron app is not available.');
  console.error('   Make sure the script is run with Electron:');
  console.error('   - npm start (uses electron dist/main/electron.js)');
  console.error('   - npm run dev (uses ts-node, requires Electron runtime)');
  console.error('   Do not run this file directly with node or ts-node without Electron.');
  process.exit(1);
}

app.whenReady().then(async () => {
  // Инициализируем файловое логирование
  initializeFileLogger();
  console.log('[Electron] File logger initialized');

  setupIPC();
  createWindow();

  // Проверка зависимостей при запуске (после создания окна, чтобы показать диалог)
  console.log('Проверка зависимостей при запуске...');
  const dependenciesOK = await checkDependenciesOnStartup();

  // Если есть критические проблемы с зависимостями, показываем диалог
  if (!dependenciesOK && mainWindow) {
    const results = await checkDependencies();
    const criticalErrors = results.filter((r) => r.required && !r.available);

    if (criticalErrors.length > 0) {
      const message = criticalErrors
        .map((r) => `${r.name}: ${r.message}\nУстановка: ${r.installInstructions || 'не указана'}`)
        .join('\n\n');

      dialog
        .showMessageBox(mainWindow, {
          type: 'warning',
          title: 'Предупреждение о зависимостях',
          message: 'Обнаружены проблемы с зависимостями',
          detail: `Некоторые обязательные зависимости отсутствуют:\n\n${message}\n\nПриложение будет работать, но аудио функциональность может быть недоступна.`,
          buttons: ['Продолжить', 'Показать в консоли'],
        })
        .then((response) => {
          if (response.response === 1 && mainWindow) {
            // Открываем DevTools для просмотра подробностей
            mainWindow.webContents.openDevTools();
          }
        })
        .catch((error) => {
          console.error('Ошибка показа диалога:', error);
        });
    }
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  if (mainWindow) {
    mainWindow.removeAllListeners('close');
  }
});
