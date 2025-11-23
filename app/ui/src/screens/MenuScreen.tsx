import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Switch,
  Slider,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import InfoIcon from '@mui/icons-material/Info';
import LanguageIcon from '@mui/icons-material/Language';

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
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1a1a',
      }}
    >
      {/* Заголовок */}
      <AppBar position="static" sx={{ backgroundColor: '#2d2d2d' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {showSettings ? 'Настройки' : 'Меню'}
          </Typography>
        </Toolbar>
      </AppBar>

      {showSettings ? (
        /* Экран настроек */
        <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
          <Paper elevation={3} sx={{ padding: 2, mb: 2, backgroundColor: '#2d2d2d' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <VolumeUpIcon sx={{ mr: 2, color: '#4a90e2' }} />
              <Typography variant="h6">Громкость</Typography>
            </Box>
            <Box sx={{ px: 2 }}>
              <Slider
                value={volume}
                onChange={(_, value) => setVolume(value as number)}
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{
                  color: '#4a90e2',
                  '& .MuiSlider-thumb': {
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(74, 144, 226, 0.16)',
                    },
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                {volume}%
              </Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ padding: 2, mb: 2, backgroundColor: '#2d2d2d' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LanguageIcon sx={{ mr: 2, color: '#4a90e2' }} />
                <Typography variant="h6">Язык интерфейса</Typography>
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Русский
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#2d2d2d' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoIcon sx={{ mr: 2, color: '#4a90e2' }} />
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
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <List>
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem disablePadding>
                  <ListItemButton onClick={item.onClick}>
                    <ListItemIcon sx={{ color: '#4a90e2' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
                {index < menuItems.length - 1 && <Divider sx={{ backgroundColor: '#2d2d2d' }} />}
              </React.Fragment>
            ))}
          </List>

          {/* Информация внизу */}
          <Box sx={{ padding: 2, mt: 'auto' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
              ARM Voice Assistant v1.0
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MenuScreen;

