/**
 * THREE.js Renderer Main
 * Инициализация и экспорт THREE.js сцены
 */

import { CharacterScene, CharacterSceneOptions } from './three/CharacterScene';

/**
 * Создает и инициализирует THREE.js сцену с персонажем
 */
export async function initCharacterScene(options: CharacterSceneOptions): Promise<CharacterScene> {
  const scene = new CharacterScene(options);
  
  // Ждем загрузки персонажа
  return new Promise((resolve) => {
    const checkReady = setInterval(() => {
      if (scene.ready) {
        clearInterval(checkReady);
        resolve(scene);
      }
    }, 100);
    
    // Таймаут на случай, если загрузка не удалась
    setTimeout(() => {
      clearInterval(checkReady);
      resolve(scene); // Возвращаем сцену даже если персонаж не загрузился
    }, 10000);
  });
}

/**
 * Экспорт типа для использования в компонентах
 */
export type { CharacterScene } from './three/CharacterScene';
export type { CharacterAnimation } from './three/CharacterScene';

