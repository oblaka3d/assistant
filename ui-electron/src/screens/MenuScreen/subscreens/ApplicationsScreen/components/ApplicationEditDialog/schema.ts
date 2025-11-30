import { TFunction } from 'i18next';
import { z } from 'zod';

import { APP_DESCRIPTION_MAX_LENGTH, APP_NAME_MAX_LENGTH } from '../../constants';

export const editApplicationSchema = (t: TFunction) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, t('applications.validation.nameRequired'))
      .max(
        APP_NAME_MAX_LENGTH,
        t('applications.validation.nameLength', { max: APP_NAME_MAX_LENGTH })
      ),
    description: z
      .string()
      .max(
        APP_DESCRIPTION_MAX_LENGTH,
        t('applications.validation.descriptionLength', { max: APP_DESCRIPTION_MAX_LENGTH })
      ),
    type: z.enum(['widget', 'screen', 'service']),
    releaseType: z.enum(['patch', 'minor', 'major']),
    releaseNotes: z.string(),
  });
