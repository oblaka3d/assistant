import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DEFAULT_VERSION } from '../../screens/MenuScreen/subscreens/ApplicationsScreen/constants';
import {
  CreateApplicationFormValues,
  EditApplicationFormValues,
  ImportApplicationFormValues,
} from '../../screens/MenuScreen/subscreens/ApplicationsScreen/types';

type FormState<T> = {
  values: T;
  serverError: string | null;
};

export type ApplicationsFormsState = {
  create: FormState<CreateApplicationFormValues>;
  import: FormState<ImportApplicationFormValues>;
  edit: FormState<EditApplicationFormValues>;
};

const createDefaultCreateValues = (): CreateApplicationFormValues => ({
  key: '',
  name: '',
  version: DEFAULT_VERSION,
  type: 'widget',
  description: '',
});

const createDefaultImportValues = (): ImportApplicationFormValues => ({
  key: '',
});

const createDefaultEditValues = (): EditApplicationFormValues => ({
  name: '',
  description: '',
  type: 'widget',
  releaseType: 'patch',
  releaseNotes: '',
});

const initialState: ApplicationsFormsState = {
  create: {
    values: createDefaultCreateValues(),
    serverError: null,
  },
  import: {
    values: createDefaultImportValues(),
    serverError: null,
  },
  edit: {
    values: createDefaultEditValues(),
    serverError: null,
  },
};

const applicationsFormsSlice = createSlice({
  name: 'applicationsForms',
  initialState,
  reducers: {
    setCreateFormValues: (state, action: PayloadAction<CreateApplicationFormValues>) => {
      state.create.values = action.payload;
    },
    setCreateFormError: (state, action: PayloadAction<string | null>) => {
      state.create.serverError = action.payload;
    },
    resetCreateForm: (state) => {
      state.create.values = createDefaultCreateValues();
      state.create.serverError = null;
    },
    setImportFormValues: (state, action: PayloadAction<ImportApplicationFormValues>) => {
      state.import.values = action.payload;
    },
    setImportFormError: (state, action: PayloadAction<string | null>) => {
      state.import.serverError = action.payload;
    },
    resetImportForm: (state) => {
      state.import.values = createDefaultImportValues();
      state.import.serverError = null;
    },
    setEditFormValues: (state, action: PayloadAction<EditApplicationFormValues>) => {
      state.edit.values = action.payload;
    },
    setEditFormError: (state, action: PayloadAction<string | null>) => {
      state.edit.serverError = action.payload;
    },
    resetEditForm: (state) => {
      state.edit.values = createDefaultEditValues();
      state.edit.serverError = null;
    },
  },
});

export const {
  resetCreateForm,
  resetEditForm,
  resetImportForm,
  setCreateFormError,
  setCreateFormValues,
  setEditFormError,
  setEditFormValues,
  setImportFormError,
  setImportFormValues,
} = applicationsFormsSlice.actions;

export default applicationsFormsSlice.reducer;
