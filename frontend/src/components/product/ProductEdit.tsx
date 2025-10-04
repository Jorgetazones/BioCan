import { Box, Container, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../helper/commonHelper';
import { MainButton } from '../buttons/MainButtons';

export interface Product {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  unidad_medida: string;
  categoria: string;
  estado: string;
  ubicacion?: string;
  usuario_id?: number;
  [key: string]: unknown;
}

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    unidad_medida: '',
    categoria: '',
    estado: '',
  });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await fetchData({ url: `/products/${id}`, method: 'GET' });
        if (!res.ok) {
          throw new Error(`Error ${res.status}: Producto no encontrado`);
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Error cargando producto:', err);
        alert('No se pudo cargar el producto. Verifica tus permisos o el ID.');
      }
    };

    if (id) loadProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProduct = {
      ...product,
      precio: parseFloat(product.precio.toString()),
      stock: parseFloat(product.stock.toString()),
    };

    try {
      const res = await fetchData({
        url: `/products/${id}`,
        method: 'PUT',
        body: updatedProduct,
      });

      if (res.ok) {
        alert('Producto actualizado correctamente');
        navigate('/private');
      } else {
        const err = await res.json();
        alert('Error: ' + (err.message || res.statusText));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth='sm' sx={{ mt: 4 }}>
      <Typography variant='h5' mb={2}>
        Editar producto
      </Typography>

      <Box
        component='form'
        onSubmit={handleSubmit}
        display='flex'
        flexDirection='column'
        gap={2}
      >
        <TextField
          label='Nombre'
          name='nombre'
          value={product.nombre}
          onChange={handleChange}
          required
        />
        <TextField
          label='Descripción'
          name='descripcion'
          value={product.descripcion}
          onChange={handleChange}
          required
        />
        <TextField
          label='Precio (€)'
          name='precio'
          type='number'
          value={product.precio}
          onChange={handleChange}
          required
        />
        <TextField
          label='Unidad de medida'
          name='unidad_medida'
          value={product.unidad_medida}
          onChange={handleChange}
          required
        />
        <TextField
          label='Stock'
          name='stock'
          type='number'
          value={product.stock}
          onChange={handleChange}
          required
        />
        <TextField
          label='Categoría'
          name='categoria'
          value={product.categoria}
          onChange={handleChange}
          required
        />

        <TextField
          label='Estado'
          name='estado'
          value={product.estado}
          onChange={handleChange}
          required
        />

        <MainButton type='submit' variant='contained' color='primary'>
          Guardar cambios
        </MainButton>
      </Box>
    </Container>
  );
};

export default ProductEdit;
