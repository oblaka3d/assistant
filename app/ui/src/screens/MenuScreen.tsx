import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import React from 'react';

import ScreenHeader from '../components/ScreenHeader';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { goBack, openSubScreen } from '../store/slices/uiSlice';

import styles from './MenuScreen.module.css';
import AboutScreen from './subscreens/AboutScreen';
import HistoryScreen from './subscreens/HistoryScreen';
import SettingsScreen from './subscreens/SettingsScreen';

const MenuScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const subScreen = useAppSelector((state) => state.ui.subScreen);

  const menuItems = [
    {
      icon: <SettingsIcon />,
      text: 'Настройки',
      onClick: () => dispatch(openSubScreen('settings')),
    },
    {
      icon: <HistoryIcon />,
      text: 'История диалогов',
      onClick: () => dispatch(openSubScreen('history')),
    },
    {
      icon: <InfoIcon />,
      text: 'О приложении',
      onClick: () => dispatch(openSubScreen('about')),
    },
  ];

  const handleBack = () => {
    dispatch(goBack());
  };

  // Если открыт вложенный экран, показываем его
  if (subScreen === 'settings') {
    return <SettingsScreen onBack={handleBack} />;
  }

  if (subScreen === 'history') {
    return <HistoryScreen onBack={handleBack} />;
  }

  if (subScreen === 'about') {
    return <AboutScreen onBack={handleBack} />;
  }

  // Основной экран меню
  return (
    <Box className={styles.container}>
      <ScreenHeader title="Меню" onBack={undefined} />

      <Box className={styles.content}>
        <List>
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem disablePadding>
                <ListItemButton onClick={item.onClick}>
                  <ListItemIcon className={styles.listIcon}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
              {index < menuItems.length - 1 && <Divider className={styles.divider} />}
            </React.Fragment>
          ))}
        </List>

        {/* Информация внизу */}
        <Box className={styles.footer}>
          <Typography variant="caption" color="text.secondary" className={styles.footerText}>
            ARM Voice Assistant v1.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MenuScreen;
