import {
  Box,
  Button,
  Container,
  TextField,
  Paper,
  Alert,
  Tab,
  Tabs,
  CircularProgress,
} from '@mui/material';
import React, { useState, useEffect, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { clearError } from '../../../../store/slices/userSlice';
import { registerUser, loginUser } from '../../../../store/thunks';

import styles from './AuthScreen.module.css';

interface AuthScreenProps {
  onBack: () => void;
}

type TabValue = 'login' | 'register';

const AuthScreen: React.FC<AuthScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.user);

  const [tab, setTab] = useState<TabValue>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: TabValue) => {
    setTab(newValue);
    dispatch(clearError());
    setValidationError(null);
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
  };

  const validateForm = (): boolean => {
    setValidationError(null);

    if (!email || !email.includes('@')) {
      setValidationError('Please enter a valid email address');
      return false;
    }

    if (!password || password.length < 6) {
      setValidationError('Password must be at least 6 characters long');
      return false;
    }

    if (tab === 'register') {
      if (!name || name.trim().length === 0) {
        setValidationError('Please enter your name');
        return false;
      }

      if (password !== confirmPassword) {
        setValidationError('Passwords do not match');
        return false;
      }
    }

    return true;
  };

  // Закрываем экран после успешной авторизации
  useEffect(() => {
    if (isAuthenticated) {
      onBack();
    }
  }, [isAuthenticated, onBack]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(clearError());

    if (tab === 'register') {
      await dispatch(registerUser({ email, password, name }));
    } else {
      await dispatch(loginUser({ email, password }));
    }
  };

  return (
    <Box className={styles.container}>
      <ScreenHeader
        title={tab === 'login' ? t('auth.login') : t('auth.register')}
        onBack={onBack}
      />

      <ScrollableContent screenId="auth" className={styles.content}>
        <Container maxWidth="sm">
          <Paper elevation={3} className={styles.paper}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="fullWidth"
              className={styles.tabs}
            >
              <Tab label={t('auth.login')} value="login" />
              <Tab label={t('auth.register')} value="register" />
            </Tabs>

            <Box component="form" onSubmit={handleSubmit} className={styles.form}>
              {error && (
                <Alert
                  severity="error"
                  className={styles.alert}
                  onClose={() => dispatch(clearError())}
                >
                  {error}
                </Alert>
              )}

              {validationError && (
                <Alert
                  severity="warning"
                  className={styles.alert}
                  onClose={() => setValidationError(null)}
                >
                  {validationError}
                </Alert>
              )}

              {tab === 'register' && (
                <TextField
                  label={t('auth.name')}
                  type="text"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  disabled={isLoading}
                />
              )}

              <TextField
                label={t('auth.email')}
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                disabled={isLoading}
              />

              <TextField
                label={t('auth.password')}
                type="password"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                disabled={isLoading}
              />

              {tab === 'register' && (
                <TextField
                  label={t('auth.confirmPassword')}
                  type="password"
                  fullWidth
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  margin="normal"
                  disabled={isLoading}
                />
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                className={styles.submitButton}
                startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
              >
                {isLoading
                  ? t('auth.loading')
                  : tab === 'login'
                    ? t('auth.login')
                    : t('auth.register')}
              </Button>
            </Box>
          </Paper>
        </Container>
      </ScrollableContent>
    </Box>
  );
};

export default AuthScreen;
