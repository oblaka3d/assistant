/**
 * THREE.js Renderer Main
 * Инициализация и экспорт THREE.js сцены
 */

import { CharacterScene, CharacterSceneOptions } from './three/CharacterScene';

/**
 * Создает и инициализирует THREE.js сцену с персонажем
 */
export async function initCharacterScene(options: CharacterSceneOptions): Promise<CharacterScene> {
  console.log('[initCharacterScene] Called with options:', options);
  const scene = new CharacterScene(options);
  console.log('[initCharacterScene] CharacterScene created, waiting for ready state...');

  // Ждем загрузки персонажа
  return new Promise((resolve) => {
    let checksCount = 0;
    const checkReady = setInterval(() => {
      checksCount++;
      if (scene.ready) {
        console.log('[initCharacterScene] Scene is ready after', checksCount, 'checks');
        clearInterval(checkReady);
        resolve(scene);
      } else if (checksCount % 10 === 0) {
        console.log(
          '[initCharacterScene] Still waiting for scene to be ready... (check',
          checksCount,
          ')'
        );
      }
    }, 100);

    // Таймаут на случай, если загрузка не удалась
    setTimeout(() => {
      console.warn('[initCharacterScene] Timeout reached, scene ready:', scene.ready);
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
