import { Avatar, Box, Button, Typography, Menu, MenuItem } from '@mui/material';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_WELCOME_TITLE } from '../../constants/app';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLanguage } from '../../store/slices/settingsSlice';
import type { MainScreen } from '../../store/slices/uiSlice';
import { fetchCurrentUser } from '../../store/thunks';
import AuthScreen from '../MenuScreen/subscreens/AuthScreen/AuthScreen';

import styles from './WelcomeScreen.module.css';

interface WelcomeScreenProps {
  onDismiss: (targetScreen?: MainScreen) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onDismiss }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);
  const [showAuthForm, setShowAuthForm] = useState(false);

  // Обновляем время каждую секунду
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Форматируем время
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(i18n.language, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Форматируем дату
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(i18n.language, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  const handleLanguageSelect = (lang: string) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    setLanguageMenuAnchor(null);
  };

  const handleGetStarted = useCallback(() => {
    onDismiss('main');
  }, [onDismiss]);

  const handleLogin = useCallback(() => {
    setShowAuthForm(true);
  }, []);

  const handleAuthBack = useCallback(() => {
    setShowAuthForm(false);
  }, []);

  const handleUserClick = useCallback(() => {
    onDismiss('main');
  }, [onDismiss]);

  // Закрываем форму авторизации после успешного входа
  useEffect(() => {
    if (isAuthenticated && showAuthForm) {
      onDismiss('main');
    }
  }, [isAuthenticated, showAuthForm, onDismiss]);

  const welcomeTitle = useAppSelector((state) => state.settings.welcomeTitle);

  const welcomeScreenTitle = useMemo(() => {
    return welcomeTitle?.trim() ? welcomeTitle : DEFAULT_WELCOME_TITLE;
  }, [welcomeTitle]);

  const languages = [
    { code: 'ru', label: t('app.russian') },
    { code: 'en', label: t('app.english') },
    { code: 'zh', label: t('app.chinese') },
  ];

  useEffect(() => {
    dispatch(fetchCurrentUser()).catch(() => {
      /* ignore */
    });
  }, [dispatch]);

  // Если показываем форму авторизации
  if (showAuthForm) {
    return (
      <Box className={styles.container}>
        <AuthScreen onBack={handleAuthBack} />
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      {/* Логотип */}
      <Typography variant="h5" className={styles.logo}>
        {welcomeScreenTitle}
      </Typography>

      {/* Время */}
      <Box className={styles.timeCard}>
        <Typography variant="h1" className={styles.time}>
          {formatTime(currentTime)}
        </Typography>
        <Typography variant="h6" className={styles.date}>
          {formatDate(currentTime)}
        </Typography>
      </Box>

      {/* Выбор языка */}
      <Box className={styles.languageSection}>
        <Button
          variant="outlined"
          onClick={handleLanguageMenuOpen}
          className={`${styles.languageButton} ${styles.actionButton}`}
        >
          {t('app.language')}: {languages.find((l) => l.code === i18n.language)?.label || 'English'}
        </Button>
        <Menu
          anchorEl={languageMenuAnchor}
          open={Boolean(languageMenuAnchor)}
          onClose={handleLanguageMenuClose}
        >
          {languages.map((lang) => (
            <MenuItem
              key={lang.code}
              selected={i18n.language === lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              {lang.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Информация о пользователе или предложение войти */}
      <Box className={styles.userSection}>
        {isAuthenticated && currentUser ? (
          <Box className={styles.userInfoCard} onClick={handleUserClick}>
            <Avatar className={styles.userInfoAvatar} src={currentUser.avatar}>
              {(currentUser.displayName ||
                currentUser.name ||
                currentUser.username ||
                currentUser.email ||
                'U')[0].toUpperCase()}
            </Avatar>
            <Box className={styles.userInfoDetails}>
              <Typography variant="body1" className={styles.userInfoName}>
                {currentUser.displayName ||
                  currentUser.name ||
                  currentUser.username ||
                  currentUser.email}
              </Typography>
              {currentUser.email && (
                <Typography variant="caption" className={styles.userInfoEmail}>
                  {currentUser.email}
                </Typography>
              )}
            </Box>
          </Box>
        ) : (
          <Button
            variant="contained"
            onClick={handleLogin}
            className={`${styles.loginButton} ${styles.actionButton}`}
          >
            {t('user.login')}
          </Button>
        )}
      </Box>

      {/* Кнопка "Начать" */}
      <Button
        variant="contained"
        onClick={handleGetStarted}
        className={`${styles.getStartedButton} ${styles.actionButton}`}
      >
        {t('welcome.getStarted')}
      </Button>
    </Box>
  );
};

export default WelcomeScreen;
