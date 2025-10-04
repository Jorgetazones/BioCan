import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchData } from '../../helper/commonHelper';
import { useAppSelector } from '../../hook/useAppDispatch';

interface Order {
  id: number;
  fecha: string;
  total: number;
  item: string;
}

const OrdersSection = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchData({
          url: `/orders/user/${user?.id}`,
          method: 'GET',
        });
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
      }
    };

    fetchOrders();
  }, [user?.id]);

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant='h6' gutterBottom>
        Historial de compras
      </Typography>

      {orders.length === 0 ? (
        <Typography>No has realizado ninguna compra aún.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <ListItem key={order.id} divider>
              <ListItemText
                primary={`Pedido #${order.id}`}
                secondary={`Fecha: ${order.fecha} — Total: ${order.total} €`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default OrdersSection;
