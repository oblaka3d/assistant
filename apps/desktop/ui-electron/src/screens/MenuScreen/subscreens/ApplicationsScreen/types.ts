import { ApplicationType, ReleaseType } from '../../../../utils/api';

export type KeyAvailabilityStatus = 'idle' | 'checking' | 'available' | 'taken' | 'error';

export type ApplicationTypeOption = {
  value: ApplicationType;
  label: string;
};

export type CreateApplicationFormValues = {
  key: string;
  name: string;
  version: string;
  type: ApplicationType;
  description: string;
};

export type ImportApplicationFormValues = {
  key: string;
};

export type EditApplicationFormValues = {
  name: string;
  description: string;
  type: ApplicationType;
  releaseType: ReleaseType;
  releaseNotes: string;
};
