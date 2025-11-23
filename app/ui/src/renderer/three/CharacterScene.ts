/**
 * Character Scene
 * Основной класс для управления THREE.js сценой с персонажем
 */

import * as THREE from 'three';

import {
  CharacterModel,
  loadCharacterGLB,
  createPlaceholderCharacter,
  CharacterAnimationController,
} from './loadCharacter';
import { applyToonShader } from './ToonShader';

export type CharacterAnimation = 'idle' | 'listening' | 'thinking' | 'talking';

export interface CharacterSceneOptions {
  canvas: HTMLCanvasElement;
  modelUrl?: string;
  onProgress?: (progress: number) => void;
  enableToonShader?: boolean;
}

export class CharacterScene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private characterModel: CharacterModel | null = null;
  private animationController: CharacterAnimationController | null = null;
  private clock: THREE.Clock;
  private isAnimating: boolean = false;
  private animationFrameId: number | null = null;
  private _debugLogged = false;
  private _frameCount = 0;

  constructor(options: CharacterSceneOptions) {
    console.log('[CharacterScene] Constructor called with options:', {
      canvas: options.canvas,
      modelUrl: options.modelUrl,
      enableToonShader: options.enableToonShader,
    });

    const { canvas, onProgress } = options;

    // Создаем сцену
    console.log('[CharacterScene] Creating THREE.js scene...');
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);

    // Получаем реальный размер canvas элемента
    const rect = canvas.getBoundingClientRect();
    const canvasWidth = rect.width || canvas.clientWidth || canvas.width || window.innerWidth;
    const canvasHeight = rect.height || canvas.clientHeight || canvas.height || window.innerHeight;

    console.log('[CharacterScene] Canvas dimensions:', {
      rect: { width: rect.width, height: rect.height },
      client: { width: canvas.clientWidth, height: canvas.clientHeight },
      width: canvas.width,
      height: canvas.height,
      window: { width: window.innerWidth, height: window.innerHeight },
    });

    // Создаем камеру (фиксированная)
    const aspect = canvasWidth / canvasHeight || 16 / 9;
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    // Позиционируем камеру ближе к персонажу, на уровне глаз
    // Камера находится на расстоянии 2 единицы перед персонажем (было 3)
    this.camera.position.set(0, 1.6, 2); // Приблизили камеру к персонажу
    // Смотрим прямо на персонажа (в центр сцены, на уровне головы)
    this.camera.lookAt(0, 1.6, 0); // Смотрим прямо на персонажа, на уровне глаз

    // Добавляем вспомогательную сетку для отладки
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
    this.scene.add(gridHelper);

    // Оси координат убраны по запросу пользователя

    console.log('[CharacterScene] Camera setup:', {
      position: this.camera.position.toArray(),
      target: [0, 1, 0],
      aspect,
      fov: this.camera.fov,
      near: this.camera.near,
      far: this.camera.far,
    });

    // Создаем рендерер с оптимизациями для ARM
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false, // Отключено для производительности
      alpha: true,
      powerPreference: 'high-performance',
    });

    this.renderer.setPixelRatio(1); // Фиксированный pixel ratio для ARM
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = false; // Тени отключены

    // Устанавливаем размер на основе реального размера canvas элемента
    this.renderer.setSize(canvasWidth, canvasHeight, false);
    console.log('[CharacterScene] Renderer size set to:', canvasWidth, 'x', canvasHeight);

    // Настраиваем освещение
    this.setupLighting();

    // Создаем clock для анимаций
    this.clock = new THREE.Clock();

    // Загружаем персонажа
    console.log('[CharacterScene] Constructor completed, starting character load');
    console.log('[CharacterScene] Model URL:', options.modelUrl);
    this.loadCharacter(options.modelUrl, onProgress, options.enableToonShader !== false);
  }

  /**
   * Настраивает освещение сцены
   */
  private setupLighting(): void {
    // Яркое окружающее освещение для лучшей видимости цветов
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x888888, 1.5);
    hemisphereLight.position.set(0, 5, 0);
    this.scene.add(hemisphereLight);

    // Яркое направленное освещение спереди
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(0, 2, 5);
    directionalLight.castShadow = false;
    this.scene.add(directionalLight);

    // Дополнительное освещение сбоку для контраста
    const sideLight = new THREE.DirectionalLight(0xffffff, 0.8);
    sideLight.position.set(3, 3, 2);
    sideLight.castShadow = false;
    this.scene.add(sideLight);

    // Окружающий свет для лучшей видимости
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambientLight);

    console.log('[CharacterScene] Lighting setup complete:', {
      hemisphere: hemisphereLight.position.toArray(),
      directional: directionalLight.position.toArray(),
      side: sideLight.position.toArray(),
      ambient: 'added',
    });
  }

  /**
   * Загружает модель персонажа
   */
  private async loadCharacter(
    modelUrl?: string,
    onProgress?: (progress: number) => void,
    enableToonShader: boolean = true
  ): Promise<void> {
    console.log('[CharacterScene] loadCharacter called with URL:', modelUrl);

    try {
      let model: CharacterModel;

      if (modelUrl) {
        console.log('[CharacterScene] Starting to load GLB model from:', modelUrl);
        model = await loadCharacterGLB(modelUrl, onProgress);
        console.log('[CharacterScene] GLB model loaded, processing...');
      } else {
        // Используем placeholder, если модель не указана
        console.warn('[CharacterScene] Character model URL not provided, using placeholder');
        model = createPlaceholderCharacter();
      }

      // Поворачиваем модель, если она лежит на спине
      // Убираем поворот по X, так как модель должна стоять вертикально
      model.scene.rotation.x = 0; // Без поворота по X - модель стоит вертикально

      // Вычисляем размеры модели для правильного позиционирования (после поворота)
      const box = new THREE.Box3().setFromObject(model.scene);
      if (!box.isEmpty()) {
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        console.log('[CharacterScene] Character model bounds:', {
          center: center.toArray(),
          size: size.toArray(),
          isEmpty: box.isEmpty(),
          rotation: model.scene.rotation.toArray(),
        });

        // Позиционируем модель так, чтобы она стояла на сетке (y=0) и была в центре
        // Центрируем модель относительно её bounding box
        model.scene.position.x = -center.x;
        model.scene.position.z = -center.z;
        // Ставим модель так, чтобы её нижняя точка была на y=0 (на сетке)
        model.scene.position.y = -box.min.y;

        console.log('[CharacterScene] Model positioned:', {
          originalCenter: center.toArray(),
          originalSize: size.toArray(),
          boundingBoxMin: box.min.toArray(),
          boundingBoxMax: box.max.toArray(),
          calculatedPosition: model.scene.position.toArray(),
          rotation: model.scene.rotation.toArray(),
        });

        // Масштабируем модель, чтобы она была видна (примерно 1.5-2 единицы высотой)
        const height = size.y;
        const maxDimension = Math.max(size.x, size.y, size.z);
        const targetHeight = 1.8; // Целевая высота персонажа

        if (height > 0) {
          // Масштабируем так, чтобы максимальная размерность была ~2 единицы
          const scale = targetHeight / maxDimension;
          model.scene.scale.set(scale, scale, scale);
          console.log(
            '[CharacterScene] Model scaled by',
            scale.toFixed(3),
            'to target height',
            targetHeight,
            '(original max dimension:',
            maxDimension.toFixed(2) + ')'
          );
        }

        // Пересчитываем позицию после масштабирования
        const scaledBox = new THREE.Box3().setFromObject(model.scene);
        if (!scaledBox.isEmpty()) {
          const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
          model.scene.position.y = -scaledBox.min.y; // Ноги на уровне сетки
          model.scene.position.x = -scaledCenter.x; // Центр по X
          model.scene.position.z = -scaledCenter.z; // Центр по Z
          console.log('[CharacterScene] Repositioned after scaling:', {
            position: model.scene.position.toArray(),
            rotation: model.scene.rotation.toArray(),
          });
        }
      } else {
        // Если не удалось вычислить границы, используем позицию по умолчанию
        // Это может произойти, если модель еще не загрузилась полностью
        console.warn('[CharacterScene] Could not compute model bounds, using default position');
        model.scene.position.set(0, 0, 0); // Центрируем в начале координат
        model.scene.scale.set(1, 1, 1);

        // Пробуем вычислить границы после небольшой задержки
        setTimeout(() => {
          const delayedBox = new THREE.Box3().setFromObject(model.scene);
          if (!delayedBox.isEmpty()) {
            const center = delayedBox.getCenter(new THREE.Vector3());
            const size = delayedBox.getSize(new THREE.Vector3());
            console.log('[CharacterScene] Delayed bounds calculation:', {
              center: center.toArray(),
              size: size.toArray(),
            });
            model.scene.position.y = -center.y + size.y / 2;
            model.scene.position.x = -center.x;
            model.scene.position.z = -center.z;
          }
        }, 500);
      }

      // Применяем toon shader, если нужно (после позиционирования)
      if (enableToonShader) {
        try {
          applyToonShader(model.scene);
          console.log('[CharacterScene] Toon shader applied successfully');
        } catch (shaderError) {
          console.warn('[CharacterScene] Failed to apply toon shader:', shaderError);
          // Продолжаем без toon shader
        }
      } else {
        console.log('[CharacterScene] Toon shader disabled, using original materials');
      }

      // Добавляем в сцену
      this.scene.add(model.scene);
      this.characterModel = model;

      console.log('[CharacterScene] Character model added to scene:', {
        modelUrl: modelUrl || 'placeholder',
        position: model.scene.position.toArray(),
        scale: model.scene.scale.toArray(),
        rotation: model.scene.rotation.toArray(),
        visible: model.scene.visible,
        childrenCount: model.scene.children.length,
        animationsCount: model.animations.length,
        hasMixer: !!model.mixer,
        worldPosition: model.scene.getWorldPosition(new THREE.Vector3()).toArray(),
      });

      // Проверяем, что модель в сцене и видна с камеры
      const modelWorldPos = model.scene.getWorldPosition(new THREE.Vector3());
      const distanceToCamera = this.camera.position.distanceTo(modelWorldPos);
      console.log('[CharacterScene] Camera position:', this.camera.position.toArray());
      console.log('[CharacterScene] Camera looking at:', [0, 0, 0]);
      console.log('[CharacterScene] Model world position:', modelWorldPos.toArray());
      console.log('[CharacterScene] Model distance from camera:', distanceToCamera);

      // Проверяем, что модель в поле зрения камеры
      const frustum = new THREE.Frustum();
      const matrix = new THREE.Matrix4().multiplyMatrices(
        this.camera.projectionMatrix,
        this.camera.matrixWorldInverse
      );
      frustum.setFromProjectionMatrix(matrix);
      const modelInFrustum = frustum.containsPoint(modelWorldPos);
      console.log('[CharacterScene] Model in camera frustum:', modelInFrustum);

      // Выводим все объекты в сцене для отладки
      console.log(
        '[CharacterScene] All scene objects:',
        this.scene.children.map((child) => ({
          type: child.type,
          name: child.name || 'unnamed',
          position: child.position.toArray(),
          visible: child.visible,
        }))
      );

      // Создаем контроллер анимаций
      if (model.mixer) {
        this.animationController = new CharacterAnimationController(model);
        // Пробуем воспроизвести T-pose, если доступен, иначе используем default/idle
        const [tposeAction] = this.animationController.playAnimation('tpose');
        if (!tposeAction) {
          // Если T-pose не найден, используем default или idle
          const [defaultAction] = this.animationController.playAnimation('default');
          if (!defaultAction) {
            this.animationController.playIdle();
          }
        }
      }

      // Запускаем анимационный цикл
      this.startAnimation();

      console.log('[CharacterScene] Character loaded successfully');
    } catch (error) {
      console.error('[CharacterScene] Failed to load character:', error);
      console.error(
        '[CharacterScene] Error details:',
        error instanceof Error ? error.stack : String(error)
      );

      // Используем placeholder при ошибке
      console.warn('[CharacterScene] Using placeholder character instead');
      const placeholder = createPlaceholderCharacter();

      // Позиционируем placeholder
      placeholder.scene.position.set(0, 1, 0);

      this.scene.add(placeholder.scene);
      this.characterModel = placeholder;

      console.log('[CharacterScene] Placeholder added:', {
        position: placeholder.scene.position.toArray(),
        visible: placeholder.scene.visible,
        childrenCount: placeholder.scene.children.length,
      });

      this.startAnimation();
    }
  }

  /**
   * Запускает анимационный цикл
   */
  private startAnimation(): void {
    if (this.isAnimating) {
      console.warn('[CharacterScene] Animation already started');
      return;
    }

    console.log('[CharacterScene] Starting animation loop');
    this.isAnimating = true;
    this.animate();
    console.log('[CharacterScene] Animation loop started, isAnimating:', this.isAnimating);
  }

  /**
   * Останавливает анимационный цикл
   */
  public stopAnimation(): void {
    this.isAnimating = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Основной цикл анимации
   */
  private animate = (): void => {
    if (!this.isAnimating) {
      console.warn('[CharacterScene] Animation stopped, but animate() called');
      return;
    }

    this.animationFrameId = requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();

    // Обновляем анимации персонажа
    if (this.animationController) {
      this.animationController.update(delta);
    }

    // Рендерим сцену
    try {
      this.renderer.render(this.scene, this.camera);
    } catch (error) {
      console.error('[CharacterScene] Render error:', error);
    }

    // Логируем состояние рендеринга (только первые несколько кадров)
    if (!this._debugLogged) {
      const frameCount = this._frameCount || 0;
      this._frameCount = frameCount + 1;

      if (frameCount < 3) {
        console.log(`[CharacterScene] Rendering frame ${frameCount}:`, {
          sceneChildren: this.scene.children.length,
          modelInScene: this.characterModel
            ? this.scene.children.includes(this.characterModel.scene)
            : false,
          rendererSize: {
            width: this.renderer.domElement.width,
            height: this.renderer.domElement.height,
          },
          cameraPosition: this.camera.position.toArray(),
          cameraRotation: this.camera.rotation.toArray(),
          sceneObjects: this.scene.children.map((c) => ({
            type: c.type,
            visible: c.visible,
            position: c.position.toArray(),
          })),
        });
      }

      if (frameCount >= 10) {
        this._debugLogged = true;
      }
    }
  };

  /**
   * Изменяет размер канваса
   */
  public resize(width: number, height: number): void {
    if (width > 0 && height > 0) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height, false);
      console.log('[CharacterScene] Resized to:', width, 'x', height);
    }
  }

  /**
   * Воспроизводит анимацию
   */
  public playAnimation(animation: CharacterAnimation | string): void {
    if (!this.animationController) {
      console.warn('[CharacterScene] No animation controller available');
      return;
    }

    if (typeof animation === 'string') {
      // Если передана строка, пробуем воспроизвести анимацию по имени
      this.animationController.playAnimation(animation);
      return;
    }

    switch (animation) {
      case 'idle':
        this.animationController.playIdle();
        break;
      case 'listening':
        this.animationController.playListening();
        break;
      case 'thinking':
        this.animationController.playThinking();
        break;
      case 'talking':
        this.animationController.playTalking();
        break;
    }
  }

  /**
   * Получить список всех доступных анимаций
   */
  public getAvailableAnimations(): string[] {
    if (!this.animationController) {
      return [];
    }
    return this.animationController.getAvailableAnimations();
  }

  /**
   * Воспроизводит idle анимацию
   */
  public playIdle(): void {
    this.playAnimation('idle');
  }

  /**
   * Воспроизводит анимацию прослушивания
   */
  public playListening(): void {
    this.playAnimation('listening');
  }

  /**
   * Воспроизводит анимацию размышления
   */
  public playThinking(): void {
    this.playAnimation('thinking');
  }

  /**
   * Воспроизводит анимацию разговора
   */
  public playTalking(): void {
    this.playAnimation('talking');
  }

  /**
   * Воспроизводит простую анимацию головы (nod)
   */
  public playHeadNod(): void {
    if (this.animationController) {
      this.animationController.playHeadNod();
    }

    // Альтернативный способ - небольшое изменение rotation персонажа
    if (this.characterModel) {
      const originalRotation = this.characterModel.scene.rotation.clone();
      const targetRotation = originalRotation.clone();
      targetRotation.y += 0.1;

      // Плавное движение головы
      const startRotation = originalRotation.clone();
      const duration = 300;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 0.5 - Math.cos(progress * Math.PI) / 2;

        this.characterModel!.scene.rotation.y = THREE.MathUtils.lerp(
          startRotation.y,
          targetRotation.y,
          ease
        );

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Возвращаемся обратно
          const returnDuration = 300;
          const returnStart = Date.now();
          const returnStartRotation = this.characterModel!.scene.rotation.clone();

          const returnAnimate = () => {
            const returnElapsed = Date.now() - returnStart;
            const returnProgress = Math.min(returnElapsed / returnDuration, 1);
            const returnEase = 0.5 - Math.cos(returnProgress * Math.PI) / 2;

            this.characterModel!.scene.rotation.y = THREE.MathUtils.lerp(
              returnStartRotation.y,
              originalRotation.y,
              returnEase
            );

            if (returnProgress < 1) {
              requestAnimationFrame(returnAnimate);
            }
          };

          requestAnimationFrame(returnAnimate);
        }
      };

      animate();
    }
  }

  /**
   * Проверяет готовность сцены
   */
  public get ready(): boolean {
    return this.characterModel !== null;
  }

  /**
   * Очищает ресурсы
   */
  public dispose(): void {
    this.stopAnimation();

    if (this.characterModel) {
      this.scene.remove(this.characterModel.scene);

      // Очищаем геометрию и материалы
      this.characterModel.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }

    this.renderer.dispose();
  }
}
