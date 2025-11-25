import KeyboardIcon from '@mui/icons-material/Keyboard';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import React, { useRef, useEffect, useMemo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Keyboard, { KeyboardReactInterface } from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

import CustomMessageList from '../../components/CustomMessageList';
import ScreenHeader from '../../components/ScreenHeader';
import { API_PROVIDERS } from '../../constants/apiProviders';
import type { AppDispatch } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  addMessage,
  clearInput,
  setInputValue,
  toggleDialogPanel,
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

// Временная функция для тестирования - добавляет тестовые сообщения с markdown и изображениями
const addTestMessage = (dispatch: AppDispatch, type: 'markdown' | 'image') => {
  const testMessage =
    type === 'markdown'
      ? {
          id: Date.now().toString(),
          position: 'left' as const,
          type: 'markdown' as const,
          text: `# Пример отформатированного кода

Вот пример кода на **JavaScript**:

\`\`\`javascript
function greet(name) {
  console.log(\`Привет, \${name}!\`);
  return \`Hello, \${name}!\`;
}

greet('Мир');
\`\`\`

И еще один пример на **Python**:

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

## Списки и таблицы

### Маркированный список:
- Первый элемент
- Второй элемент
- ~~Зачеркнутый элемент~~

### Нумерованный список:
1. Первый шаг
2. Второй шаг
3. Третий шаг

### Таблица:

| Язык | Приветствие |
|------|-------------|
| Русский | Привет |
| English | Hello |
| Español | Hola |

> Это цитата для демонстрации возможностей markdown.

[Ссылка на Google](https://google.com)`,
          date: new Date(),
        }
      : {
          id: Date.now().toString(),
          position: 'left' as const,
          type: 'image' as const,
          images: [
            {
              url: 'https://picsum.photos/400/300?random=' + Date.now(),
              alt: 'Тестовое изображение',
            },
          ],
          text: 'Это сообщение содержит изображение',
          date: new Date(),
        };

  dispatch(addMessage(testMessage));
};

const log = createLogger('ChatScreen');

const KEYBOARD_LAYOUTS = {
  en: {
    default: [
      '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
      '{tab} q w e r t y u i o p [ ] \\',
      "{lock} a s d f g h j k l ; ' {enter}",
      '{shift} z x c v b n m , . / {shift}',
      '{space}',
    ],
    shift: [
      '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
      '{tab} Q W E R T Y U I O P { } |',
      '{lock} A S D F G H J K L : " {enter}',
      '{shift} Z X C V B N M < > ? {shift}',
      '{space}',
    ],
  },
  ru: {
    default: [
      'ё 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
      '{tab} й ц у к е н г ш щ з х ъ \\',
      '{lock} ф ы в а п р о л д ж э {enter}',
      '{shift} я ч с м и т ь б ю . {shift}',
      '{space}',
    ],
    shift: [
      'Ё ! " № ; % : ? * ( ) _ + {bksp}',
      '{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ /',
      '{lock} Ф Ы В А П Р О Л Д Ж Э {enter}',
      '{shift} Я Ч С М И Т Ь Б Ю , {shift}',
      '{space}',
    ],
  },
  zh: {
    default: [
      '· 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
      '{tab} q w e r t y u i o p [ ] \\',
      "{lock} a s d f g h j k l ; ' {enter}",
      '{shift} z x c v b n m ， 。 / {shift}',
      '{space}',
    ],
    shift: [
      '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
      '{tab} Q W E R T Y U I O P { } |',
      '{lock} A S D F G H J K L : " {enter}',
      '{shift} Z X C V B N M ， 。 ? {shift}',
      '{space}',
    ],
  },
};

type KeyboardLanguage = keyof typeof KEYBOARD_LAYOUTS;

const KEYBOARD_LANGUAGE_OPTIONS: readonly { id: KeyboardLanguage; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'ru', label: 'РУ' },
  { id: 'zh', label: '拼' },
];

