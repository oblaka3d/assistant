/**
 * Утилита для получения списка файлов из папок с ресурсами
 */

import * as fs from 'fs';
import * as path from 'path';

interface AssetListOptions {
  folder: string; // Имя папки (models, scenes)
  extensions: string[]; // Допустимые расширения файлов
}

/**
 * Получает список файлов из папки с ресурсами
 * Пробует два пути: production (dist) и development (public)
 */
export function getAssetList({ folder, extensions }: AssetListOptions): string[] {
  try {
    // Путь к папке с ресурсами
    // В development: app/ui/public/assets/{folder}
    // В production: dist/app/ui/assets/{folder} (куда копируются файлы из public)
    const assetPath1 = path.join(__dirname, `../ui/assets/${folder}`);
    const assetPath2 = path.join(__dirname, `../ui/public/assets/${folder}`);

    let assetPath = assetPath1;
    if (!fs.existsSync(assetPath1) && fs.existsSync(assetPath2)) {
      assetPath = assetPath2;
    }

    // Проверяем существование папки
    if (!fs.existsSync(assetPath)) {
      console.log(
        `[AssetList] ${folder} directory not found. Tried: ${assetPath1} and ${assetPath2}`
      );
      return [];
    }

    console.log(`[AssetList] Reading ${folder} from: ${assetPath}`);

    // Читаем список файлов в папке
    const files = fs.readdirSync(assetPath);

    // Фильтруем файлы по расширениям
    const filteredFiles = files
      .filter((file) => {
        const fullPath = path.join(assetPath, file);
        const stats = fs.statSync(fullPath);
        const ext = path.extname(file).toLowerCase();
        return stats.isFile() && extensions.includes(ext);
      })
      .sort(); // Сортируем по алфавиту

    console.log(`[AssetList] Found ${filteredFiles.length} ${folder} files:`, filteredFiles);
    return filteredFiles;
  } catch (error) {
    console.error(`[AssetList] Error getting ${folder} list:`, error);
    throw error;
  }
}
