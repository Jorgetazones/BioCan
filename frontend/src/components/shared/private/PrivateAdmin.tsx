import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../../helper/commonHelper';
import { RootState } from '../../../store/store';
import { DeleteButton } from '../../buttons/DeleteButton';
import { PrimaryButton } from '../../buttons/GeneralButton';
import { OutlinedButton } from '../../buttons/OutlinedButton';
import { Product } from '../../product/ProductEdit';

const PrivateAdmin = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!user) return;

    if (user.tipo !== 'admin') {
      navigate('/private');
      return;
    }

    fetchData({ url: '/products', method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch(() => alert('Error al cargar productos'));
  }, [user]);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Eliminar producto?')) {
      fetchData({ url: `/products/${id}`, method: 'DELETE' })
        .then((res) => {
          if (res.ok) {
            setProducts(products.filter((product) => product.id !== id));
            alert('Producto eliminado');
          } else {
            alert('Error al eliminar');
          }
        })
        .catch(() => alert('Error'));
    }
  };

  if (!user) return null;

  return (
    <Box sx={{ paddingBottom: '120px', minHeight: '100vh' }}>
      <Container sx={{ mt: 4 }}>
        <Card variant='outlined' sx={{ mb: 4, p: 2 }}>
          <Typography variant='h6'>Panel administrador</Typography>
          <Typography>Usuario: {user.nombre}</Typography>
        </Card>

        <Typography variant='h5' mb={2}>
          Gestión de todos los productos
        </Typography>

        <PrimaryButton
          onClick={() => navigate('/private/productUploads')}
          sx={{ mb: 3 }}
        >
          Subir nuevo producto
        </PrimaryButton>

        {products.length ? (
          products.map((product) => (
            <Card key={product.id} variant='outlined' sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant='h6'>{product.nombre}</Typography>
                <Typography>Descripción: {product.descripcion}</Typography>
                <Typography>Precio: {product.precio} €</Typography>
                <Typography>Stock: {product.stock}</Typography>
                <Typography>Unidad: {product.unidad_medida}</Typography>
                <Typography>Categoría: {product.categoria}</Typography>
                <Typography>Estado: {product.estado}</Typography>

                <Box mt={2} display='flex' gap={2}>
                  <OutlinedButton
                    onClick={() =>
                      navigate(`/private/productEdit/${product.id}`)
                    }
                  >
                    Editar
                  </OutlinedButton>
                  <DeleteButton
                    onClick={() => {
                      if (product.id !== undefined) {
                        handleDelete(product.id);
                      } else {
                        alert('ID del producto no válido');
                      }
                    }}
                  >
                    Eliminar
                  </DeleteButton>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>Aún no hay productos subidos.</Typography>
        )}
      </Container>
    </Box>
  );
};

export default PrivateAdmin;
