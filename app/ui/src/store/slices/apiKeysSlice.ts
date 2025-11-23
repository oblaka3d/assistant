import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface APIKey {
  provider: string;
  key: string;
  name?: string;
  description?: string;
}

interface APIKeysState {
  keys: Record<string, APIKey>;
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
    setAPIKey: (state, action: PayloadAction<APIKey>) => {
      const { provider, ...rest } = action.payload;
      state.keys[provider] = {
        provider,
        ...rest,
      };
      state.error = null;
    },
    removeAPIKey: (state, action: PayloadAction<string>) => {
      delete state.keys[action.payload];
      state.error = null;
    },
    setAPIKeys: (state, action: PayloadAction<Record<string, APIKey>>) => {
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
  },
});

export const { setAPIKey, removeAPIKey, setAPIKeys, setLoading, setError, clearError } =
  apiKeysSlice.actions;

export default apiKeysSlice.reducer;
