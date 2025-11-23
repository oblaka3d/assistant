import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, TextField, Typography, Paper } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import { MessageList } from 'react-chat-elements';
import { useTranslation } from 'react-i18next';

import 'react-chat-elements/dist/main.css';

import ScreenHeader from '../../components/ScreenHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addMessage, clearInput, setInputValue } from '../../store/slices/chatSlice';
import { setLLMProviderName } from '../../store/slices/settingsSlice';
import { createLogger } from '../../utils/logger';

import styles from './ChatScreen.module.css';

const log = createLogger('ChatScreen');

const ChatScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);
  const inputValue = useAppSelector((state) => state.chat.inputValue);
  const llmProviderName = useAppSelector((state) => state.settings.llmProviderName);
  const messageListRef = useRef<unknown>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Загружаем информацию о LLM провайдере при монтировании
  useEffect(() => {
    const loadLLMProviderInfo = async () => {
      if (!window.api) {
        log.warn('Electron API not available');
        return;
      }

      try {
        const info = await window.api.getLLMProviderInfo();
        dispatch(setLLMProviderName(info.name));
        log.debug('LLM provider info loaded:', info);
      } catch (error) {
        log.error('Failed to load LLM provider info:', error);
      }
    };

    if (!llmProviderName) {
      loadLLMProviderInfo();
    }
  }, [dispatch, llmProviderName]);

  useEffect(() => {
    // Прокрутка к последнему сообщению
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
    // Альтернативный способ через ref библиотеки, если доступен
    if (messageListRef.current && typeof messageListRef.current.scrollToBottom === 'function') {
      messageListRef.current.scrollToBottom();
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      position: 'right' as const,
      type: 'text' as const,
      text: inputValue,
      date: new Date(),
    };

    dispatch(addMessage(userMessage));
    dispatch(clearInput());

    // Отправить запрос ассистенту
    if (window.api) {
      try {
        const response = await window.api.askLLM(inputValue);
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          position: 'left' as const,
          type: 'text' as const,
          text: response || t('ui.errorSorry'),
          date: new Date(),
        };
        dispatch(addMessage(assistantMessage));

        // Воспроизвести ответ голосом
        if (response) {
          await window.api.speak(response);
        }
      } catch (error) {
        log.error('Failed to get assistant response:', error);
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          position: 'left' as const,
          type: 'text' as const,
          text: t('ui.errorMessage'),
          date: new Date(),
        };
        dispatch(addMessage(errorMessage));
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Формируем заголовок с названием LLM модели
  const chatTitle = llmProviderName ? `${t('chat.title')} - ${llmProviderName}` : t('chat.title');

  return (
    <Box className={styles.container}>
      {/* Заголовок */}
      <ScreenHeader title={chatTitle} />

      {/* Список сообщений */}
      <Box className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <Box className={styles.emptyState}>
            <Typography variant="h6" color="text.secondary">
              {t('chat.empty')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('ui.startDialog')}
            </Typography>
          </Box>
        ) : (
          <Box ref={scrollContainerRef} className={styles.messagesList}>
            <MessageList
              referance={messageListRef}
              className="message-list"
              lockable={true}
              toBottomHeight={'100%'}
              dataSource={messages.map((msg) => ({
                id: msg.id,
                position: msg.position,
                type: msg.type,
                text: msg.text,
                date: msg.date,
                title: msg.position === 'right' ? t('chat.user') : t('chat.assistant'),
                titleColor: msg.position === 'right' ? '#4a90e2' : '#27ae60',
              }))}
            />
          </Box>
        )}
      </Box>

      {/* Поле ввода */}
      <Paper elevation={3} className={styles.inputContainer}>
        <Box className={styles.inputWrapper}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder={t('ui.enterMessage')}
            value={inputValue}
            onChange={(e) => dispatch(setInputValue(e.target.value))}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="small"
            className={styles.inputField}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={styles.sendButton}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatScreen;
