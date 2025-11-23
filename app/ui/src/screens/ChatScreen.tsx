import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, TextField, Typography, Paper } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import { MessageList } from 'react-chat-elements';

import 'react-chat-elements/dist/main.css';

import ScreenHeader from '../components/ScreenHeader';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addMessage, clearInput, setInputValue } from '../store/slices/chatSlice';

import styles from './ChatScreen.module.css';

const ChatScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);
  const inputValue = useAppSelector((state) => state.chat.inputValue);
  const messageListRef = useRef<any>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
          text: response || 'Извините, не удалось получить ответ.',
          date: new Date(),
        };
        dispatch(addMessage(assistantMessage));

        // Воспроизвести ответ голосом
        if (response) {
          await window.api.speak(response);
        }
      } catch (error) {
        console.error('Failed to get assistant response:', error);
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          position: 'left' as const,
          type: 'text' as const,
          text: 'Произошла ошибка при обработке запроса.',
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

  return (
    <Box className={styles.container}>
      {/* Заголовок */}
      <ScreenHeader title="История диалогов" />

      {/* Список сообщений */}
      <Box className={styles.messagesContainer}>
        {messages.length === 0 ? (
          <Box className={styles.emptyState}>
            <Typography variant="h6" color="text.secondary">
              История пуста
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Начните диалог с ассистентом
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
                title: msg.position === 'right' ? 'Вы' : 'Ассистент',
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
            placeholder="Введите сообщение..."
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
