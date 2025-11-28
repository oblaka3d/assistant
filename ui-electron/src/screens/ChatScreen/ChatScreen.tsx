import MenuIcon from '@mui/icons-material/Menu';
import MicIcon from '@mui/icons-material/Mic';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Box, IconButton, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import { EmojiClickData } from 'emoji-picker-react';
import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import ChatKeyboard from '../../components/ChatKeyboard/ChatKeyboard';
import CustomMessageList from '../../components/CustomMessageList';
import ScreenHeader from '../../components/ScreenHeader';
import { API_PROVIDERS } from '../../constants/apiProviders';
import { DEFAULT_WELCOME_TITLE } from '../../constants/app';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  clearInput,
  setInputValue,
  toggleDialogPanel,
  type Dialog,
} from '../../store/slices/chatSlice';
import {
  loadLLMProviderInfo,
  sendMessage,
  startChatRecording,
  stopChatRecordingAndTranscribe,
  saveDialog,
  createDialogOnServer,
} from '../../store/thunks/chatThunks';
import { createLogger } from '../../utils/logger';

import styles from './ChatScreen.module.css';
import DialogPanel from './components/DialogPanel/DialogPanel';

const log = createLogger('ChatScreen');

const ChatScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { dialogs, currentDialogId, inputValue } = useAppSelector((state) => state.chat);
  const { llmProviderName, llmModel, theme, accentColorLight, accentColorDark, welcomeTitle } =
    useAppSelector((state) => state.settings);
  const currentScreen = useAppSelector((state) => state.ui.currentScreen);
  const isChatScreenActive = currentScreen === 'chat';
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const isRecording = useAppSelector((state) => state.voice.isRecording);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedMessagesRef = useRef<string>('');

  // Определяем эффективную тему и акцентный цвет
  const effectiveTheme = useMemo(() => {
    if (theme === 'system') {
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return 'dark';
    }
    return theme;
  }, [theme]);

  const isDarkTheme = effectiveTheme === 'dark';
  const accentColor = isDarkTheme ? accentColorDark : accentColorLight;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const latestInputValueRef = useRef(inputValue);
  const [keyboardPortalEl, setKeyboardPortalEl] = useState<HTMLElement | null>(null);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [isVirtualKeyboardOpen, setVirtualKeyboardOpen] = useState(false);
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const frame = requestAnimationFrame(() => {
        setKeyboardPortalEl(document.body);
      });
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleOpen: EventListener = () => {
      setVirtualKeyboardOpen(true);
    };
    const handleClose: EventListener = () => {
      setVirtualKeyboardOpen(false);
    };

    window.addEventListener('virtualKeyboardOpen', handleOpen);
    window.addEventListener('virtualKeyboardClose', handleClose);

    return () => {
      window.removeEventListener('virtualKeyboardOpen', handleOpen);
      window.removeEventListener('virtualKeyboardClose', handleClose);
    };
  }, []);

  // Получаем текущий диалог и сообщения
  const messages = useMemo(() => {
    const currentDialog = dialogs.find((d: { id: string }) => d.id === currentDialogId);
    return currentDialog?.messages || [];
  }, [dialogs, currentDialogId]);

  // Проверяем, является ли текущий диалог пустым
  const isWelcomeState = useMemo(() => {
    return messages.length === 0;
  }, [messages]);

  const welcomeScreenTitle = useMemo(() => {
    return welcomeTitle?.trim() ? welcomeTitle : DEFAULT_WELCOME_TITLE;
  }, [welcomeTitle]);

  const canSend = useMemo(() => inputValue.trim().length > 0, [inputValue]);

  // Вычисляем высоту контейнера сообщений
  const messagesContainerHeight = useMemo(() => {
    // Высота экрана минус высота StatusBar (24px), высота header (56px), высота input контейнера (примерно 60px) и высота клавиатуры
    const statusBarHeight = 24; // Высота StatusBar
    const headerHeight = 56; // Высота ScreenHeader (AppBar с Toolbar)
    const inputContainerHeight = 60; // Примерная высота input контейнера
    const totalFixedHeight = statusBarHeight + headerHeight + inputContainerHeight;
    const availableHeight = `calc(100vh - ${totalFixedHeight}px - ${keyboardOffset}px)`;
    return availableHeight;
  }, [keyboardOffset]);

  const containerStyle = useMemo(
    () =>
      ({
        '--keyboard-offset': `${keyboardOffset}px`,
        '--keyboard-open': isVirtualKeyboardOpen ? '1' : '0',
        '--messages-container-height': messagesContainerHeight,
      }) as React.CSSProperties,
    [keyboardOffset, isVirtualKeyboardOpen, messagesContainerHeight]
  );

  // Загружаем информацию о LLM провайдере при монтировании
  useEffect(() => {
    if (!llmProviderName) {
      dispatch(loadLLMProviderInfo())
        .unwrap()
        .then((info: { name: string }) => {
          log.debug('LLM provider info loaded:', info);
        })
        .catch((error: unknown) => {
          log.error('Failed to load LLM provider info:', error);
        });
    }
  }, [dispatch, llmProviderName]);

  useEffect(() => {
    // Прокрутка к последнему сообщению
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Функция для сохранения диалога с debounce
  const saveCurrentDialog = useCallback(() => {
    if (!isAuthenticated || !currentDialogId) return;

    const currentDialog = dialogs.find((d: Dialog) => d.id === currentDialogId);
    if (!currentDialog || currentDialog.messages.length === 0) return;

    // Создаем уникальный ключ для проверки изменений (длина + последнее сообщение)
    const messagesKey = `${currentDialog.messages.length}-${currentDialog.messages[currentDialog.messages.length - 1]?.id || ''}`;

    // Пропускаем сохранение, если сообщения не изменились
    if (lastSavedMessagesRef.current === messagesKey) {
      return;
    }

    // Очищаем предыдущий таймер
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Устанавливаем новый таймер для сохранения (5 секунд debounce для уменьшения нагрузки)
    saveTimeoutRef.current = setTimeout(() => {
      dispatch(
        saveDialog({
          dialogId: currentDialog.id,
          title: currentDialog.title,
          messages: currentDialog.messages,
        })
      )
        .then(() => {
          // Обновляем ключ после успешного сохранения
          lastSavedMessagesRef.current = messagesKey;
        })
        .catch((error: unknown) => {
          log.error('Failed to save dialog:', error);
        });
    }, 5000); // Увеличено с 1 до 5 секунд
  }, [isAuthenticated, currentDialogId, dialogs, dispatch]);

  // Создаем ключ для отслеживания изменений сообщений
  const messagesKey = useMemo(() => {
    if (messages.length === 0) return '';
    const lastMessage = messages[messages.length - 1];
    return `${messages.length}-${lastMessage?.id || ''}`;
  }, [messages]);

  // Сохраняем диалог при изменении сообщений текущего диалога
  useEffect(() => {
    if (!isAuthenticated || !currentDialogId || !messagesKey) {
      return;
    }

    // Пропускаем, если сообщения не изменились
    if (lastSavedMessagesRef.current === messagesKey) {
      return;
    }

    saveCurrentDialog();

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [messagesKey, currentDialogId, isAuthenticated, saveCurrentDialog]);

  const handleSend = useCallback(async () => {
    if (!inputValue.trim()) return;

    const text = inputValue;
    dispatch(clearInput());

    // Если пользователь авторизован и текущий диалог еще не создан на сервере, создаем его
    if (isAuthenticated && currentDialogId) {
      const currentDialog = dialogs.find((d: Dialog) => d.id === currentDialogId);
      if (currentDialog && (currentDialog.id === 'default' || !currentDialog.id)) {
        // Создаем новый диалог на сервере
        const newDialogId = Date.now().toString();
        try {
          await dispatch(
            createDialogOnServer({
              dialogId: newDialogId,
              title: 'Новый диалог',
            })
          ).unwrap();
        } catch (error) {
          log.error('Failed to create dialog on server:', error);
        }
      }
    }

    try {
      await dispatch(sendMessage({ text, t })).unwrap();
    } catch (error) {
      log.error('Failed to send message:', error);
    }
  }, [inputValue, dispatch, isAuthenticated, currentDialogId, dialogs, t]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

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

  useEffect(() => {
    latestInputValueRef.current = inputValue;
  }, [inputValue]);

  const handleEmojiSelect = useCallback(
    (emojiData: EmojiClickData) => {
      const currentValue = latestInputValueRef.current ?? '';
      dispatch(setInputValue(`${currentValue}${emojiData.emoji}`));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!isChatScreenActive) {
      const frame = requestAnimationFrame(() => {
        setVirtualKeyboardOpen(false);
      });
      return () => cancelAnimationFrame(frame);
    }
    return undefined;
  }, [isChatScreenActive]);

  return (
    <Box
      className={styles.container}
      data-keyboard-open={isVirtualKeyboardOpen ? 'true' : 'false'}
      style={containerStyle}
    >
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
      <Box className={styles.messagesContainer} style={{ height: messagesContainerHeight }}>
        {isWelcomeState ? (
          <Box className={styles.welcomeState}>
            <Box className={styles.welcomeContent}>
              <Box className={styles.welcomeIcon}>
                <Typography variant="h2" sx={{ fontSize: '3rem', mb: 2 }}>
                  🤖
                </Typography>
              </Box>
              <Typography variant="h4" className={styles.welcomeTitle} sx={{ mb: 1 }}>
                {welcomeScreenTitle}
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
            <CustomMessageList
              messages={messages}
              className="message-list"
              toBottomHeight={'100%'}
            />
          </Box>
        )}
      </Box>

      {/* Поле ввода */}
      <Paper elevation={0} className={styles.inputContainer}>
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
            className={`${styles.actionButton} ${styles.recordButton} ${
              isRecording ? styles.recordButtonRecording : ''
            }`}
            title={isRecording ? t('chat.stopRecording') : t('chat.startRecording')}
            sx={{
              color: isRecording ? undefined : accentColor,
            }}
          >
            {isRecording ? (
              <Box className={styles.recordButtonPulse}>
                <MicIcon />
              </Box>
            ) : (
              <MicIcon />
            )}
          </IconButton>
          {isChatScreenActive && (
            <ChatKeyboard
              value={inputValue}
              onChange={(value) => dispatch(setInputValue(value))}
              onEnter={handleSend}
              portalContainer={keyboardPortalEl}
              isDarkTheme={isDarkTheme}
              onHeightChange={setKeyboardOffset}
              onEmojiSelect={handleEmojiSelect}
            />
          )}
          <IconButton
            className={`${styles.actionButton} ${styles.sendButton}`}
            color="inherit"
            onClick={handleSend}
            disabled={!canSend || isRecording}
            sx={{
              color: !isRecording && canSend ? accentColor : 'var(--text-secondary)',
            }}
          >
            {isRecording ? (
              <CircularProgress size={20} />
            ) : (
              <SendOutlinedIcon fontSize="small" className={styles.sendIcon} />
            )}
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatScreen;
