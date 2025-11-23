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
 * Проверяет наличие Unity билда (опциональная проверка)
 * @param buildUrl - URL к папке с билдом
 * @returns Promise<boolean> - true если билд существует, false если не найден или проверка не удалась
 */
async function checkUnityBuildExists(buildUrl: string): Promise<boolean> {
  try {
    // Проверяем наличие loader файла через fetch
    const loaderPath = `${buildUrl}/build.loader.js`;
    const response = await fetch(loaderPath, { method: 'HEAD', cache: 'no-cache' });
    return response.ok;
  } catch (error) {
    // В file:// протоколе fetch может не работать, возвращаем true чтобы попробовать загрузить
    // Ошибка загрузки будет обработана в основном коде
    console.debug('Unity build check failed (this is OK in file:// protocol):', error);
    return true; // Разрешаем попытку загрузки, ошибка будет обработана
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
      const isDev = window.location.protocol === 'file:' || window.location.hostname === 'localhost';
      const buildUrl = isDev ? '../../unity/Build' : '../unity/Build';
      
      // Проверяем наличие билда перед попыткой загрузки
      checkUnityBuildExists(buildUrl).then((exists) => {
        if (!exists) {
          reject(new Error('Unity build files not found. Application will continue without Unity.'));
          return;
        }

        // Проверяем наличие UnityLoader
        if (!window.createUnityInstance && !window.UnityLoader) {
          // Пытаемся загрузить UnityLoader из билда
          const loaderPath = `${buildUrl}/build.loader.js`;
          const script = document.createElement('script');
          script.src = loaderPath;
          script.onload = () => {
            initializeUnity(canvasElement, onProgress)
              .then(resolve)
              .catch(reject);
          };
          script.onerror = () => {
            reject(new Error('Failed to load Unity loader script. Unity build may be missing.'));
          };
          document.head.appendChild(script);
        } else {
          initializeUnity(canvasElement, onProgress)
            .then(resolve)
            .catch(reject);
        }
      }).catch((error) => {
        // Если проверка не удалась, все равно пытаемся загрузить (на случай CORS или других проблем)
        console.warn('Could not check Unity build existence, attempting to load anyway:', error);
        
        if (!window.createUnityInstance && !window.UnityLoader) {
          const loaderPath = `${buildUrl}/build.loader.js`;
          const script = document.createElement('script');
          script.src = loaderPath;
          script.onload = () => {
            initializeUnity(canvasElement, onProgress)
              .then(resolve)
              .catch(reject);
          };
          script.onerror = () => {
            reject(new Error('Failed to load Unity loader script. Unity build may be missing.'));
          };
          document.head.appendChild(script);
        } else {
          initializeUnity(canvasElement, onProgress)
            .then(resolve)
            .catch(reject);
        }
      });
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
    try {
      return await window.createUnityInstance(canvasElement, config, onProgress);
    } catch (error) {
      throw new Error(`Failed to create Unity instance: ${error instanceof Error ? error.message : String(error)}`);
    }
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
            reject(new Error('Unity instance not found after initialization'));
          }
        }, 1000);
      } catch (error) {
        reject(new Error(`Failed to initialize Unity: ${error instanceof Error ? error.message : String(error)}`));
      }
    });
  }

  throw new Error('Unity loader not available. Unity build files may be missing.');
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

