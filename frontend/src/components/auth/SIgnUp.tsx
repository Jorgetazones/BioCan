import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_BASE_URL;

const SignUp = () => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [web, setWeb] = useState('');
  const [redesSociales, setRedesSociales] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!nombre || !tipo || !password) {
      setError('Por favor, completa los campos obligatorios.');
      return;
    }

    try {
      const response = await fetch(`${baseURL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          tipo,
          password,
          telefono,
          direccion,
          ubicacion,
          descripcion,
          web,
          redes_sociales: redesSociales,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el usuario.');
      }

      setSuccess('Usuario registrado exitosamente.');
      setError('');
      // Limpia los campos del formulario
      setNombre('');
      setTipo('');
      setPassword('');
      setTelefono('');
      setDireccion('');
      setUbicacion('');
      setDescripcion('');
      setWeb('');
      setRedesSociales('');

      // Redirige al usuario al login después del registro
      navigate('/login');
    } catch (err) {
      setError((err as Error).message);
      setSuccess('');
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
        maxWidth='500px'
        bgcolor='white'
        boxShadow={3}
        borderRadius={2}
        textAlign='center'
        p={3}
      >
        <Typography variant='h5' gutterBottom>
          Registro de Usuario
        </Typography>
        <TextField
          label='Nombre'
          variant='outlined'
          fullWidth
          margin='normal'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <FormControl fullWidth margin='normal' variant='outlined' required>
          <InputLabel id='tipo-label'>Tipo de Usuario</InputLabel>
          <Select
            labelId='tipo-label'
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            label='Tipo de Usuario'
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='agricultor'>Agricultor</MenuItem>
            <MenuItem value='comprador'>Comprador</MenuItem>
          </Select>
          <FormHelperText>Campo obligatorio</FormHelperText>
        </FormControl>
        <TextField
          label='Contraseña'
          type='password'
          variant='outlined'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label='Teléfono'
          variant='outlined'
          fullWidth
          margin='normal'
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        {tipo === 'comprador' && (
          <TextField
            label='Dirección'
            variant='outlined'
            fullWidth
            margin='normal'
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        )}
        {tipo === 'agricultor' && (
          <>
            <TextField
              label='Ubicación'
              variant='outlined'
              fullWidth
              margin='normal'
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
            <TextField
              label='Descripción'
              variant='outlined'
              fullWidth
              margin='normal'
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <TextField
              label='Página Web'
              variant='outlined'
              fullWidth
              margin='normal'
              value={web}
              onChange={(e) => setWeb(e.target.value)}
            />
            <TextField
              label='Redes Sociales'
              variant='outlined'
              fullWidth
              margin='normal'
              value={redesSociales}
              onChange={(e) => setRedesSociales(e.target.value)}
            />
          </>
        )}
        {error && (
          <Typography variant='body2' color='error' sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography variant='body2' color='success.main' sx={{ mt: 1 }}>
            {success}
          </Typography>
        )}
        <Button
          variant='contained'
          color='primary'
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSignUp}
        >
          Registrarse
        </Button>
        <Typography variant='body2' sx={{ mt: 2 }}>
          ¿Ya tienes una cuenta?{' '}
          <Button
            component={Link}
            to='/login'
            sx={{ color: '#1976d2', textDecoration: 'none' }}
          >
            Iniciar Sesión
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
