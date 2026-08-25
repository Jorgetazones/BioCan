import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/product/DetailProduct';

const ProductPage = () => {
  const { id } = useParams();

  // useParams siempre devuelve string: ProductDetail espera un number.
  const productId = Number(id);

  if (!id || Number.isNaN(productId)) {
    return <Typography>Producto no encontrado</Typography>;
  }

  return <ProductDetail id={productId} />;
};

export default ProductPage;
