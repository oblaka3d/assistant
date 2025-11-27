import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import React, { Suspense, lazy, useCallback, useMemo } from 'react';

import { useAppSelector } from '../store/hooks';
import { Message, MessageImage } from '../store/slices/chatSlice';

import styles from './MessageRenderer.module.css';
const MarkdownContent = lazy(() => import('./MarkdownContent'));

interface MessageRendererProps {
  message: Message;
}

const MessageRenderer: React.FC<MessageRendererProps> = ({ message }) => {
  const { theme, accentColorLight, accentColorDark } = useAppSelector((state) => state.settings);

  const effectiveTheme =
    theme === 'system'
      ? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  const isDarkTheme = effectiveTheme === 'dark';
  const accentColor = isDarkTheme ? accentColorDark : accentColorLight;

  const containerStyle = useMemo(
    () =>
      ({
        '--accent-color': accentColor,
      }) as React.CSSProperties,
    [accentColor]
  );

  const handleCopy = useCallback((value?: string) => {
    if (!value || typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(value).catch(() => void 0);
  }, []);

  const renderCopyButton = (value?: string, label = 'Скопировать') => {
    if (!value) return null;
    return (
      <Tooltip title={label} enterDelay={400}>
        <IconButton
          size="small"
          className={styles.copyButton}
          aria-label={label}
          onClick={(event) => {
            event.stopPropagation();
            handleCopy(value);
          }}
        >
          <ContentCopyIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    );
  };

  // Обработка обычного текста
  if (message.type === 'text' || !message.text) {
    return (
      <Box className={`${styles.messageRenderer} ${styles.textWrapper}`} style={containerStyle}>
        {renderCopyButton(message.text)}
        <Typography variant="body1" className={styles.textMessage}>
          {message.text || ''}
        </Typography>
      </Box>
    );
  }

  // Обработка изображений
  if (message.type === 'image' && message.images && message.images.length > 0) {
    return (
      <Box className={`${styles.messageRenderer} ${styles.imageMessage}`} style={containerStyle}>
        {renderCopyButton(message.text || message.images[0]?.url)}
        <Box className={styles.imageContainer}>
          {message.images.map((image: MessageImage, index: number) => (
            <Box key={index} className={styles.imageWrapper}>
              <img
                src={image.url}
                alt={image.alt || 'Изображение'}
                className={styles.messageImage}
                style={{
                  maxWidth: image.width || '100%',
                  maxHeight: image.height || '400px',
                }}
                loading="lazy"
              />
              {image.alt && (
                <Typography variant="caption" className={styles.imageCaption}>
                  {image.alt}
                </Typography>
              )}
            </Box>
          ))}
          {message.text && (
            <Typography variant="body2" className={styles.imageText}>
              {message.text}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  // Обработка markdown
  if (message.type === 'markdown') {
    return (
      <Box
        className={`${styles.markdownContainer} ${styles.messageRenderer}`}
        style={containerStyle}
      >
        {renderCopyButton(message.text)}
        <Suspense
          fallback={
            <Typography variant="body2" className={styles.paragraph}>
              Загрузка форматированного сообщения...
            </Typography>
          }
        >
          <MarkdownContent message={message} isDarkTheme={isDarkTheme} onCopy={handleCopy} />
        </Suspense>
      </Box>
    );
  }

  // Fallback для неизвестных типов
  return (
    <Typography variant="body1" className={styles.textMessage}>
      {message.text || 'Неподдерживаемый тип сообщения'}
    </Typography>
  );
};

export default MessageRenderer;
