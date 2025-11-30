import { useEffect } from 'react';

import { checkApplicationKeyAvailability } from '../../../../../utils/api';
import { APP_KEY_MAX_LENGTH, APP_KEY_REGEX } from '../constants';
import { KeyAvailabilityStatus } from '../types';

type UseApplicationKeyAvailabilityParams = {
  enabled: boolean;
  value: string;
  onStatusChange: (status: KeyAvailabilityStatus) => void;
  debounceMs?: number;
};

export const useApplicationKeyAvailability = ({
  enabled,
  value,
  onStatusChange,
  debounceMs = 300,
}: UseApplicationKeyAvailabilityParams) => {
  useEffect(() => {
    if (!enabled) {
      onStatusChange('idle');
      return;
    }
    const trimmed = value.trim();
    if (!trimmed || trimmed.length > APP_KEY_MAX_LENGTH || !APP_KEY_REGEX.test(trimmed)) {
      onStatusChange('idle');
      return;
    }
    let cancelled = false;
    onStatusChange('checking');
    const handler = setTimeout(() => {
      void checkApplicationKeyAvailability(trimmed.toLowerCase())
        .then((available) => {
          if (!cancelled) {
            onStatusChange(available ? 'available' : 'taken');
          }
        })
        .catch(() => {
          if (!cancelled) {
            onStatusChange('error');
          }
        });
    }, debounceMs);

    return () => {
      cancelled = true;
      clearTimeout(handler);
    };
  }, [enabled, value, debounceMs, onStatusChange]);
};
