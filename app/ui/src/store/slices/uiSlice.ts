import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type MainScreen = 'main' | 'chat' | 'menu';
export type SubScreen = 'settings' | 'history' | 'about' | 'logs' | 'apiKeys' | null;

interface UIState {
  currentScreen: MainScreen;
  subScreen: SubScreen; // Вложенный экран внутри меню
  isTransitioning: boolean;
  navigationHistory: MainScreen[]; // История для кнопки "назад"
}

const initialState: UIState = {
  currentScreen: 'main',
  subScreen: null,
  isTransitioning: false,
  navigationHistory: ['main'],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setScreen: (state, action: PayloadAction<MainScreen>) => {
      if (!state.isTransitioning) {
        state.isTransitioning = true;
        state.navigationHistory.push(state.currentScreen);
        state.currentScreen = action.payload;
        state.subScreen = null; // Сбрасываем вложенный экран при переходе на основной
      }
    },
    setTransitioning: (state, action: PayloadAction<boolean>) => {
      state.isTransitioning = action.payload;
    },
    goToMain: (state) => {
      if (!state.isTransitioning) {
        state.isTransitioning = true;
        state.navigationHistory.push(state.currentScreen);
        state.currentScreen = 'main';
        state.subScreen = null;
      }
    },
    // Круговая навигация к экрану слева: main -> chat -> menu -> main (свайп вправо)
    navigateNext: (state) => {
      if (state.isTransitioning || state.subScreen !== null) return; // Не навигаем, если внутри вложенного экрана

      state.isTransitioning = true;
      state.navigationHistory.push(state.currentScreen);

      if (state.currentScreen === 'main') {
        state.currentScreen = 'chat'; // Свайп вправо с main -> показываем chat (слева)
      } else if (state.currentScreen === 'chat') {
        state.currentScreen = 'menu'; // Свайп вправо с chat -> показываем menu (справа от chat = слева в круге)
      } else if (state.currentScreen === 'menu') {
        state.currentScreen = 'main'; // Свайп вправо с menu -> показываем main (центр)
      }
    },
    // Круговая навигация к экрану справа: main -> menu -> chat -> main (свайп влево)
    navigatePrev: (state) => {
      if (state.isTransitioning || state.subScreen !== null) return; // Не навигаем, если внутри вложенного экрана

      state.isTransitioning = true;
      state.navigationHistory.push(state.currentScreen);

      if (state.currentScreen === 'main') {
        state.currentScreen = 'menu'; // Свайп влево с main -> показываем menu (справа)
      } else if (state.currentScreen === 'chat') {
        state.currentScreen = 'main'; // Свайп влево с chat -> показываем main (центр)
      } else if (state.currentScreen === 'menu') {
        state.currentScreen = 'chat'; // Свайп влево с menu -> показываем chat (слева от menu = справа в круге)
      }
    },
    // Открыть вложенный экран в меню
    openSubScreen: (state, action: PayloadAction<SubScreen>) => {
      if (state.currentScreen === 'menu' && !state.isTransitioning) {
        state.subScreen = action.payload;
      }
    },
    // Вернуться из вложенного экрана в меню
    closeSubScreen: (state) => {
      if (state.subScreen !== null) {
        state.subScreen = null;
      }
    },
    // Вернуться на предыдущий экран (кнопка "назад")
    goBack: (state) => {
      if (state.subScreen !== null) {
        // Если находимся во вложенном экране, возвращаемся в меню
        state.subScreen = null;
      } else if (state.navigationHistory.length > 1) {
        // Возвращаемся на предыдущий основной экран
        state.isTransitioning = true;
        state.navigationHistory.pop(); // Удаляем текущий экран
        state.currentScreen = state.navigationHistory[state.navigationHistory.length - 1];
      }
    },
  },
});

export const {
  setScreen,
  setTransitioning,
  goToMain,
  navigateNext,
  navigatePrev,
  openSubScreen,
  closeSubScreen,
  goBack,
} = uiSlice.actions;
export default uiSlice.reducer;
