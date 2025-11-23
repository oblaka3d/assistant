import { Box } from '@mui/material';
import React from 'react';

import { getScreenConfig } from '../constants/screenConfig';

import styles from './ScrollableContent.module.css';

interface ScrollableContentProps {
  screenId: string | null;
  children: React.ReactNode;
  className?: string;
}

/**
 * Компонент-обертка для скроллируемого контента
 * Автоматически применяет правильные стили в зависимости от конфигурации экрана
 */
const ScrollableContent: React.FC<ScrollableContentProps> = ({
  screenId,
  children,
  className = '',
}) => {
  const config = getScreenConfig(screenId);
  const isScrollable = config?.scrollable ?? false;

  const contentClass = isScrollable ? styles.contentScrollable : styles.contentNoScroll;
  const combinedClass = `${contentClass} ${className}`.trim();

  return (
    <Box className={combinedClass}>
      {children}
    </Box>
  );
};

export default ScrollableContent;

