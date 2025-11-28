import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { ThemeProvider, CssBaseline, CircularProgress, Box, IconButton } from '@mui/material';
import { lazy, Suspense, useEffect, useRef, useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, HashRouter, useNavigate, useLocation } from 'react-router-dom';

import styles from './App.module.css';
import NavigationIndicators from './components/NavigationIndicators';
import StatusBar from './components/StatusBar';
import { TIMEOUTS } from './constants/app';
import { useCSSVariables } from './hooks/useCSSVariables';
import { useIdleTimer } from './hooks/useIdleTimer';
import { useLanguage } from './hooks/useLanguage';
import { useOAuthCallback } from './hooks/useOAuthCallback';
import { useTheme } from './hooks/useTheme';
import IdleScreen from './screens/IdleScreen';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setDialogs, selectDialog } from './store/slices/chatSlice';
import { setLLMProviderName } from './store/slices/settingsSlice';
import {
  navigateNext,
  navigatePrev,
  setTransitioning,
  setScreen,
  openSubScreen,
  closeSubScreen,
  type MainScreen,
  type SubScreen,
} from './store/slices/uiSlice';
import { createLogger } from './utils/logger';
import { loadGuestDialogs } from './utils/storage';
import { createAppTheme } from './utils/theme';

// Ленивая загрузка экранов для улучшения производительности
const ChatScreen = lazy(() => import('./screens/ChatScreen/ChatScreen'));
const MainScreen = lazy(() => import('./screens/MainScreen/MainScreen'));
const MenuScreen = lazy(() => import('./screens/MenuScreen/MenuScreen'));
const WelcomeScreen = lazy(() => import('./screens/WelcomeScreen/WelcomeScreen'));

const log = createLogger('App');

// Компонент для синхронизации роутера с Redux
function RouterSync() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const currentScreen = useAppSelector((state) => state.ui.currentScreen);
  const subScreen = useAppSelector((state) => state.ui.subScreen);

  const currentScreenRef = useRef(currentScreen);
  const subScreenRef = useRef(subScreen);

  useEffect(() => {
    currentScreenRef.current = currentScreen;
  }, [currentScreen]);

  useEffect(() => {
    subScreenRef.current = subScreen;
  }, [subScreen]);

  // Синхронизация URL -> Redux при изменении URL
  useEffect(() => {
    const path = location.pathname;
    let screen: MainScreen = 'main';
    let sub: string | null = null;

    // Парсим URL
    if (path === '/' || path === '/main' || path === '') {
      screen = 'main';
    } else if (path.startsWith('/chat')) {
      screen = 'chat';
    } else if (path.startsWith('/menu')) {
      screen = 'menu';
      const parts = path.split('/').filter(Boolean);
      if (parts.length >= 2) {
        sub = parts[1];
      }
    }

    // Обновляем Redux только если отличается
    if (screen !== currentScreenRef.current) {
      dispatch(setScreen(screen));
    }

    // Обновляем подэкран если нужно
    if (screen === 'menu') {
      const validSubScreens = ['settings', 'apiKeys', 'logs', 'about', 'auth'];
      if (sub && validSubScreens.includes(sub)) {
        if (sub !== subScreenRef.current) {
          dispatch(openSubScreen(sub as SubScreen));
        }
      } else if (subScreenRef.current !== null) {
        dispatch(closeSubScreen());
      }
    } else if (subScreenRef.current !== null) {
      dispatch(closeSubScreen());
    }
  }, [location.pathname, dispatch]);

  // Синхронизация Redux -> URL при изменении экрана
  useEffect(() => {
    let targetPath = `/${currentScreen}`;
    if (currentScreen === 'menu' && subScreen) {
      targetPath = `/menu/${subScreen}`;
    }

    if (location.pathname !== targetPath) {
      navigate(targetPath, { replace: true });
    }
  }, [currentScreen, subScreen, navigate, location.pathname]);

  return null;
}

