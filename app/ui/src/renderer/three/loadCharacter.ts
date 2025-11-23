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
  return new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    
    loader.load(
      url,
      (gltf) => {
        try {
          const scene = gltf.scene;
          const animations = gltf.animations;
          
          // Настраиваем сцену
          scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = false;
              child.receiveShadow = false;
            }
          });
          
          // Создаем mixer для анимаций
          let mixer: THREE.AnimationMixer | null = null;
          const actions: { [key: string]: THREE.AnimationAction | null } = {};
          
          if (animations.length > 0) {
            mixer = new THREE.AnimationMixer(scene);
            
            // Находим idle анимацию
            const idleAnimation = animations.find((clip) => 
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
          reject(new Error(`Failed to process character model: ${error instanceof Error ? error.message : String(error)}`));
        }
      },
      (progress) => {
        if (onProgress && progress.total > 0) {
          onProgress(progress.loaded / progress.total);
        }
      },
      (error) => {
        const errorMessage = error instanceof Error ? error.message : String(error);
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

