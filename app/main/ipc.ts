import * as fs from 'fs';
import * as path from 'path';

import { ipcMain } from 'electron';

import { checkDependencies } from '../backend/dependency-checker';
import { generateResponse } from '../backend/llm';
import { transcribe } from '../backend/stt';
import { synthesize } from '../backend/tts';
import { startRecord, stopRecord } from '../backend/voice';

import { readLogs, clearLogs, getLogFileSize, getLogFilePath } from './utils/fileLogger';
import { createIPCHandler } from './utils/ipcHandler';

export function setupIPC(): void {
  ipcMain.handle(
    'startRecord',
    createIPCHandler(async () => {
      await startRecord();
    }, 'startRecord')
  );

  ipcMain.handle(
    'stopRecord',
    createIPCHandler(async () => {
      return await stopRecord();
    }, 'stopRecord')
  );

  ipcMain.handle(
    'transcribe',
    createIPCHandler(async (_event, audioBuffer: Buffer) => {
      return await transcribe(audioBuffer);
    }, 'transcribe')
  );

  ipcMain.handle(
    'askLLM',
    createIPCHandler(async (_event, text: string) => {
      return await generateResponse(text);
    }, 'askLLM')
  );

  ipcMain.handle(
    'speak',
    createIPCHandler(async (_event, text: string) => {
      await synthesize(text);
    }, 'speak')
  );

  ipcMain.handle(
    'checkDependencies',
    createIPCHandler(async () => {
      return await checkDependencies();
    }, 'checkDependencies')
  );

  ipcMain.handle('getModelList', async (): Promise<string[]> => {
    try {
      // Путь к папке с моделями
      // В development: app/ui/public/assets/models
      // В production: dist/app/ui/assets/models (куда копируются файлы из public)
      // Пробуем оба варианта
      const modelsPath1 = path.join(__dirname, '../ui/assets/models');
      const modelsPath2 = path.join(__dirname, '../ui/public/assets/models');
      
      let modelsPath = modelsPath1;
      if (!fs.existsSync(modelsPath1) && fs.existsSync(modelsPath2)) {
        modelsPath = modelsPath2;
      }
      
      // Проверяем существование папки
      if (!fs.existsSync(modelsPath)) {
        console.warn(`Models directory not found. Tried: ${modelsPath1} and ${modelsPath2}`);
        return [];
      }

      console.log(`Reading models from: ${modelsPath}`);

      // Читаем список файлов в папке
      const files = fs.readdirSync(modelsPath);
      
      // Фильтруем только GLB файлы
      const glbFiles = files
        .filter((file) => {
          const fullPath = path.join(modelsPath, file);
          const stats = fs.statSync(fullPath);
          return stats.isFile() && file.toLowerCase().endsWith('.glb');
        })
        .sort(); // Сортируем по алфавиту

      console.log(`Found ${glbFiles.length} model files:`, glbFiles);
      return glbFiles;
    } catch (error) {
      console.error('Error getting model list:', error);
      throw error;
    }
  });

  ipcMain.handle(
    'getSceneList',
    createIPCHandler(async () => {
      // Путь к папке со сценами
      // В development: app/ui/public/assets/scenes
      // В production: dist/app/ui/assets/scenes
      const scenesPath1 = path.join(__dirname, '../ui/assets/scenes');
      const scenesPath2 = path.join(__dirname, '../ui/public/assets/scenes');

      let scenesPath = scenesPath1;
      if (!fs.existsSync(scenesPath1) && fs.existsSync(scenesPath2)) {
        scenesPath = scenesPath2;
      }

      // Проверяем существование папки
      if (!fs.existsSync(scenesPath)) {
        console.log(`[IPC] Scenes directory not found: ${scenesPath}`);
        return [];
      }

      console.log(`[IPC] Reading scenes from: ${scenesPath}`);

      // Читаем список файлов в папке
      const files = fs.readdirSync(scenesPath);

      // Фильтруем файлы сцен
      const sceneExtensions = ['.json', '.gltf', '.glb', '.scene'];
      const sceneFiles = files
        .filter((file) => {
          const fullPath = path.join(scenesPath, file);
          const stats = fs.statSync(fullPath);
          const ext = path.extname(file).toLowerCase();
          return stats.isFile() && sceneExtensions.includes(ext);
        })
        .sort(); // Сортируем по алфавиту

      console.log(`[IPC] Found ${sceneFiles.length} scene files:`, sceneFiles);
      return sceneFiles;
    }, 'getSceneList')
  );

  // Пользователь
  ipcMain.handle(
    'login',
    createIPCHandler(async (_event, username: string, password: string) => {
      // TODO: Реализовать проверку учетных данных
      // Пока заглушка для демонстрации
      if (username && password) {
        return {
          id: '1',
          username,
          displayName: username,
          email: `${username}@example.com`,
        };
      }
      throw new Error('Неверные учетные данные');
    }, 'login')
  );

  ipcMain.handle(
    'logout',
    createIPCHandler(async () => {
      // TODO: Реализовать выход из системы
      return true;
    }, 'logout')
  );

  ipcMain.handle(
    'getCurrentUser',
    createIPCHandler(async () => {
      // TODO: Реализовать получение текущего пользователя из сессии/базы данных
      // Пока возвращаем null (не авторизован)
      return null;
    }, 'getCurrentUser')
  );

  // API ключи
  ipcMain.handle(
    'getAPIKeys',
    createIPCHandler(async () => {
      // TODO: Загрузить API ключи из файла/базы данных
      // Пока возвращаем из переменных окружения
      return {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
        YANDEX_STT_KEY: process.env.YANDEX_STT_KEY || '',
        YANDEX_GPT_KEY: process.env.YANDEX_GPT_KEY || '',
        YANDEX_TTS_KEY: process.env.YANDEX_TTS_KEY || '',
        YANDEX_FOLDER_ID: process.env.YANDEX_FOLDER_ID || '',
        GOOGLE_STT_KEY: process.env.GOOGLE_STT_KEY || '',
        GOOGLE_TTS_KEY: process.env.GOOGLE_TTS_KEY || '',
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
      };
    }, 'getAPIKeys')
  );

  ipcMain.handle(
    'saveAPIKeys',
    createIPCHandler(async (_event, keys: Record<string, string>) => {
      // TODO: Сохранить API ключи в файл/базу данных
      // Пока сохраняем в переменные окружения (только для текущей сессии)
      Object.keys(keys).forEach((key) => {
        if (keys[key]) {
          process.env[key] = keys[key];
        }
      });
      return true;
    }, 'saveAPIKeys')
  );

  // Логирование
  ipcMain.handle(
    'getLogs',
    createIPCHandler(async (_event, maxLines?: number) => {
      return readLogs(maxLines);
    }, 'getLogs')
  );

  ipcMain.handle(
    'clearLogs',
    createIPCHandler(async () => {
      clearLogs();
      return true;
    }, 'clearLogs')
  );

  ipcMain.handle(
    'getLogFileInfo',
    createIPCHandler(async () => {
      return {
        size: getLogFileSize(),
        path: getLogFilePath(),
        lineCount: readLogs().length,
      };
    }, 'getLogFileInfo')
  );
}
