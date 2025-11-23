import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  volume: number;
  language: string;
}

const initialState: SettingsState = {
  volume: 70,
  language: 'ru',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setVolume, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
