import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../helper/varsHelper';
import { addToCart } from '../../store/cartSlice';
import { fetchProductQuantities } from '../../store/productsSlice';
import {
  decrementQuantity,
  incrementQuantity,
} from '../../store/quantitySlice';
import { AppDispatch, RootState } from '../../store/store';
import { IProduct } from '../../types/IProducts';

interface ProductCardsProps {
  products: IProduct[];
}

const ProductCards: React.FC<ProductCardsProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchText, category } = useSelector(
    (state: RootState) => state.filters
  );

  const quantities = useSelector((state: RootState) => state.quantities);

  useEffect(() => {
    dispatch(fetchProductQuantities());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => {
    const matchesName = product.nombre
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory = category === '' || product.categoria === category;
    return matchesName && matchesCategory;
  });

  const handleIncrement = (product: IProduct) => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = (product: IProduct) => {
    dispatch(decrementQuantity(product.id));
  };

  const addProductToCart = (product: IProduct) => {
    const productQuantity = quantities[product.id] || 0;
    dispatch(
      addToCart({
        ...product,
        quantity: productQuantity,
      })
    );
  };

  return (
    <Box bgcolor={'#F9F6F0'} minHeight='100vh' py={4} maxWidth={'100%'}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: 4,
          px: 4,
        }}
      >
        {filteredProducts.map((product) => {
          const productQuantity = quantities[product.id] || 0;

          const productImage =
            imageUrl(product.multimedia?.[0]?.url) ?? '/img/BioCan_Logo.png';

          return (
            <Card
              key={product.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 4,
                boxShadow: 3,
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              <CardActionArea component={Link} to={`/product/${product.id}`}>
                <CardMedia
                  component='img'
                  height='200'
                  image={productImage}
                  crossOrigin='anonymous'
                  alt={product.nombre}
                  sx={{ objectFit: 'cover' }}
                />
              </CardActionArea>

              <CardContent>
                <Typography
                  variant='h6'
                  fontWeight='bold'
                  gutterBottom
                  component={Link}
                  to={`/product/${product.id}`}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: 'primary.main',
                    },
                  }}
                >
                  {product.nombre}
                </Typography>

                <Typography variant='body2' color='text.secondary'>
                  Categoría: {product.categoria}
                </Typography>

                <Typography variant='body2' color='text.secondary'>
                  Precio: {product.precio} € / {product.unidad_medida}
                </Typography>

                <Typography variant='body2' color='text.secondary'>
                  Stock: {product.stock}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 2,
                    gap: 2,
                  }}
                >
                  <IconButton
                    color='primary'
                    onClick={() => handleDecrement(product)}
                    sx={{ border: '1px solid #ccc' }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant='body1' fontWeight='bold'>
                    {productQuantity}
                  </Typography>
                  <IconButton
                    color='primary'
                    onClick={() => handleIncrement(product)}
                    sx={{ border: '1px solid #ccc' }}
                    disabled={productQuantity === product.stock}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>

                <Button
                  variant='contained'
                  color='secondary'
                  fullWidth
                  sx={{ mt: 3, borderRadius: 3 }}
                  disabled={productQuantity === 0}
                  onClick={() => addProductToCart(product)}
                >
                  Añadir al carrito
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProductCards;
