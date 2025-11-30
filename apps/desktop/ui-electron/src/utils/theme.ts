import { Theme, createTheme } from '@mui/material';

/**
 * Определение системной темы (light/dark)
 */
export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'dark'; // По умолчанию темная тема
};

/**
 * Получение эффективной темы (если theme === 'system', возвращает системную тему)
 */
export const getEffectiveTheme = (theme: 'light' | 'dark' | 'system'): 'light' | 'dark' => {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme;
};

/**
 * Создание светлой темы
 */
export const createLightTheme = (): Theme => {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#4a90e2',
        dark: '#357abd',
        light: '#6ba3e8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#757575',
        light: '#9e9e9e',
        dark: '#616161',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
      text: {
        primary: '#212121',
        secondary: '#757575',
      },
      divider: 'rgba(0, 0, 0, 0.12)',
      action: {
        active: 'rgba(0, 0, 0, 0.54)',
        hover: 'rgba(0, 0, 0, 0.04)',
        selected: 'rgba(74, 144, 226, 0.08)',
        disabled: 'rgba(0, 0, 0, 0.26)',
      },
      error: {
        main: '#e74c3c',
        light: '#ef5350',
        dark: '#c62828',
      },
      success: {
        main: '#27ae60',
        light: '#4caf50',
        dark: '#2e7d32',
      },
      warning: {
        main: '#ff9800',
        light: '#ffb74d',
        dark: '#f57c00',
      },
      info: {
        main: '#2196f3',
        light: '#64b5f6',
        dark: '#1976d2',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    shape: {
      borderRadius: 8,
    },
    shadows: [
      'none',
      '0px 2px 4px rgba(0, 0, 0, 0.08)',
      '0px 4px 8px rgba(0, 0, 0, 0.12)',
      '0px 6px 12px rgba(0, 0, 0, 0.16)',
      '0px 8px 16px rgba(0, 0, 0, 0.20)',
      '0px 10px 20px rgba(0, 0, 0, 0.24)',
      '0px 12px 24px rgba(0, 0, 0, 0.28)',
      '0px 14px 28px rgba(0, 0, 0, 0.32)',
      '0px 16px 32px rgba(0, 0, 0, 0.36)',
      ...Array(16).fill('0px 2px 8px rgba(0, 0, 0, 0.15)'),
    ] as Theme['shadows'],
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
    },
  });
};

/**
 * Создание темной темы
 */
export const createDarkTheme = (): Theme => {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#4a90e2',
        dark: '#357abd',
        light: '#6ba3e8',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#9e9e9e',
        light: '#bdbdbd',
        dark: '#757575',
      },
      background: {
        default: '#1a1a1a',
        paper: '#2d2d2d',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b0b0b0',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.08)',
        selected: 'rgba(74, 144, 226, 0.16)',
        disabled: 'rgba(255, 255, 255, 0.26)',
      },
      error: {
        main: '#e74c3c',
        light: '#ef5350',
        dark: '#c62828',
      },
      success: {
        main: '#27ae60',
        light: '#4caf50',
        dark: '#2e7d32',
      },
      warning: {
        main: '#ff9800',
        light: '#ffb74d',
        dark: '#f57c00',
      },
      info: {
        main: '#2196f3',
        light: '#64b5f6',
        dark: '#1976d2',
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
    },
  });
};

/**
 * Вычисление темных и светлых вариантов цвета
 */
const getColorVariants = (color: string) => {
  // Простое вычисление темного и светлого вариантов
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Темный вариант (уменьшаем яркость на 20%)
  const darkR = Math.max(0, Math.floor(r * 0.8));
  const darkG = Math.max(0, Math.floor(g * 0.8));
  const darkB = Math.max(0, Math.floor(b * 0.8));
  const dark = `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`;

  // Светлый вариант (увеличиваем яркость на 20%)
  const lightR = Math.min(255, Math.floor(r + (255 - r) * 0.2));
  const lightG = Math.min(255, Math.floor(g + (255 - g) * 0.2));
  const lightB = Math.min(255, Math.floor(b + (255 - b) * 0.2));
  const light = `#${lightR.toString(16).padStart(2, '0')}${lightG.toString(16).padStart(2, '0')}${lightB.toString(16).padStart(2, '0')}`;

  return { main: color, dark, light };
};

/**
 * Создание темы на основе настройки (light/dark/system) и акцентного цвета
 */
export const createAppTheme = (
  theme: 'light' | 'dark' | 'system',
  accentColor: string = '#4a90e2'
): Theme => {
  const effectiveTheme = getEffectiveTheme(theme);
  const baseTheme = effectiveTheme === 'dark' ? createDarkTheme() : createLightTheme();
  const colorVariants = getColorVariants(accentColor);

  // Обновляем primary цвет в теме
  return createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      primary: {
        ...baseTheme.palette.primary,
        main: colorVariants.main,
        dark: colorVariants.dark,
        light: colorVariants.light,
      },
    },
  });
};
