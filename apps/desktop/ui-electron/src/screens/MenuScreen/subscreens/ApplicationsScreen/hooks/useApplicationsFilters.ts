import { useMemo, useState } from 'react';

import { ApplicationStatus, ApplicationSummary } from '../../../../../utils/api';

type UseApplicationsFiltersParams = {
  catalogApps: ApplicationSummary[];
  installedApps: ApplicationSummary[];
  translate: (key: string, options?: Record<string, unknown>) => string;
};

export const useApplicationsFilters = ({
  catalogApps,
  installedApps,
  translate,
}: UseApplicationsFiltersParams) => {
  const [searchStore, setSearchStore] = useState('');
  const [searchInstalled, setSearchInstalled] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ApplicationStatus>('all');

  const filteredCatalog = useMemo(() => {
    const query = searchStore.trim().toLowerCase();
    if (!query) {
      return catalogApps;
    }
    return catalogApps.filter(
      (app) =>
        app.name.toLowerCase().includes(query) ||
        (app.description ?? '').toLowerCase().includes(query)
    );
  }, [catalogApps, searchStore]);

  const filteredInstalled = useMemo(() => {
    const query = searchInstalled.trim().toLowerCase();
    return installedApps.filter((app) => {
      const matchesQuery =
        !query ||
        app.name.toLowerCase().includes(query) ||
        (app.description ?? '').toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [installedApps, searchInstalled, statusFilter]);

  const statusFilterOptions = useMemo(
    () => [
      { value: 'all', label: translate('applications.filters.all') },
      { value: 'draft', label: translate('applications.status.draft') },
      { value: 'pending', label: translate('applications.status.pending') },
      { value: 'published', label: translate('applications.status.published') },
      { value: 'rejected', label: translate('applications.status.rejected') },
    ],
    [translate]
  );

  return {
    searchStore,
    setSearchStore,
    searchInstalled,
    setSearchInstalled,
    statusFilter,
    setStatusFilter,
    filteredCatalog,
    filteredInstalled,
    statusFilterOptions,
  };
};
