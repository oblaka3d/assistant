import { Box } from '@mui/material';
import React from 'react';

import styles from './ScrollableContent.module.css';

interface ScrollableContentProps {
  screenId: string | null;
  children: React.ReactNode;
  className?: string;
}

/**
 * Компонент-обертка для скроллируемого контента
 * Все экраны по умолчанию скроллируемые для поддержки тач-навигации
 */
const ScrollableContent: React.FC<ScrollableContentProps> = ({ children, className = '' }) => {
  const combinedClass = `${styles.contentScrollable} ${className}`.trim();

  return <Box className={combinedClass}>{children}</Box>;
};

export default ScrollableContent;
