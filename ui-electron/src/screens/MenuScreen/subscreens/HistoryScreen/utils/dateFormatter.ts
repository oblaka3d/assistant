import { format } from 'date-fns';
import { ru, enUS, zhCN, Locale } from 'date-fns/locale';

export const getDateLocale = (language: string): Locale => {
  switch (language) {
    case 'ru':
      return ru;
    case 'zh':
      return zhCN;
    default:
      return enUS;
  }
};

export const formatMessageDate = (
  date: Date,
  locale: Locale,
  t: (key: string) => string
): string => {
  try {
    const messageDate = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - messageDate.getTime()) / 1000);

    // Если сообщение сегодня, показываем только время
    if (diffInSeconds < 86400 && messageDate.getDate() === now.getDate()) {
      return format(messageDate, 'HH:mm', { locale });
    }

    // Если сообщение вчера
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (diffInSeconds < 172800 && messageDate.getDate() === yesterday.getDate()) {
      return `${t('history.yesterday')} ${format(messageDate, 'HH:mm', { locale })}`;
    }

    // Иначе показываем дату и время
    return format(messageDate, 'dd.MM.yyyy HH:mm', { locale });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

export const isFirstInGroup = (
  index: number,
  messages: Array<{ position: 'left' | 'right'; date: Date }>
): boolean => {
  if (index === 0) return true;

  const currentMessage = messages[index];
  const previousMessage = messages[index - 1];

  return (
    previousMessage.position !== currentMessage.position ||
    new Date(currentMessage.date).getTime() - new Date(previousMessage.date).getTime() > 300000 // 5 минут
  );
};
