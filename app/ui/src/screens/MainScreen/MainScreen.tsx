import { Box, Button, Typography, Paper } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import React, { useEffect, useRef } from 'react';

import { TIMEOUTS, DEFAULTS } from '../../constants/app';
import { STATUS_MESSAGES, UI_MESSAGES } from '../../constants/messages';
import { initCharacterScene, CharacterScene } from '../../renderer/main';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addMessage } from '../../store/slices/chatSlice';
import {
  setAssistantText,
  setIsLoading,
  setIsRecording,
  setLoadError,
  setSceneReady,
  setStatus,
  setUserText,
  VoiceStatus,
} from '../../store/slices/voiceSlice';
import { createLogger } from '../../utils/logger';

import styles from './MainScreen.module.css';

const log = createLogger('MainScreen');

const MainScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<CharacterScene | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const { sceneReady, isLoading, loadError, status, userText, assistantText, isRecording } =
    useAppSelector((state) => state.voice);

  useEffect(() => {
    log.debug('useEffect triggered', {
      canvas: !!canvasRef.current,
      container: !!containerRef.current,
    });

    if (!canvasRef.current) {
      log.warn('Canvas element not found');
      dispatch(setIsLoading(false));
      dispatch(setLoadError(true));
      dispatch(setStatus(STATUS_MESSAGES.READY_NO_CHARACTER as VoiceStatus));
      return;
    }

    let isMounted = true;

    const loadScene = async () => {
      try {
        dispatch(setIsLoading(true));
        dispatch(setLoadError(false));
        
        // Таймаут для скрытия индикатора загрузки
        loadingTimeoutRef.current = setTimeout(() => {
          if (isMounted) {
            dispatch(setIsLoading(false));
            dispatch(setLoadError(true));
            dispatch(setStatus(STATUS_MESSAGES.READY_NO_CHARACTER as VoiceStatus));
          }
        }, TIMEOUTS.SCENE_LOAD);

        // Используем путь к модели по умолчанию из настроек или констант
        const modelPath = DEFAULTS.MODEL_PATH;

        log.debug('Starting character scene initialization', {
          modelPath,
          windowLocation: window.location.href,
          protocol: window.location.protocol,
        });
        
        // Создаем THREE.js сцену
        const scene = await initCharacterScene({
          canvas: canvasRef.current!,
          modelUrl: modelPath,
          onProgress: (progress) => {
            log.debug('Character loading progress:', Math.round(progress * 100) + '%');
          },
          enableToonShader: false, // Отключаем toon shader, используем оригинальные материалы модели
        });

        if (!isMounted) {
          scene.dispose();
          return;
        }

        // Сохраняем ссылку на сцену
        sceneRef.current = scene;
        dispatch(setSceneReady(scene.ready));
        dispatch(setIsLoading(false));
        dispatch(setStatus(STATUS_MESSAGES.READY as VoiceStatus));

        // Очищаем таймаут
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }

        // Воспроизводим idle анимацию
        scene.playIdle();

        log.log('Character scene loaded successfully');
      } catch (error) {
        if (!isMounted) return;
        
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn('Failed to load character scene, continuing without it:', errorMessage);

        dispatch(setLoadError(true));
        dispatch(setIsLoading(false));
        dispatch(setStatus(STATUS_MESSAGES.READY_NO_CHARACTER as VoiceStatus));

        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
      }
    };

    loadScene();

    // Настройка ResizeObserver для изменения размера канваса
    // Используем небольшую задержку, чтобы убедиться, что canvas уже в DOM
    const setupResizeObserver = () => {
      if (containerRef.current && canvasRef.current) {
        resizeObserverRef.current = new ResizeObserver((entries) => {
          for (const entry of entries) {
            const { width, height } = entry.contentRect;
            if (sceneRef.current && width > 0 && height > 0) {
              log.debug('Container resized to:', width, 'x', height);
              sceneRef.current.resize(width, height);
            }
          }
        });

        resizeObserverRef.current.observe(containerRef.current);

        // Также следим за canvas напрямую
        if (canvasRef.current) {
          resizeObserverRef.current.observe(canvasRef.current);
        }
      } else {
        // Повторяем попытку, если элементы еще не готовы
        setTimeout(setupResizeObserver, TIMEOUTS.RESIZE_RETRY);
      }
    };

    setupResizeObserver();

    // Очистка при размонтировании
    return () => {
      isMounted = false;

      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }

      if (resizeObserverRef.current && containerRef.current) {
        resizeObserverRef.current.unobserve(containerRef.current);
        resizeObserverRef.current.disconnect();
      }

      if (sceneRef.current) {
        sceneRef.current.dispose();
        sceneRef.current = null;
      }
    };
  }, [dispatch]);

  const handleRecord = async () => {
    if (!window.api) {
      console.error('Electron API not available');
      return;
    }

    if (isRecording) {
      // Остановить запись
      dispatch(setIsRecording(false));
      dispatch(setStatus(STATUS_MESSAGES.PROCESSING as VoiceStatus));

      // Анимация персонажа - размышление
      if (sceneRef.current) {
        sceneRef.current.playThinking();
      }

      try {
        // Остановка записи и получение аудио буфера
        const audioBuffer = await window.api.stopRecord();

        // Распознавание речи
        dispatch(setStatus(STATUS_MESSAGES.RECOGNIZING as VoiceStatus));
        if (sceneRef.current) {
          sceneRef.current.playThinking();
        }
        const transcribedText = await window.api.transcribe(audioBuffer);
        dispatch(setUserText(transcribedText || DEFAULTS.EMPTY_TEXT));

        if (!transcribedText || transcribedText.trim() === '') {
          dispatch(setStatus(STATUS_MESSAGES.NOT_RECOGNIZED as VoiceStatus));
          if (sceneRef.current) {
            sceneRef.current.playIdle();
          }
          return;
        }

        // Добавляем сообщение пользователя в чат
        dispatch(
          addMessage({
            id: Date.now().toString(),
            position: 'right',
            type: 'text',
            text: transcribedText,
            date: new Date(),
          })
        );

        // Получить ответ от ассистента
        dispatch(setStatus(STATUS_MESSAGES.GENERATING as VoiceStatus));
        const response = await window.api.askLLM(transcribedText);
        dispatch(setAssistantText(response || DEFAULTS.EMPTY_TEXT));

        // Добавляем ответ ассистента в чат
        if (response) {
          dispatch(
            addMessage({
              id: (Date.now() + 1).toString(),
              position: 'left',
              type: 'text',
              text: response,
              date: new Date(),
            })
          );
        }

        // Воспроизвести ответ
        dispatch(setStatus(STATUS_MESSAGES.SPEAKING as VoiceStatus));
        if (sceneRef.current) {
          sceneRef.current.playTalking();
        }

        await window.api.speak(response);

        dispatch(setStatus(STATUS_MESSAGES.READY as VoiceStatus));
        if (sceneRef.current) {
          setTimeout(() => {
            sceneRef.current?.playIdle();
          }, TIMEOUTS.IDLE_TRANSITION);
        }
      } catch (error) {
        log.error('Recording error:', error);
        dispatch(setStatus(STATUS_MESSAGES.ERROR as VoiceStatus));
        if (sceneRef.current) {
          sceneRef.current.playIdle();
        }
      }
    } else {
      // Начать запись - очищаем предыдущие тексты
      dispatch(setUserText(DEFAULTS.EMPTY_TEXT));
      dispatch(setAssistantText(DEFAULTS.EMPTY_TEXT));
      dispatch(setIsRecording(true));
      dispatch(setStatus(STATUS_MESSAGES.LISTENING as VoiceStatus));

      // Анимация персонажа - прослушивание
      if (sceneRef.current) {
        sceneRef.current.playListening();
        // Небольшая анимация головы при начале записи
        sceneRef.current.playHeadNod();
      }
      
      try {
        await window.api.startRecord();
      } catch (error) {
        console.error('Failed to start recording:', error);
        dispatch(setIsRecording(false));
        dispatch(setStatus('Ошибка' as VoiceStatus));
        if (sceneRef.current) {
          sceneRef.current.playIdle();
        }
      }
    }
  };

  return (
    <Box className={styles.container}>
      {/* Индикатор загрузки */}
      {isLoading && (
        <Box className={styles.loading}>
          <Box className={styles.loadingSpinner} />
          <Typography variant="h6" color="text.secondary">
            {UI_MESSAGES.LOADING_CHARACTER}
          </Typography>
        </Box>
      )}

      {/* Предупреждение, если персонаж не загрузился */}
      {loadError && (
        <Box className={styles.warning}>
          <Paper elevation={3} className={styles.warningPaper}>
            <Typography variant="body2" color="warning.main" sx={{ textAlign: 'center' }}>
              {UI_MESSAGES.CHARACTER_NOT_LOADED}
            </Typography>
          </Paper>
        </Box>
      )}

      {/* THREE.js контейнер */}
      <Box ref={containerRef} className={styles.sceneContainer}>
        {/* Canvas всегда рендерится для инициализации THREE.js */}
        <canvas ref={canvasRef} className={styles.canvas} />
        
        {/* Подсветка вокруг персонажа (только если сцена готова) */}
        {sceneReady && <Box className={styles.glow} />}
        
        {/* Placeholder, если персонаж не загрузился */}
        {loadError && !sceneReady && (
          <Box className={styles.placeholder}>
            <Typography variant="h4" sx={{ opacity: 0.3, fontFamily: "'Inter', sans-serif" }}>
              🎭
            </Typography>
            <Typography
              variant="body1"
              sx={{ opacity: 0.5, textAlign: 'center', px: 2, fontFamily: "'Inter', sans-serif" }}
            >
              {UI_MESSAGES.CHARACTER_UNAVAILABLE}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Текстовые блоки - нижний левый угол (показываются только при наличии текста) */}
      {(userText !== DEFAULTS.EMPTY_TEXT || assistantText !== DEFAULTS.EMPTY_TEXT) && (
        <Box className={styles.textBlocks}>
          {/* Показываем "Вы сказали" только если есть распознанный текст И нет ответа (во время обработки) */}
          {userText !== DEFAULTS.EMPTY_TEXT && assistantText === DEFAULTS.EMPTY_TEXT && (
            <Paper elevation={3} className={styles.textBlock}>
              <Typography variant="caption" color="text.secondary" className={styles.textBlockLabel}>
                Вы сказали:
              </Typography>
              <Typography
                variant="body1"
                className={`${styles.textBlockContent} ${styles.textBlockContentFadeIn}`}
              >
                {userText}
              </Typography>
            </Paper>
          )}

          {/* Показываем "Ответ" только если есть ответ от ассистента */}
          {assistantText !== DEFAULTS.EMPTY_TEXT && (
            <Paper elevation={3} className={styles.textBlock}>
              <Typography variant="caption" color="text.secondary" className={styles.textBlockLabel}>
                Ответ:
              </Typography>
              <Typography
                variant="body1"
                className={`${styles.textBlockContent} ${styles.textBlockContentFadeIn}`}
              >
                {assistantText}
              </Typography>
            </Paper>
          )}
        </Box>
      )}

      {/* Кнопка записи - нижний правый угол */}
      <Box className={styles.recordButtonContainer}>
        {/* Ripple эффекты при записи */}
        {isRecording && (
          <>
            <Box className={styles.recordRipple} />
            <Box className={styles.recordRipple} />
            <Box className={styles.recordRipple} />
          </>
        )}

        <Button
          onClick={handleRecord}
          variant="contained"
          disableRipple
          className={`${styles.recordButton} ${isRecording ? styles.recordButtonRecording : ''}`}
          title={isRecording ? 'Запись...' : 'Говорить'}
        >
          {/* Иконка микрофона с анимацией */}
          <MicIcon
              className={`${styles.recordButtonIcon} ${isRecording ? styles.recordButtonIconRecording : ''}`}
            />
        </Button>
      </Box>
    </Box>
  );
};

export default MainScreen;
