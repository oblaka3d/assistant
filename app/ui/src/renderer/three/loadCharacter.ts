/**
 * Character Loader
 * Загрузчик GLB/VRM моделей персонажа
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export interface CharacterModel {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  mixer: THREE.AnimationMixer | null;
  actions: { [key: string]: THREE.AnimationAction | null };
}

/**
 * Загружает GLB модель персонажа
 */
export async function loadCharacterGLB(
  url: string,
  onProgress?: (progress: number) => void
): Promise<CharacterModel> {
  console.log('[loadCharacterGLB] Function called with URL:', url);
  console.log('[loadCharacterGLB] Window location:', typeof window !== 'undefined' ? window.location.href : 'undefined');
  
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    
    // Настройка загрузчика для работы с локальными файлами в Electron
    let finalUrl = url;
    
    try {
      // Проверяем, является ли URL уже абсолютным (начинается с file:// или http://)
      const isAbsoluteUrl = url.startsWith('file://') || url.startsWith('http://') || url.startsWith('https://');
      
      if (isAbsoluteUrl) {
        // URL уже абсолютный, используем его как есть
        // НЕ устанавливаем setPath для абсолютных URL, чтобы избежать дублирования пути
        finalUrl = url;
        console.log('[loadCharacterGLB] Using absolute URL as-is (no setPath):', finalUrl);
      } else {
        // Относительный URL, создаем абсолютный относительно текущего местоположения
        const urlObj = new URL(url, window.location.href);
        finalUrl = urlObj.href;
        
        // Для GLB файлов не нужно устанавливать setPath, так как текстуры встроены
        // GLTFLoader сам правильно обработает относительный или абсолютный URL
        console.log('[loadCharacterGLB] Converted relative URL to absolute:', finalUrl);
      }
    } catch (e) {
      console.warn('[loadCharacterGLB] Could not parse URL, using original URL:', e);
      finalUrl = url;
    }
    
    console.log('[loadCharacterGLB] GLTFLoader created, starting load from URL:', finalUrl);

    loader.load(
      finalUrl,
      (gltf) => {
        console.log('GLB model loaded successfully:', {
          scene: gltf.scene,
          animationsCount: gltf.animations.length,
          sceneChildren: gltf.scene.children.length,
          textures: gltf.parser.json.textures ? gltf.parser.json.textures.length : 0,
          materials: gltf.parser.json.materials ? gltf.parser.json.materials.length : 0,
          images: gltf.parser.json.images ? gltf.parser.json.images.length : 0,
        });
        
        try {
          const scene = gltf.scene;
          const animations = gltf.animations;

          // Убеждаемся, что сцена видима
          scene.visible = true;

          // Настраиваем сцену и убеждаемся, что все части видимы
          let meshCount = 0;
          let textureCount = 0;
          
          // Сначала проверяем текстуры в самой gltf структуре
          if (gltf.parser.json.textures) {
            console.log('[loadCharacterGLB] Textures in GLB:', gltf.parser.json.textures.length);
          }
          if (gltf.parser.json.images) {
            console.log('[loadCharacterGLB] Images in GLB:', gltf.parser.json.images.length);
          }
          
          scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = false;
              child.receiveShadow = false;
              child.visible = true;
              meshCount++;
              
              // Убеждаемся, что материал существует и видимый, с правильными цветами
              if (child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                
                materials.forEach((mat: THREE.Material) => {
                  mat.visible = true;
                  
                  // Обрабатываем стандартные материалы с текстурами
                  if (mat instanceof THREE.MeshStandardMaterial || 
                      mat instanceof THREE.MeshPhysicalMaterial || 
                      mat instanceof THREE.MeshBasicMaterial) {
                    mat.needsUpdate = true;
                    
                    // Проверяем и применяем все возможные текстуры
                    const textureProps = ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap', 'bumpMap', 'displacementMap'];
                    
                    textureProps.forEach((prop) => {
                      const texture = (mat as any)[prop];
                      if (texture && texture instanceof THREE.Texture) {
                        textureCount++;
                        texture.needsUpdate = true;
                        // Убеждаемся, что текстура загружена
                        if (texture.image) {
                          console.log(`[loadCharacterGLB] Mesh "${child.name}" has ${prop} texture:`, {
                            width: texture.image.width,
                            height: texture.image.height,
                            loaded: texture.image.complete,
                          });
                        }
                      }
                    });
                    
                    // Если есть основная текстура (map), убеждаемся, что она правильно настроена
                    if (mat.map && mat.map instanceof THREE.Texture) {
                      mat.map.flipY = false; // GLTF использует flipY = false
                      mat.map.needsUpdate = true;
                      if (mat.map.image && !mat.map.image.complete) {
                        // Если изображение еще загружается, ждем его
                        mat.map.image.onload = () => {
                          mat.map!.needsUpdate = true;
                          mat.needsUpdate = true;
                          console.log(`[loadCharacterGLB] Texture loaded for mesh "${child.name}"`);
                        };
                      }
                    }
                    
                    // Логируем информацию о материале
                    if (mat.color) {
                      console.log(`[loadCharacterGLB] Mesh "${child.name}" material color:`, mat.color.getHexString());
                    }
                  }
                });
              }
            }
          });
          
          console.log(`[loadCharacterGLB] Total meshes found: ${meshCount}`);
          console.log(`[loadCharacterGLB] Total textures found: ${textureCount}`);
          console.log('[loadCharacterGLB] Scene materials check complete');

          // Создаем mixer для анимаций
          let mixer: THREE.AnimationMixer | null = null;
          const actions: { [key: string]: THREE.AnimationAction | null } = {};

          if (animations.length > 0) {
            mixer = new THREE.AnimationMixer(scene);

            // Находим idle анимацию
            const idleAnimation = animations.find(
              (clip) =>
                clip.name.toLowerCase().includes('idle') ||
                clip.name.toLowerCase().includes('wait') ||
                animations.indexOf(clip) === 0 // Используем первую, если нет idle
            );

            if (idleAnimation) {
              actions['idle'] = mixer.clipAction(idleAnimation);
              actions['idle']?.setEffectiveTimeScale(1);
              actions['idle']?.setEffectiveWeight(1);
              actions['idle']?.play();
            }

            // Создаем действия для всех анимаций
            animations.forEach((clip) => {
              const actionName = clip.name.toLowerCase();
              if (!actions[actionName]) {
                actions[actionName] = mixer!.clipAction(clip);
              }
            });
          }

          resolve({
            scene,
            animations,
            mixer,
            actions,
          });
        } catch (error) {
          reject(
            new Error(
              `Failed to process character model: ${error instanceof Error ? error.message : String(error)}`
            )
          );
        }
      },
      (progress) => {
        if (onProgress && progress.total > 0) {
          onProgress(progress.loaded / progress.total);
        }
      },
      (error) => {
        console.error('GLTFLoader error:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Failed to load character model from ${url}:`, errorMessage);
        reject(new Error(`Failed to load character model: ${errorMessage}`));
      }
    );
  });
}

