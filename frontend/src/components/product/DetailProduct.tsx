import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../helper/commonHelper';
import { imageUrl } from '../../helper/varsHelper';
import { addToCart } from '../../store/cartSlice';
import { RootState } from '../../store/store';
import { IProduct } from '../../types/IProducts';
import { MainButton } from '../buttons/MainButtons';

type Props = {
  id: number;
};

const ProductDetail = ({ id }: Props) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('El ID del producto no está disponible');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const response = await fetchData({
          url: `/products/${id}`,
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del producto');
        }

        const data: IProduct = await response.json();
        setProduct(data);
      } catch (err) {
        setError((err as Error).message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleIncrement = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addToCart({
          ...product,
          quantity,
        })
      );
      alert('Producto añadido al carrito');
    }
  };

  const getImageUrl = (): string => {
    return imageUrl(product?.multimedia?.[0]?.url) ?? '/img/BioCan_Logo.png';
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant='h6'>Cargando...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant='h6' color='error'>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f9f9f9',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
      }}
    >
      <Box
        component='img'
        src={getImageUrl()}
        crossOrigin='anonymous'
        alt={`Imagen del producto ${product?.nombre}`}
        sx={{
          width: '100%',
          height: '300px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '16px',
        }}
      />

      <Typography variant='h5' fontWeight='bold' gutterBottom>
        {product?.nombre}
      </Typography>
      <Divider sx={{ width: '100%', mb: 2 }} />
      <Typography variant='body1' gutterBottom>
        <strong>Tipo de producto:</strong> {product?.categoria || 'Otro'}
      </Typography>
      <Typography variant='body1' gutterBottom>
        <strong>Cantidad disponible:</strong> {product?.stock ?? 'Agotado'}
      </Typography>
      <Typography variant='body1' gutterBottom>
        <strong>Descripción:</strong> {product?.descripcion || 'No disponible'}
      </Typography>
      <Typography variant='body1' gutterBottom>
        <strong>Precio:</strong>{' '}
        {product?.precio ? `${product.precio} €` : 'No disponible'}
      </Typography>

      {/* Controles para seleccionar la cantidad */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 2,
          gap: 2,
        }}
      >
        <IconButton
          color='primary'
          onClick={handleDecrement}
          sx={{ border: '1px solid #ccc' }}
        >
          <RemoveIcon />
        </IconButton>
        <Typography variant='body1' fontWeight='bold'>
          {quantity}
        </Typography>
        <IconButton
          color='primary'
          onClick={handleIncrement}
          sx={{ border: '1px solid #ccc' }}
          disabled={!!product && quantity === (product?.stock ?? 0)}
        >
          <AddIcon />
        </IconButton>
      </Box>
      <Box>
        <MainButton onClick={handleAddToCart} disabled={product?.stock === 0}>
          Añadir al carrito
        </MainButton>
      </Box>
    </Box>
  );
};

export default ProductDetail;
