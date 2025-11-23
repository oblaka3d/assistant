import LanguageIcon from '@mui/icons-material/Language';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { Box, Paper, Slider, Typography } from '@mui/material';
import React from 'react';

import ScreenHeader from '../../components/ScreenHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setVolume } from '../../store/slices/settingsSlice';
import styles from '../MenuScreen.module.css';

interface SettingsScreenProps {
  onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const dispatch = useAppDispatch();
  const volume = useAppSelector((state) => state.settings.volume);

  return (
    <Box className={styles.container}>
      <ScreenHeader title="Настройки" onBack={onBack} />

      <Box className={styles.content}>
        <Paper elevation={3} className={styles.settingPaper}>
          <Box className={styles.settingHeader}>
            <VolumeUpIcon className={styles.settingIcon} />
            <Typography variant="h6">Громкость</Typography>
          </Box>
          <Box sx={{ px: 2 }}>
            <Slider
              value={volume}
              onChange={(_, value) => dispatch(setVolume(value as number))}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              className={styles.slider}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
              {volume}%
            </Typography>
          </Box>
        </Paper>

        <Paper elevation={3} className={styles.settingPaper}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LanguageIcon className={styles.settingIcon} />
              <Typography variant="h6">Язык интерфейса</Typography>
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Русский
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default SettingsScreen;
