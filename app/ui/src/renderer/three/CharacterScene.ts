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

  constructor(options: CharacterSceneOptions) {
    const { canvas, onProgress } = options;

    // Создаем сцену
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);

    // Создаем камеру (фиксированная)
    const aspect = canvas.width / canvas.height || 1;
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    this.camera.position.set(0, 1.6, 3);
    this.camera.lookAt(0, 1, 0);

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
    this.renderer.setSize(canvas.width, canvas.height, false);

    // Настраиваем освещение
    this.setupLighting();

    // Создаем clock для анимаций
    this.clock = new THREE.Clock();

    // Загружаем персонажа
    this.loadCharacter(options.modelUrl, onProgress, options.enableToonShader !== false);
  }

  /**
   * Настраивает освещение сцены
   */
  private setupLighting(): void {
    // HemisphereLight для мягкого окружающего света
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    hemisphereLight.position.set(0, 5, 0);
    this.scene.add(hemisphereLight);

    // DirectionalLight для основного освещения
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(2, 5, 3);
    directionalLight.castShadow = false;
    this.scene.add(directionalLight);
  }

  /**
   * Загружает модель персонажа
   */
  private async loadCharacter(
    modelUrl?: string,
    onProgress?: (progress: number) => void,
    enableToonShader: boolean = true
  ): Promise<void> {
    try {
      let model: CharacterModel;

      if (modelUrl) {
        model = await loadCharacterGLB(modelUrl, onProgress);
      } else {
        // Используем placeholder, если модель не указана
        console.warn('Character model URL not provided, using placeholder');
        model = createPlaceholderCharacter();
      }

      // Центрируем персонажа
      model.scene.position.set(0, 0, 0);

      // Применяем toon shader, если нужно
      if (enableToonShader) {
        applyToonShader(model.scene);
      }

      // Добавляем в сцену
      this.scene.add(model.scene);
      this.characterModel = model;

      // Создаем контроллер анимаций
      if (model.mixer) {
        this.animationController = new CharacterAnimationController(model);
        this.animationController.playIdle();
      }

      // Запускаем анимационный цикл
      this.startAnimation();

      console.log('Character loaded successfully');
    } catch (error) {
      console.error('Failed to load character:', error);

      // Используем placeholder при ошибке
      const placeholder = createPlaceholderCharacter();
      this.scene.add(placeholder.scene);
      this.characterModel = placeholder;

      this.startAnimation();
    }
  }

  /**
   * Запускает анимационный цикл
   */
  private startAnimation(): void {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.animate();
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
    if (!this.isAnimating) return;

    this.animationFrameId = requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();

    // Обновляем анимации персонажа
    if (this.animationController) {
      this.animationController.update(delta);
    }

    // Рендерим сцену
    this.renderer.render(this.scene, this.camera);
  };

  /**
   * Изменяет размер канваса
   */
  public resize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  /**
   * Воспроизводит анимацию
   */
  public playAnimation(animation: CharacterAnimation): void {
    if (!this.animationController) return;

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
