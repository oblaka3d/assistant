import MenuIcon from '@mui/icons-material/Menu';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import { Box, IconButton, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import React, { useRef, useEffect, useMemo } from 'react';
import { MessageList } from 'react-chat-elements';
import { useTranslation } from 'react-i18next';

import 'react-chat-elements/dist/main.css';

import ScreenHeader from '../../components/ScreenHeader';
import { API_PROVIDERS } from '../../constants/apiProviders';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearInput, setInputValue, toggleDialogPanel } from '../../store/slices/chatSlice';
import {
  loadLLMProviderInfo,
  sendMessage,
  startChatRecording,
  stopChatRecordingAndTranscribe,
} from '../../store/thunks/chatThunks';
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
  const { llmProviderName, llmModel } = useAppSelector((state) => state.settings);
  const isRecording = useAppSelector((state) => state.voice.isRecording);
  const messageListRef = useRef<MessageListRef | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Получаем текущий диалог и сообщения
  const messages = useMemo(() => {
    const currentDialog = dialogs.find((d) => d.id === currentDialogId);
    return currentDialog?.messages || [];
  }, [dialogs, currentDialogId]);

  // Проверяем, является ли текущий диалог пустым
  const isWelcomeState = useMemo(() => {
    return messages.length === 0;
  }, [messages]);

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

  // Формируем заголовок с названием LLM провайдера и модели
  const chatTitle = useMemo(() => {
    if (!llmProviderName) {
      return t('chat.title');
    }

    // Получаем информацию о провайдере и модели
    const provider = API_PROVIDERS.find((p) => p.id === llmProviderName);

    if (!provider) {
      return `${t('chat.title')} - ${llmProviderName}`;
    }

    if (llmModel && provider.models) {
      const model = provider.models.find((m) => m.id === llmModel);
      if (model) {
        return `${t('chat.title')} - ${provider.name} (${model.name})`;
      }
    }

    return `${t('chat.title')} - ${provider.name}`;
  }, [llmProviderName, llmModel, t]);

  const handleTogglePanel = () => {
    dispatch(toggleDialogPanel());
  };

  const handleRecord = async () => {
    if (isRecording) {
      // Остановить запись и расшифровать
      try {
        const transcribedText = await dispatch(
          stopChatRecordingAndTranscribe({
            onTranscribed: (text) => {
              // Добавляем расшифрованный текст в поле ввода для предварительного просмотра
              dispatch(setInputValue(text));
            },
          })
        ).unwrap();

        // Автоматически отправляем сообщение, если текст распознан
        if (transcribedText && transcribedText.trim()) {
          dispatch(clearInput());
          await dispatch(sendMessage({ text: transcribedText.trim(), t })).unwrap();
        }
      } catch (error) {
        log.error('Recording error:', error);
      }
    } else {
      // Начать запись
      try {
        await dispatch(startChatRecording()).unwrap();
      } catch (error) {
        log.error('Failed to start recording:', error);
      }
    }
  };

  return (
    <Box className={styles.container}>
      {/* Панель диалогов */}
      <DialogPanel />

      {/* Заголовок */}
      <ScreenHeader
        title={chatTitle}
        startAction={
          <IconButton onClick={handleTogglePanel} className={styles.menuButton} color="inherit">
            <MenuIcon />
          </IconButton>
        }
      />

      {/* Список сообщений */}
      <Box className={styles.messagesContainer}>
        {isWelcomeState ? (
          <Box className={styles.welcomeState}>
            <Box className={styles.welcomeContent}>
              <Box className={styles.welcomeIcon}>
                <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>
                  🤖
                </Typography>
              </Box>
              <Typography variant="h4" className={styles.welcomeTitle} sx={{ mb: 1 }}>
                {t('chat.welcome')}
              </Typography>
              <Typography variant="body1" className={styles.welcomeSubtitle} sx={{ mb: 4 }}>
                {t('chat.welcomeSubtitle')}
              </Typography>
              <Box className={styles.welcomeSuggestions}>
                <Box
                  className={styles.suggestionChip}
                  onClick={() => dispatch(setInputValue(t('chat.suggestions.about')))}
                >
                  <Typography variant="body2">💡 {t('chat.suggestions.about')}</Typography>
                </Box>
                <Box
                  className={styles.suggestionChip}
                  onClick={() => dispatch(setInputValue(t('chat.suggestions.capabilities')))}
                >
                  <Typography variant="body2">🚀 {t('chat.suggestions.capabilities')}</Typography>
                </Box>
                <Box
                  className={styles.suggestionChip}
                  onClick={() => dispatch(setInputValue(t('chat.suggestions.help')))}
                >
                  <Typography variant="body2">⚡ {t('chat.suggestions.help')}</Typography>
                </Box>
              </Box>
            </Box>
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
                  title: '', // Убираем подпись пользователя/ассистента
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
            maxRows={3}
            placeholder={isRecording ? t('chat.recording') : t('ui.enterMessage')}
            value={inputValue}
            onChange={(e) => dispatch(setInputValue(e.target.value))}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="small"
            className={styles.inputField}
            disabled={isRecording}
            sx={{
              '& .MuiOutlinedInput-root': {
                minHeight: '36px',
              },
            }}
          />
          <IconButton
            color={isRecording ? 'error' : 'default'}
            onClick={handleRecord}
            className={`${styles.recordButton} ${isRecording ? styles.recordButtonRecording : ''}`}
            title={isRecording ? t('chat.stopRecording') : t('chat.startRecording')}
          >
            {isRecording ? (
              <Box className={styles.recordButtonPulse}>
                <MicIcon />
              </Box>
            ) : (
              <MicIcon />
            )}
          </IconButton>
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!inputValue.trim() || isRecording}
            className={styles.sendButton}
          >
            {isRecording ? <CircularProgress size={20} /> : <SendIcon />}
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatScreen;
