import { Box, Container, Divider, Typography } from '@mui/material';

const CookiesPolicy = () => {
  return (
    <Box bgcolor='#f3ede1' py={6}>
      <Container maxWidth='md'>
        <Typography variant='h4' fontWeight='bold' gutterBottom color='primary'>
          Política de Cookies
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant='body1' paragraph>
          En <strong>BioCan</strong> utilizamos únicamente cookies técnicas
          necesarias para el funcionamiento correcto de nuestro sitio web. No
          utilizamos cookies de terceros, ni con fines publicitarios o
          analíticos.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          ¿Qué son las cookies?
        </Typography>
        <Typography variant='body1' paragraph>
          Las cookies son pequeños archivos que se almacenan en tu navegador al
          visitar una página web. Permiten funcionalidades esenciales como
          mantener tu sesión iniciada o recordar tu actividad durante la
          navegación.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          ¿Qué cookies utilizamos?
        </Typography>
        <Typography variant='body1' paragraph>
          Solo usamos cookies necesarias para comprobar si has iniciado sesión
          mediante un sistema de autenticación segura con{' '}
          <strong>JWT (JSON Web Tokens)</strong>. No rastreamos tu actividad ni
          compartimos información con terceros.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          ¿Puedo desactivarlas?
        </Typography>
        <Typography variant='body1' paragraph>
          Puedes configurar tu navegador para bloquear cookies, pero ten en
          cuenta que algunas funcionalidades básicas, como acceder a tu cuenta o
          realizar compras, pueden dejar de funcionar correctamente.
        </Typography>

        <Typography variant='body1' mt={4}>
          Para más información, consulta también nuestra{' '}
          <a
            href='/politica-de-privacidad'
            style={{ textDecoration: 'underline' }}
          >
            Política de Privacidad
          </a>
          .
        </Typography>
      </Container>
    </Box>
  );
};

export default CookiesPolicy;
