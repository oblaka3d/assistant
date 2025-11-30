import { useCallback, useMemo } from 'react';

import { ApplicationStatus, ApplicationType, ReleaseType } from '../../../../../utils/api';

type UseApplicationListMetaParams = {
  translate: (key: string, options?: Record<string, unknown>) => string;
  currentUserId?: string | null;
};

export const useApplicationListMeta = ({
  translate,
  currentUserId,
}: UseApplicationListMetaParams) => {
  const applicationTypeOptions = useMemo(
    () => [
      { value: 'widget' as ApplicationType, label: translate('applications.types.widget') },
      { value: 'screen' as ApplicationType, label: translate('applications.types.screen') },
      { value: 'service' as ApplicationType, label: translate('applications.types.service') },
    ],
    [translate]
  );

  const typeLabelMap = useMemo(
    () =>
      applicationTypeOptions.reduce(
        (acc, option) => ({ ...acc, [option.value]: option.label }),
        {} as Record<ApplicationType, string>
      ),
    [applicationTypeOptions]
  );

  const releaseTypeOptions = useMemo(
    () => [
      { value: 'patch' as ReleaseType, label: translate('applications.releaseTypes.patch') },
      { value: 'minor' as ReleaseType, label: translate('applications.releaseTypes.minor') },
      { value: 'major' as ReleaseType, label: translate('applications.releaseTypes.major') },
    ],
    [translate]
  );

  const listActionLabels = useMemo(
    () => ({
      install: translate('applications.actions.install'),
      installing: translate('applications.actions.installing'),
      installed: translate('applications.actions.installed'),
      remove: translate('applications.actions.remove'),
      submitReview: translate('applications.actions.submitReview'),
      resubmitReview: translate('applications.actions.resubmitReview'),
      edit: translate('applications.actions.edit'),
    }),
    [translate]
  );

  const typeColorMap: Record<ApplicationType, string> = {
    widget: '#8e24aa',
    screen: '#1e88e5',
    service: '#00897b',
  };

  const shortenOwnerId = useCallback((ownerId: string): string => {
    if (ownerId.length <= 8) {
      return ownerId;
    }
    return `${ownerId.slice(0, 4)}…${ownerId.slice(-3)}`;
  }, []);

  const formatOwnerLabel = useCallback(
    (ownerId?: string): string | null => {
      if (!ownerId) {
        return translate('applications.list.owner.unknown');
      }
      if (currentUserId && ownerId === currentUserId) {
        return translate('applications.list.owner.you');
      }
      return translate('applications.list.owner.other', { owner: shortenOwnerId(ownerId) });
    },
    [currentUserId, shortenOwnerId, translate]
  );

  const statusChipConfig: Record<
    ApplicationStatus,
    {
      color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
      variant?: 'outlined' | 'filled';
    }
  > = {
    draft: { color: 'default', variant: 'outlined' },
    pending: { color: 'warning', variant: 'filled' },
    published: { color: 'success', variant: 'filled' },
    rejected: { color: 'error', variant: 'filled' },
  };

  return {
    applicationTypeOptions,
    typeLabelMap,
    releaseTypeOptions,
    listActionLabels,
    typeColorMap,
    formatOwnerLabel,
    statusChipConfig,
  };
};
