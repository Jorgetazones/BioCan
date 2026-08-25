import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../../../store/store';

const CartNotification = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const prevCartRef = useRef(cart);

  useEffect(() => {
    const prevCart = prevCartRef.current;

    // quantity es opcional en el tipo del carrito: sin el ?? 0 el total sale NaN
    // y la comparación de abajo nunca dispara el aviso.
    const prevTotalItems = prevCart.reduce(
      (sum, item) => sum + (item.quantity ?? 0),
      0
    );
    const currentTotalItems = cart.reduce(
      (sum, item) => sum + (item.quantity ?? 0),
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
