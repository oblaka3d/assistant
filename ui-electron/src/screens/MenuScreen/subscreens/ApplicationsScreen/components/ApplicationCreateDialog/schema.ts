import { TFunction } from 'i18next';
import { z } from 'zod';

import {
  APP_DESCRIPTION_MAX_LENGTH,
  APP_KEY_MAX_LENGTH,
  APP_KEY_REGEX,
  APP_NAME_MAX_LENGTH,
  APP_VERSION_MAX_LENGTH,
  VERSION_REGEX,
} from '../../constants';

export const createApplicationSchema = (t: TFunction) =>
  z.object({
    key: z
      .string()
      .trim()
      .min(1, t('applications.validation.keyRequired'))
      .max(APP_KEY_MAX_LENGTH, t('applications.validation.keyLength', { max: APP_KEY_MAX_LENGTH }))
      .regex(APP_KEY_REGEX, t('applications.validation.keyFormat')),
    name: z
      .string()
      .trim()
      .min(1, t('applications.validation.nameRequired'))
      .max(
        APP_NAME_MAX_LENGTH,
        t('applications.validation.nameLength', { max: APP_NAME_MAX_LENGTH })
      ),
    version: z
      .string()
      .trim()
      .min(1, t('applications.validation.versionRequired'))
      .max(
        APP_VERSION_MAX_LENGTH,
        t('applications.validation.versionLength', { max: APP_VERSION_MAX_LENGTH })
      )
      .regex(VERSION_REGEX, t('applications.validation.versionFormat')),
    type: z.enum(['widget', 'screen', 'service']),
    description: z
      .string()
      .max(
        APP_DESCRIPTION_MAX_LENGTH,
        t('applications.validation.descriptionLength', { max: APP_DESCRIPTION_MAX_LENGTH })
      ),
  });
