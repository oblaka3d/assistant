import { Box, Typography } from '@mui/material';
import React from 'react';

import ScreenHeader from '../../components/ScreenHeader';
import styles from '../MenuScreen.module.css';

interface HistoryScreenProps {
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack }) => {
  return (
    <Box className={styles.container}>
      <ScreenHeader title="История диалогов" onBack={onBack} />

      <Box className={styles.content}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            gap: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            История диалогов
          </Typography>
          <Typography variant="body2" color="text.secondary">
            История будет доступна здесь в будущих версиях
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryScreen;
