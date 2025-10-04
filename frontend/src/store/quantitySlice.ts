import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type QuantityState = {
  [id: number]: number;
};

const initialState: QuantityState = JSON.parse(
  localStorage.getItem('quantities') || '{}'
);

const saveToLocalStorage = (state: QuantityState) => {
  localStorage.setItem('quantities', JSON.stringify(state));
};

const quantitySlice = createSlice({
  name: 'quantities',
  initialState,
  reducers: {
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state[id] = (state[id] || 0) + 1;
      saveToLocalStorage(state);
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state[id]) {
        state[id] = Math.max(state[id] - 1, 0);
        if (state[id] === 0) {
          delete state[id];
        }
        saveToLocalStorage(state);
      }
    },
    clearQuantities: (state) => {
      for (const key in state) {
        delete state[key];
      }
      localStorage.removeItem('quantities');
    },
  },
});

export const { incrementQuantity, decrementQuantity, clearQuantities } =
  quantitySlice.actions;

export default quantitySlice.reducer;
