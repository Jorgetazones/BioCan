import { Box, MenuItem, TextField } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategory, setSearchText } from '../../store/filterSlice';

const categories = ['', 'frutas', 'verduras', 'otros'];

const ProductFilter: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Box display='flex' gap={2} padding={2}>
      <TextField
        label='Buscar producto'
        onChange={(e) => dispatch(setSearchText(e.target.value))}
        fullWidth
      />
      <TextField
        select
        label='Categoría'
        onChange={(e) => dispatch(setCategory(e.target.value))}
        fullWidth
        defaultValue=''
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat || 'Todas'}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default ProductFilter;
