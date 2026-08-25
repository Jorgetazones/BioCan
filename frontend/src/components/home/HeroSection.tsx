import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../buttons/MainButtons';

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '60vh', md: '80vh' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        backgroundImage: `url("/img/fondo_campo.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      ></Box>

      {/* Contenido del Hero */}
      <Box
        sx={{
          zIndex: 2,
          backdropFilter: 'blur(4px)',
          p: 4,
          borderRadius: 2,
          maxWidth: '800px',
        }}
      >
        <Typography
          variant='h2'
          fontWeight='bold'
          sx={{
            fontSize: { xs: '2rem', md: '3.5rem' },
            lineHeight: 1.2,
          }}
        >
          Bienvenido a BioCan
        </Typography>
        <Typography
          variant='h6'
          sx={{
            mt: 2,
            fontSize: { xs: '1rem', md: '1.5rem' },
          }}
        >
          Compra productos locales y apoya a pequeños agricultores
        </Typography>
        <MainButton onClick={() => navigate('/products')}>
          Ver productos
        </MainButton>
      </Box>
    </Box>
  );
};

export default HeroSection;
