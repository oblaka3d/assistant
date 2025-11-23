import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import styles from '../../MenuScreen.module.css';

interface AboutScreenProps {
  onBack: () => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  const { t } = useTranslation();

  return (
    <Box className={styles.container}>
      <ScreenHeader title={t('about.title')} onBack={onBack} />

      <ScrollableContent screenId="about">
        <Paper elevation={3} className={styles.settingPaper}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <InfoIcon className={styles.settingIcon} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">{t('app.name')}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {t('about.version')} 1.0
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {t('about.description')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
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
