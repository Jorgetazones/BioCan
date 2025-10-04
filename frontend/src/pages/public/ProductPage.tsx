import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/product/DetailProduct';

const ProductPage = () => {
  const { id } = useParams();
  console.log('Producto ID:', id); // Verifica el id

  if (!id) return <Typography>Producto no encontrado</Typography>;

  return <ProductDetail id={id} />;
};

export default ProductPage;
