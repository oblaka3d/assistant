import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ThemeProvider, CssBaseline, CircularProgress, Box, IconButton } from '@mui/material';
import { lazy, Suspense, useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './App.module.css';
import NavigationIndicators from './components/NavigationIndicators';
import StatusBar from './components/StatusBar';
import { TIMEOUTS } from './constants/app';
import { useCSSVariables } from './hooks/useCSSVariables';
import { useLanguage } from './hooks/useLanguage';
import { useOAuthCallback } from './hooks/useOAuthCallback';
import { useTheme } from './hooks/useTheme';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setLLMProviderName } from './store/slices/settingsSlice';
import { navigateNext, navigatePrev, setTransitioning, setScreen } from './store/slices/uiSlice';
import type { MainScreen } from './store/slices/uiSlice';
import { createLogger } from './utils/logger';
import { createAppTheme } from './utils/theme';

// Ленивая загрузка экранов для улучшения производительности
const ChatScreen = lazy(() => import('./screens/ChatScreen/ChatScreen'));
const MainScreen = lazy(() => import('./screens/MainScreen/MainScreen'));
const MenuScreen = lazy(() => import('./screens/MenuScreen/MenuScreen'));
const WelcomeScreen = lazy(() => import('./screens/WelcomeScreen/WelcomeScreen'));

const log = createLogger('App');

function App() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const currentScreen = useAppSelector((state) => state.ui.currentScreen);
  const subScreen = useAppSelector((state) => state.ui.subScreen);
  const isTransitioning = useAppSelector((state) => state.ui.isTransitioning);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);

  // Используем хуки для темы и CSS переменных
  const { effectiveTheme } = useTheme();
  const { accentColor } = useCSSVariables();

  // Создаем тему на основе эффективной темы и акцентного цвета
  const appTheme = useMemo(
    () => createAppTheme(effectiveTheme, accentColor),
    [effectiveTheme, accentColor]
  );

  // Синхронизация языка из Redux с i18n
  useLanguage();

  // Обработка OAuth callback
  useOAuthCallback();

  // Проверяем, нужно ли показать приветственный экран
  useEffect(() => {
    const welcomeShown = localStorage.getItem('welcomeScreenShown');
    setTimeout(() => {
      setShowWelcome(welcomeShown !== 'true');
    }, 0);
  }, []);

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

  // Сброс isTransitioning после завершения анимации
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        dispatch(setTransitioning(false));
      }, TIMEOUTS.UI_TRANSITION);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, dispatch]);

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

  const canNavigate = !isTransitioning && subScreen === null;

  const handleNavigateLeft = useCallback(() => {
    if (canNavigate) {
      dispatch(navigateNext());
    }
  }, [canNavigate, dispatch]);

  const handleNavigateRight = useCallback(() => {
    if (canNavigate) {
      dispatch(navigatePrev());
    }
  }, [canNavigate, dispatch]);

  const handleWelcomeDismiss = useCallback(
    (targetScreen: MainScreen = 'main') => {
      localStorage.setItem('welcomeScreenShown', 'true');
      setShowWelcome(false);
      dispatch(setScreen(targetScreen));
    },
    [dispatch]
  );

  // Показываем приветственный экран при первом запуске
  if (showWelcome === null) {
    return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Box className={styles.appContainer}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  if (showWelcome) {
    return (
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <div className={styles.appContainer}>
          <Suspense
            fallback={
              <Box className={styles.loadingFallback}>
                <CircularProgress />
              </Box>
            }
          >
            <WelcomeScreen onDismiss={handleWelcomeDismiss} />
          </Suspense>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <div ref={containerRef} className={styles.appContainer}>
        {/* Строка состояния */}
        <StatusBar />
        <div
          className={styles.screensContainer}
          style={{
            transform: `translateX(-${screenIndex * 33.333}%)`,
            transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
          }}
        >
          <div className={styles.screenWrapper}>
            <Suspense
              fallback={
                <Box className={styles.loadingFallback}>
                  <CircularProgress />
                </Box>
              }
            >
              <ChatScreen />
            </Suspense>
          </div>
          <div className={styles.screenWrapper}>
            <Suspense
              fallback={
                <Box className={styles.loadingFallback}>
                  <CircularProgress />
                </Box>
              }
            >
              <MainScreen />
            </Suspense>
          </div>
          <div className={styles.screenWrapper}>
            <Suspense
              fallback={
                <Box className={styles.loadingFallback}>
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
        <div className={styles.navButtons}>
          <IconButton
            size="large"
            className={`${styles.navButton} ${styles.navButtonLeft}`}
            onClick={handleNavigateLeft}
            title={t('ui.prevScreen')}
            aria-label={t('ui.prevScreen')}
            disabled={!canNavigate}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            size="large"
            className={`${styles.navButton} ${styles.navButtonRight}`}
            onClick={handleNavigateRight}
            title={t('ui.nextScreen')}
            aria-label={t('ui.nextScreen')}
            disabled={!canNavigate}
          >
            <NavigateNextIcon />
          </IconButton>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
