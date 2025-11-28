import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import { Box, IconButton } from '@mui/material';
import EmojiPicker, { EmojiClickData, EmojiStyle, Theme as EmojiTheme } from 'emoji-picker-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import Keyboard, { KeyboardReactInterface } from 'react-simple-keyboard';

import 'react-simple-keyboard/build/css/index.css';
import styles from './ChatKeyboard.module.css';

const KEYBOARD_EXTRA_OFFSET = 0;
const EMOJI_BUTTON_CLASS = 'chat-emoji-key';
const LANGUAGE_BUTTON_CLASS = 'chat-language-key';

const KEYBOARD_LAYOUTS = {
  en: {
    default: [
      '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
      '{tab} q w e r t y u i o p [ ] \\',
      "{lock} a s d f g h j k l ; ' {enter}",
      '{shift} z x c v b n m , . / {shift}',
      '{emoji} {lang} {space}',
    ],
    shift: [
      '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
      '{tab} Q W E R T Y U I O P { } |',
      '{lock} A S D F G H J K L : " {enter}',
      '{shift} Z X C V B N M < > ? {shift}',
      '{emoji} {lang} {space}',
    ],
  },
  ru: {
    default: [
      'ё 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
      '{tab} й ц у к е н г ш щ з х ъ \\',
      '{lock} ф ы в а п р о л д ж э {enter}',
      '{shift} я ч с м и т ь б ю . {shift}',
      '{emoji} {lang} {space}',
    ],
    shift: [
      'Ё ! " № ; % : ? * ( ) _ + {bksp}',
      '{tab} Й Ц У К Е Н Г Ш Щ З Х Ъ /',
      '{lock} Ф Ы В А П Р О Л Д Ж Э {enter}',
      '{shift} Я Ч С М И Т Ь Б Ю , {shift}',
      '{emoji} {lang} {space}',
    ],
  },
  zh: {
    default: [
      '· 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
      '{tab} q w e r t y u i o p [ ] \\',
      "{lock} a s d f g h j k l ; ' {enter}",
      '{shift} z x c v b n m ， 。 / {shift}',
      '{emoji} {lang} {space}',
    ],
    shift: [
      '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
      '{tab} Q W E R T Y U I O P { } |',
      '{lock} A S D F G H J K L : " {enter}',
      '{shift} Z X C V B N M ， 。 ? {shift}',
      '{emoji} {lang} {space}',
    ],
  },
};

type KeyboardLanguage = keyof typeof KEYBOARD_LAYOUTS;

const KEYBOARD_LANGUAGE_SEQUENCE: KeyboardLanguage[] = ['en', 'ru', 'zh'];

const KEYBOARD_LANGUAGE_LABEL: Record<KeyboardLanguage, string> = {
  en: 'EN',
  ru: 'РУ',
  zh: '拼',
};

const KEY_DISPLAY_LABELS: Record<string, string> = {
  '{bksp}': '⌫',
  '{enter}': '⏎',
  '{tab}': 'tab',
  '{lock}': 'caps',
  '{shift}': 'shift',
  '{space}': 'space',
  '{emoji}': '😊',
};

interface ChatKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  portalContainer?: HTMLElement | null;
  isDarkTheme?: boolean;
  onHeightChange?: (height: number) => void;
  onEmojiSelect?: (emoji: EmojiClickData) => void;
}

