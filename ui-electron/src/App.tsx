import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { lazy, Suspense, useEffect, useRef, useMemo, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import NavigationIndicators from './components/NavigationIndicators';
import StatusBar from './components/StatusBar';
import { TIMEOUTS, DEFAULTS } from './constants/app';
import { useLanguage } from './hooks/useLanguage';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setLLMProviderName } from './store/slices/settingsSlice';
import { navigateNext, navigatePrev, setTransitioning } from './store/slices/uiSlice';
import { oauthLogin } from './store/thunks/userThunks';
import { createLogger } from './utils/logger';
import { createAppTheme } from './utils/theme';

// Ленивая загрузка экранов для улучшения производительности
const ChatScreen = lazy(() => import('./screens/ChatScreen/ChatScreen'));
const MainScreen = lazy(() => import('./screens/MainScreen/MainScreen'));
const MenuScreen = lazy(() => import('./screens/MenuScreen/MenuScreen'));

const log = createLogger('App');

function App() {
  const dispatch = useAppDispatch();
  const currentScreen = useAppSelector((state) => state.ui.currentScreen);
  const subScreen = useAppSelector((state) => state.ui.subScreen);
  const isTransitioning = useAppSelector((state) => state.ui.isTransitioning);
  const theme = useAppSelector((state) => state.settings.theme);
  const containerRef = useRef<HTMLDivElement>(null);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

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
  const effectiveTheme = useMemo(() => {
    if (theme === 'system') {
      return systemTheme;
    }
    return theme;
  }, [theme, systemTheme]);

  // Создаем тему на основе эффективной темы
  const appTheme = useMemo(() => createAppTheme(effectiveTheme), [effectiveTheme]);

  // Устанавливаем data-атрибут на body для CSS переменных
  useEffect(() => {
    document.body.setAttribute('data-theme', effectiveTheme);
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  }, [effectiveTheme]);

  // Синхронизация языка из Redux с i18n
  useLanguage();

  // Обработка OAuth callback
  useEffect(() => {
    // Обработка токенов из URL параметров
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const refreshToken = urlParams.get('refreshToken');

    if (token && refreshToken) {
      // Очищаем URL от параметров
      window.history.replaceState({}, document.title, window.location.pathname);

      // Выполняем OAuth авторизацию
      dispatch(oauthLogin({ token, refreshToken }))
        .unwrap()
        .then(() => {
          log.debug('OAuth login successful');
        })
        .catch((error) => {
          log.error('OAuth login failed:', error);
        });
      return;
    }

    // Обработка postMessage от OAuth callback страницы
    const handleMessage = (event: MessageEvent) => {
      // Проверяем origin для безопасности (разрешаем сообщения от backend)
      const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const baseOrigin = apiBaseUrl.replace('/api/v1', '');

      if (event.origin.startsWith(baseOrigin) || event.origin === 'null') {
        try {
          const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          if (data.type === 'oauth-callback' && data.token && data.refreshToken) {
            dispatch(oauthLogin({ token: data.token, refreshToken: data.refreshToken }))
              .unwrap()
              .then(() => {
                log.debug('OAuth login successful via postMessage');
              })
              .catch((error) => {
                log.error('OAuth login failed:', error);
              });
          }
        } catch {
          // Игнорируем ошибки парсинга
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [dispatch]);

  // Загружаем информацию о LLM провайдере при монтировании
  useEffect(() => {
    const loadLLMProviderInfo = async () => {
      if (!window.api || !window.api.getLLMProviderInfo) {
        return;
      }

      try {
        const info = await window.api.getLLMProviderInfo();
        dispatch(setLLMProviderName(info.name));
        log.debug('LLM provider info loaded:', info);
      } catch (error) {
        log.error('Failed to load LLM provider info:', error);
      }
    };

    loadLLMProviderInfo();
  }, [dispatch]);

  // Отключаем свайпы, если открыт вложенный экран
  const canSwipe = subScreen === null;

  // Сброс isTransitioning после завершения анимации
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        dispatch(setTransitioning(false));
      }, TIMEOUTS.UI_TRANSITION);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, dispatch]);

  // Круговая навигация: влево = следующий экран справа, вправо = предыдущий экран слева
  // Порядок экранов: chat (слева) -> main (центр) -> menu (справа)
  // Свайп влево: main -> menu -> chat -> main (показываем экран справа)
  // Свайп вправо: main -> chat -> menu -> main (показываем экран слева)
  const handleSwipeLeft = () => {
    if (canSwipe) {
      dispatch(navigatePrev()); // Свайп влево = показываем экран справа = navigatePrev
    }
  };

  const handleSwipeRight = () => {
    if (canSwipe) {
      dispatch(navigateNext()); // Свайп вправо = показываем экран слева = navigateNext
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
    preventScrollOnSwipe: true,
    disabled: !canSwipe, // Отключаем свайпы во вложенных экранах
  });

  // Определяем порядок экранов для анимации
  const getScreenIndex = (screen: string) => {
    switch (screen) {
      case 'main':
        return 1;
      case 'chat':
        return 0;
      case 'menu':
        return 2;
      default:
        return 1;
    }
  };

  const screenIndex = getScreenIndex(currentScreen);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <div
        {...handlers}
        ref={containerRef}
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Строка состояния */}
        <StatusBar />
        <div
          style={{
            display: 'flex',
            width: '300%',
            height: 'calc(100vh - 24px)', // Вычитаем высоту строки состояния
            marginTop: '24px', // Отступ сверху для строки состояния
            transform: `translateX(-${screenIndex * 33.333}%)`,
            transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
          }}
        >
          <div style={{ width: `${100 / DEFAULTS.SCREEN_COUNT}%`, height: '100%', flexShrink: 0 }}>
            <Suspense
              fallback={
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              }
            >
              <ChatScreen />
            </Suspense>
          </div>
          <div style={{ width: `${100 / DEFAULTS.SCREEN_COUNT}%`, height: '100%', flexShrink: 0 }}>
            <Suspense
              fallback={
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              }
            >
              <MainScreen />
            </Suspense>
          </div>
          <div style={{ width: `${100 / DEFAULTS.SCREEN_COUNT}%`, height: '100%', flexShrink: 0 }}>
            <Suspense
              fallback={
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CircularProgress />
                </Box>
              }
            >
              <MenuScreen />
            </Suspense>
          </div>
        </div>
        {/* Индикаторы навигации */}
        <NavigationIndicators />
      </div>
    </ThemeProvider>
  );
}

export default App;
