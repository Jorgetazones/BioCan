import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';

interface RegisterUserFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: any) => void;
}

const RegisterUserForm: React.FC<RegisterUserFormProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [web, setWeb] = useState('');
  const [redesSociales, setRedesSociales] = useState('');

  const handleSubmit = () => {
    if (!nombre || !tipo || !password) {
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    onSubmit({
      nombre,
      tipo,
      password,
      telefono,
      direccion,
      ubicacion,
      descripcion,
      web,
      redes_sociales: redesSociales,
    });

    // Limpiar campos
    setNombre('');
    setTipo('');
    setPassword('');
    setTelefono('');
    setDireccion('');
    setUbicacion('');
    setDescripcion('');
    setWeb('');
    setRedesSociales('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Registrar Nuevo Usuario</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='secondary'>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color='primary'>
          Registrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterUserForm;
