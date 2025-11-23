import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { API_PROVIDERS, getProvidersByCategory, APIProvider } from '../../../../constants/apiProviders';
import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setAPIKeys, setLoading, setError, clearError } from '../../../../store/slices/apiKeysSlice';
import { createLogger } from '../../../../utils/logger';
import styles from '../../MenuScreen.module.css';

const log = createLogger('APIKeysScreen');

interface APIKeysScreenProps {
  onBack: () => void;
}

const APIKeysScreen: React.FC<APIKeysScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { keys, isLoading, error } = useAppSelector((state) => state.apiKeys);
  const [localKeys, setLocalKeys] = useState<Record<string, string>>({});
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Загружаем API ключи при монтировании компонента
  useEffect(() => {
    const loadAPIKeys = async () => {
      if (!window.api) {
        log.warn('Electron API not available');
        return;
      }

      try {
        dispatch(setLoading(true));
        dispatch(clearError());
        const apiKeys = await window.api.getAPIKeys();
        setLocalKeys(apiKeys);
        dispatch(setAPIKeys(
          Object.keys(apiKeys).reduce((acc, key) => {
            const provider = API_PROVIDERS.find((p) => p.apiKeyName === key);
            if (provider) {
              acc[provider.id] = {
                provider: provider.id,
                key: apiKeys[key],
                name: provider.name,
                description: provider.description,
              };
            }
            return acc;
          }, {} as Record<string, { provider: string; key: string; name?: string; description?: string }>)
        ));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        dispatch(setError(`${t('apiKeys.error')}: ${errorMessage}`));
        log.error('Failed to load API keys:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadAPIKeys();
  }, [dispatch]);

  const handleKeyChange = (keyName: string, value: string) => {
    setLocalKeys((prev) => ({
      ...prev,
      [keyName]: value,
    }));
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    if (!window.api) {
      log.warn('Electron API not available');
      return;
    }

    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      await window.api.saveAPIKeys(localKeys);
      
      // Обновляем Redux store
      dispatch(setAPIKeys(
        Object.keys(localKeys).reduce((acc, key) => {
          const provider = API_PROVIDERS.find((p) => p.apiKeyName === key);
          if (provider && localKeys[key]) {
            acc[provider.id] = {
              provider: provider.id,
              key: localKeys[key],
              name: provider.name,
              description: provider.description,
            };
          }
          return acc;
        }, {} as Record<string, { provider: string; key: string; name?: string; description?: string }>)
      ));
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      log.log('API keys saved successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      dispatch(setError(`${t('apiKeys.error')}: ${errorMessage}`));
      log.error('Failed to save API keys:', err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const toggleKeyVisibility = (keyName: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [keyName]: !prev[keyName],
    }));
  };

  const renderProviderField = (provider: APIProvider) => {
    if (!provider.requiresApiKey) {
      return null;
    }

    const keyName = provider.apiKeyName || provider.id.toUpperCase() + '_API_KEY';
    const value = localKeys[keyName] || '';
    const isVisible = visibleKeys[keyName] || false;

    return (
      <Box key={provider.id} sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label={provider.name}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={(e) => handleKeyChange(keyName, e.target.value)}
          helperText={provider.description}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => toggleKeyVisibility(keyName)}
                  edge="end"
                  size="small"
                  disabled={isLoading}
                >
                  {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {provider.additionalFields?.map((field) => {
          const fieldKey = `${provider.id}_${field.name}`;
          return (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              type={field.type}
              value={localKeys[fieldKey] || ''}
              onChange={(e) => handleKeyChange(fieldKey, e.target.value)}
              disabled={isLoading}
              required={field.required}
              sx={{ mt: 1 }}
            />
          );
        })}
      </Box>
    );
  };

  const renderCategory = (category: 'stt' | 'llm' | 'tts', title: string) => {
    const providers = getProvidersByCategory(category);
    const categoryProviders = providers.filter((p) => p.requiresApiKey);

    if (categoryProviders.length === 0) {
      return null;
    }

    return (
      <Box key={category} sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        <Paper elevation={1} sx={{ p: 2 }}>
          {categoryProviders.map(renderProviderField)}
        </Paper>
      </Box>
    );
  };

  return (
    <Box className={styles.container}>
      <ScreenHeader title={t('apiKeys.title')} onBack={onBack} />

      <ScrollableContent screenId="apiKeys">
        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSaveSuccess(false)}>
            {t('apiKeys.saved')}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Управление API ключами для различных провайдеров. Ключи используются для доступа к сервисам
            распознавания речи, генерации ответов и синтеза речи.
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ⚠️ Ключи хранятся локально и используются только для работы приложения
          </Typography>
        </Box>

        {isLoading && !Object.keys(localKeys).length ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {renderCategory('stt', t('apiKeys.stt'))}
            <Divider sx={{ my: 3 }} />
            {renderCategory('llm', t('apiKeys.llm'))}
            <Divider sx={{ my: 3 }} />
            {renderCategory('tts', t('apiKeys.tts'))}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="contained"
                startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
                onClick={handleSave}
                disabled={isLoading}
                size="large"
              >
                {t('apiKeys.save')}
              </Button>
            </Box>
          </>
        )}
      </ScrollableContent>
    </Box>
  );
};

export default APIKeysScreen;

