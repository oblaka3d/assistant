import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Typography, Paper, IconButton, Tooltip, Divider, Chip } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ScreenHeader from '../../../../components/ScreenHeader';
import ScrollableContent from '../../../../components/ScrollableContent';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { clearMessages } from '../../../../store/slices/chatSlice';
import { createLogger } from '../../../../utils/logger';
import styles from '../../MenuScreen.module.css';

import screenStyles from './HistoryScreen.module.css';
import { formatMessageDate, getDateLocale, isFirstInGroup } from './utils/dateFormatter';

const log = createLogger('HistoryScreen');

interface HistoryScreenProps {
  onBack: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);
  const llmProviderName = useAppSelector((state) => state.settings.llmProviderName);

  const dateLocale = useMemo(() => getDateLocale(i18n.language), [i18n.language]);

  const handleClearHistory = () => {
    if (confirm(t('history.confirmClear'))) {
      dispatch(clearMessages());
      log.log('History cleared');
    }
  };

  const chatTitle = llmProviderName ? `${t('chat.title')} - ${llmProviderName}` : t('chat.title');

  return (
    <Box className={styles.container}>
      <ScreenHeader
        title={chatTitle}
        onBack={onBack}
        action={
          messages.length > 0 ? (
            <Tooltip title={t('history.clearHistory')}>
              <IconButton onClick={handleClearHistory} color="error" size="small" edge="end">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null
        }
      />

      <ScrollableContent screenId="history" className={screenStyles.content}>
        {messages.length === 0 ? (
          <Box className={screenStyles.emptyState}>
            <Typography variant="h6" color="text.secondary">
              {t('chat.empty')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('chat.noMessages')}
            </Typography>
          </Box>
        ) : (
          <Box sx={{ py: 2 }}>
            {messages.map((message, index) => {
              const isUser = message.position === 'right';
              const firstInGroup = isFirstInGroup(index, messages);

              return (
                <Box key={message.id} className={screenStyles.messageGroup}>
                  {firstInGroup && (
                    <Box
                      className={`${screenStyles.messageHeader} ${
                        isUser
                          ? screenStyles.messageHeaderUser
                          : screenStyles.messageHeaderAssistant
                      }`}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {isUser ? t('chat.user') : t('chat.assistant')}
                      </Typography>
                      <Chip
                        label={formatMessageDate(message.date, dateLocale, t)}
                        size="small"
                        className={screenStyles.dateChip}
                      />
                    </Box>
                  )}
                  <Box
                    className={`${screenStyles.messageContainer} ${
                      isUser
                        ? screenStyles.messageContainerUser
                        : screenStyles.messageContainerAssistant
                    }`}
                  >
                    <Paper
                      elevation={1}
                      className={`${screenStyles.messageBubble} ${
                        isUser
                          ? screenStyles.messageBubbleUser
                          : screenStyles.messageBubbleAssistant
                      }`}
                    >
                      <Typography variant="body2" className={screenStyles.messageText}>
                        {message.text}
                      </Typography>
                    </Paper>
                  </Box>
                  {index < messages.length - 1 &&
                    messages[index + 1].position !== message.position && (
                      <Divider className={screenStyles.divider} />
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
