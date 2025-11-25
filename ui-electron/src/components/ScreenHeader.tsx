import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import React from 'react';

import { useAppSelector } from '../store/hooks';
import commonStyles from '../styles/common.module.css';

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  action?: React.ReactNode;
  startAction?: React.ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onBack, action, startAction }) => {
  const currentScreen = useAppSelector((state) => state.ui.currentScreen);
  const isChatScreenActive = currentScreen === 'chat';
  return (
    <AppBar
      position="static"
      className={commonStyles.appBar}
      sx={{
        color: 'text.primary',
      }}
    >
      <Toolbar>
        {onBack && (
          <IconButton
            edge="start"
            onClick={onBack}
            sx={{
              mr: 2,
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        {startAction && (
          <Box
            sx={{
              mr: onBack ? 1 : 2,
              display: 'flex',
              alignItems: 'center',
              transform: isChatScreenActive
                ? `translateY(calc(var(--keyboard-offset, 0px) * -1))`
                : 'none',
              transition: 'transform 0.3s ease',
            }}
          >
            {startAction}
          </Box>
        )}
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: 'text.primary',
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
        {action && <Box sx={{ ml: 2 }}>{action}</Box>}
      </Toolbar>
    </AppBar>
  );
};

export default ScreenHeader;