const ChatKeyboard: React.FC<ChatKeyboardProps> = ({
  value,
  onChange,
  onEnter,
  portalContainer,
  isDarkTheme,
  onHeightChange,
  onEmojiSelect,
}) => {
  const { t, i18n } = useTranslation();
  const keyboardRef = useRef<KeyboardReactInterface | null>(null);
  const keyboardWrapperRef = useRef<HTMLDivElement>(null);
  const keyboardPanelRef = useRef<HTMLDivElement>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isEmojiPanelVisible, setEmojiPanelVisible] = useState(false);
  const initialLanguage =
    i18n.language === 'ru' ? 'ru' : i18n.language === 'zh' ? 'zh' : ('en' as KeyboardLanguage);
  const [keyboardLanguage, setKeyboardLanguage] = useState<KeyboardLanguage>(initialLanguage);
  const [keyboardLayoutName, setKeyboardLayoutName] = useState<'default' | 'shift'>('default');

  const handleKeyboardChange = useCallback(
    (text: string) => {
      onChange(text);
    },
    [onChange]
  );

  const cycleLanguage = useCallback(() => {
    setKeyboardLanguage((prev) => {
      const index = KEYBOARD_LANGUAGE_SEQUENCE.indexOf(prev);
      const next = KEYBOARD_LANGUAGE_SEQUENCE[(index + 1) % KEYBOARD_LANGUAGE_SEQUENCE.length];
      return next;
    });
  }, []);

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
        onEnter();
      }

      if (button === '{lang}') {
        cycleLanguage();
      }

      if (button === '{emoji}') {
        setEmojiPanelVisible(true);
      }
    },
    [onEnter, cycleLanguage]
  );

  useEffect(() => {
    if (keyboardRef.current && keyboardRef.current.getInput() !== value) {
      keyboardRef.current.setInput(value);
    }
  }, [value]);

  useEffect(() => {
    keyboardRef.current?.setOptions({
      layout: KEYBOARD_LAYOUTS[keyboardLanguage],
      layoutName: keyboardLayoutName,
    });
  }, [keyboardLanguage, keyboardLayoutName]);

  const reportKeyboardHeight = useCallback(() => {
    // Измеряем высоту всего панели клавиатуры, включая padding
    const height =
      isKeyboardVisible && keyboardPanelRef.current
        ? keyboardPanelRef.current.offsetHeight + KEYBOARD_EXTRA_OFFSET
        : 0;
    onHeightChange?.(height);
  }, [isKeyboardVisible, onHeightChange]);

  const dispatchKeyboardEvent = useCallback(
    (eventName: 'virtualKeyboardOpen' | 'virtualKeyboardClose', height: number) => {
      if (typeof window === 'undefined') {
        return;
      }
      window.dispatchEvent(
        new CustomEvent(eventName, {
          detail: { height },
        })
      );
    },
    []
  );

  useEffect(() => {
    reportKeyboardHeight();
    let resizeObserver: ResizeObserver | null = null;

    if (isKeyboardVisible && keyboardPanelRef.current) {
      resizeObserver = new ResizeObserver(() => {
        reportKeyboardHeight();
      });
      resizeObserver.observe(keyboardPanelRef.current);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      onHeightChange?.(0);
    };
  }, [isKeyboardVisible, reportKeyboardHeight, onHeightChange]);

  useEffect(() => {
    // Измеряем высоту всего панели клавиатуры, включая padding
    const height =
      isKeyboardVisible && keyboardPanelRef.current
        ? keyboardPanelRef.current.offsetHeight + KEYBOARD_EXTRA_OFFSET
        : 0;
    dispatchKeyboardEvent(
      isKeyboardVisible ? 'virtualKeyboardOpen' : 'virtualKeyboardClose',
      height
    );
  }, [dispatchKeyboardEvent, isKeyboardVisible]);

  useEffect(() => {
    return () => {
      dispatchKeyboardEvent('virtualKeyboardClose', 0);
    };
  }, [dispatchKeyboardEvent]);

  useEffect(() => {
    if (isKeyboardVisible) {
      return;
    }
    const frame = requestAnimationFrame(() => {
      setEmojiPanelVisible(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [isKeyboardVisible]);

  const toggleKeyboard = () => {
    setKeyboardVisible((prev) => {
      if (prev) {
        setKeyboardLayoutName('default');
        keyboardRef.current?.setOptions({ layoutName: 'default' });
        setEmojiPanelVisible(false);
      }
      return !prev;
    });
  };

  const keyboardDisplay = useMemo(() => {
    return {
      ...KEY_DISPLAY_LABELS,
      '{lang}': KEYBOARD_LANGUAGE_LABEL[keyboardLanguage],
    };
  }, [keyboardLanguage]);

  const emojiSearchPlaceholder = t('chat.emojiSearchPlaceholder', 'Search emoji');

  const emojiPanel = (
    <Box className={styles.emojiPanel} data-testid="emoji-picker">
      <EmojiPicker
        theme={isDarkTheme ? EmojiTheme.DARK : EmojiTheme.LIGHT}
        emojiStyle={EmojiStyle.NATIVE}
        lazyLoadEmojis
        skinTonesDisabled
        searchPlaceHolder={emojiSearchPlaceholder}
        previewConfig={{ showPreview: false }}
        width="100%"
        height={300}
        onEmojiClick={(emoji) => onEmojiSelect?.(emoji)}
      />
    </Box>
  );

  const keyboardContent = (
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
      display={keyboardDisplay}
      buttonTheme={[
        {
          class: EMOJI_BUTTON_CLASS,
          buttons: '{emoji}',
        },
        {
          class: LANGUAGE_BUTTON_CLASS,
          buttons: '{lang}',
        },
      ]}
    />
  );

  const panel = isKeyboardVisible ? (
    <div className={styles.keyboardPortal}>
      <Box
        ref={keyboardPanelRef}
        className={`${styles.keyboardPanel} ${isDarkTheme ? styles.keyboardPanelDark : ''}`}
      >
        <Box
          ref={keyboardWrapperRef}
          className={`${styles.keyboardWrapper} ${isDarkTheme ? styles.keyboardWrapperDark : ''}`}
          data-testid="chat-keyboard-wrapper"
        >
          {isEmojiPanelVisible ? emojiPanel : keyboardContent}
        </Box>
      </Box>
    </div>
  ) : null;

  const portalTarget = portalContainer ?? (typeof document !== 'undefined' ? document.body : null);

  const panelNode = portalTarget && panel ? createPortal(panel, portalTarget) : panel;

  const handleToggleButtonClick = () => {
    if (isKeyboardVisible && isEmojiPanelVisible) {
      setEmojiPanelVisible(false);
      return;
    }
    toggleKeyboard();
  };

  const renderToggleIcon = () => {
    if (isKeyboardVisible && isEmojiPanelVisible) {
      return <EmojiEmotionsIcon />;
    }
    if (isKeyboardVisible) {
      return <KeyboardHideIcon />;
    }
    return <KeyboardIcon />;
  };

  return (
    <>
      <Box className={styles.keyboardControls}>
        <IconButton
          data-testid="chat-keyboard-toggle"
          onClick={handleToggleButtonClick}
          className={styles.keyboardToggle}
          color={isKeyboardVisible ? 'primary' : 'default'}
          title={
            isKeyboardVisible && isEmojiPanelVisible
              ? t('chat.showKeyboard')
              : t(isKeyboardVisible ? 'chat.hideKeyboard' : 'chat.showKeyboard')
          }
          aria-label={
            isKeyboardVisible && isEmojiPanelVisible
              ? t('chat.showKeyboard')
              : t(isKeyboardVisible ? 'chat.hideKeyboard' : 'chat.showKeyboard')
          }
        >
          {renderToggleIcon()}
        </IconButton>
      </Box>
      {panelNode}
    </>
  );
};

export default ChatKeyboard;
