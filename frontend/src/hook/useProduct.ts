import { useEffect, useState } from 'react';
import { fetchData } from '../helper/commonHelper';
import { IProduct } from '../types/IProducts';

export const useProduct = (id: number) => {
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Antes apuntaba a `api/product${id}` (sin la "s" ni la barra), así que
        // siempre devolvía 404.
        const response = await fetchData({
          url: `/products/${id}`,
          method: 'GET',
        });
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
