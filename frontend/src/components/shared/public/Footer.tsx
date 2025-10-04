import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../store/authSlice';
import { RootState } from '../../../store/store';

import EmailIcon from '@mui/icons-material/Email';
import GavelIcon from '@mui/icons-material/Gavel';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';

export const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleOrdersClick = () => {
    if (isAuthenticated) {
      navigate('/orders');
    } else {
      navigate('/login');
    }
  };

  return (
    <Box
      component='footer'
      sx={{ bgcolor: '#f3ede1', color: '#333', pt: 6, pb: 3 }}
    >
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography
              variant='h6'
              fontWeight='bold'
              gutterBottom
              color='#388e3c'
            >
              Políticas
            </Typography>
            <Link
              href='/cookies'
              color='inherit'
              underline='hover'
              display='block'
            >
              <GavelIcon fontSize='small' sx={{ mr: 1, color: '#4caf50' }} />
              Política de Cookies
            </Link>
            <Link
              href='/terms-and-conditions'
              color='inherit'
              underline='hover'
              display='block'
            >
              <InfoIcon fontSize='small' sx={{ mr: 1, color: '#4caf50' }} />
              Términos y Condiciones
            </Link>
            <Link
              href='politica-de-privacidad'
              color='inherit'
              underline='hover'
              display='block'
            >
              <LockIcon fontSize='small' sx={{ mr: 1, color: '#4caf50' }} />
              Política de Privacidad
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography
              variant='h6'
              fontWeight='bold'
              gutterBottom
              color='#388e3c'
            >
              Ayuda
            </Typography>
            <Link
              component='button'
              onClick={handleOrdersClick}
              color='inherit'
              underline='hover'
              display='block'
              sx={{
                textDecoration: 'none',
                cursor: 'pointer',
                color: 'inherit',
              }}
            >
              Mis Pedidos
            </Link>
            <Link
              href='/FAQs'
              color='inherit'
              underline='hover'
              display='block'
            >
              Preguntas Frecuentes
            </Link>
            {isAuthenticated && (
              <Button
                variant='text'
                sx={{
                  color: '#388e3c',
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
                onClick={() => dispatch(logout())}
              >
                Cerrar sesión
              </Button>
            )}
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={4}>
            <Typography
              variant='h6'
              fontWeight='bold'
              gutterBottom
              color='#388e3c'
            >
              Newsletter
            </Typography>
            <Typography variant='body2' mb={2}>
              Suscríbete para recibir novedades y ofertas exclusivas.
            </Typography>
            <Box display='flex' gap={1}>
              <TextField
                variant='filled'
                size='small'
                placeholder='Tu correo'
                fullWidth
              />
              <Button
                variant='contained'
                sx={{
                  bgcolor: '#4caf50',
                  '&:hover': { bgcolor: '#388e3c' },
                  borderRadius: 1,
                  textTransform: 'none',
                }}
              >
                <EmailIcon sx={{ mr: 1 }} />
                Suscribirse
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: '#ccc' }} />

        <Box
          display='flex'
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent='space-between'
          alignItems='center'
          textAlign={{ xs: 'center', sm: 'left' }}
          gap={2}
        >
          <Typography variant='body2'>
            © {new Date().getFullYear()} BioCan. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
