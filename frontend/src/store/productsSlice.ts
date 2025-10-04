import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../types/IProducts';

type ProductsState = {
  products: IProduct[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchProductQuantities = createAsyncThunk(
  'products/fetchProductQuantities',
  async () => {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Error al cargar productos');
    }
    const data = await response.json();
    return data as IProduct[];
  }
);

export const updateProductQuantity = createAsyncThunk<
  IProduct,
  { id: number; quantity: number }
>('products/updateProductQuantity', async ({ id, quantity }) => {
  const response = await fetch(`/api/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Error al actualizar la cantidad');
  }
  const updatedProduct = await response.json();
  return updatedProduct as IProduct;
});

// Slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductQuantities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductQuantities.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProductQuantities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error desconocido';
      })
      .addCase(
        updateProductQuantity.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          const updatedProduct = action.payload;
          const index = state.products.findIndex(
            (product) => product.id === updatedProduct.id
          );
          if (index !== -1) {
            state.products[index] = updatedProduct;
          }
        }
      );
  },
});

export default productsSlice.reducer;
