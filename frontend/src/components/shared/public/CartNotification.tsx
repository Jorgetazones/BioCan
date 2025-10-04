import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../../../store/store';

const CartNotification = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const prevCartRef = useRef(cart);

  useEffect(() => {
    const prevCart = prevCartRef.current;

    const prevTotalItems = prevCart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const currentTotalItems = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    if (currentTotalItems > prevTotalItems) {
      toast.success('¡Producto añadido al carrito!');
    }

    prevCartRef.current = cart;
  }, [cart]);

  return null;
};

export default CartNotification;
