import * as fs from 'fs';
import * as path from 'path';

import { ipcMain } from 'electron';

import { checkDependencies, DependencyCheckResult } from '../backend/dependency-checker';
import { generateResponse } from '../backend/llm';
import { transcribe } from '../backend/stt';
import { synthesize } from '../backend/tts';
import { startRecord, stopRecord } from '../backend/voice';

export function setupIPC(): void {
  ipcMain.handle('startRecord', async (): Promise<void> => {
    try {
      await startRecord();
    } catch (error) {
      console.error('Error starting record:', error);
      throw error;
    }
  });

  ipcMain.handle('stopRecord', async (): Promise<Buffer> => {
    try {
      const buffer = await stopRecord();
      return buffer;
    } catch (error) {
      console.error('Error stopping record:', error);
      throw error;
    }
  });

  ipcMain.handle('transcribe', async (_event, audioBuffer: Buffer): Promise<string> => {
    try {
      const text = await transcribe(audioBuffer);
      return text;
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
    }
  });

  ipcMain.handle('askLLM', async (_event, text: string): Promise<string> => {
    try {
      const response = await generateResponse(text);
      return response;
    } catch (error) {
      console.error('Error asking LLM:', error);
      throw error;
    }
  });

  ipcMain.handle('speak', async (_event, text: string): Promise<void> => {
    try {
      await synthesize(text);
    } catch (error) {
      console.error('Error synthesizing speech:', error);
      throw error;
    }
  });

  ipcMain.handle('checkDependencies', async (): Promise<DependencyCheckResult[]> => {
    try {
      return await checkDependencies();
    } catch (error) {
      console.error('Error checking dependencies:', error);
      throw error;
    }
  });

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

  ipcMain.handle('getSceneList', async (): Promise<string[]> => {
    try {
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
        // Если папки нет, возвращаем пустой список
        console.log(`Scenes directory not found: ${scenesPath}`);
        return [];
      }

      console.log(`Reading scenes from: ${scenesPath}`);

      // Читаем список файлов в папке
      const files = fs.readdirSync(scenesPath);
      
      // Фильтруем файлы сцен (можно расширить список поддерживаемых форматов)
      const sceneFiles = files
        .filter((file) => {
          const fullPath = path.join(scenesPath, file);
          const stats = fs.statSync(fullPath);
          const ext = path.extname(file).toLowerCase();
          // Пока поддерживаем только JSON и GLTF/GLB для сцен
          return stats.isFile() && (ext === '.json' || ext === '.gltf' || ext === '.glb' || ext === '.scene');
        })
        .sort(); // Сортируем по алфавиту

      console.log(`Found ${sceneFiles.length} scene files:`, sceneFiles);
      return sceneFiles;
    } catch (error) {
      console.error('Error getting scene list:', error);
      throw error;
    }
  });
}
