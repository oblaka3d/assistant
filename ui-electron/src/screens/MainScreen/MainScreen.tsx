import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MicIcon from '@mui/icons-material/Mic';
import { Box, Button, Typography, Paper, IconButton } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import MessageRenderer from '../../components/MessageRenderer';
import { DEFAULTS, TIMEOUTS } from '../../constants/app';
import type { CharacterScene } from '../../renderer/main';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import type { Message } from '../../store/slices/chatSlice';
import { initScene } from '../../store/thunks/sceneThunks';
import { stopRecordingAndProcess, startRecording } from '../../store/thunks/voiceThunks';
import { createLogger } from '../../utils/logger';
import { getSystemTheme } from '../../utils/theme';

import styles from './MainScreen.module.css';

const log = createLogger('MainScreen');

const MainScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch(); // Используется для других действий (не навигации)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<CharacterScene | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const { sceneReady, isLoading, loadError, userText, assistantText, isRecording } = useAppSelector(
    (state) => state.voice
  );
  const theme = useAppSelector((state) => state.settings.theme);
  const accentColorLight = useAppSelector((state) => state.settings.accentColorLight);
  const accentColorDark = useAppSelector((state) => state.settings.accentColorDark);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => getSystemTheme());
  const currentScreen = useAppSelector((state) => state.ui.currentScreen);
  const isChatScreenActive = currentScreen === 'chat';

  // Отслеживаем изменения системной темы
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const isDark = 'matches' in e ? e.matches : mediaQuery.matches;
      setSystemTheme(isDark ? 'dark' : 'light');
    };

    // Устанавливаем начальное значение
    handleChange(mediaQuery);

    // Современные браузеры поддерживают addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Для старых браузеров
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mediaQuery as any).addListener(handleChange);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => (mediaQuery as any).removeListener(handleChange);
  }, []);

  // Определяем эффективную тему
  const effectiveTheme = theme === 'system' ? systemTheme : theme;

  // Выбираем акцентный цвет в зависимости от эффективной темы
  const accentColor = effectiveTheme === 'dark' ? accentColorDark : accentColorLight;

  // Получаем последний ответ ассистента из чата для отображения на главном экране
  const { dialogs, currentDialogId } = useAppSelector((state) => state.chat);
  const currentDialog = dialogs.find((d) => d.id === currentDialogId);
  const messages = currentDialog?.messages || [];
  const lastAssistantMessage = messages.filter((msg) => msg.position === 'left').slice(-1)[0];
  const liveAssistantMessage = useMemo<Message | null>(() => {
    if (assistantText === DEFAULTS.EMPTY_TEXT) {
      return null;
    }
    return {
      id: 'live-assistant-message',
      position: 'left',
      type: 'markdown',
      text: assistantText,
      date: new Date(),
    };
  }, [assistantText]);

  // Обновляем цвет фона сцены при изменении темы
  useEffect(() => {
    if (sceneRef.current) {
      const backgroundColor = effectiveTheme === 'dark' ? 0x1a1a1a : 0xf5f5f5;
      sceneRef.current.setBackgroundColor(backgroundColor);
      log.debug('Scene background color updated to:', effectiveTheme, backgroundColor);
    }
  }, [effectiveTheme]);

  useEffect(() => {
    log.debug('useEffect triggered', {
      canvas: !!canvasRef.current,
      container: !!containerRef.current,
    });

    if (!canvasRef.current) {
      log.warn('Canvas element not found');
      return;
    }

    let isMounted = true;

    const loadScene = async () => {
      try {
        log.debug('Starting character scene initialization', {
          windowLocation: window.location.href,
          protocol: window.location.protocol,
        });

        // Создаем THREE.js сцену через thunk
        // CharacterScene передается через callback, чтобы не попадать в Redux store
        let sceneInstance: CharacterScene | null = null;

        await dispatch(
          initScene({
            canvas: canvasRef.current!,
            onProgress: (progress) => {
              log.debug('Character loading progress:', Math.round(progress * 100) + '%');
            },
            enableToonShader: false, // Отключаем toon shader, используем оригинальные материалы модели
            onSceneCreated: (scene) => {
              sceneInstance = scene;
            },
          })
        ).unwrap();

        if (!isMounted || !sceneInstance) {
          sceneInstance?.dispose();
          return;
        }

        // Сохраняем ссылку на сцену
        sceneRef.current = sceneInstance;

        // Устанавливаем начальный цвет фона на основе текущей темы
        const currentTheme = theme === 'system' ? systemTheme : theme;
        const initialBackgroundColor = currentTheme === 'dark' ? 0x1a1a1a : 0xf5f5f5;
        sceneInstance.setBackgroundColor(initialBackgroundColor);
        log.debug('Initial scene background color set to:', currentTheme, initialBackgroundColor);

        // Воспроизводим idle анимацию
        sceneInstance.playIdle();

        log.log('Character scene loaded successfully');
      } catch (error) {
        if (!isMounted) return;
        log.error('Failed to load character scene:', error);
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
    const containerElement = containerRef.current;
    const resizeObserver = resizeObserverRef.current;

    return () => {
      isMounted = false;

      if (resizeObserver && containerElement) {
        resizeObserver.unobserve(containerElement);
        resizeObserver.disconnect();
      }

      if (sceneRef.current) {
        sceneRef.current.dispose();
        sceneRef.current = null;
      }
    };
  }, [dispatch, theme, systemTheme]);

  const handleRecord = async () => {
    if (isRecording) {
      // Остановить запись и обработать
      try {
        await dispatch(
          stopRecordingAndProcess({
            onThinking: () => {
              if (sceneRef.current) {
                sceneRef.current.playThinking();
              }
            },
            onIdle: () => {
              if (sceneRef.current) {
                sceneRef.current.playIdle();
              }
            },
            onTalking: () => {
              if (sceneRef.current) {
                sceneRef.current.playTalking();
              }
            },
          })
        ).unwrap();
      } catch (error) {
        log.error('Recording error:', error);
        if (sceneRef.current) {
          sceneRef.current.playIdle();
        }
      }
    } else {
      // Начать запись
      try {
        await dispatch(startRecording()).unwrap();

        // Анимация персонажа - прослушивание
        if (sceneRef.current) {
          sceneRef.current.playListening();
          // Небольшая анимация головы при начале записи
          sceneRef.current.playHeadNod();
        }
      } catch (error) {
        log.error('Failed to start recording:', error);
        if (sceneRef.current) {
          sceneRef.current.playIdle();
        }
      }
    }
  };

  const navigate = useNavigate();

  const handleOpenChat = useCallback(() => {
    navigate('/chat');
  }, [navigate]);

  const handleKeyOpenChat = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleOpenChat();
      }
    },
    [handleOpenChat]
  );

  const openChatLabel = t('ui.openChat');

  return (
    <Box className={styles.container}>
      {/* Индикатор загрузки */}
      {isLoading && (
        <Box className={styles.loading}>
          <Box className={styles.loadingSpinner} />
          <Typography variant="h6" color="text.secondary">
            {t('ui.loadingCharacter')}
          </Typography>
        </Box>
      )}

      {/* Предупреждение, если персонаж не загрузился */}
      {loadError && (
        <Box className={styles.warning}>
          <Paper elevation={3} className={styles.warningPaper}>
            <Typography variant="body2" color="warning.main" sx={{ textAlign: 'center' }}>
              {t('ui.characterNotLoaded')}
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
              {t('ui.characterUnavailable')}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Текстовые блоки - верхний левый угол */}
      {/* Показываем текущие тексты во время записи/обработки */}
      {(userText !== DEFAULTS.EMPTY_TEXT || assistantText !== DEFAULTS.EMPTY_TEXT) && (
        <Box
          className={`${styles.textBlocks} ${isChatScreenActive ? styles.textBlocksShifted : ''}`}
          aria-hidden={isChatScreenActive}
        >
          {/* Показываем "Вы сказали" только если есть распознанный текст И нет ответа (во время обработки) */}
          {userText !== DEFAULTS.EMPTY_TEXT && assistantText === DEFAULTS.EMPTY_TEXT && (
            <Paper elevation={3} className={styles.textBlock}>
              <Typography
                variant="caption"
                color="text.secondary"
                className={styles.textBlockLabel}
              >
                {t('ui.youSaid')}:
              </Typography>
              <Typography
                variant="body1"
                className={`${styles.textBlockContent} ${styles.textBlockContentFadeIn}`}
                sx={{ color: accentColor }}
              >
                {userText}
              </Typography>
            </Paper>
          )}

          {/* Показываем "Ответ" только если есть ответ от ассистента */}
          {assistantText !== DEFAULTS.EMPTY_TEXT && (
            <Paper
              elevation={3}
              className={`${styles.textBlock} ${styles.textBlockInteractive}`}
              onClick={handleOpenChat}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyOpenChat}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                className={styles.textBlockLabel}
              >
                {t('ui.answer')}:
              </Typography>
              <Box
                className={`${styles.textBlockContent} ${styles.textBlockContentFadeIn} ${styles.textBlockContentWithButton}`}
              >
                {liveAssistantMessage && <MessageRenderer message={liveAssistantMessage} />}
              </Box>
              <IconButton
                size="small"
                className={styles.openChatButton}
                aria-label={openChatLabel}
                title={openChatLabel}
                onClick={(event) => {
                  event.stopPropagation();
                  handleOpenChat();
                }}
              >
                <ChatBubbleOutlineIcon fontSize="small" />
              </IconButton>
            </Paper>
          )}
        </Box>
      )}

      {/* Показываем последний ответ ассистента из чата, если нет активной записи и нет текущих текстов */}
      {!isRecording &&
        userText === DEFAULTS.EMPTY_TEXT &&
        assistantText === DEFAULTS.EMPTY_TEXT &&
        lastAssistantMessage && (
          <Box
            className={`${styles.textBlocks} ${isChatScreenActive ? styles.textBlocksShifted : ''}`}
            aria-hidden={isChatScreenActive}
          >
            <Paper
              elevation={3}
              className={`${styles.textBlock} ${styles.textBlockInteractive}`}
              onClick={handleOpenChat}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyOpenChat}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                className={styles.textBlockLabel}
              >
                {t('ui.answer')}:
              </Typography>
              <Box
                className={`${styles.textBlockContent} ${styles.textBlockContentFadeIn} ${styles.textBlockContentWithButton}`}
              >
                <MessageRenderer message={lastAssistantMessage} />
              </Box>
              <IconButton
                size="small"
                className={styles.openChatButton}
                aria-label={openChatLabel}
                title={openChatLabel}
                onClick={(event) => {
                  event.stopPropagation();
                  handleOpenChat();
                }}
              >
                <ChatBubbleOutlineIcon fontSize="small" />
              </IconButton>
            </Paper>
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
