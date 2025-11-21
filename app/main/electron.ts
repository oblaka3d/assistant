import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { setupIPC } from './ipc';

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
    },
    backgroundColor: '#1a1a1a',
  });

  // ARM оптимизация: включение hardware acceleration
  app.commandLine.appendSwitch('enable-features', 'WaylandWindowDecorations');
  app.commandLine.appendSwitch('enable-gpu-rasterization');
  app.commandLine.appendSwitch('enable-zero-copy');

  // Путь к UI файлам (работает и в dev, и в production)
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  const htmlPath = isDev
    ? path.join(__dirname, '../../app/ui/index.html')
    : path.join(__dirname, '../ui/index.html');
  
  mainWindow.loadFile(htmlPath);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Открыть DevTools в режиме разработки (закомментировать для production)
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  setupIPC();
  createWindow();

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

