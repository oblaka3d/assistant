import KeyboardIcon from '@mui/icons-material/Keyboard';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import LanguageIcon from '@mui/icons-material/Language';
import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Keyboard, { KeyboardReactInterface } from 'react-simple-keyboard';

import styles from './ChatKeyboard.module.css';
import 'react-simple-keyboard/build/css/index.css';

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

interface ChatKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
}

const ChatKeyboard: React.FC<ChatKeyboardProps> = ({ value, onChange, onEnter }) => {
  const { t, i18n } = useTranslation();
  const keyboardRef = useRef<KeyboardReactInterface | null>(null);
  const keyboardWrapperRef = useRef<HTMLDivElement>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const initialLanguage =
    i18n.language === 'ru' ? 'ru' : i18n.language === 'zh' ? 'zh' : ('en' as KeyboardLanguage);
  const [keyboardLanguage, setKeyboardLanguage] = useState<KeyboardLanguage>(initialLanguage);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState<null | HTMLElement>(null);
  const [keyboardLayoutName, setKeyboardLayoutName] = useState<'default' | 'shift'>('default');

  const handleKeyboardChange = useCallback(
    (text: string) => {
      onChange(text);
    },
    [onChange]
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
        onEnter();
      }
    },
    [onEnter]
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

  const updateKeyboardOffset = useCallback(() => {
    if (isKeyboardVisible && keyboardWrapperRef.current) {
      const keyboardHeight = keyboardWrapperRef.current.offsetHeight;
      const offsetValue = `${keyboardHeight + 16}px`;
      document.documentElement.style.setProperty('--keyboard-offset', offsetValue);
    } else {
      document.documentElement.style.setProperty('--keyboard-offset', '0px');
    }
  }, [isKeyboardVisible]);

  useEffect(() => {
    updateKeyboardOffset();
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

  return (
    <>
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
    </>
  );
};

export default ChatKeyboard;
