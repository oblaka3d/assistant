/* eslint-disable react-hooks/set-state-in-effect */
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Alert,
  Divider,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import { getProvidersByCategory, APIProvider } from '../../../../constants/apiProviders';
import { useApiKeys } from '../../../../hooks/useApiKeys';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {
  setSTTProviderName,
  setLLMProviderName,
  setTTSProviderName,
} from '../../../../store/slices/settingsSlice';
import { saveSettings } from '../../../../store/thunks/settingsThunks';
import styles from '../../MenuScreen.module.css';

interface APIKeysScreenProps {
  onBack: () => void;
}

const APIKeysScreen: React.FC<APIKeysScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { keys: remoteKeys, isLoading, error, saveAPIKeys } = useApiKeys();
  const { sttProviderName, llmProviderName, ttsProviderName } = useAppSelector(
    (state) => state.settings
  );

  const [localKeys, setLocalKeys] = useState<Record<string, string>>({});
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Синхронизируем значения из сервера при загрузке/сохранении
  useEffect(() => {
    setLocalKeys(remoteKeys || {});
  }, [remoteKeys]);

  const handleKeyChange = (keyName: string, value: string) => {
    setLocalKeys((prev) => ({
      ...prev,
      [keyName]: value,
    }));
    setSaveSuccess(false);
  };

  const handleSave = async () => {
    const success = await saveAPIKeys(localKeys);
    if (success) {
      // Также сохраняем выбранные провайдеры
      await dispatch(
        saveSettings({
          sttProviderName,
          llmProviderName,
          ttsProviderName,
        })
      ).unwrap();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const toggleKeyVisibility = (keyName: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [keyName]: !prev[keyName],
    }));
  };

  const handleProviderChange = (category: 'stt' | 'llm' | 'tts', providerId: string) => {
    const newProviderId = providerId === '' ? null : providerId;
    if (category === 'stt') {
      dispatch(setSTTProviderName(newProviderId));
    } else if (category === 'llm') {
      dispatch(setLLMProviderName(newProviderId));
    } else if (category === 'tts') {
      dispatch(setTTSProviderName(newProviderId));
    }
    setSaveSuccess(false);
  };

  const getSelectedProvider = (category: 'stt' | 'llm' | 'tts'): string | null => {
    if (category === 'stt') return sttProviderName;
    if (category === 'llm') return llmProviderName;
    if (category === 'tts') return ttsProviderName;
    return null;
  };

  const renderProviderFields = (provider: APIProvider | null) => {
    if (!provider) return null;
    if (!provider.requiresApiKey) {
      return (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {t('apiKeys.noApiKeyRequired')}
        </Typography>
      );
    }

    const keyName = provider.apiKeyName || provider.id.toUpperCase() + '_API_KEY';
    const value = localKeys[keyName] || '';
    const isVisible = visibleKeys[keyName] || false;

    return (
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label={t('apiKeys.apiKey')}
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
              sx={{ mt: 2 }}
            />
          );
        })}
      </Box>
    );
  };

  const renderCategory = (category: 'stt' | 'llm' | 'tts', title: string) => {
    const providers = getProvidersByCategory(category);
    const selectedProviderId = getSelectedProvider(category);
    const selectedProvider = providers.find((p) => p.id === selectedProviderId) || null;

    return (
      <Box key={category} sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          {title}
        </Typography>
        <Paper elevation={1} sx={{ p: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>{t('apiKeys.selectProvider')}</InputLabel>
            <Select
              value={selectedProviderId || ''}
              onChange={(e) => handleProviderChange(category, e.target.value)}
              label={t('apiKeys.selectProvider')}
              disabled={isLoading}
            >
              <MenuItem value="">
                <em>{t('apiKeys.none')}</em>
              </MenuItem>
              {providers.map((provider) => (
                <MenuItem key={provider.id} value={provider.id}>
                  {provider.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedProvider && renderProviderFields(selectedProvider)}
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
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t('apiKeys.description')}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {t('apiKeys.securityNote')}
          </Typography>
        </Box>

        {isLoading && !Object.keys(localKeys).length ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
            }}
          >
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
