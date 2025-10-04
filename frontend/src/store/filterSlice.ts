import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  searchText: string;
  category: string;
}

const initialState: FiltersState = {
  searchText: '',
  category: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    clearFilters(state) {
      state.searchText = '';
      state.category = '';
    },
  },
});

export const { setSearchText, setCategory, clearFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
