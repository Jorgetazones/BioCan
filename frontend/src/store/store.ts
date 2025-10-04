import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice';
import filtersReducer from './filterSlice';
import productsReducer from './productsSlice';
import quantityReducer from './quantitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    quantities: quantityReducer,
    filters: filtersReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
