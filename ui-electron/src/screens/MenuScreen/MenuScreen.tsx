import DescriptionIcon from '@mui/icons-material/Description';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
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
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../components/ScreenHeader';
import ScrollableContent from '../../components/ScrollableContent';
import UserBar from '../../components/UserBar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { goBack, openSubScreen } from '../../store/slices/uiSlice';

import styles from './MenuScreen.module.css';
import AboutScreen from './subscreens/AboutScreen/AboutScreen';
import APIKeysScreen from './subscreens/APIKeysScreen/APIKeysScreen';
import HistoryScreen from './subscreens/HistoryScreen/HistoryScreen';
import LogsScreen from './subscreens/LogsScreen/LogsScreen';
import SettingsScreen from './subscreens/SettingsScreen/SettingsScreen';

// Мапа компонентов подэкранов для динамического рендеринга
const SUBSCREEN_COMPONENTS: Record<string, React.ComponentType<{ onBack: () => void }>> = {
  settings: SettingsScreen,
  apiKeys: APIKeysScreen,
  history: HistoryScreen,
  logs: LogsScreen,
  about: AboutScreen,
};

const MenuScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const subScreen = useAppSelector((state) => state.ui.subScreen);

  const menuItems = [
    {
      icon: <SettingsIcon />,
      text: t('menu.settings'),
      onClick: () => dispatch(openSubScreen('settings')),
    },
    {
      icon: <VpnKeyIcon />,
      text: t('menu.apiKeys'),
      onClick: () => dispatch(openSubScreen('apiKeys')),
    },
    {
      icon: <HistoryIcon />,
      text: t('menu.chat'),
      onClick: () => dispatch(openSubScreen('history')),
    },
    {
      icon: <DescriptionIcon />,
      text: t('menu.logs'),
      onClick: () => dispatch(openSubScreen('logs')),
    },
    {
      icon: <InfoIcon />,
      text: t('menu.about'),
      onClick: () => dispatch(openSubScreen('about')),
    },
  ];

  const handleBack = () => {
    dispatch(goBack());
  };

  // Если открыт вложенный экран, показываем его
  if (subScreen) {
    const SubScreenComponent = SUBSCREEN_COMPONENTS[subScreen];
    if (SubScreenComponent) {
      return <SubScreenComponent onBack={handleBack} />;
    }
  }

  // Основной экран меню
  return (
    <Box className={styles.container}>
      <ScreenHeader title={t('menu.title')} onBack={undefined} />

      <ScrollableContent screenId="menuMain" className={styles.content}>
        {/* Плашка пользователя */}
        <UserBar
          onLoginClick={() => {
            // TODO: Открыть экран входа
            console.log('Login clicked');
          }}
        />

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
            {t('app.name')} {t('app.version')}
          </Typography>
        </Box>
      </ScrollableContent>
    </Box>
  );
};

export default MenuScreen;
