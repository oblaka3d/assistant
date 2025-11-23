import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../store/hooks';

/**
 * Хук для синхронизации языка из Redux с i18n
 */
export const useLanguage = () => {
  const { i18n } = useTranslation();
  const language = useAppSelector((state) => state.settings.language);

  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  return language;
};

