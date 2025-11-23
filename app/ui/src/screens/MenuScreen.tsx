import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Slider,
  Paper,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import InfoIcon from '@mui/icons-material/Info';
import LanguageIcon from '@mui/icons-material/Language';
import styles from '../styles/screens/MenuScreen.module.css';
import ScreenHeader from '../components/ScreenHeader';

interface MenuScreenProps {
  onClose: () => void;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ onClose }) => {
  const [volume, setVolume] = useState(70);
  const [showSettings, setShowSettings] = useState(false);

  const menuItems = [
    {
      icon: <SettingsIcon />,
      text: 'Настройки',
      onClick: () => setShowSettings(true),
    },
    {
      icon: <HistoryIcon />,
      text: 'История диалогов',
      onClick: () => {
        // Переход к истории (можно реализовать позже)
        console.log('History clicked');
      },
    },
    {
      icon: <InfoIcon />,
      text: 'О приложении',
      onClick: () => {
        alert('Голосовой ассистент для BTT Pi 1.2\nВерсия 1.0');
      },
    },
  ];

  return (
    <Box className={styles.container}>
      {/* Заголовок */}
      <ScreenHeader title={showSettings ? 'Настройки' : 'Меню'} onBack={onClose} />

      {showSettings ? (
        /* Экран настроек */
        <Box className={styles.content}>
          <Paper elevation={3} className={styles.settingPaper}>
            <Box className={styles.settingHeader}>
              <VolumeUpIcon className={styles.settingIcon} />
              <Typography variant="h6">Громкость</Typography>
            </Box>
            <Box sx={{ px: 2 }}>
              <Slider
                value={volume}
                onChange={(_, value) => setVolume(value as number)}
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LanguageIcon className={styles.settingIcon} />
                <Typography variant="h6">Язык интерфейса</Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Русский
            </Typography>
          </Paper>

          <Paper elevation={3} className={styles.settingPaper}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon className={styles.settingIcon} />
                <Box>
                  <Typography variant="h6">Версия</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ARM Voice Assistant v1.0
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      ) : (
        /* Список меню */
        <Box className={styles.content}>
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton onClick={item.onClick}>
                    <ListItemIcon className={styles.listIcon}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
                {index < menuItems.length - 1 && <Divider className={styles.divider} />}
              </React.Fragment>
            ))}
          </List>

          {/* Информация внизу */}
          <Box className={styles.footer}>
            <Typography variant="caption" color="text.secondary" className={styles.footerText}>
              ARM Voice Assistant v1.0
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MenuScreen;
