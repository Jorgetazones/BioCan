import { useEffect, useState } from 'react';
import { IProduct } from '../types/IProducts';

export const useProducts = () => {
  const [displayAsProductCards, setDisplayAsProductCards] = useState(false);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/products');
      if (!response.ok) throw new Error('Error: No se pudo obtener los datos');

      const data = await response.json();
      setProducts(data);
    } catch (e) {
      setError('Error: ' + (e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    products,
    loading,
    error,
    displayAsProductCards,
    setDisplayAsProductCards,
  };
};

export default useProducts;
