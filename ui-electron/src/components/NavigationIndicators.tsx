import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../store/hooks';

import styles from './NavigationIndicators.module.css';

const NavigationIndicators: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTransitioning = useAppSelector((state) => state.ui.isTransitioning);
  const subScreen = useAppSelector((state) => state.ui.subScreen);

  // Получаем текущий экран из URL
  const getCurrentScreen = () => {
    const path = location.pathname;
    if (path === '/' || path === '/main' || path === '') return 'main';
    if (path.startsWith('/chat')) return 'chat';
    if (path.startsWith('/menu')) return 'menu';
    return 'main';
  };

  const currentScreen = getCurrentScreen();

  // Не показываем индикаторы во вложенных экранах
  if (subScreen !== null) {
    return null;
  }

  const screens = [
    { id: 'chat' as const, icon: <ChatIcon />, label: 'Чат' },
    { id: 'main' as const, icon: <PersonIcon />, label: 'Персонаж' },
    { id: 'menu' as const, icon: <SettingsIcon />, label: 'Меню' },
  ];

  const handleIndicatorClick = (screenId: 'main' | 'chat' | 'menu') => {
    if (!isTransitioning && screenId !== currentScreen) {
      navigate(`/${screenId}`);
    }
  };

  // На экране чата индикаторы должны быть выше, чтобы не перекрывать инпут
  const isChatScreen = currentScreen === 'chat';

  return (
    <Box className={`${styles.container} ${isChatScreen ? styles.chatScreen : ''}`}>
      {screens.map((screen) => (
        <Box
          key={screen.id}
          className={`${styles.indicator} ${currentScreen === screen.id ? styles.active : ''}`}
          onClick={() => handleIndicatorClick(screen.id)}
          title={screen.label}
        >
          <Box className={styles.icon}>{screen.icon}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default NavigationIndicators;
