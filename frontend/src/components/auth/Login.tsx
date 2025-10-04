import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hook/useAppDispatch';
import { login } from '../../services/auth/authServices';
import { loginSuccess } from '../../store/authSlice';
import { USER_TYPE } from '../shared/private/PrivateHeader';

const Login = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(username, password);

      if (!data || !data.tipo) {
        throw new Error('Datos de usuario inválidos');
      }

      const usuarioFormateado = {
        id: data.id,
        nombre: data.username,
        tipo: data.tipo,
        ubicacion: data.ubicacion || '',
        direccion: data.direccion || '',
        telefono: data.telefono || 0,
        web: data.web || '',
      };

      dispatch(loginSuccess(usuarioFormateado));
      setError('');

      if (
        usuarioFormateado.tipo.toLowerCase() ===
          USER_TYPE.COMPRADOR.toLowerCase() ||
        usuarioFormateado.tipo.toLowerCase() ===
          USER_TYPE.AGRICULTOR.toLowerCase()
      ) {
        navigate('/private');
      } else if (
        usuarioFormateado.tipo.toLowerCase() === USER_TYPE.ADMIN.toLowerCase()
      ) {
        console.log('Redirigiendo a /admin');
        navigate('/private/admin');
      } else {
        console.log('Tipo de usuario no reconocido:', usuarioFormateado.tipo);
        throw new Error('Tipo de usuario no reconocido');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus credenciales.');
      console.error(err);
    }
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      bgcolor='#f9f9f9'
      height='100vh'
    >
      <Box
        width='100%'
        maxWidth='400px'
        bgcolor='white'
        boxShadow={3}
        borderRadius={2}
        textAlign='center'
        p={3}
      >
        <Typography variant='h5' gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label='Usuario'
            variant='outlined'
            fullWidth
            margin='normal'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label='Contraseña'
            type='password'
            variant='outlined'
            fullWidth
            margin='normal'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography variant='body2' color='error' sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            variant='contained'
            color='primary'
            fullWidth
            sx={{ mt: 2 }}
            type='submit'
          >
            Iniciar Sesión
          </Button>
        </form>
        <Typography variant='body2' sx={{ mt: 2 }}>
          ¿No tienes una cuenta?{' '}
          <Link
            to='/signup'
            style={{ color: '#1976d2', textDecoration: 'none' }}
          >
            Regístrate aquí
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
