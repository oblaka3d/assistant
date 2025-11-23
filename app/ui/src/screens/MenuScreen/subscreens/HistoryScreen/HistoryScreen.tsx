import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Divider,
  Chip,
} from '@mui/material';
import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { ru, enUS, zhCN } from 'date-fns/locale';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { clearMessages } from '../../../../store/slices/chatSlice';
import { createLogger } from '../../../../utils/logger';
import styles from '../../MenuScreen.module.css';

const log = createLogger('HistoryScreen');

interface HistoryScreenProps {
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);

  // Определяем локаль для форматирования даты
  const dateLocale = useMemo(() => {
    switch (i18n.language) {
      case 'ru':
        return ru;
      case 'zh':
        return zhCN;
      default:
        return enUS;
    }
  }, [i18n.language]);

  const handleClearHistory = () => {
    if (confirm(t('history.confirmClear'))) {
      dispatch(clearMessages());
      log.log('History cleared');
    }
  };

  // Форматирование даты и времени
  const formatMessageDate = (date: Date) => {
    try {
      const messageDate = new Date(date);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - messageDate.getTime()) / 1000);

      // Если сообщение сегодня, показываем только время
      if (diffInSeconds < 86400 && messageDate.getDate() === now.getDate()) {
        return format(messageDate, 'HH:mm', { locale: dateLocale });
      }
      
      // Если сообщение вчера
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      if (diffInSeconds < 172800 && messageDate.getDate() === yesterday.getDate()) {
        return `${t('history.yesterday')} ${format(messageDate, 'HH:mm', { locale: dateLocale })}`;
      }

      // Иначе показываем дату и время
      return format(messageDate, 'dd.MM.yyyy HH:mm', { locale: dateLocale });
    } catch (error) {
      log.error('Error formatting date:', error);
      return '';
    }
  };

  return (
    <Box className={styles.container}>
      <ScreenHeader 
        title={t('history.title')} 
        onBack={onBack}
        action={
          messages.length > 0 ? (
            <Tooltip title={t('history.clearHistory')}>
              <IconButton
                onClick={handleClearHistory}
                color="error"
                size="small"
                edge="end"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null
        }
      />

      <ScrollableContent screenId="history">
        {messages.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              gap: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              {t('history.empty')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('history.noMessages')}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ py: 2 }}>
            {messages.map((message, index) => {
              const isUser = message.position === 'right';
              const isFirstInGroup = 
                index === 0 || 
                messages[index - 1].position !== message.position ||
                new Date(message.date).getTime() - new Date(messages[index - 1].date).getTime() > 300000; // 5 минут

              return (
                <Box key={message.id}>
                  {isFirstInGroup && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: isUser ? 'flex-end' : 'flex-start',
                        alignItems: 'center',
                        gap: 1,
                        mb: 0.5,
                        px: 1,
                      }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {isUser ? t('history.user') : t('history.assistant')}
                      </Typography>
                      <Chip
                        label={formatMessageDate(message.date)}
                        size="small"
                        sx={{ height: '20px', fontSize: '0.7rem' }}
                      />
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: isUser ? 'flex-end' : 'flex-start',
                      mb: 1,
                    }}
                  >
                    <Paper
                      elevation={1}
                      sx={{
                        maxWidth: '70%',
                        p: 1.5,
                        backgroundColor: isUser
                          ? 'primary.main'
                          : 'background.paper',
                        color: isUser ? 'primary.contrastText' : 'text.primary',
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          wordBreak: 'break-word',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {message.text}
                      </Typography>
                    </Paper>
                  </Box>
                  {index < messages.length - 1 && 
                   messages[index + 1].position !== message.position && (
                    <Divider sx={{ my: 1 }} />
                  )}
                </Box>
              );
            })}
          </Box>
        )}
      </ScrollableContent>
    </Box>
  );
};

export default HistoryScreen;
