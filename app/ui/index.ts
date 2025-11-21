import { initUnity } from './unity-loader';
import { unityWrapper } from './unity-wrapper';

interface UIState {
  isRecording: boolean;
  isLoading: boolean;
  unityReady: boolean;
}

class VoiceAssistantUI {
  private recordButton: HTMLButtonElement;
  private userText: HTMLElement;
  private assistantText: HTMLElement;
  private status: HTMLElement;
  private unityContainer: HTMLElement;
  private unityCanvas: HTMLCanvasElement;
  private unityLoading: HTMLElement;
  private state: UIState;

  constructor() {
    this.recordButton = document.getElementById('recordButton') as HTMLButtonElement;
    this.userText = document.getElementById('userText') as HTMLElement;
    this.assistantText = document.getElementById('assistantText') as HTMLElement;
    this.status = document.getElementById('status') as HTMLElement;
    this.unityContainer = document.getElementById('unity-container') as HTMLElement;
    this.unityCanvas = document.getElementById('unity-canvas') as HTMLCanvasElement;
    this.unityLoading = document.getElementById('unityLoading') as HTMLElement;
    this.state = {
      isRecording: false,
      isLoading: false,
      unityReady: false,
    };

    this.setupEventListeners();
    this.checkAPI();
    this.initUnity();
  }

  private checkAPI(): void {
    if (!window.api) {
      console.error('Electron API not available');
      this.updateStatus('Ошибка: API недоступен', 'error');
    }
  }

  /**
   * Инициализирует Unity WebGL
   */
  private async initUnity(): Promise<void> {
    try {
      this.updateStatus('Загрузка персонажа...', 'processing');
      
      const instance = await initUnity(this.unityCanvas, (progress: number) => {
        console.log('Unity loading progress:', Math.round(progress * 100) + '%');
        if (this.unityLoading) {
          const loadingText = this.unityLoading.querySelector('.loading-text') as HTMLElement;
          if (loadingText) {
            loadingText.textContent = `Загрузка персонажа... ${Math.round(progress * 100)}%`;
          }
        }
      });

      unityWrapper.setInstance(instance);
      this.state.unityReady = true;
      
      // Скрываем индикатор загрузки
      if (this.unityLoading) {
        this.unityLoading.classList.add('hidden');
      }
      
      // Показываем Unity контейнер
      this.unityContainer.classList.remove('hidden');
      
      // Воспроизводим начальную анимацию
      unityWrapper.playIdle();
      
      this.updateStatus('Готов к работе', 'ready');
      console.log('Unity initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Unity:', error);
      this.updateStatus('Ошибка загрузки персонажа', 'error');
      
      // Скрываем индикатор загрузки даже при ошибке
      if (this.unityLoading) {
        this.unityLoading.classList.add('hidden');
      }
      
      // Показываем сообщение об ошибке
      this.unityContainer.innerHTML = '<div class="unity-error">Не удалось загрузить персонажа</div>';
    }
  }

  private setupEventListeners(): void {
    this.recordButton.addEventListener('mousedown', () => this.startRecording());
    this.recordButton.addEventListener('mouseup', () => this.stopRecording());
    this.recordButton.addEventListener('mouseleave', () => {
      if (this.state.isRecording) {
        this.stopRecording();
      }
    });

    // Touch events для сенсорных экранов
    this.recordButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.startRecording();
    });
    this.recordButton.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.stopRecording();
    });
  }

  private async startRecording(): Promise<void> {
    if (this.state.isRecording || this.state.isLoading) {
      return;
    }

    try {
      this.state.isRecording = true;
      this.recordButton.classList.add('recording');
      this.updateStatus('Запись...', 'recording');
      this.userText.textContent = '—';

      // Unity анимация: прослушивание
      if (this.state.unityReady) {
        unityWrapper.playListening();
      }

      await window.api.startRecord();
    } catch (error) {
      console.error('Error starting record:', error);
      this.updateStatus('Ошибка начала записи', 'error');
      this.state.isRecording = false;
      this.recordButton.classList.remove('recording');
      
      // Возвращаемся к idle анимации
      if (this.state.unityReady) {
        unityWrapper.playIdle();
      }
    }
  }

  private async stopRecording(): Promise<void> {
    if (!this.state.isRecording) {
      return;
    }

    try {
      this.state.isRecording = false;
      this.recordButton.classList.remove('recording');
      this.updateStatus('Обработка...', 'processing');

      // Остановка записи и получение буфера
      const audioBuffer = await window.api.stopRecord();
      this.updateStatus('Распознавание речи...', 'processing');

      // Unity анимация: размышление
      if (this.state.unityReady) {
        unityWrapper.playThinking();
      }

      // STT через IPC
      const transcribedText = await window.api.transcribe(audioBuffer);
      this.userText.textContent = transcribedText || '—';

      if (!transcribedText || transcribedText.trim() === '') {
        this.updateStatus('Речь не распознана', 'error');
        // Возвращаемся к idle
        if (this.state.unityReady) {
          unityWrapper.playIdle();
        }
        return;
      }

      // LLM
      this.updateStatus('Генерация ответа...', 'processing');
      const response = await window.api.askLLM(transcribedText);
      this.assistantText.textContent = response || '—';

      // Unity анимация: разговор
      if (this.state.unityReady) {
        unityWrapper.playTalking();
      }

      // TTS
      this.updateStatus('Синтез речи...', 'processing');
      await window.api.speak(response);

      // Возвращаемся к idle после завершения
      if (this.state.unityReady) {
        setTimeout(() => {
          unityWrapper.playIdle();
        }, 500);
      }

      this.updateStatus('Готов к работе', 'ready');
    } catch (error) {
      console.error('Error in recording flow:', error);
      this.updateStatus('Ошибка обработки', 'error');
      this.state.isRecording = false;
      this.recordButton.classList.remove('recording');
      
      // Возвращаемся к idle при ошибке
      if (this.state.unityReady) {
        unityWrapper.playIdle();
      }
    }
  }


  private updateStatus(message: string, type: 'ready' | 'recording' | 'processing' | 'error'): void {
    this.status.textContent = message;
    this.status.className = `status status-${type}`;
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  new VoiceAssistantUI();
});

