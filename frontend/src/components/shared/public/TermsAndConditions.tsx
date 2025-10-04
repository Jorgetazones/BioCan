import { Box, Container, Divider, Typography } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Box bgcolor='#f3ede1' py={6}>
      <Container maxWidth='md'>
        <Typography variant='h4' fontWeight='bold' gutterBottom color='primary'>
          Términos y Condiciones
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant='body1' paragraph>
          Estos Términos y Condiciones regulan el uso del sitio web{' '}
          <strong>BioCan</strong>, donde pequeños agricultores pueden publicar y
          vender sus excedentes de cosechas, y los usuarios pueden adquirirlos.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          1. Aceptación del Usuario
        </Typography>
        <Typography variant='body1' paragraph>
          Al acceder y utilizar este sitio web, aceptas cumplir con estos
          Términos y Condiciones. Si no estás de acuerdo, no debes usar la
          plataforma.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          2. Registro de Usuarios
        </Typography>
        <Typography variant='body1' paragraph>
          Para comprar o publicar productos, es necesario registrarse
          proporcionando datos verídicos. BioCan no se hace responsable por
          información falsa proporcionada por los usuarios.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          3. Responsabilidad sobre los Productos
        </Typography>
        <Typography variant='body1' paragraph>
          Los agricultores son responsables del contenido, la disponibilidad y
          la calidad de los productos publicados. BioCan actúa únicamente como
          intermediario.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          4. Proceso de Compra
        </Typography>
        <Typography variant='body1' paragraph>
          Los usuarios podrán realizar compras a través de la plataforma. Las
          condiciones de entrega, método de pago y devoluciones se establecerán
          entre el comprador y el agricultor.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          5. Propiedad Intelectual
        </Typography>
        <Typography variant='body1' paragraph>
          Todos los contenidos del sitio (logotipo, textos, imágenes, etc.) son
          propiedad de BioCan o de sus respectivos autores. Queda prohibida su
          reproducción sin autorización.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          6. Uso Adecuado de la Plataforma
        </Typography>
        <Typography variant='body1' paragraph>
          No está permitido el uso de BioCan con fines ilegales, fraudulentos o
          que puedan dañar el funcionamiento del sitio o a otros usuarios.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          7. Cancelación de Cuentas
        </Typography>
        <Typography variant='body1' paragraph>
          BioCan se reserva el derecho de suspender o eliminar cuentas de
          usuarios que incumplan estos términos, sin previo aviso.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          8. Modificaciones
        </Typography>
        <Typography variant='body1' paragraph>
          BioCan puede modificar estos Términos y Condiciones en cualquier
          momento. Se recomienda revisar periódicamente esta sección.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          9. Legislación Aplicable
        </Typography>
        <Typography variant='body1' paragraph>
          Estos términos se rigen por la legislación española. Cualquier
          conflicto será resuelto por los tribunales competentes del domicilio
          del consumidor.
        </Typography>

        <Typography variant='body1' mt={4}>
          Si tienes dudas, puedes contactarnos en:{' '}
          <strong>contacto@biocan.com</strong>
        </Typography>
      </Container>
    </Box>
  );
};

export default TermsAndConditions;
