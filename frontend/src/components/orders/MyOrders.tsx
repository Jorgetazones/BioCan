import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchData } from '../../helper/commonHelper';
import { RootState } from '../../store/store';

const MyOrders = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState<
    {
      id: number;
      total: number;
      estado: string;
      direccion_envio: string;
      detalles: {
        producto_id: number;
        cantidad: number;
        precio_unitario: number;
      }[];
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchData({ url: `/orders/user/${user.id}`, method: 'GET' })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Error al cargar los pedidos');
          }
          return res.json();
        })
        .then((data) => setOrders(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant='h4' gutterBottom>
          Mis Pedidos
        </Typography>
        <Typography>Cargando pedidos...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant='h4' gutterBottom>
          Mis Pedidos
        </Typography>
        <Typography color='error'>{error}</Typography>
      </Box>
    );
  }

  if (orders.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant='h4' gutterBottom>
          Mis Pedidos
        </Typography>
        <Typography>No tienes pedidos registrados.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant='h4' gutterBottom>
          Mis Pedidos
        </Typography>
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} md={6} lg={4} key={order.id}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant='h6' gutterBottom>
                  Pedido #{order.id}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography>
                  <strong>Total:</strong> {order.total}€
                </Typography>
                <Typography>
                  <strong>Estado:</strong> {order.estado}
                </Typography>
                <Typography>
                  <strong>Dirección de Envío:</strong> {order.direccion_envio}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default MyOrders;
