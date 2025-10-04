import { Box, Typography } from '@mui/material';

export const PrivateFooter = () => {
  const currentYear = new Date().getFullYear();
  const websiteName = 'BioCan';

  return (
    <Box
      component='footer'
      sx={{
        width: '98%',
        padding: 2,
        textAlign: 'center',
        boxShadow: 2,
        mt: 'auto',
      }}
    >
      <Typography variant='body1' color='text.secondary'>
        {websiteName} © {currentYear}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Todos los derechos reservados
      </Typography>
    </Box>
  );
};

export default PrivateFooter;
