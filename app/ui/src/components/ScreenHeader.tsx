import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import React from 'react';

import commonStyles from '../styles/common.module.css';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  action?: React.ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onBack, action }) => {
  return (
    <AppBar position="static" className={commonStyles.appBar}>
      <Toolbar>
        {onBack && (
          <IconButton edge="start" color="inherit" onClick={onBack} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {action && <Box sx={{ ml: 2 }}>{action}</Box>}
      </Toolbar>
    </AppBar>
  );
};

export default ScreenHeader;
