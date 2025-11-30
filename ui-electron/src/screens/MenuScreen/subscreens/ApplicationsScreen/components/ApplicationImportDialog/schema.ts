import { TFunction } from 'i18next';
import { z } from 'zod';

import { APP_KEY_MAX_LENGTH, APP_KEY_REGEX } from '../../constants';

export const importApplicationSchema = (t: TFunction) =>
  z.object({
    key: z
      .string()
      .trim()
      .min(1, t('applications.validation.keyRequired'))
      .max(APP_KEY_MAX_LENGTH, t('applications.validation.keyLength', { max: APP_KEY_MAX_LENGTH }))
      .regex(APP_KEY_REGEX, t('applications.validation.keyFormat')),
  });
