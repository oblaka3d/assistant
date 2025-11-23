import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  zh: {
    translation: zh,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    lng: 'ru', // Язык по умолчанию
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // React уже экранирует значения
    },
    detection: {
      // Порядок определения языка
      order: ['localStorage', 'navigator'],
      // Ключ для сохранения языка в localStorage
      lookupLocalStorage: 'i18nextLng',
      // Кешировать язык
      caches: ['localStorage'],
    },
  });

export default i18n;

