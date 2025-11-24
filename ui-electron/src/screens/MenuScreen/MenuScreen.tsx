import DarkModeIcon from '@mui/icons-material/DarkMode';
import DescriptionIcon from '@mui/icons-material/Description';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Divider,
} from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../components/ScreenHeader';
import ScrollableContent from '../../components/ScrollableContent';
import UserBar from '../../components/UserBar';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetAPIKeys } from '../../store/slices/apiKeysSlice';
import { resetChat } from '../../store/slices/chatSlice';
import { setTheme } from '../../store/slices/settingsSlice';
import { goBack, openSubScreen } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/userSlice';
import { saveSettings } from '../../store/thunks';

import styles from './MenuScreen.module.css';
import AboutScreen from './subscreens/AboutScreen/AboutScreen';
import APIKeysScreen from './subscreens/APIKeysScreen/APIKeysScreen';
import AuthScreen from './subscreens/AuthScreen/AuthScreen';
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
  auth: AuthScreen,
};

const MenuScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const subScreen = useAppSelector((state) => state.ui.subScreen);
  const theme = useAppSelector((state) => state.settings.theme);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const [themeMenuAnchor, setThemeMenuAnchor] = useState<null | HTMLElement>(null);

  const handleThemeMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setThemeMenuAnchor(event.currentTarget);
  };

  const handleThemeMenuClose = () => {
    setThemeMenuAnchor(null);
  };

  const handleThemeChange = async (newTheme: 'light' | 'dark' | 'system') => {
    dispatch(setTheme(newTheme));
    handleThemeMenuClose();

    // Сохраняем настройки на сервер (если пользователь авторизован)
    if (isAuthenticated) {
      try {
        await dispatch(
          saveSettings({
            theme: newTheme,
          })
        ).unwrap();
      } catch (error) {
        // Игнорируем ошибки сохранения, настройка все равно применена локально
        console.error('Failed to save theme:', error);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetChat());
    dispatch(resetAPIKeys());
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <LightModeIcon />;
      case 'dark':
        return <DarkModeIcon />;
      case 'system':
        return <SettingsBrightnessIcon />;
      default:
        return <SettingsBrightnessIcon />;
    }
  };

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
      <ScreenHeader
        title={t('menu.title')}
        onBack={undefined}
        action={
          <Tooltip title={t('settings.theme')}>
            <IconButton
              onClick={handleThemeMenuOpen}
              sx={{
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              {getThemeIcon()}
            </IconButton>
          </Tooltip>
        }
      />
      <Menu
        anchorEl={themeMenuAnchor}
        open={Boolean(themeMenuAnchor)}
        onClose={handleThemeMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleThemeChange('light')} selected={theme === 'light'}>
          <ListItemIcon>
            <LightModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('settings.themeLight')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange('dark')} selected={theme === 'dark'}>
          <ListItemIcon>
            <DarkModeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('settings.themeDark')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleThemeChange('system')} selected={theme === 'system'}>
          <ListItemIcon>
            <SettingsBrightnessIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('settings.themeSystem')}</ListItemText>
        </MenuItem>
      </Menu>

      <ScrollableContent screenId="menuMain" className={styles.content}>
        {/* Плашка пользователя */}
        <UserBar
          onLoginClick={() => {
            dispatch(openSubScreen('auth'));
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

          {isAuthenticated && (
            <>
              <Divider className={styles.divider} />
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout} className={styles.logoutButton}>
                  <ListItemIcon className={`${styles.listIcon} ${styles.logoutIcon}`}>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={t('user.logout')}
                    primaryTypographyProps={{ className: styles.logoutText }}
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}
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
