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
  Divider,
  Typography,
} from '@mui/material';
import React, { useState, useEffect, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { closeSubScreen } from '../../../../store/slices/uiSlice';
import { clearError } from '../../../../store/slices/userSlice';
import { registerUser, loginUser } from '../../../../store/thunks';
import { getOAuthUrl } from '../../../../utils/api';

import styles from './AuthScreen.module.css';

interface AuthScreenProps {
  onBack: () => void;
}

type TabValue = 'login' | 'register' | 'forgot-password' | 'reset-password';
type OAuthProvider = 'google' | 'yandex' | 'github' | null;

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
  const [oauthProvider, setOAuthProvider] = useState<OAuthProvider>(null);

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

  // Закрываем экран после успешной авторизации и возвращаемся в меню
  useEffect(() => {
    if (isAuthenticated) {
      // Закрываем подэкран auth и возвращаемся в основное меню
      dispatch(closeSubScreen());
      // Сбрасываем состояние OAuth после закрытия экрана
      // Используем setTimeout чтобы избежать setState в useEffect
      setTimeout(() => {
        setOAuthProvider(null);
      }, 0);
    }
  }, [isAuthenticated, dispatch]);

  // OAuth callback обрабатывается в App.tsx через URL параметры
  // После успешной авторизации экран автоматически закроется через useEffect выше

  // Используем прямой переход на OAuth URL при выборе провайдера
  // Callback обработается в App.tsx через URL параметры
  useEffect(() => {
    if (oauthProvider) {
      window.location.href = getOAuthUrl(oauthProvider);
    }
  }, [oauthProvider]);

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

  // Если показываем OAuth экран - используем прямой переход, так как Google блокирует iframe
  if (oauthProvider) {
    const providerNames = {
      google: t('auth.continueWithGoogle'),
      yandex: t('auth.continueWithYandex'),
      github: t('auth.continueWithGitHub'),
    };

    return (
      <Box className={styles.container}>
        <ScreenHeader
          title={providerNames[oauthProvider]}
          onBack={() => {
            setOAuthProvider(null);
            dispatch(clearError());
          }}
        />

        <ScrollableContent screenId="auth" className={styles.content}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 600,
                p: 3,
                textAlign: 'center',
              }}
            >
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Redirecting to {providerNames[oauthProvider]}...
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setOAuthProvider(null);
                  dispatch(clearError());
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </ScrollableContent>
      </Box>
    );
  }

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

              {tab === 'login' && (
                <Button
                  variant="text"
                  fullWidth
                  onClick={() => setTab('forgot-password' as TabValue)}
                  className={styles.forgotPasswordButton}
                >
                  {t('auth.forgotPassword')}
                </Button>
              )}
            </Box>

            {/* OAuth раздел */}
            {(tab === 'login' || tab === 'register') && (
              <>
                <Divider sx={{ my: 3 }}>
                  <Box component="span" sx={{ px: 2, color: 'text.secondary' }}>
                    {t('auth.or')}
                  </Box>
                </Divider>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      dispatch(clearError());
                      setValidationError(null);
                      setOAuthProvider('google');
                    }}
                    disabled={isLoading}
                    sx={{
                      textTransform: 'none',
                      borderColor: '#4285F4',
                      color: '#4285F4',
                      '&:hover': {
                        borderColor: '#357AE8',
                        backgroundColor: 'rgba(66, 133, 244, 0.04)',
                      },
                    }}
                  >
                    {t('auth.continueWithGoogle')}
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      dispatch(clearError());
                      setValidationError(null);
                      setOAuthProvider('yandex');
                    }}
                    disabled={isLoading}
                    sx={{
                      textTransform: 'none',
                      borderColor: '#FC3F1D',
                      color: '#FC3F1D',
                      '&:hover': {
                        borderColor: '#E02E0C',
                        backgroundColor: 'rgba(252, 63, 29, 0.04)',
                      },
                    }}
                  >
                    {t('auth.continueWithYandex')}
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      dispatch(clearError());
                      setValidationError(null);
                      setOAuthProvider('github');
                    }}
                    disabled={isLoading}
                    sx={{
                      textTransform: 'none',
                      borderColor: '#24292E',
                      color: '#24292E',
                      '&:hover': {
                        borderColor: '#1A1E22',
                        backgroundColor: 'rgba(36, 41, 46, 0.04)',
                      },
                    }}
                  >
                    {t('auth.continueWithGitHub')}
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Container>
      </ScrollableContent>
    </Box>
  );
};

export default AuthScreen;
