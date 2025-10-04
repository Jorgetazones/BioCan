import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Page404 = () => {
  return (
    <Container
      maxWidth='md'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
      <Typography variant='h2' component='h1' gutterBottom>
        404 - Página no encontrada
      </Typography>
      <Typography variant='body1' sx={{ mb: 4, color: 'text.secondary' }}>
        Lo sentimos, la página que buscas no existe o fue movida.
      </Typography>
      <Button variant='contained' color='primary' component={RouterLink} to='/'>
        Volver al inicio
      </Button>
    </Container>
  );
};

export default Page404;
