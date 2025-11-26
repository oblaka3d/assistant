import { Box, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef } from 'react';

import { useAppSelector } from '../store/hooks';
import { Message } from '../store/slices/chatSlice';

import styles from './CustomMessageList.module.css';
import MessageRenderer from './MessageRenderer';

interface CustomMessageListProps {
  messages: Message[];
  className?: string;
  toBottomHeight?: string;
}

const CustomMessageList: React.FC<CustomMessageListProps> = ({
  messages,
  className = '',
  toBottomHeight = '100%',
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { theme } = useAppSelector((state) => state.settings);
  const isSystemDark =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const effectiveTheme = theme === 'system' ? (isSystemDark ? 'dark' : 'light') : theme;
  const isDarkTheme = effectiveTheme === 'dark';

  const assistantBubbleStyle = useMemo(() => {
    if (isDarkTheme) {
      return {
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        color: '#ffffff',
      };
    }

    return {
      backgroundColor: 'transparent',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      color: '#1f1f1f',
    };
  }, [isDarkTheme]);

  const userBubbleStyle = useMemo(
    () =>
      ({
        color: isDarkTheme ? '#ffffff' : '#1f1f1f',
      }) as React.CSSProperties,
    [isDarkTheme]
  );

  // Прокрутка к последнему сообщению
  const lastMessageId = messages[messages.length - 1]?.id;

  useEffect(() => {
    if (!messagesEndRef.current) {
      return;
    }

    messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, lastMessageId]);

  if (messages.length === 0) {
    return (
      <Box className={`${styles.container} ${className}`}>
        <Box className={styles.emptyState}>
          <Typography variant="body2" color="textSecondary">
            Нет сообщений
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      className={`${styles.container} ${className}`}
      style={{ height: toBottomHeight }}
    >
      <Box className={styles.messagesWrapper}>
        {messages.map((message) => (
          <Box
            key={message.id}
            className={`${styles.messageContainer} ${
              message.position === 'right' ? styles.messageRight : styles.messageLeft
            }`}
          >
            <Box className={styles.messageContent}>
              <Box
                className={`${styles.messageBubble} ${
                  message.position === 'right' ? styles.bubbleRight : styles.bubbleLeft
                }`}
                style={message.position === 'left' ? assistantBubbleStyle : userBubbleStyle}
              >
                <MessageRenderer message={message} />
              </Box>
            </Box>
          </Box>
        ))}

        {/* Реф для прокрутки к последнему сообщению */}
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default CustomMessageList;
