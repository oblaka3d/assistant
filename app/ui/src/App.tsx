import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useEffect, useRef } from 'react';
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

const log = createLogger('App');

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4a90e2',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2d2d2d',
    },
  },
});

function App() {
  const dispatch = useAppDispatch();
  const currentScreen = useAppSelector((state) => state.ui.currentScreen);
  const subScreen = useAppSelector((state) => state.ui.subScreen);
  const isTransitioning = useAppSelector((state) => state.ui.isTransitioning);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <ThemeProvider theme={darkTheme}>
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