/**
 * Создает простой placeholder персонаж (если модель не найдена)
 */
export function createPlaceholderCharacter(): CharacterModel {
  const group = new THREE.Group();

  // Создаем простую геометрию
  const geometry = new THREE.BoxGeometry(1, 2, 1);
  const material = new THREE.MeshStandardMaterial({
    color: 0x8a8a9a,
    metalness: 0.3,
    roughness: 0.7,
  });

  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);

  return {
    scene: group,
    animations: [],
    mixer: null,
    actions: {},
  };
}

/**
 * Управляет анимациями персонажа
 */
export class CharacterAnimationController {
  private mixer: THREE.AnimationMixer | null;
  private actions: { [key: string]: THREE.AnimationAction | null };
  private currentAction: THREE.AnimationAction | null = null;
  private clock: THREE.Clock;

  constructor(model: CharacterModel) {
    this.mixer = model.mixer;
    this.actions = model.actions;
    this.clock = new THREE.Clock();
  }

  /**
   * Воспроизводит анимацию по имени
   */
  playAnimation(name: string, fadeIn: number = 0.3): void {
    if (!this.mixer) return;

    const action = this.actions[name] || this.actions['idle'];
    if (!action || action === this.currentAction) return;

    // Плавный переход между анимациями
    if (this.currentAction) {
      this.currentAction.fadeOut(fadeIn);
    }

    action.reset().fadeIn(fadeIn).play();
    this.currentAction = action;
  }

  /**
   * Воспроизводит idle анимацию
   */
  playIdle(): void {
    this.playAnimation('idle');
  }

  /**
   * Воспроизводит анимацию прослушивания
   */
  playListening(): void {
    this.playAnimation('listening');
    // Если нет listening, используем idle с небольшим движением
    if (!this.actions['listening']) {
      this.playIdle();
    }
  }

  /**
   * Воспроизводит анимацию размышления
   */
  playThinking(): void {
    this.playAnimation('thinking');
    if (!this.actions['thinking']) {
      this.playIdle();
    }
  }

  /**
   * Воспроизводит анимацию разговора
   */
  playTalking(): void {
    this.playAnimation('talking');
    if (!this.actions['talking']) {
      this.playIdle();
    }
  }

  /**
   * Обновляет анимации (должен вызываться в каждом кадре)
   */
  update(delta: number): void {
    if (this.mixer) {
      this.mixer.update(delta);
    }
  }

  /**
   * Обновляет анимации на основе clock
   */
  updateFromClock(): void {
    if (this.mixer) {
      const delta = this.clock.getDelta();
      this.mixer.update(delta);
    }
  }

  /**
   * Применяет простое движение головы (nod или wave)
   */
  playHeadNod(): void {
    // Можно реализовать через временное изменение rotation
    if (this.mixer && this.currentAction) {
      // Простое решение - временно изменяем timeScale для эффекта
      const originalTimeScale = this.currentAction.timeScale;
      this.currentAction.timeScale = 1.5;
      setTimeout(() => {
        if (this.currentAction) {
          this.currentAction.timeScale = originalTimeScale;
        }
      }, 300);
    }
  }
}
