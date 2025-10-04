import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  checkAuth,
  logout as logoutService,
} from '../services/auth/authServices';

interface User {
  id: number;
  nombre: string;
  tipo: string;
  telefono: string;
  direccion: string;
  web: string;
  ubicacion: string;
}

interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
  isAuthenticated: boolean;
}

// Acción asíncrona para verificar la autenticación
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      const user = await checkAuth();
      return user;
    } catch (error) {
      return rejectWithValue('No autenticado');
    }
  }
);

export const logoutUser = () => async (dispatch: any) => {
  try {
    await logoutService();
    dispatch(logout());
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'), // Restaura el usuario desde localStorage
  error: null,
  loading: false,
  isAuthenticated: !!localStorage.getItem('user'), // Verifica si hay un usuario en localStorage
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('user');
    },
    setUserLoading: (state) => {
      state.loading = true;
    },
    setUserError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUserData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Actualiza el usuario en localStorage
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logout,
  setUserData,
  setUserLoading,
  setUserError,
} = authSlice.actions;

export default authSlice.reducer;
