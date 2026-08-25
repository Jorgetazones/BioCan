import { Alert, Box, Link, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useNavigate } from 'react-router-dom';
import { imageUrl } from '../../helper/varsHelper';
import { useProducts } from '../../hook/useProducts';
import { IProduct } from '../../types/IProducts';

const HomeProducts = () => {
  const navigate = useNavigate();
  const { products, error } = useProducts();

  const getImageUrl = (product: IProduct): string => {
    return imageUrl(product.multimedia?.[0]?.url) ?? '/img/BioCan_Logo.png';
  };

  if (error) {
    return (
      <Box sx={{ maxWidth: '600px', mx: 'auto', py: 4 }}>
        <Alert severity='error' variant='filled'>
          Error al cargar los productos. Por favor, inténtalo de nuevo más
          tarde.
        </Alert>
      </Box>
    );
  }

  const isMultiProduct = products.length > 1;

  return (
    <Box
      sx={{
        maxWidth: '100%',
        mx: 'auto',
        px: { xs: 1, sm: 2 },
        py: { xs: 2, sm: 4 },
        overflowX: 'hidden',
      }}
    >
      <Typography
        variant='h4'
        textAlign='center'
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        Productos Destacados
      </Typography>

      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={5000}
        swipeable
        emulateTouch
        centerMode={isMultiProduct}
        centerSlidePercentage={
          products.length >= 3 ? 33 : products.length === 2 ? 50 : 100
        }
        showArrows={isMultiProduct}
        dynamicHeight={false}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: 1,
              marginRight: '2px',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Box
              component='img'
              src={getImageUrl(product)}
              crossOrigin='anonymous'
              alt={`Imagen del producto ${product.nombre}`}
              sx={{
                width: { xs: '100%', sm: '220px', md: '250px' },
                height: { xs: '160px', sm: '200px', md: '250px' },
                objectFit: 'cover',

                borderRadius: 2,
                mb: 2,
                boxShadow: 1,
                maxWidth: '100%',
              }}
            />
            <Link
              component='button'
              variant='body1'
              onClick={() => navigate(`/product/${product.id}`)}
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: 'bold',
                '&:hover': {
                  textDecoration: 'underline',
                },
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '90%',
                fontSize: { xs: '1rem', sm: '1.1rem' },
              }}
            >
              {product.nombre}
            </Link>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default HomeProducts;
