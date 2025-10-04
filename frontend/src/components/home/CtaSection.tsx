import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MainButton } from '../buttons/MainButtons';

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        background: 'white',
        textAlign: 'center',
        padding: '60px 20px',
        mt: 5,
        borderRadius: '12px',
        color: 'black',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Typography variant='h4' fontWeight='bold' mb={2}>
        ¿Te quieres unir a nuestro proyecto?
      </Typography>
      <Typography variant='h6' mb={4}>
        Únete a BioCan y empieza a vender tus productos directamente.
      </Typography>
      <MainButton onClick={() => navigate('/signup')}>Únete ahora</MainButton>
    </Box>
  );
};

export default CtaSection;
