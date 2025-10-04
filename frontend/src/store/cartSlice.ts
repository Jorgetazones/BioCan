import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../types/IProducts';

interface CartState {
  cart: IProduct[];
}

const initialState: CartState = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity! += product.quantity!;
      } else {
        state.cart.push({ ...product });
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find((item) => item.id === id);

      if (product) {
        product.quantity = quantity;
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    finalizeOrder: (state) => {
      // Limpiar el carrito después de finalizar el pedido
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  finalizeOrder,
} = cartSlice.actions;

export default cartSlice.reducer;
