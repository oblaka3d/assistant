import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, CircularProgress, Typography, Alert, Divider } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import { getProvidersByCategory } from '../../../../constants/apiProviders';
import { useApiKeys } from '../../../../hooks/useApiKeys';
import { useAppSelector } from '../../../../store/hooks';
import styles from '../../MenuScreen.module.css';

import screenStyles from './APIKeysScreen.module.css';
import { ProviderCategory } from './components/ProviderCategory';
import { useAPIKeysForm } from './hooks/useAPIKeysForm';

interface APIKeysScreenProps {
  onBack: () => void;
}

const APIKeysScreen: React.FC<APIKeysScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const { isLoading, error } = useApiKeys();
  const {
    localKeys,
    visibleKeys,
    saveSuccess,
    handleKeyChange,
    handleSave,
    toggleKeyVisibility,
    handleProviderChange,
    handleModelChange,
    getSelectedProvider,
  } = useAPIKeysForm();

  const llmModel = useAppSelector((state) => state.settings.llmModel);

  const renderCategory = (category: 'stt' | 'llm' | 'tts', title: string) => {
    const providers = getProvidersByCategory(category);
    const selectedProviderId = getSelectedProvider(category);
    const selectedProvider = providers.find((p) => p.id === selectedProviderId) || null;

    return (
      <ProviderCategory
        key={category}
        category={category}
        title={title}
        providers={providers}
        selectedProviderId={selectedProviderId}
        selectedProvider={selectedProvider}
        localKeys={localKeys}
        visibleKeys={visibleKeys}
        llmModel={llmModel}
        isLoading={isLoading}
        onProviderChange={handleProviderChange}
        onModelChange={handleModelChange}
        onKeyChange={handleKeyChange}
        onToggleVisibility={toggleKeyVisibility}
      />
    );
  };

  return (
    <Box className={styles.container}>
      <ScreenHeader title={t('apiKeys.title')} onBack={onBack} />

      <ScrollableContent screenId="apiKeys" className={screenStyles.content}>
        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => {}}>
            {t('apiKeys.saved')}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box className={screenStyles.description}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t('apiKeys.description')}
          </Typography>
          <Typography variant="caption" className={screenStyles.securityNote}>
            {t('apiKeys.securityNote')}
          </Typography>
        </Box>

        {isLoading && !Object.keys(localKeys).length ? (
          <Box className={screenStyles.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {renderCategory('stt', t('apiKeys.stt'))}
            <Divider className={screenStyles.divider} />
            {renderCategory('llm', t('apiKeys.llm'))}
            <Divider className={screenStyles.divider} />
            {renderCategory('tts', t('apiKeys.tts'))}

            <Box className={screenStyles.saveButton}>
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
