import { Box, Container, Divider, Typography } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box bgcolor='#f3ede1' py={6}>
      <Container maxWidth='md'>
        <Typography variant='h4' fontWeight='bold' gutterBottom color='primary'>
          Política de Privacidad
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Typography variant='body1' paragraph>
          En <strong>BioCan</strong>, nos comprometemos a proteger tu
          privacidad. Esta Política de Privacidad explica cómo recopilamos,
          usamos y protegemos tus datos personales cuando interactúas con
          nuestro sitio web.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          1. ¿Qué datos personales recopilamos?
        </Typography>
        <Typography variant='body1' paragraph>
          Recopilamos los siguientes datos personales:
          <ul>
            <li>
              <strong>Nombre de usuario</strong>
            </li>
            <li>
              <strong>Contraseña</strong> (almacenada de manera encriptada)
            </li>
            <li>
              <strong>Dirección de envío</strong> (si realizas un pedido)
            </li>
            <li>
              <strong>Email</strong> (si lo proporcionas para contacto o
              notificaciones)
            </li>
          </ul>
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          2. ¿Cómo recopilamos tus datos?
        </Typography>
        <Typography variant='body1' paragraph>
          Recopilamos tus datos cuando:
          <ul>
            <li>Te registras en nuestra plataforma.</li>
            <li>Realizas un pedido en el sitio web.</li>
            <li>Nos contactas a través de nuestras formas de contacto.</li>
          </ul>
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          3. ¿Para qué usamos tus datos?
        </Typography>
        <Typography variant='body1' paragraph>
          Usamos tus datos para:
          <ul>
            <li>
              <strong>Autenticación</strong> mediante JWT para asegurar tu
              sesión.
            </li>
            <li>
              <strong>Gestión de pedidos</strong> y procesamiento de envíos.
            </li>
            <li>
              <strong>Soporte al cliente</strong> para resolver dudas o
              problemas.
            </li>
          </ul>
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          4. Base legal para el tratamiento de datos
        </Typography>
        <Typography variant='body1' paragraph>
          El tratamiento de tus datos personales se basa en:
          <ul>
            <li>
              <strong>Tu consentimiento</strong> al registrarte en el sitio.
            </li>
            <li>
              <strong>Cumplimiento de obligaciones contractuales</strong> cuando
              realizas un pedido.
            </li>
          </ul>
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          5. ¿Con quién compartimos tus datos?
        </Typography>
        <Typography variant='body1' paragraph>
          En BioCan, no compartimos tus datos con terceros. Toda la información
          que nos proporcionas es tratada de manera confidencial y no se vende
          ni se cede a otras empresas.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          6. ¿Dónde se almacenan tus datos?
        </Typography>
        <Typography variant='body1' paragraph>
          Los datos se almacenan de manera segura en nuestros servidores, que
          cumplen con las normativas de protección de datos vigentes. Aseguramos
          que tus datos estén protegidos en todo momento.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          7. ¿Cuánto tiempo conservamos tus datos?
        </Typography>
        <Typography variant='body1' paragraph>
          Conservamos tus datos mientras mantengas una cuenta activa o durante
          el tiempo necesario para cumplir con las obligaciones legales (por
          ejemplo, el procesamiento de pedidos).
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          8. Derechos del usuario
        </Typography>
        <Typography variant='body1' paragraph>
          Tienes derecho a acceder, rectificar, cancelar, oponerte, solicitar la
          portabilidad o la supresión de tus datos personales. Para ejercer
          estos derechos, puedes contactarnos a través de nuestro correo
          electrónico.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          9. Contacto
        </Typography>
        <Typography variant='body1' paragraph>
          Si tienes alguna pregunta o inquietud sobre nuestra Política de
          Privacidad, o deseas ejercer tus derechos, puedes contactarnos en:
          <br />
          <strong>Email:</strong> contacto@biocan.com
        </Typography>

        <Typography variant='body1' mt={4}>
          Para más detalles sobre nuestras políticas, consulta también nuestra{' '}
          <a href='/cookies' style={{ textDecoration: 'underline' }}>
            Política de Cookies
          </a>
          .
        </Typography>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
