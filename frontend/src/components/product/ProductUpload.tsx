import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Button,
  Container,
  MenuItem,
  styled,
  TextField,
  Typography,
} from '@mui/material';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createProductWithMedia } from '../../services/products/productServices';
import { RootState } from '../../store/store';
import { IProduct } from '../../types/IProducts';

const categories = ['Frutas', 'Verduras', 'Granos', 'Otros'];
const units = ['Kg', 'Unidad'];
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 1,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ProductUpload() {
  const { user } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    unidad_medida: 'Kg',
    categoria: 'Frutas',
    imagen: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const regexPrecio = /^\d*([.,]\d{0,2})?$/;
    const regexStock = /^\d*$/;

    if (name === 'precio') {
      if (value === '' || regexPrecio.test(value)) {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === 'stock') {
      if (value === '' || regexStock.test(value)) {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setForm((prev) => ({ ...prev, imagen: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, imagen: null }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Debes iniciar sesión para subir un producto.');
      return;
    }

    if (!form.imagen) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    const cantidad = parseInt(form.stock);
    const unidad = form.unidad_medida.toLowerCase(); // convierte a 'kg' o 'unidad'
    let estado: IProduct['estado'] = 'disponible';

    if (cantidad === 0) {
      estado = 'agotado';
    } else if (
      (unidad === 'kg' && cantidad < 5) ||
      (unidad === 'unidad' && cantidad < 20)
    ) {
      estado = 'poco stock';
    }

    try {
      await createProductWithMedia(
        {
          nombre: form.nombre,
          descripcion: form.descripcion,
          precio: parseFloat(form.precio),
          stock: cantidad,
          unidad_medida: unidad as IProduct['unidad_medida'],
          categoria: form.categoria.toLowerCase() as IProduct['categoria'],
          estado,
          usuario_id: user.id,
        },
        form.imagen
      );

      alert('Producto enviado correctamente');
      setForm({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        unidad_medida: 'Kg',
        categoria: 'Frutas',
        imagen: null,
      });
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <Container maxWidth='sm' sx={{ mt: 8, mb: 8 }}>
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          mx: 'auto',
          p: 3,
          backgroundColor: '#fafafa',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant='h5' gutterBottom>
          Subir Producto
        </Typography>

        <TextField
          fullWidth
          label='Nombre'
          name='nombre'
          value={form.nombre}
          onChange={handleChange}
          margin='normal'
          required
        />

        <TextField
          fullWidth
          label='Descripción'
          name='descripcion'
          value={form.descripcion}
          onChange={handleChange}
          margin='normal'
          multiline
          required
        />

        <TextField
          fullWidth
          label='Precio'
          name='precio'
          type='text'
          value={form.precio}
          onChange={handleChange}
          margin='normal'
          required
        />

        <TextField
          fullWidth
          label='Cantidad'
          name='stock'
          type='text'
          value={form.stock}
          onChange={handleChange}
          margin='normal'
          required
        />

        <TextField
          select
          fullWidth
          label='Unidad de medida'
          name='unidad_medida'
          value={form.unidad_medida}
          onChange={handleChange}
          margin='normal'
        >
          {units.map((u) => (
            <MenuItem key={u} value={u}>
              {u}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          fullWidth
          label='Categoría'
          name='categoria'
          value={form.categoria}
          onChange={handleChange}
          margin='normal'
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        <Button
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 3,
            backgroundColor: '#215431',
          }}
          component='label'
          role={undefined}
          variant='contained'
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Subir archivo
          <VisuallyHiddenInput
            type='file'
            id='file'
            name='file'
            accept='image/*'
            onChange={handleFileChange}
          />
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant='contained'
            type='submit'
            size='large'
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              backgroundColor: '#215431',
              '&:hover': {
                backgroundColor: '#174022',
              },
            }}
          >
            Subir
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
