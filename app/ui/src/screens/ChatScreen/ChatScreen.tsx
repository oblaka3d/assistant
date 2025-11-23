import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, TextField, Typography, Paper } from '@mui/material';
import React, { useRef, useEffect, useMemo } from 'react';
import { MessageList } from 'react-chat-elements';
import { useTranslation } from 'react-i18next';

import 'react-chat-elements/dist/main.css';

import ScreenHeader from '../../components/ScreenHeader';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearInput, setInputValue, toggleDialogPanel } from '../../store/slices/chatSlice';
import { loadLLMProviderInfo, sendMessage } from '../../store/thunks/chatThunks';
import { createLogger } from '../../utils/logger';

import styles from './ChatScreen.module.css';
import DialogPanel from './components/DialogPanel/DialogPanel';

const log = createLogger('ChatScreen');

interface MessageListRef {
  scrollToBottom?: () => void;
}

const ChatScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { dialogs, currentDialogId, inputValue } = useAppSelector((state) => state.chat);
  const llmProviderName = useAppSelector((state) => state.settings.llmProviderName);
  const messageListRef = useRef<MessageListRef | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Получаем текущий диалог и сообщения
  const messages = useMemo(() => {
    const currentDialog = dialogs.find((d) => d.id === currentDialogId);
    return currentDialog?.messages || [];
  }, [dialogs, currentDialogId]);

  // Загружаем информацию о LLM провайдере при монтировании
  useEffect(() => {
    if (!llmProviderName) {
      dispatch(loadLLMProviderInfo())
        .unwrap()
        .then((info) => {
          log.debug('LLM provider info loaded:', info);
        })
        .catch((error) => {
          log.error('Failed to load LLM provider info:', error);
        });
    }
  }, [dispatch, llmProviderName]);

  useEffect(() => {
    // Прокрутка к последнему сообщению
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
    // Альтернативный способ через ref библиотеки, если доступен
    if (messageListRef.current?.scrollToBottom) {
      messageListRef.current.scrollToBottom();
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const text = inputValue;
    dispatch(clearInput());

    try {
      await dispatch(sendMessage({ text, t })).unwrap();
    } catch (error) {
      log.error('Failed to send message:', error);
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

  const handleTogglePanel = () => {
    dispatch(toggleDialogPanel());
  };

  return (
    <Box className={styles.container}>
      {/* Панель диалогов */}
      <DialogPanel />

      {/* Заголовок */}
      <ScreenHeader
        title={chatTitle}
        action={
          <IconButton onClick={handleTogglePanel} className={styles.menuButton} color="inherit">
            <MenuIcon />
          </IconButton>
        }
      />

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
              dataSource={
                // Type assertion needed due to react-chat-elements incomplete types
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                messages.map((msg) => ({
                  id: msg.id,
                  position: msg.position,
                  type: msg.type,
                  text: msg.text,
                  date: msg.date,
                  title: msg.position === 'right' ? t('chat.user') : t('chat.assistant'),
                  titleColor: msg.position === 'right' ? '#4a90e2' : '#27ae60',
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                })) as unknown as any
              }
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