function AppContent() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const currentScreen = useAppSelector((state) => state.ui.currentScreen);
  const subScreen = useAppSelector((state) => state.ui.subScreen);
  const isTransitioning = useAppSelector((state) => state.ui.isTransitioning);
  const idleTimeoutSeconds = useAppSelector((state) => state.settings.idleTimeoutSeconds);
  const idleMode = useAppSelector((state) => state.settings.idleMode);
  const idleCustomImagePath = useAppSelector((state) => state.settings.idleCustomImagePath);
  const idleRemoteEndpoint = useAppSelector((state) => state.settings.idleRemoteEndpoint);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const currentDialogId = useAppSelector((state) => state.chat.currentDialogId);

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

  // Синхронизация роутера с Redux (через компонент RouterSync)

  // Проверяем, нужно ли показать приветственный экран
  useEffect(() => {
    const welcomeShown = localStorage.getItem('welcomeScreenShown');
    setTimeout(() => {
      setShowWelcome(welcomeShown !== 'true');
    }, 0);
  }, []);

  // Таймер бездействия вынесен в отдельный хук, чтобы AppContent был проще
  const { isIdle, idleRefreshKey, resetIdleTimer } = useIdleTimer({
    idleTimeoutSeconds,
    enabled: !showWelcome && idleTimeoutSeconds > 0,
  });

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

  // Загружаем локальные чаты для неавторизованных пользователей
  useEffect(() => {
    if (!isAuthenticated) {
      const guestDialogs = loadGuestDialogs();
      if (guestDialogs.length > 0) {
        dispatch(setDialogs(guestDialogs));
        // Выбираем первый диалог, если текущий не найден
        if (currentDialogId && !guestDialogs.some((d) => d.id === currentDialogId)) {
          dispatch(selectDialog(guestDialogs[0].id));
        } else if (!currentDialogId && guestDialogs.length > 0) {
          dispatch(selectDialog(guestDialogs[0].id));
        }
      }
    }
  }, [isAuthenticated, dispatch, currentDialogId]);

  // Отслеживаем изменения авторизации для загрузки локальных чатов при выходе
  const prevIsAuthenticatedRef = useRef(isAuthenticated);
  useEffect(() => {
    // Если пользователь вышел из системы (был авторизован, стал неавторизован)
    if (prevIsAuthenticatedRef.current && !isAuthenticated) {
      const guestDialogs = loadGuestDialogs();
      if (guestDialogs.length > 0) {
        dispatch(setDialogs(guestDialogs));
        if (guestDialogs.length > 0) {
          dispatch(selectDialog(guestDialogs[0].id));
        }
      }
    }
    prevIsAuthenticatedRef.current = isAuthenticated;
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleKeyboardOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ height: number }>;
      setKeyboardHeight(customEvent.detail?.height || 0);
    };
    const handleKeyboardClose = (event: Event) => {
      const customEvent = event as CustomEvent<{ height: number }>;
      setKeyboardHeight(customEvent.detail?.height || 0);
    };

    window.addEventListener('virtualKeyboardOpen', handleKeyboardOpen);
    window.addEventListener('virtualKeyboardClose', handleKeyboardClose);

    return () => {
      window.removeEventListener('virtualKeyboardOpen', handleKeyboardOpen);
      window.removeEventListener('virtualKeyboardClose', handleKeyboardClose);
    };
  }, []);

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
      <RouterSync />
      <div
        ref={containerRef}
        className={styles.appContainer}
        style={
          {
            '--keyboard-offset': `${keyboardHeight}px`,
          } as React.CSSProperties
        }
      >
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
        <NavigationIndicators />
        {keyboardHeight === 0 && (
          <div className={styles.navButtons}>
            <div className={`${styles.navButtonContainer} ${styles.navButtonLeft}`}>
              <IconButton
                size="large"
                className={styles.navButton}
                onClick={handleNavigateLeft}
                title={t('ui.prevScreen')}
                aria-label={t('ui.prevScreen')}
                disabled={!canNavigate}
              >
                <NavigateBeforeIcon />
              </IconButton>
            </div>
            <div className={`${styles.navButtonContainer} ${styles.navButtonRight}`}>
              <IconButton
                size="large"
                className={styles.navButton}
                onClick={handleNavigateRight}
                title={t('ui.nextScreen')}
                aria-label={t('ui.nextScreen')}
                disabled={!canNavigate}
              >
                <NavigateNextIcon />
              </IconButton>
            </div>
          </div>
        )}
        {isIdle && (
          <IdleScreen
            key={idleRefreshKey}
            mode={idleMode}
            customImagePath={idleCustomImagePath}
            remoteEndpoint={idleRemoteEndpoint}
            refreshKey={idleRefreshKey}
            onResume={resetIdleTimer}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

function App() {
  // В Electron приложение работает под file://, где BrowserRouter пытается навигировать на file:///main
  // и вызывает ERR_FILE_NOT_FOUND. Для этого случая используем HashRouter.
  const isFileProtocol = typeof window !== 'undefined' && window.location.protocol === 'file:';
  const RouterComponent = isFileProtocol ? HashRouter : BrowserRouter;

  return (
    <RouterComponent>
      <AppContent />
    </RouterComponent>
  );
}

export default App;
