/**
 * Unity WebGL Loader
 * Загружает и инициализирует Unity WebGL билд
 */

export interface UnityInstance {
  SendMessage: (objectName: string, methodName: string, value?: string | number) => void;
  Quit: () => Promise<void>;
  Module: any;
}

export interface UnityConfig {
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  streamingAssetsUrl: string;
  companyName: string;
  productName: string;
  productVersion: string;
}

declare global {
  interface Window {
    createUnityInstance?: (canvas: HTMLCanvasElement, config: UnityConfig, onProgress?: (progress: number) => void) => Promise<UnityInstance>;
    UnityLoader?: {
      instantiate: (container: HTMLElement, buildUrl: string, config: UnityConfig) => void;
    };
  }
}

/**
 * Инициализирует Unity WebGL билд
 * @param canvasElement - Canvas элемент для рендеринга Unity
 * @param onProgress - Callback для отслеживания прогресса загрузки
 * @returns Promise с экземпляром Unity
 */
export async function initUnity(
  canvasElement: HTMLCanvasElement,
  onProgress?: (progress: number) => void
): Promise<UnityInstance> {
  return new Promise((resolve, reject) => {
    try {
      // Проверяем наличие UnityLoader
      if (!window.createUnityInstance && !window.UnityLoader) {
        // Пытаемся загрузить UnityLoader из билда
        const isDev = window.location.protocol === 'file:' || window.location.hostname === 'localhost';
        const loaderPath = isDev ? '../../unity/Build/build.loader.js' : '../unity/Build/build.loader.js';
        const script = document.createElement('script');
        script.src = loaderPath;
        script.onload = () => {
          initializeUnity(canvasElement, onProgress)
            .then(resolve)
            .catch(reject);
        };
        script.onerror = () => {
          reject(new Error('Failed to load Unity loader script'));
        };
        document.head.appendChild(script);
      } else {
        initializeUnity(canvasElement, onProgress)
          .then(resolve)
          .catch(reject);
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function initializeUnity(
  canvasElement: HTMLCanvasElement,
  onProgress?: (progress: number) => void
): Promise<UnityInstance> {
  // Путь к Unity билду относительно HTML файла (app/ui/index.html)
  // В production: dist/app/ui/ -> ../unity/Build/
  // В dev: app/ui/ -> ../../unity/Build/
  const isDev = window.location.protocol === 'file:' || window.location.hostname === 'localhost';
  const buildUrl = isDev ? '../../unity/Build' : '../unity/Build';
  
  const config: UnityConfig = {
    dataUrl: `${buildUrl}/build.data`,
    frameworkUrl: `${buildUrl}/build.framework.js`,
    codeUrl: `${buildUrl}/build.wasm`,
    streamingAssetsUrl: 'StreamingAssets',
    companyName: 'VoiceAssistant',
    productName: 'Voice Assistant ARM',
    productVersion: '1.0.0',
  };

  // Используем createUnityInstance (новый API Unity)
  if (window.createUnityInstance) {
    return window.createUnityInstance(canvasElement, config, onProgress);
  }

  // Fallback на старый UnityLoader API
  if (window.UnityLoader) {
    return new Promise((resolve, reject) => {
      try {
        const container = canvasElement.parentElement || document.body;
        window.UnityLoader!.instantiate(container, buildUrl, config);
        
        // Для старого API нужно получить экземпляр через глобальную переменную
        // Это зависит от версии Unity, поэтому используем таймаут
        setTimeout(() => {
          const instance = (window as any).unityInstance as UnityInstance;
          if (instance) {
            resolve(instance);
          } else {
            reject(new Error('Unity instance not found'));
          }
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  }

  throw new Error('Unity loader not available');
}

/**
 * Отправляет сообщение в Unity
 * @param instance - Экземпляр Unity
 * @param objectName - Имя GameObject в Unity
 * @param methodName - Имя метода для вызова
 * @param value - Значение для передачи (опционально)
 */
export function sendMessageToUnity(
  instance: UnityInstance,
  objectName: string,
  methodName: string,
  value?: string | number
): void {
  try {
    if (value !== undefined) {
      instance.SendMessage(objectName, methodName, value);
    } else {
      instance.SendMessage(objectName, methodName);
    }
  } catch (error) {
    console.error('Error sending message to Unity:', error);
  }
}

