import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Button, Paper, Typography, Avatar, IconButton, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLoading, setError, logout } from '../store/slices/userSlice';
import { fetchCurrentUser } from '../store/thunks';
import { createLogger } from '../utils/logger';

import styles from './UserBar.module.css';

const log = createLogger('UserBar');

interface UserBarProps {
  onLoginClick?: () => void;
}

const UserBar: React.FC<UserBarProps> = ({ onLoginClick }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currentUser, isAuthenticated, isLoading } = useAppSelector((state) => state.user);

  // Загружаем текущего пользователя при монтировании компонента
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        dispatch(setLoading(true));
        await dispatch(fetchCurrentUser());
      } catch (error) {
        log.error('Failed to load current user:', error);
        // Если пользователь не авторизован, просто не показываем ошибку
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadCurrentUser();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(logout());
      log.log('User logged out successfully');
    } catch (error) {
      log.error('Failed to logout:', error);
      dispatch(setError(t('user.logoutError')));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Paper elevation={2} className={styles.userBar}>
      {isAuthenticated && currentUser ? (
        <Box className={styles.userInfo}>
          <Box className={styles.userAvatarContainer}>
            {currentUser.avatar ? (
              <Avatar src={currentUser.avatar} className={styles.userAvatar}>
                {currentUser.displayName?.[0] || currentUser.username[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar className={styles.userAvatar}>
                {currentUser.displayName?.[0] || currentUser.username[0].toUpperCase()}
              </Avatar>
            )}
          </Box>
          <Box className={styles.userDetails}>
            <Typography variant="body1" className={styles.userName}>
              {currentUser.displayName || currentUser.username}
            </Typography>
            {currentUser.email && (
              <Typography variant="caption" color="text.secondary" className={styles.userEmail}>
                {currentUser.email}
              </Typography>
            )}
          </Box>
          <Tooltip title={t('user.logout')}>
            <IconButton
              onClick={handleLogout}
              disabled={isLoading}
              size="small"
              className={styles.logoutButton}
              color="primary"
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box className={styles.loginPrompt}>
          <AccountCircleIcon className={styles.loginIcon} />
          <Box className={styles.loginText}>
            <Typography variant="body2" color="text.secondary">
              {t('user.loginPrompt')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {t('user.loginDescription')}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            startIcon={<LoginIcon />}
            onClick={onLoginClick}
            disabled={isLoading}
            className={styles.loginButton}
          >
            {t('user.login')}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default UserBar;
