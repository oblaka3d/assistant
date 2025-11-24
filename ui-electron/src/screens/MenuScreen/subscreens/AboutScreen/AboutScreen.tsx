import InfoIcon from '@mui/icons-material/Info';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import styles from '../../MenuScreen.module.css';

import screenStyles from './AboutScreen.module.css';

interface AboutScreenProps {
  onBack: () => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();

  return (
    <Box className={styles.container}>
      <ScreenHeader title={t('about.title')} onBack={onBack} />

      <ScrollableContent screenId="about" className={screenStyles.content}>
        <Paper elevation={3} className={screenStyles.paper}>
          <Box className={screenStyles.paperContent}>
            <Box className={screenStyles.paperMain}>
              <InfoIcon className={screenStyles.icon} />
              <Box className={screenStyles.textContent}>
                <Typography variant="h6" className={screenStyles.title}>
                  {t('app.name')}
                </Typography>
                <Typography variant="body2" className={screenStyles.subtitle}>
                  {t('about.version')} 1.0
                </Typography>
                <Typography variant="body2" className={screenStyles.description}>
                  {t('about.description')}
                </Typography>
                <Typography variant="body2" className={screenStyles.description}>
                  {t('about.tech')}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </ScrollableContent>
    </Box>
  );
};

export default AboutScreen;
