/**
 * Unity Wrapper
 * Обертка для управления Unity анимациями персонажа
 */

import { UnityInstance, sendMessageToUnity } from './unity-loader';

export type UnityAnimation = 'idle' | 'listening' | 'thinking' | 'talking';

export class UnityWrapper {
  private instance: UnityInstance | null = null;
  private currentAnimation: UnityAnimation = 'idle';
  private isReady: boolean = false;

  /**
   * Устанавливает экземпляр Unity
   */
  setInstance(instance: UnityInstance): void {
    this.instance = instance;
    this.isReady = true;
    this.setupUnityCallbacks();
  }

  /**
   * Проверяет готовность Unity
   */
  get ready(): boolean {
    return this.isReady && this.instance !== null;
  }

  /**
   * Настраивает обратные вызовы от Unity
   */
  private setupUnityCallbacks(): void {
    // Unity может вызывать window.unityReceive для отправки сообщений
    (window as any).unityReceive = (type: string, data: string) => {
      this.handleUnityMessage(type, data);
    };
  }

  /**
   * Обрабатывает сообщения от Unity
   */
  private handleUnityMessage(type: string, data: string): void {
    console.log('Unity message:', type, data);
    
    if (type === 'animation') {
      const animation = data as UnityAnimation;
      if (['idle', 'listening', 'thinking', 'talking'].includes(animation)) {
        this.currentAnimation = animation;
        this.onAnimationChanged(animation);
      }
    }
  }

  /**
   * Callback при изменении анимации
   */
  private onAnimationChanged(animation: UnityAnimation): void {
    // Можно добавить дополнительную логику
    console.log('Animation changed to:', animation);
  }

  /**
   * Воспроизводит анимацию idle
   */
  playIdle(): void {
    if (!this.instance) return;
    sendMessageToUnity(this.instance, 'CharacterController', 'PlayIdle');
    this.currentAnimation = 'idle';
  }

  /**
   * Воспроизводит анимацию прослушивания
   */
  playListening(): void {
    if (!this.instance) return;
    sendMessageToUnity(this.instance, 'CharacterController', 'PlayListening');
    this.currentAnimation = 'listening';
  }

  /**
   * Воспроизводит анимацию размышления
   */
  playThinking(): void {
    if (!this.instance) return;
    sendMessageToUnity(this.instance, 'CharacterController', 'PlayThinking');
    this.currentAnimation = 'thinking';
  }

  /**
   * Воспроизводит анимацию разговора
   */
  playTalking(): void {
    if (!this.instance) return;
    sendMessageToUnity(this.instance, 'CharacterController', 'PlayTalking');
    this.currentAnimation = 'talking';
  }

  /**
   * Получает текущую анимацию
   */
  getCurrentAnimation(): UnityAnimation {
    return this.currentAnimation;
  }

  /**
   * Сброс в начальное состояние
   */
  reset(): void {
    this.playIdle();
  }
}

// Глобальный экземпляр wrapper
export const unityWrapper = new UnityWrapper();

