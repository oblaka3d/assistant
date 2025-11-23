import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import commonStyles from '../styles/common.module.css';

interface ScreenHeaderProps {
  title: string;
  onBack: () => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onBack }) => {
  return (
    <AppBar position="static" className={commonStyles.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onBack} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ScreenHeader;

