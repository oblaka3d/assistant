import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_IDLE_PEXELS_QUERY, DEFAULT_IDLE_PLACEHOLDER } from '../../constants/app';
import { API_BASE_URL } from '../../utils/api';

import styles from './IdleScreen.module.css';
/* eslint-disable react-hooks/set-state-in-effect */

interface IdleScreenProps {
  mode: 'api' | 'custom';
  customImagePath: string;
  remoteEndpoint: string;
  refreshKey: number;
  onResume: () => void;
}

const IdleScreen: React.FC<IdleScreenProps> = ({
  mode,
  customImagePath,
  remoteEndpoint,
  refreshKey,
  onResume,
}) => {
  const { t } = useTranslation();
  const [retryKey, setRetryKey] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [photoUrl, setPhotoUrl] = useState('');
  const normalizedQuery = useMemo(() => remoteEndpoint?.trim() || '', [remoteEndpoint]);

  const backgroundStyle = useMemo(
    () => (photoUrl && !imageError ? { backgroundImage: `url(${photoUrl})` } : undefined),
    [imageError, photoUrl]
  );

  const fetchRemoteImage = useCallback(async () => {
    setImageError(false);
    setLoading(true);
    if (mode === 'custom' && customImagePath?.trim()) {
      setPhotoUrl(customImagePath);
      return;
    }

    try {
      const params = new URLSearchParams();
      const queryValue = normalizedQuery || DEFAULT_IDLE_PEXELS_QUERY;
      params.set('query', queryValue);
      params.set('refresh', String(refreshKey));
      params.set('retry', String(retryKey));

      const response = await fetch(`${API_BASE_URL}/idle-image?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Idle image fetch failed');
      }
      const data = await response.json();
      setPhotoUrl(data.url || DEFAULT_IDLE_PLACEHOLDER);
    } catch {
      setImageError(true);
      setPhotoUrl(DEFAULT_IDLE_PLACEHOLDER);
    }
  }, [customImagePath, mode, normalizedQuery, refreshKey, retryKey]);

  useEffect(() => {
    void fetchRemoteImage();
  }, [fetchRemoteImage]);

  const handleInteraction = () => {
    onResume();
  };

  return (
    <Box
      className={styles.container}
      role="button"
      tabIndex={0}
      onClick={handleInteraction}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleInteraction();
        }
      }}
    >
      <Box className={styles.background} style={backgroundStyle} />
      <Box className={styles.overlay} />
      {photoUrl && (
        <img
          src={photoUrl}
          alt=""
          aria-hidden="true"
          className={styles.preloadImage}
          onLoad={() => {
            setLoading(false);
            setImageError(false);
          }}
          onError={() => {
            setLoading(false);
            setImageError(true);
          }}
        />
      )}
      <Box className={styles.content}>
        <Typography variant="h3" className={styles.title}>
          {t('idle.title')}
        </Typography>
        <Typography variant="subtitle1" className={styles.subtitle}>
          {t('idle.subtitle')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            event.stopPropagation();
            handleInteraction();
          }}
        >
          {t('idle.resume')}
        </Button>
        {(imageError || loading) && (
          <>
            {imageError && (
              <Typography variant="body2" color="error">
                {t('idle.errorLoadingImage')}
              </Typography>
            )}
            <Button
              variant="outlined"
              color="inherit"
              onClick={(event) => {
                event.stopPropagation();
                setRetryKey((prev) => prev + 1);
                setImageError(false);
                setLoading(true);
              }}
            >
              {t('idle.retry')}
            </Button>
          </>
        )}
        {!imageError && loading && (
          <Box className={styles.loadingIndicator}>
            <CircularProgress color="inherit" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default IdleScreen;
