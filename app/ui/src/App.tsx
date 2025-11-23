import React, { useState, useRef, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import MainScreen from './screens/MainScreen';
import ChatScreen from './screens/ChatScreen';
import MenuScreen from './screens/MenuScreen';

type Screen = 'main' | 'chat' | 'menu';

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
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSwipeLeft = () => {
    // Свайп влево (справа налево)
    if (currentScreen === 'main' && !isTransitioning) {
      // С главного экрана → открыть меню справа
      setIsTransitioning(true);
      setCurrentScreen('menu');
      setTimeout(() => setIsTransitioning(false), 300);
    } else if (currentScreen === 'menu' && !isTransitioning) {
      // С меню → вернуться на главный экран
      setIsTransitioning(true);
      setCurrentScreen('main');
      setTimeout(() => setIsTransitioning(false), 300);
    } else if (currentScreen === 'chat' && !isTransitioning) {
      // С чата → вернуться на главный экран
      setIsTransitioning(true);
      setCurrentScreen('main');
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handleSwipeRight = () => {
    // Свайп вправо (слева направо)
    if (currentScreen === 'main' && !isTransitioning) {
      // С главного экрана → открыть чат слева
      setIsTransitioning(true);
      setCurrentScreen('chat');
      setTimeout(() => setIsTransitioning(false), 300);
    } else if (currentScreen === 'chat' && !isTransitioning) {
      // С чата → вернуться на главный экран
      setIsTransitioning(true);
      setCurrentScreen('main');
      setTimeout(() => setIsTransitioning(false), 300);
    } else if (currentScreen === 'menu' && !isTransitioning) {
      // С меню → вернуться на главный экран
      setIsTransitioning(true);
      setCurrentScreen('main');
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const goToMain = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentScreen('main');
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

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
        <div
          style={{
            display: 'flex',
            width: '300%',
            height: '100%',
            transform: `translateX(-${currentScreen === 'main' ? 33.333 : currentScreen === 'chat' ? 0 : 66.666}%)`,
            transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
          }}
        >
          <div style={{ width: '33.333%', height: '100%', flexShrink: 0 }}>
            <ChatScreen onClose={goToMain} />
          </div>
          <div style={{ width: '33.333%', height: '100%', flexShrink: 0 }}>
            <MainScreen />
          </div>
          <div style={{ width: '33.333%', height: '100%', flexShrink: 0 }}>
            <MenuScreen onClose={goToMain} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

