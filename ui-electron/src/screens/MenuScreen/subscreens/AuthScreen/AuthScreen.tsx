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
import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { clearError } from '../../../../store/slices/userSlice';
import { registerUser, loginUser } from '../../../../store/thunks';

import styles from './AuthScreen.module.css';
import { useAuthForm } from './hooks/useAuthForm';
import { useOAuth } from './hooks/useOAuth';

interface AuthScreenProps {
  onBack: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.user);

  const {
    tab,
    email,
    password,
    name,
    confirmPassword,
    validationError,
    setTab,
    setEmail,
    setPassword,
    setName,
    setConfirmPassword,
    setValidationError,
    validateForm,
  } = useAuthForm();

  const { oauthProvider, handleOAuthClick, handleCancel } = useOAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (tab === 'register') {
      await dispatch(registerUser({ email, password, name }));
    } else {
      await dispatch(loginUser({ email, password }));
    }
  };

  // Если показываем OAuth экран
  if (oauthProvider) {
    const providerNames = {
      google: t('auth.continueWithGoogle'),
      yandex: t('auth.continueWithYandex'),
      github: t('auth.continueWithGitHub'),
    };

    return (
      <Box className={styles.container}>
        <ScreenHeader title={providerNames[oauthProvider]} onBack={handleCancel} />

        <ScrollableContent screenId="auth" className={styles.content}>
          <Box className={styles.oauthContainer}>
            <Box className={styles.oauthContent}>
              <CircularProgress sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Redirecting to {providerNames[oauthProvider]}...
              </Typography>
              <Button variant="outlined" onClick={handleCancel}>
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
              onChange={(_, newValue) => setTab(newValue)}
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
                  onClick={() => setTab('forgot-password')}
                  className={styles.forgotPasswordButton}
                >
                  {t('auth.forgotPassword')}
                </Button>
              )}
            </Box>

            {/* OAuth раздел */}
            {(tab === 'login' || tab === 'register') && (
              <>
                <Divider className={styles.divider}>
                  <Box component="span" className={styles.dividerText}>
                    {t('auth.or')}
                  </Box>
                </Divider>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleOAuthClick('google')}
                    disabled={isLoading}
                    className={`${styles.oauthButton} ${styles.oauthButtonGoogle}`}
                  >
                    {t('auth.continueWithGoogle')}
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleOAuthClick('yandex')}
                    disabled={isLoading}
                    className={`${styles.oauthButton} ${styles.oauthButtonYandex}`}
                  >
                    {t('auth.continueWithYandex')}
                  </Button>

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleOAuthClick('github')}
                    disabled={isLoading}
                    className={`${styles.oauthButton} ${styles.oauthButtonGitHub}`}
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
