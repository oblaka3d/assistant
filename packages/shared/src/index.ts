export type Locale = 'en' | 'ru' | 'zh';

export const getSupportedLocales = (): Locale[] => ['en', 'ru', 'zh'];

export const isSupportedLocale = (value: string): value is Locale => {
  return getSupportedLocales().includes(value as Locale);
};
