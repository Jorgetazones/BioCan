import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../helper/commonHelper';
import { imageUrl } from '../../helper/varsHelper';
import { useAppSelector } from '../../hook/useAppDispatch';
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from '../../store/cartSlice';
import { RootState } from '../../store/store';

const ShoppingCart: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0);
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.precio * (item.quantity ?? 1), 0)
      .toFixed(2);
  };

  const getImageUrl = (item: any): string => {
    return imageUrl(item.multimedia?.[0]?.url) ?? '/img/BioCan_Logo.png';
  };

  // Función para finalizar el pedido
  const handleFinalizeOrder = async () => {
    const orderData = {
      userId: user?.id,
      items: cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.precio,
      })),
      total: cartItems.reduce(
        (sum, item) => sum + item.precio * (item.quantity ?? 1),
        0
      ),
    };

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const response = await fetchData({
        url: '/orders',
        method: 'POST',
        body: orderData,
      });

      if (!response.ok) {
        throw new Error('Hubo un error al procesar tu pedido');
      }

      const data = await response.json();
      setSuccessMessage(data.message || '¡Pedido completado con éxito!');
      dispatch(clearCart());
    } catch (err) {
      if (!user) {
        setError('Debes iniciar sesión para finalizar el pedido');
      }
      console.error(err);
      setError('Hubo un error al procesar tu pedido. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant='h4' gutterBottom align='center' color='primary'>
        Carrito de Compras
      </Typography>

      {successMessage && (
        <Alert severity='success' sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity='error' sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {cartItems.length === 0 ? (
        <Typography variant='h6' align='center'>
          No hay productos en el carrito
        </Typography>
      ) : (
        <div>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ marginBottom: 2, borderRadius: 2 }}>
              <Box display='flex' alignItems='center'>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display='flex' alignItems='center' gap={2}>
                    <Box
                      component='img'
                      src={getImageUrl(item)}
                      crossOrigin='anonymous'
                      alt={item.nombre}
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                    <Box>
                      <Typography variant='h6' gutterBottom>
                        {item.nombre}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        Precio: {item.precio}€ | Cantidad: {item.quantity}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        Subtotal:{' '}
                        {(item.precio * (item.quantity ?? 1)).toFixed(2)} €
                      </Typography>
                    </Box>
                  </Box>

                  <Box display='flex' alignItems='center' gap={1} mt={2}>
                    <IconButton
                      color='primary'
                      onClick={() =>
                        item.quantity! > 1 &&
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity! - 1,
                          })
                        )
                      }
                      sx={{ backgroundColor: '#f5f5f5' }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant='body1'>{item.quantity}</Typography>
                    <IconButton
                      color='primary'
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity! + 1,
                          })
                        )
                      }
                      sx={{ backgroundColor: '#f5f5f5' }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>

                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => handleRemove(item.id)}
                    sx={{
                      mt: 2,
                      width: '100%',
                      backgroundColor: '#f44336',
                      '&:hover': {
                        backgroundColor: '#d32f2f',
                      },
                    }}
                  >
                    Eliminar
                  </Button>
                </CardContent>
              </Box>
            </Card>
          ))}

          <Box mt={3} sx={{ textAlign: 'center' }}>
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant='h6'>
              Total a pagar: {getTotalPrice()} €
            </Typography>
            <Typography variant='h6' color='textSecondary'>
              Total: {getTotalItems()} productos
            </Typography>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleClearCart}
              sx={{
                mt: 3,
                padding: '10px 20px',
                backgroundColor: '#3f51b5',
                '&:hover': {
                  backgroundColor: '#303f9f',
                },
              }}
            >
              Limpiar Carrito
            </Button>

            <Box mt={2}>
              <Button
                variant='contained'
                color='primary'
                onClick={handleFinalizeOrder}
                sx={{
                  padding: '10px 20px',
                  backgroundColor: '#4caf50',
                  '&:hover': {
                    backgroundColor: '#388e3c',
                  },
                }}
                disabled={loading || cartItems.length === 0}
              >
                {loading ? 'Finalizando...' : 'Finalizar Pedido'}
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
