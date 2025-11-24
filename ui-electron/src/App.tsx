import { ThemeProvider, CssBaseline } from '@mui/material';
import { useEffect, useRef, useMemo, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import NavigationIndicators from './components/NavigationIndicators';
import StatusBar from './components/StatusBar';
import { TIMEOUTS, DEFAULTS } from './constants/app';
import { useLanguage } from './hooks/useLanguage';
import ChatScreen from './screens/ChatScreen/ChatScreen';
import MainScreen from './screens/MainScreen/MainScreen';
import MenuScreen from './screens/MenuScreen/MenuScreen';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setLLMProviderName } from './store/slices/settingsSlice';
import { navigateNext, navigatePrev, setTransitioning } from './store/slices/uiSlice';
import { createLogger } from './utils/logger';
import { createAppTheme } from './utils/theme';

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
            <ChatScreen />
          </div>
          <div style={{ width: `${100 / DEFAULTS.SCREEN_COUNT}%`, height: '100%', flexShrink: 0 }}>
            <MainScreen />
          </div>
          <div style={{ width: `${100 / DEFAULTS.SCREEN_COUNT}%`, height: '100%', flexShrink: 0 }}>
            <MenuScreen />
          </div>
        </div>
        {/* Индикаторы навигации */}
        <NavigationIndicators />
      </div>
    </ThemeProvider>
  );
}

export default App;
