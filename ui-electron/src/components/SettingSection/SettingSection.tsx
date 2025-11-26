import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

import styles from './SettingSection.module.css';

interface SettingSectionProps {
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SettingSection: React.FC<SettingSectionProps> = ({
  icon,
  title,
  children,
  className,
}) => {
  const sectionClassName = className ? `${styles.sectionPaper} ${className}` : styles.sectionPaper;

  return (
    <Paper elevation={3} className={sectionClassName}>
      <Box className={styles.sectionHeader}>
        {icon && <span className={styles.sectionIcon}>{icon}</span>}
        <Typography variant="h6" className={styles.sectionTitle}>
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  );
};
