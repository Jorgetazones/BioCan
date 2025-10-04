import { fetchData } from '../../helper/commonHelper';
import { IProduct } from '../../types/IProducts';

export const getAllProducts = async (): Promise<IProduct[]> => {
  const response = await fetchData({
    url: '/products',
    method: 'GET',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener los productos');
  }

  return data;
};

export const getProductById = async (id: string | number) => {
  const res = await fetch(`http://localhost:3000/api/products/${id}`);
  if (!res.ok) throw new Error('Producto no encontrado');
  const data = await res.json();
  return data;
};

export const createProduct = async (
  product: Partial<IProduct>
): Promise<IProduct> => {
  const response = await fetchData({
    url: '/products',
    method: 'POST',
    body: product,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al crear el producto');
  }

  return data;
};
export const updateProduct = async (id: string, updates: Partial<IProduct>) => {
  const response = await fetchData({
    url: `/products/${id}`,
    method: 'PUT',
    body: updates,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al actualizar el producto');
  }

  return data;
};

export const deleteProduct = async (id: string) => {
  const response = await fetchData({
    url: `/products/${id}`,
    method: 'DELETE',
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Error al eliminar el producto');
  }
};
// Crear producto con imagen (multimedia asociada)
export const createProductWithMedia = async (
  product: Partial<IProduct>,
  imagen?: File
): Promise<IProduct> => {
  // Crear el producto
  const formData = new FormData();
  for (const key in product) {
    if (product[key as keyof IProduct] !== undefined) {
      formData.append(key, String(product[key as keyof IProduct]));
    }
  }

  const productResponse = await fetchData({
    url: '/products',
    method: 'POST',
    body: formData,
  });

  const newProduct = await productResponse.json();

  if (!productResponse.ok) {
    throw new Error(newProduct.message || 'Error al crear el producto');
  }

  // Si hay imagen, subirla
  if (imagen) {
    const multimediaFormData = new FormData();
    multimediaFormData.append('file', imagen);
    multimediaFormData.append('producto_id', String(newProduct.id));
    multimediaFormData.append('tipo', 'imagen');

    const multimediaResponse = await fetchData({
      url: '/multimedia/create',
      method: 'POST',
      body: multimediaFormData,
    });

    if (!multimediaResponse.ok) {
      const errorData = await multimediaResponse.json();
      console.error('Error al subir multimedia:', errorData.message);
    }
  }

  return newProduct;
};
