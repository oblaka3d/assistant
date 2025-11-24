import { useEffect, useMemo } from 'react';

import { useAppSelector } from '../store/hooks';

import { useTheme } from './useTheme';

/**
 * Хук для управления CSS переменными акцентного цвета
 */
export const useCSSVariables = () => {
  const { effectiveTheme } = useTheme();
  const accentColorLight = useAppSelector((state) => state.settings.accentColorLight);
  const accentColorDark = useAppSelector((state) => state.settings.accentColorDark);

  // Выбираем акцентный цвет в зависимости от эффективной темы
  const accentColor = useMemo(
    () => (effectiveTheme === 'dark' ? accentColorDark : accentColorLight),
    [effectiveTheme, accentColorLight, accentColorDark]
  );

  // Устанавливаем data-атрибут на body для CSS переменных и обновляем акцентный цвет
  useEffect(() => {
    document.body.setAttribute('data-theme', effectiveTheme);
    document.documentElement.setAttribute('data-theme', effectiveTheme);

    // Обновляем CSS переменные для акцентного цвета
    const root = document.documentElement;
    root.style.setProperty('--primary-color', accentColor);

    // Вычисляем темный и светлый варианты для hover эффектов
    const hex = accentColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    // Темный вариант для некоторых элементов (уменьшаем яркость на 15%)
    const darkR = Math.max(0, Math.floor(r * 0.85));
    const darkG = Math.max(0, Math.floor(g * 0.85));
    const darkB = Math.max(0, Math.floor(b * 0.85));
    const primaryHoverDark = `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`;

    // Светлый вариант для hover (увеличиваем яркость на 15%)
    const lightR = Math.min(255, Math.floor(r + (255 - r) * 0.15));
    const lightG = Math.min(255, Math.floor(g + (255 - g) * 0.15));
    const lightB = Math.min(255, Math.floor(b + (255 - b) * 0.15));
    const primaryHoverLight = `#${lightR.toString(16).padStart(2, '0')}${lightG.toString(16).padStart(2, '0')}${lightB.toString(16).padStart(2, '0')}`;

    root.style.setProperty('--primary-hover', primaryHoverDark);
    root.style.setProperty('--primary-hover-light', primaryHoverLight);

    // Обновляем glow-color с прозрачностью
    const glowColor = effectiveTheme === 'dark' ? `${accentColor}80` : `${accentColor}4D`;
    root.style.setProperty('--glow-color', glowColor);

    // Обновляем scrollbar цвета
    const scrollbarThumb = effectiveTheme === 'dark' ? `${accentColor}80` : `${accentColor}66`;
    const scrollbarThumbHover = effectiveTheme === 'dark' ? `${accentColor}B3` : `${accentColor}99`;
    root.style.setProperty('--scrollbar-thumb', scrollbarThumb);
    root.style.setProperty('--scrollbar-thumb-hover', scrollbarThumbHover);

    // Вычисляем контрастный цвет для текста на акцентном фоне
    // Используем формулу относительной яркости (luminance)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const contrastText = luminance > 0.5 ? '#000000' : '#ffffff';
    root.style.setProperty('--primary-contrast-text', contrastText);
  }, [effectiveTheme, accentColor]);

  // Устанавливаем начальные CSS переменные сразу при монтировании
  useEffect(() => {
    const initialAccentColor = accentColor;
    const root = document.documentElement;
    root.style.setProperty('--primary-color', initialAccentColor);

    // Вычисляем начальный контрастный цвет
    const hex = initialAccentColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const contrastText = luminance > 0.5 ? '#000000' : '#ffffff';
    root.style.setProperty('--primary-contrast-text', contrastText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Только при монтировании

  return { accentColor, effectiveTheme };
};
