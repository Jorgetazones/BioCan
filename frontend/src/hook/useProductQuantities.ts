import { useState } from 'react';

const useProductQuantities = () => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const increment = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrement = (id: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      return {
        ...prev,
        [id]: Math.max(current - 1, 0),
      };
    });
  };

  const getQuantity = (id: number) => {
    return quantities[id] || 0;
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((total, qty) => total + qty, 0);
  };

  return {
    increment,
    decrement,
    getQuantity,
    getTotalItems,
  };
};

export default useProductQuantities;
