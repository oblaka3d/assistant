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
  console.log(
    '[loadCharacterGLB] Window location:',
    typeof window !== 'undefined' ? window.location.href : 'undefined'
  );

  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();

    // Настройка загрузчика для работы с локальными файлами в Electron
    let finalUrl = url;

    try {
      // Проверяем, является ли URL уже абсолютным (начинается с file:// или http://)
      const isAbsoluteUrl =
        url.startsWith('file://') || url.startsWith('http://') || url.startsWith('https://');

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
                  if (
                    mat instanceof THREE.MeshStandardMaterial ||
                    mat instanceof THREE.MeshPhysicalMaterial ||
                    mat instanceof THREE.MeshBasicMaterial
                  ) {
                    mat.needsUpdate = true;

                    // Проверяем и применяем все возможные текстуры
                    const textureProps = [
                      'map',
                      'normalMap',
                      'roughnessMap',
                      'metalnessMap',
                      'aoMap',
                      'emissiveMap',
                      'bumpMap',
                      'displacementMap',
                    ];

                    textureProps.forEach((prop) => {
                      const texture = (mat as unknown as Record<string, unknown>)[prop];
                      if (texture && texture instanceof THREE.Texture) {
                        textureCount++;
                        texture.needsUpdate = true;
                        // Убеждаемся, что текстура загружена
                        if (texture.image) {
                          console.log(
                            `[loadCharacterGLB] Mesh "${child.name}" has ${prop} texture:`,
                            {
                              width: texture.image.width,
                              height: texture.image.height,
                              loaded: texture.image.complete,
                            }
                          );
                        }
                      }
                    });

                    // Если есть основная текстура (map), убеждаемся, что она правильно настроена
                    if (mat.map && mat.map instanceof THREE.Texture) {
                      mat.map.flipY = false; // GLTF использует flipY = false
                      mat.map.needsUpdate = true;
                      const textureImage = mat.map.image as HTMLImageElement | undefined;
                      if (textureImage && !textureImage.complete) {
                        // Если изображение еще загружается, ждем его
                        textureImage.onload = () => {
                          if (mat.map) {
                            mat.map.needsUpdate = true;
                          }
                          mat.needsUpdate = true;
                          console.log(`[loadCharacterGLB] Texture loaded for mesh "${child.name}"`);
                        };
                      }
                    }

                    // Логируем информацию о материале
                    if (mat.color) {
                      console.log(
                        `[loadCharacterGLB] Mesh "${child.name}" material color:`,
                        mat.color.getHexString()
                      );
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

            // Создаем действия для всех анимаций и логируем их
            const availableAnimations: string[] = [];
            animations.forEach((clip) => {
              const actionName = clip.name.toLowerCase();
              if (!actions[actionName]) {
                actions[actionName] = mixer!.clipAction(clip);
                availableAnimations.push(clip.name);
              }
            });

            console.log('[loadCharacterGLB] Available animations:', availableAnimations);
            console.log('[loadCharacterGLB] Animation actions created:', Object.keys(actions));

            // Находим T-pose анимацию (приоритет) или idle анимацию
            const tposeAnimation = animations.find(
              (clip) =>
                clip.name.toLowerCase().includes('tpose') ||
                clip.name.toLowerCase().includes('t-pose') ||
                clip.name.toLowerCase().includes('t_pose') ||
                clip.name.toLowerCase() === 'pose'
            );

            const idleAnimation = animations.find(
              (clip) =>
                clip.name.toLowerCase().includes('idle') || clip.name.toLowerCase().includes('wait')
            );

            // Используем T-pose если найден, иначе idle, иначе первую анимацию
            const defaultAnimation = tposeAnimation || idleAnimation || animations[0];

            if (defaultAnimation) {
              actions['default'] = mixer.clipAction(defaultAnimation);
              actions['default']?.setEffectiveTimeScale(1);
              actions['default']?.setEffectiveWeight(1);
              actions['default']?.play();

              // Также устанавливаем как idle для совместимости
              if (!actions['idle']) {
                actions['idle'] = actions['default'];
              }

              console.log(
                `[loadCharacterGLB] Playing default animation: "${defaultAnimation.name}" (T-pose: ${!!tposeAnimation})`
              );
            }
          } else {
            console.warn(
              '[loadCharacterGLB] No animations found in GLB file. Model will be static.'
            );
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
  private model: CharacterModel;
  private programmaticAnimation: {
    type: 'talking' | 'listening' | 'thinking' | null;
    animationId: number | null;
    startTime: number;
    boneNodes: THREE.Bone[] | null;
  } = {
    type: null,
    animationId: null,
    startTime: 0,
    boneNodes: null,
  };

  constructor(model: CharacterModel) {
    this.mixer = model.mixer;
    this.actions = model.actions;
    this.clock = new THREE.Clock();
    this.model = model;
    this.findBoneNodes();
  }

  /**
   * Находит важные кости для анимаций (голова, шея, челюсть)
   */
  private findBoneNodes(): void {
    const bones: THREE.Bone[] = [];
    this.model.scene.traverse((child) => {
      if (child instanceof THREE.Bone) {
        const nameLower = child.name.toLowerCase();
        // Ищем кости связанные с головой, шеей, челюстью
        if (
          nameLower.includes('head') ||
          nameLower.includes('neck') ||
          nameLower.includes('jaw') ||
          nameLower.includes('face')
        ) {
          bones.push(child);
        }
      }
    });
    this.programmaticAnimation.boneNodes = bones;
    if (bones.length > 0) {
      console.log(
        '[CharacterAnimationController] Found bone nodes for animations:',
        bones.map((b) => b.name)
      );
    }
  }

  /**
   * Воспроизводит анимацию по имени
   * @returns [action, wasFound] - action и флаг, была ли найдена реальная анимация из GLB
   */
  playAnimation(name: string, fadeIn: number = 0.3): [THREE.AnimationAction | null, boolean] {
    if (!this.mixer) {
      console.warn(
        '[CharacterAnimationController] No mixer available, cannot play animation:',
        name
      );
      return [null, false];
    }

    // Пытаемся найти анимацию по точному имени или частичному совпадению
    let action = this.actions[name.toLowerCase()];
    let wasFound = false;

    // Если не найдено, ищем по частичному совпадению
    if (!action) {
      const matchingKey = Object.keys(this.actions).find(
        (key) =>
          key.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(key.toLowerCase())
      );
      if (matchingKey) {
        action = this.actions[matchingKey];
        wasFound = true;
        console.log(
          `[CharacterAnimationController] Found animation "${matchingKey}" for request "${name}"`
        );
      }
    } else {
      wasFound = true;
    }

    // Если все еще не найдено, используем default или idle
    if (!action) {
      action = this.actions['default'] || this.actions['idle'];
      if (action) {
        console.warn(
          `[CharacterAnimationController] Animation "${name}" not found, using default/idle`
        );
        wasFound = false; // Это fallback, а не реальная анимация
      } else {
        console.warn(
          `[CharacterAnimationController] No animation found for "${name}" and no default animation available`
        );
        console.log(
          '[CharacterAnimationController] Available animations:',
          Object.keys(this.actions)
        );
        return [null, false];
      }
    }

    if (action === this.currentAction) {
      console.log(`[CharacterAnimationController] Animation "${name}" is already playing`);
      return [action, wasFound];
    }

    // Плавный переход между анимациями
    if (this.currentAction) {
      this.currentAction.fadeOut(fadeIn);
    }

    action.reset().fadeIn(fadeIn).play();
    this.currentAction = action;
    console.log(
      `[CharacterAnimationController] Playing animation: ${name} (from GLB: ${wasFound})`
    );
    return [action, wasFound];
  }

  /**
   * Воспроизводит анимацию по имени (обратная совместимость)
   */
  playAnimationLegacy(name: string, fadeIn: number = 0.3): THREE.AnimationAction | null {
    const [action] = this.playAnimation(name, fadeIn);
    return action;
  }

  /**
   * Получить текущую активную анимацию
   */
  getCurrentAction(): THREE.AnimationAction | null {
    return this.currentAction;
  }

  /**
   * Получить список всех доступных анимаций
   */
  getAvailableAnimations(): string[] {
    return Object.keys(this.actions).filter((key) => this.actions[key] !== null);
  }

  /**
   * Воспроизводит idle анимацию
   */
  playIdle(): void {
    this.stopProgrammaticAnimation(); // Останавливаем программные анимации
    this.playAnimationLegacy('idle');
    console.log('[CharacterAnimationController] Playing idle animation');
  }

  /**
   * Останавливает программную анимацию
   */
  private stopProgrammaticAnimation(): void {
    if (this.programmaticAnimation.animationId !== null) {
      cancelAnimationFrame(this.programmaticAnimation.animationId);
      this.programmaticAnimation.animationId = null;
    }
    this.programmaticAnimation.type = null;

    // Возвращаем кости в исходное состояние
    if (this.programmaticAnimation.boneNodes) {
      this.programmaticAnimation.boneNodes.forEach((bone) => {
        bone.rotation.set(0, 0, 0);
      });
    }
  }

  /**
   * Программная анимация разговора (покачивание головы вверх-вниз)
   */
  private animateTalking(): void {
    this.stopProgrammaticAnimation();
    this.programmaticAnimation.type = 'talking';
    this.programmaticAnimation.startTime = Date.now();
    console.log('[CharacterAnimationController] Starting programmatic talking animation');

    const animate = () => {
      if (this.programmaticAnimation.type !== 'talking') {
        return;
      }

      const elapsed = (Date.now() - this.programmaticAnimation.startTime) / 1000;
      const frequency = 3; // 3 раза в секунду
      const amplitude = 0.1; // Небольшой наклон

      // Небольшое покачивание головы
      if (this.programmaticAnimation.boneNodes && this.programmaticAnimation.boneNodes.length > 0) {
        const headBone = this.programmaticAnimation.boneNodes.find((b) =>
          b.name.toLowerCase().includes('head')
        );
        if (headBone) {
          const offset = Math.sin(elapsed * frequency * Math.PI * 2) * amplitude;
          headBone.rotation.x = offset * 0.5;
        } else {
          // Если кости головы не найдены, используем движение всей модели
          const offset = Math.sin(elapsed * frequency * Math.PI * 2) * amplitude;
          if (this.model.scene) {
            this.model.scene.position.y = 0 + offset * 0.02; // Небольшое вертикальное движение
          }
        }
      } else if (this.model.scene) {
        // Если кости не найдены, просто двигаем всю модель
        const offset = Math.sin(elapsed * frequency * Math.PI * 2) * amplitude;
        this.model.scene.position.y = 0 + offset * 0.02;
      }

      this.programmaticAnimation.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  /**
   * Программная анимация прослушивания (легкий наклон головы в сторону)
   */
  private animateListening(): void {
    this.stopProgrammaticAnimation();
    this.programmaticAnimation.type = 'listening';
    this.programmaticAnimation.startTime = Date.now();

    const animate = () => {
      if (this.programmaticAnimation.type !== 'listening') {
        return;
      }

      const elapsed = (Date.now() - this.programmaticAnimation.startTime) / 1000;
      const targetTilt = 0.15; // Наклон головы в радианах

      // Наклон головы в сторону
      if (this.programmaticAnimation.boneNodes && this.programmaticAnimation.boneNodes.length > 0) {
        const headBone = this.programmaticAnimation.boneNodes.find((b) =>
          b.name.toLowerCase().includes('head')
        );
        if (headBone) {
          // Плавный переход к наклону
          const progress = Math.min(elapsed * 2, 1);
          headBone.rotation.z = targetTilt * progress;
        }
      }

      this.programmaticAnimation.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  /**
   * Программная анимация размышления (рука к подбородку или наклон головы)
   */
  private animateThinking(): void {
    this.stopProgrammaticAnimation();
    this.programmaticAnimation.type = 'thinking';
    this.programmaticAnimation.startTime = Date.now();

    const animate = () => {
      if (this.programmaticAnimation.type !== 'thinking') {
        return;
      }

      const elapsed = (Date.now() - this.programmaticAnimation.startTime) / 1000;
      const frequency = 0.5; // Медленное покачивание
      const amplitude = 0.08;

      // Легкое покачивание головы вверх-вниз
      if (this.programmaticAnimation.boneNodes && this.programmaticAnimation.boneNodes.length > 0) {
        const headBone = this.programmaticAnimation.boneNodes.find((b) =>
          b.name.toLowerCase().includes('head')
        );
        if (headBone) {
          const offset = Math.sin(elapsed * frequency * Math.PI * 2) * amplitude;
          headBone.rotation.x = offset;
        }
      }

      this.programmaticAnimation.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  /**
   * Воспроизводит анимацию прослушивания
   */
  playListening(): void {
    const [, wasFound] = this.playAnimation('listening');
    // Если нет listening анимации в GLB, используем программную
    if (!wasFound) {
      console.log('[CharacterAnimationController] Using programmatic listening animation');
      // Останавливаем любые предыдущие программные анимации
      this.stopProgrammaticAnimation();
      // Возвращаемся к idle позе (без остановки программных анимаций)
      const [idleAction] = this.playAnimation('idle');
      if (idleAction) {
        // Небольшая задержка перед запуском программной анимации для плавности
        setTimeout(() => {
          this.animateListening();
        }, 100);
      } else {
        this.animateListening();
      }
    }
  }

  /**
   * Воспроизводит анимацию размышления
   */
  playThinking(): void {
    const [, wasFound] = this.playAnimation('thinking');
    // Если нет thinking анимации в GLB, используем программную
    if (!wasFound) {
      console.log('[CharacterAnimationController] Using programmatic thinking animation');
      // Останавливаем любые предыдущие программные анимации
      this.stopProgrammaticAnimation();
      // Возвращаемся к idle позе
      const [idleAction] = this.playAnimation('idle');
      if (idleAction) {
        setTimeout(() => {
          this.animateThinking();
        }, 100);
      } else {
        this.animateThinking();
      }
    }
  }

  /**
   * Воспроизводит анимацию разговора
   */
  playTalking(): void {
    const [, wasFound] = this.playAnimation('talking');
    // Если нет talking анимации в GLB, используем программную
    if (!wasFound) {
      console.log('[CharacterAnimationController] Using programmatic talking animation');
      // Останавливаем любые предыдущие программные анимации
      this.stopProgrammaticAnimation();
      // Возвращаемся к idle позе
      const [idleAction] = this.playAnimation('idle');
      if (idleAction) {
        setTimeout(() => {
          this.animateTalking();
        }, 100);
      } else {
        this.animateTalking();
      }
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