const ChatScreen: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { dialogs, currentDialogId, inputValue } = useAppSelector((state) => state.chat);
  const { llmProviderName, llmModel, theme, accentColorLight, accentColorDark } = useAppSelector(
    (state) => state.settings
  );
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const isRecording = useAppSelector((state) => state.voice.isRecording);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedMessagesRef = useRef<string>('');
  const keyboardRef = useRef<KeyboardReactInterface | null>(null);
  const keyboardWrapperRef = useRef<HTMLDivElement>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const initialLanguage =
    i18n.language === 'ru' ? 'ru' : i18n.language === 'zh' ? 'zh' : ('en' as KeyboardLanguage);
  const [keyboardLanguage, setKeyboardLanguage] = useState<KeyboardLanguage>(initialLanguage);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);
  const [keyboardLayoutName, setKeyboardLayoutName] = useState<'default' | 'shift'>('default');

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

  const accentColor = effectiveTheme === 'dark' ? accentColorDark : accentColorLight;

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
  }, [messages]);

  // Функция для сохранения диалога с debounce
  const saveCurrentDialog = useCallback(() => {
    if (!isAuthenticated || !currentDialogId) return;

    const currentDialog = dialogs.find((d) => d.id === currentDialogId);
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
        .catch((error) => {
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
      const currentDialog = dialogs.find((d) => d.id === currentDialogId);
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

  const handleKeyboardChange = useCallback(
    (value: string) => {
      dispatch(setInputValue(value));
    },
    [dispatch]
  );

  const handleKeyboardKeyPress = useCallback(
    (button: string) => {
      if (button === '{shift}' || button === '{lock}') {
        setKeyboardLayoutName((prev) => {
          const next = prev === 'default' ? 'shift' : 'default';
          keyboardRef.current?.setOptions({ layoutName: next });
          return next;
        });
      }

      if (button === '{enter}') {
        handleSend();
      }
    },
    [handleSend]
  );

  useEffect(() => {
    if (keyboardRef.current && keyboardRef.current.getInput() !== inputValue) {
      keyboardRef.current.setInput(inputValue);
    }
  }, [inputValue]);

  useEffect(() => {
    keyboardRef.current?.setOptions({
      layout: KEYBOARD_LAYOUTS[keyboardLanguage],
      layoutName: keyboardLayoutName,
    });
  }, [keyboardLanguage, keyboardLayoutName]);

  // Функция для вычисления и установки offset клавиатуры
  const updateKeyboardOffset = useCallback(() => {
    if (isKeyboardVisible && keyboardWrapperRef.current) {
      // Вычисляем реальную высоту клавиатуры + отступы
      const keyboardHeight = keyboardWrapperRef.current.offsetHeight;
      const offsetValue = `${keyboardHeight + 16}px`; // +16px для дополнительного отступа
      document.documentElement.style.setProperty('--keyboard-offset', offsetValue);
    } else {
      document.documentElement.style.setProperty('--keyboard-offset', '0px');
    }
  }, [isKeyboardVisible]);

  useEffect(() => {
    updateKeyboardOffset();

    // Добавляем обработчик изменения размера для пересчёта высоты
    let resizeObserver: ResizeObserver | null = null;

    if (isKeyboardVisible && keyboardWrapperRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateKeyboardOffset();
      });
      resizeObserver.observe(keyboardWrapperRef.current);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      document.documentElement.style.setProperty('--keyboard-offset', '0px');
    };
  }, [isKeyboardVisible, updateKeyboardOffset]);

  useEffect(() => {
    const root = document.documentElement;
    requestAnimationFrame(() => {
      const offset = getComputedStyle(root).getPropertyValue('--keyboard-offset');
      root.style.setProperty('--keyboard-offset', offset || '0px');
    });
  }, [isKeyboardVisible]);

  const toggleKeyboard = () => {
    setKeyboardVisible((prev) => {
      if (prev) {
        setKeyboardLayoutName('default');
        keyboardRef.current?.setOptions({ layoutName: 'default' });
      }
      return !prev;
    });
  };

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  const handleLanguageSelect = (lang: KeyboardLanguage) => {
    setKeyboardLanguage(lang);
    setLanguageMenuAnchor(null);
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
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={handleTogglePanel} className={styles.menuButton} color="inherit">
              <MenuIcon />
            </IconButton>
            {/* Временные кнопки для тестирования - убрать в продакшене */}
            <Button
              variant="outlined"
              size="small"
              onClick={() => addTestMessage(dispatch, 'markdown')}
              sx={{ fontSize: '0.7rem', minWidth: 'auto', px: 1 }}
            >
              MD
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => addTestMessage(dispatch, 'image')}
              sx={{ fontSize: '0.7rem', minWidth: 'auto', px: 1 }}
            >
              IMG
            </Button>
          </Box>
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
            <CustomMessageList
              messages={messages}
              className="message-list"
              toBottomHeight={'100%'}
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
          <Box className={styles.keyboardControls}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<LanguageIcon fontSize="small" />}
              className={styles.keyboardLanguageButton}
              onClick={handleLanguageMenuOpen}
              title={t('chat.keyboardLanguage')}
            >
              {keyboardLanguage.toUpperCase()}
            </Button>
            <IconButton
              onClick={toggleKeyboard}
              className={styles.keyboardToggle}
              color={isKeyboardVisible ? 'primary' : 'default'}
            >
              {isKeyboardVisible ? <KeyboardHideIcon /> : <KeyboardIcon />}
            </IconButton>
          </Box>
          <IconButton
            color={isRecording ? 'error' : 'default'}
            onClick={handleRecord}
            className={`${styles.recordButton} ${isRecording ? styles.recordButtonRecording : ''}`}
            title={isRecording ? t('chat.stopRecording') : t('chat.startRecording')}
            sx={{
              color: isRecording ? undefined : accentColor,
              '&:hover': {
                backgroundColor: isRecording ? undefined : `${accentColor}15`,
              },
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
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!inputValue.trim() || isRecording}
            className={styles.sendButton}
          >
            {isRecording ? <CircularProgress size={20} /> : <SendIcon />}
          </IconButton>
        </Box>
        {isKeyboardVisible && (
          <Box ref={keyboardWrapperRef} className={styles.keyboardWrapper}>
            <Keyboard
              keyboardRef={(instance) => {
                keyboardRef.current = instance;
              }}
              layout={KEYBOARD_LAYOUTS[keyboardLanguage]}
              layoutName={keyboardLayoutName}
              onChange={handleKeyboardChange}
              onKeyPress={handleKeyboardKeyPress}
              theme={`hg-theme-default ${styles.keyboardTheme}`}
              physicalKeyboardHighlight
            />
          </Box>
        )}
      </Paper>
      <Menu
        anchorEl={languageMenuAnchor}
        open={Boolean(languageMenuAnchor)}
        onClose={handleLanguageMenuClose}
      >
        {KEYBOARD_LANGUAGE_OPTIONS.map((option) => (
          <MenuItem
            key={option.id}
            selected={keyboardLanguage === option.id}
            onClick={() => handleLanguageSelect(option.id)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ChatScreen;
