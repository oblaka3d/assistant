import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { initUnity, UnityInstance } from '../../unity-loader';
import { unityWrapper } from '../../unity-wrapper';

const MainScreen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [unityReady, setUnityReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [unityLoadError, setUnityLoadError] = useState(false);
  const [status, setStatus] = useState('Готов к работе');
  const [userText, setUserText] = useState('—');
  const [assistantText, setAssistantText] = useState('—');
  const [isRecording, setIsRecording] = useState(false);
  const unityInstanceRef = useRef<UnityInstance | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const forceHideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      // Если canvas недоступен, сразу показываем UI без Unity
      setIsLoading(false);
      setUnityLoadError(true);
      setStatus('Готов к работе (без персонажа)');
      return;
    }

    let isMounted = true;

    const loadUnity = async () => {
      try {
        setIsLoading(true);
        setUnityLoadError(false);
        
        // Принудительно скрываем индикатор через 3 секунды (гарантированно)
        forceHideTimeoutRef.current = setTimeout(() => {
          if (isMounted) {
            console.warn('Force hiding loading indicator after 3 seconds');
            setIsLoading(false);
            // Если Unity еще не загружена, показываем ошибку
            setUnityLoadError(true);
            setStatus('Готов к работе (без персонажа)');
          }
        }, 3000);
        
        // Устанавливаем таймаут на 3 секунды для быстрого показа UI
        loadingTimeoutRef.current = setTimeout(() => {
          if (isMounted) {
            console.warn('Unity loading timeout - continuing without Unity');
            setIsLoading(false);
            setUnityLoadError(true);
            setStatus('Готов к работе (без персонажа)');
          }
        }, 3000);

        // Пытаемся загрузить Unity с таймаутом на сам промис
        const unityPromise = initUnity(canvasRef.current!, (progress) => {
          console.log('Unity loading progress:', progress);
        });
        
        // Добавляем таймаут на промис (на случай если он зависнет)
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => {
            reject(new Error('Unity loading timeout'));
          }, 3000);
        });

        const instance = await Promise.race([unityPromise, timeoutPromise]);
        
        // Проверяем, что компонент еще смонтирован
        if (!isMounted) return;
        
        // Очищаем таймауты, если загрузка успешна
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
        if (forceHideTimeoutRef.current) {
          clearTimeout(forceHideTimeoutRef.current);
          forceHideTimeoutRef.current = null;
        }
        
        unityInstanceRef.current = instance;
        unityWrapper.setInstance(instance);
        setUnityReady(true);
        setIsLoading(false);
        setStatus('Готов к работе');
      } catch (error) {
        // Проверяем, что компонент еще смонтирован
        if (!isMounted) return;
        
        // Очищаем таймауты при ошибке
        if (loadingTimeoutRef.current) {
          clearTimeout(loadingTimeoutRef.current);
          loadingTimeoutRef.current = null;
        }
        if (forceHideTimeoutRef.current) {
          clearTimeout(forceHideTimeoutRef.current);
          forceHideTimeoutRef.current = null;
        }
        
        // Логируем ошибку, но не блокируем UI
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn('Unity failed to load, continuing without it:', errorMessage);
        
        setUnityLoadError(true);
        setIsLoading(false);
        setStatus('Готов к работе (без персонажа)');
      }
    };

    loadUnity();

    // Очистка таймаутов при размонтировании
    return () => {
      isMounted = false;
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
      if (forceHideTimeoutRef.current) {
        clearTimeout(forceHideTimeoutRef.current);
        forceHideTimeoutRef.current = null;
      }
    };
  }, []);

  const handleRecord = async () => {
    if (!window.api) {
      console.error('Electron API not available');
      return;
    }

    if (isRecording) {
      // Остановить запись
      setIsRecording(false);
      setStatus('Обработка...');
      // Пытаемся воспроизвести анимацию только если Unity загружена
      if (unityReady) {
        unityWrapper.playThinking();
      }

      try {
        // Остановка записи и получение аудио буфера
        const audioBuffer = await window.api.stopRecord();
        
        // Распознавание речи
        setStatus('Распознавание речи...');
        if (unityReady) {
          unityWrapper.playThinking();
        }
        const transcribedText = await window.api.transcribe(audioBuffer);
        setUserText(transcribedText || '—');
        
        if (!transcribedText || transcribedText.trim() === '') {
          setStatus('Речь не распознана');
          if (unityReady) {
            unityWrapper.playIdle();
          }
          return;
        }
        
        // Получить ответ от ассистента
        setStatus('Генерация ответа...');
        const response = await window.api.askLLM(transcribedText);
        setAssistantText(response || '—');
        
        // Воспроизвести ответ
        setStatus('Отвечаю...');
        if (unityReady) {
          unityWrapper.playTalking();
        }
        
        await window.api.speak(response);
        
        setStatus('Готов к работе');
        if (unityReady) {
          setTimeout(() => {
            unityWrapper.playIdle();
          }, 500);
        }
      } catch (error) {
        console.error('Recording error:', error);
        setStatus('Ошибка');
        if (unityReady) {
          unityWrapper.playIdle();
        }
      }
    } else {
      // Начать запись
      setIsRecording(true);
      setStatus('Слушаю...');
      if (unityReady) {
        unityWrapper.playListening();
      }
      
      try {
        await window.api.startRecord();
      } catch (error) {
        console.error('Failed to start recording:', error);
        setIsRecording(false);
        setStatus('Ошибка');
        if (unityReady) {
          unityWrapper.playIdle();
        }
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#1a1a1a',
      }}
    >
      {/* Индикатор загрузки Unity (показывается максимум 3 секунды) */}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              border: '4px solid #2d2d2d',
              borderTopColor: '#4a90e2',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              mb: 2,
            }}
          />
          <Typography variant="h6" color="text.secondary">
            Загрузка персонажа...
          </Typography>
        </Box>
      )}

      {/* Предупреждение, если Unity не загрузилась */}
      {unityLoadError && (
        <Box
          sx={{
            position: 'absolute',
            top: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 100,
            maxWidth: '90%',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 1.5,
              backgroundColor: 'rgba(231, 76, 60, 0.2)',
              border: '1px solid rgba(231, 76, 60, 0.5)',
              borderRadius: 2,
            }}
          >
            <Typography variant="body2" color="warning.main" sx={{ textAlign: 'center' }}>
              ⚠️ Персонаж не загружен. Приложение работает в режиме без визуализации.
            </Typography>
          </Paper>
        </Box>
      )}

      {/* Unity контейнер */}
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {unityReady ? (
          <>
            <canvas
              ref={canvasRef}
              style={{
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                display: 'block',
                position: 'relative',
                zIndex: 1,
              }}
            />
            {/* Подсветка вокруг персонажа */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                maxWidth: 800,
                maxHeight: 800,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(74, 144, 226, 0.5) 0%, rgba(74, 144, 226, 0.3) 40%, transparent 70%)',
                animation: 'glow-pulse 3s ease-in-out infinite',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          </>
        ) : (
          // Placeholder, если Unity не загрузилась
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'text.secondary',
              gap: 2,
            }}
          >
            <Typography variant="h4" sx={{ opacity: 0.3 }}>
              🎭
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.5, textAlign: 'center', px: 2 }}>
              Персонаж недоступен
            </Typography>
          </Box>
        )}
      </Box>

      {/* Блок управления */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 2,
          background: 'linear-gradient(to top, #1a1a1a 0%, transparent 100%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        {/* Статус */}
        <Paper
          elevation={3}
          sx={{
            padding: '0.5rem 1rem',
            backgroundColor: 'rgba(45, 45, 45, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color:
                status === 'Готов к работе'
                  ? '#27ae60'
                  : status === 'Слушаю...'
                  ? '#e74c3c'
                  : status === 'Обработка...' || status === 'Генерация ответа...'
                  ? '#4a90e2'
                  : '#e74c3c',
            }}
          >
            {status}
          </Typography>
        </Paper>

        {/* Кнопка записи */}
        <Button
          onClick={handleRecord}
          variant="contained"
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            backgroundColor: isRecording ? '#e74c3c' : '#4a90e2',
            '&:hover': {
              backgroundColor: isRecording ? '#c0392b' : '#357abd',
              transform: 'scale(1.1)',
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            fontSize: '1.25rem',
            fontWeight: 600,
            boxShadow: isRecording
              ? '0 0 0 0 rgba(231, 76, 60, 0.7), 0 0 0 30px rgba(231, 76, 60, 0)'
              : '0 4px 20px rgba(0, 0, 0, 0.5)',
            animation: isRecording ? 'recording-pulse 1s ease-in-out infinite' : 'none',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🎤</span>
          <span style={{ fontSize: '1rem' }}>Говорить</span>
        </Button>

        {/* Текстовые блоки */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            maxWidth: 600,
            maxHeight: 200,
            overflowY: 'auto',
            padding: '0 1rem',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 1,
              backgroundColor: 'rgba(45, 45, 45, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              Вы сказали:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {userText}
            </Typography>
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: 1,
              backgroundColor: 'rgba(45, 45, 45, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
            }}
          >
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              Ответ:
            </Typography>
            <Typography variant="body2" color="text.primary">
              {assistantText}
            </Typography>
          </Paper>
        </Box>
      </Box>

      {/* Футер */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '0.5rem',
          right: '1rem',
          color: 'text.secondary',
          fontSize: '0.75rem',
          zIndex: 5,
        }}
      >
        ARM Voice Assistant v1.0
      </Box>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes recording-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.7); }
          50% { box-shadow: 0 0 0 30px rgba(231, 76, 60, 0); }
        }
      `}</style>
    </Box>
  );
};

export default MainScreen;

