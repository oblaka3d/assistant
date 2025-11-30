import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { APIProvider } from '../../../../../constants/apiProviders';
import styles from '../APIKeysScreen.module.css';

interface ProviderCategoryProps {
  category: 'stt' | 'llm' | 'tts';
  title: string;
  providers: APIProvider[];
  selectedProviderId: string | null;
  selectedProvider: APIProvider | null;
  localKeys: Record<string, string>;
  visibleKeys: Record<string, boolean>;
  llmModel: string | null;
  isLoading: boolean;
  onProviderChange: (category: 'stt' | 'llm' | 'tts', providerId: string) => void;
  onModelChange: (modelId: string) => void;
  onKeyChange: (keyName: string, value: string) => void;
  onToggleVisibility: (keyName: string) => void;
}

export const ProviderCategory: React.FC<ProviderCategoryProps> = ({
  category,
  title,
  providers,
  selectedProviderId,
  selectedProvider,
  localKeys,
  visibleKeys,
  llmModel,
  isLoading,
  onProviderChange,
  onModelChange,
  onKeyChange,
  onToggleVisibility,
}) => {
  const { t } = useTranslation();

  const renderProviderFields = () => {
    if (!selectedProvider) return null;
    if (!selectedProvider.requiresApiKey) {
      return (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {t('apiKeys.noApiKeyRequired')}
        </Typography>
      );
    }

    const keyName = selectedProvider.apiKeyName || selectedProvider.id.toUpperCase() + '_API_KEY';
    const value = localKeys[keyName] || '';
    const isVisible = visibleKeys[keyName] || false;

    return (
      <Box sx={{ mt: 2 }}>
        {/* Выбор модели для LLM провайдеров */}
        {category === 'llm' && selectedProvider.models && selectedProvider.models.length > 0 && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>{t('apiKeys.selectModel')}</InputLabel>
            <Select
              value={llmModel || ''}
              onChange={(e) => onModelChange(e.target.value)}
              label={t('apiKeys.selectModel')}
              disabled={isLoading}
            >
              <MenuItem value="">
                <em>{t('apiKeys.default')}</em>
              </MenuItem>
              {selectedProvider.models.map((model) => (
                <MenuItem key={model.id} value={model.id}>
                  {model.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <TextField
          fullWidth
          label={t('apiKeys.apiKey')}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onKeyChange(keyName, e.target.value)}
          helperText={selectedProvider.description}
          disabled={isLoading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => onToggleVisibility(keyName)}
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
        {selectedProvider.additionalFields?.map((field) => {
          const fieldKey = `${selectedProvider.id}_${field.name}`;
          return (
            <TextField
              key={field.name}
              fullWidth
              label={field.label}
              type={field.type}
              value={localKeys[fieldKey] || ''}
              onChange={(e) => onKeyChange(fieldKey, e.target.value)}
              disabled={isLoading}
              required={field.required}
              sx={{ mt: 2 }}
            />
          );
        })}
      </Box>
    );
  };

  return (
    <Box className={styles.category}>
      <Typography variant="h6" className={styles.categoryTitle}>
        {title}
      </Typography>
      <Paper elevation={1} className={styles.categoryPaper}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{t('apiKeys.selectProvider')}</InputLabel>
          <Select
            value={selectedProviderId || ''}
            onChange={(e) => onProviderChange(category, e.target.value)}
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
        {renderProviderFields()}
      </Paper>
    </Box>
  );
};
