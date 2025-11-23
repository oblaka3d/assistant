import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  position: 'left' | 'right';
  type: 'text';
  text: string;
  date: Date;
}

interface ChatState {
  messages: Message[];
  inputValue: string;
}

const initialState: ChatState = {
  messages: [
    {
      id: '1',
      position: 'left',
      type: 'text',
      text: 'Привет! Я ваш голосовой ассистент. Чем могу помочь?',
      date: new Date(),
    },
  ],
  inputValue: '',
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    clearInput: (state) => {
      state.inputValue = '';
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, setMessages, setInputValue, clearInput, clearMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
