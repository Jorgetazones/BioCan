import { useEffect, useState } from 'react';
import { IProduct } from '../types/IProducts';

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/product${id}`);
        if (!response.ok) throw new Error('Error al obtener los datos');

        const data = await response.json();
        setProduct(data);
      } catch (e) {
        setError('Error: ' + (e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  return { product, loading, error };
};
