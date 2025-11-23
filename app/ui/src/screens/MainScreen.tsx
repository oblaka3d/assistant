import { Box, Button, Typography, Paper } from '@mui/material';
import React, { useEffect, useRef } from 'react';

import { initCharacterScene, CharacterScene } from '../renderer/main';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setAssistantText,
  setIsLoading,
  setIsRecording,
  setLoadError,
  setSceneReady,
  setStatus,
  setUserText,
  VoiceStatus,
} from '../store/slices/voiceSlice';

import styles from './MainScreen.module.css';

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
    if (!canvasRef.current) {
      dispatch(setIsLoading(false));
      dispatch(setLoadError(true));
      dispatch(setStatus('Готов к работе (без персонажа)' as VoiceStatus));
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
            dispatch(setStatus('Готов к работе (без персонажа)' as VoiceStatus));
          }
        }, 3000);

        // Определяем путь к модели персонажа
        const modelPath = '/assets/models/character.glb';

        // Создаем THREE.js сцену
        const scene = await initCharacterScene({
          canvas: canvasRef.current!,
          modelUrl: modelPath,
          onProgress: (progress) => {
            console.log('Character loading progress:', Math.round(progress * 100) + '%');
          },
          enableToonShader: true,
        });

        if (!isMounted) {
          scene.dispose();
          return;
        }

        // Сохраняем ссылку на сцену
        sceneRef.current = scene;
        dispatch(setSceneReady(scene.ready));
        dispatch(setIsLoading(false));
        dispatch(setStatus('Готов к работе' as VoiceStatus));

        // Очищаем таймаут
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }

        // Воспроизводим idle анимацию
        scene.playIdle();

        console.log('Character scene loaded successfully');
      } catch (error) {
        if (!isMounted) return;

        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn('Failed to load character scene, continuing without it:', errorMessage);

        dispatch(setLoadError(true));
        dispatch(setIsLoading(false));
        dispatch(setStatus('Готов к работе (без персонажа)' as VoiceStatus));

        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
      }
    };

    loadScene();

    // Настройка ResizeObserver для изменения размера канваса
    if (containerRef.current && canvasRef.current) {
      resizeObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (sceneRef.current && width > 0 && height > 0) {
            sceneRef.current.resize(width, height);
          }
        }
      });

      resizeObserverRef.current.observe(containerRef.current);
    }

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

  const getStatusClassName = () => {
    if (status === 'Готов к работе') return styles.statusReady;
    if (status === 'Слушаю...') return styles.statusListening;
    if (
      status === 'Обработка...' ||
      status === 'Генерация ответа...' ||
      status === 'Отвечаю...' ||
      status === 'Распознавание речи...'
    ) {
      return styles.statusProcessing;
    }
    return styles.statusError;
  };

  const handleRecord = async () => {
    if (!window.api) {
      console.error('Electron API not available');
      return;
    }

    if (isRecording) {
      // Остановить запись
      dispatch(setIsRecording(false));
      dispatch(setStatus('Обработка...' as VoiceStatus));

      // Анимация персонажа - размышление
      if (sceneRef.current) {
        sceneRef.current.playThinking();
      }

      try {
        // Остановка записи и получение аудио буфера
        const audioBuffer = await window.api.stopRecord();

        // Распознавание речи
        dispatch(setStatus('Распознавание речи...' as VoiceStatus));
        if (sceneRef.current) {
          sceneRef.current.playThinking();
        }
        const transcribedText = await window.api.transcribe(audioBuffer);
        dispatch(setUserText(transcribedText || '—'));

        if (!transcribedText || transcribedText.trim() === '') {
          dispatch(setStatus('Речь не распознана' as VoiceStatus));
          if (sceneRef.current) {
            sceneRef.current.playIdle();
          }
          return;
        }

        // Получить ответ от ассистента
        dispatch(setStatus('Генерация ответа...' as VoiceStatus));
        const response = await window.api.askLLM(transcribedText);
        dispatch(setAssistantText(response || '—'));

        // Воспроизвести ответ
        dispatch(setStatus('Отвечаю...' as VoiceStatus));
        if (sceneRef.current) {
          sceneRef.current.playTalking();
        }

        await window.api.speak(response);

        dispatch(setStatus('Готов к работе' as VoiceStatus));
        if (sceneRef.current) {
          setTimeout(() => {
            sceneRef.current?.playIdle();
          }, 500);
        }
      } catch (error) {
        console.error('Recording error:', error);
        dispatch(setStatus('Ошибка' as VoiceStatus));
        if (sceneRef.current) {
          sceneRef.current.playIdle();
        }
      }
    } else {
      // Начать запись
      dispatch(setIsRecording(true));
      dispatch(setStatus('Слушаю...' as VoiceStatus));

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
            Загрузка персонажа...
          </Typography>
        </Box>
      )}

      {/* Предупреждение, если персонаж не загрузился */}
      {loadError && (
        <Box className={styles.warning}>
          <Paper elevation={3} className={styles.warningPaper}>
            <Typography variant="body2" color="warning.main" sx={{ textAlign: 'center' }}>
              ⚠️ Персонаж не загружен. Приложение работает в режиме без визуализации.
            </Typography>
          </Paper>
        </Box>
      )}

      {/* THREE.js контейнер */}
      <Box ref={containerRef} className={styles.sceneContainer}>
        {sceneReady ? (
          <>
            <canvas ref={canvasRef} className={styles.canvas} />
            {/* Подсветка вокруг персонажа */}
            <Box className={styles.glow} />
          </>
        ) : (
          // Placeholder, если персонаж не загрузился
          <Box className={styles.placeholder}>
            <Typography variant="h4" sx={{ opacity: 0.3, fontFamily: "'Inter', sans-serif" }}>
              🎭
            </Typography>
            <Typography
              variant="body1"
              sx={{ opacity: 0.5, textAlign: 'center', px: 2, fontFamily: "'Inter', sans-serif" }}
            >
              Персонаж недоступен
            </Typography>
          </Box>
        )}
      </Box>

      {/* Блок управления */}
      <Box className={styles.controls}>
        {/* Статус */}
        <Paper elevation={3} className={styles.statusPaper}>
          <Typography variant="body2" className={`${styles.statusText} ${getStatusClassName()}`}>
            {status}
          </Typography>
        </Paper>

        {/* Анимированная кнопка записи */}
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
          >
            {/* Иконка микрофона с анимацией */}
            <Box
              component="span"
              className={`${styles.recordButtonIcon} ${isRecording ? styles.recordButtonIconRecording : ''}`}
            >
              🎤
            </Box>
            <Typography component="span" className={styles.recordButtonText}>
              {isRecording ? 'Запись...' : 'Говорить'}
            </Typography>
          </Button>
        </Box>

        {/* Текстовые блоки */}
        <Box className={styles.textBlocks}>
          <Paper elevation={3} className={styles.textBlock}>
            <Typography variant="caption" color="text.secondary" className={styles.textBlockLabel}>
              Вы сказали:
            </Typography>
            <Typography
              variant="body1"
              className={`${styles.textBlockContent} ${userText !== '—' ? styles.textBlockContentFadeIn : ''}`}
            >
              {userText}
            </Typography>
          </Paper>

          <Paper elevation={3} className={styles.textBlock}>
            <Typography variant="caption" color="text.secondary" className={styles.textBlockLabel}>
              Ответ:
            </Typography>
            <Typography
              variant="body1"
              className={`${styles.textBlockContent} ${assistantText !== '—' ? styles.textBlockContentFadeIn : ''}`}
            >
              {assistantText}
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Футер */}
      <Box className={styles.footer}>ARM Voice Assistant v1.0</Box>
    </Box>
  );
};

export default MainScreen;
