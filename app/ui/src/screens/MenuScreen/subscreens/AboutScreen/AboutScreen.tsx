import InfoIcon from '@mui/icons-material/Info';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

import ScreenHeader from '../../../../components/ScreenHeader';
import styles from '../../MenuScreen.module.css';

interface AboutScreenProps {
  onBack: () => void;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  return (
    <Box className={styles.container}>
      <ScreenHeader title="О приложении" onBack={onBack} />

      <Box className={styles.content}>
        <Paper elevation={3} className={styles.settingPaper}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <InfoIcon className={styles.settingIcon} />
              <Box sx={{ ml: 2 }}>
                <Typography variant="h6">ARM Voice Assistant</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Версия 1.0
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Голосовой ассистент для BTT Pi 1.2 и других ARM устройств
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Разработано с использованием Electron, React, THREE.js и Redux Toolkit
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default AboutScreen;
