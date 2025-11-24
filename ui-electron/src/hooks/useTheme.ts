import { useEffect, useMemo, useState } from 'react';

import { useAppSelector } from '../store/hooks';

/**
 * Хук для определения эффективной темы (с учетом системной темы)
 */
export const useTheme = () => {
  const theme = useAppSelector((state) => state.settings.theme);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  // Отслеживаем изменения системной темы
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const isDark = 'matches' in e ? e.matches : mediaQuery.matches;
      setSystemTheme(isDark ? 'dark' : 'light');
    };

    // Устанавливаем начальное значение
    handleChange(mediaQuery);

    // Современные браузеры поддерживают addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Для старых браузеров
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mediaQuery as any).addListener(handleChange);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => (mediaQuery as any).removeListener(handleChange);
  }, []);

  // Определяем эффективную тему
  const effectiveTheme = useMemo(() => {
    if (theme === 'system') {
      return systemTheme;
    }
    return theme;
  }, [theme, systemTheme]);

  return { theme, systemTheme, effectiveTheme };
};
