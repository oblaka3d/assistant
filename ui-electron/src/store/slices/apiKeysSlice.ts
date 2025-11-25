import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { logout } from './userSlice';

interface APIKeysState {
  keys: Record<string, string>;
  isLoading: boolean;
  error: string | null;
}

const initialState: APIKeysState = {
  keys: {},
  isLoading: false,
  error: null,
};

const apiKeysSlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    setAPIKey: (state, action: PayloadAction<{ name: string; value: string }>) => {
      state.keys[action.payload.name] = action.payload.value;
      state.error = null;
    },
    removeAPIKey: (state, action: PayloadAction<string>) => {
      delete state.keys[action.payload];
      state.error = null;
    },
    setAPIKeys: (state, action: PayloadAction<Record<string, string>>) => {
      state.keys = action.payload;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAPIKeys: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const {
  setAPIKey,
  removeAPIKey,
  setAPIKeys,
  setLoading,
  setError,
  clearError,
  resetAPIKeys,
} = apiKeysSlice.actions;

export default apiKeysSlice.reducer;
